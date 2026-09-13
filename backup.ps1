<#
    backup.ps1 — 把整个 workspace 提交并推送到 GitHub 备份仓库。

    用法（在 workspace 目录下）：
        git backup                # 推荐，先跑一次 scripts\install-alias.ps1 安装别名
        powershell -NoProfile -ExecutionPolicy Bypass -File backup.ps1

    行为：git add -A -> 提交（带时间戳）-> push 到 origin/main
    - 没有改动时不产生空提交
    - 推送前自动 fetch + rebase，避免多机器推送造成分叉
    - 出错时以非 0 退出码结束，方便脚本判断

    参数：
        -Message <str>   自定义提交信息
        -NoPush          只提交不推送
#>
[CmdletBinding()]
param(
    [string]$Message,
    [switch]$NoPush
)

# 注意：不能用 'Stop'。git 会把进度信息写到 stderr，
# 在 ErrorActionPreference='Stop' 下会被当成致命错误而中断脚本。
$ErrorActionPreference = 'Continue'

$repo = $PSScriptRoot
if (-not $repo) { $repo = Split-Path -Parent $MyInvocation.MyCommand.Path }
if (-not $repo) { $repo = (Get-Location).Path }

# 统一封装 git 调用：只以退出码为准。
#
# 为什么必须把 stderr 重定向掉：
#   Windows PowerShell 5.1 会把原生命令写到 stderr 的内容包装成 ErrorRecord。
#   在调用方 $ErrorActionPreference='Stop' 时（例如 `git backup` 别名由
#   DSH 以 Stop 启动），`git commit` 会向 stderr 打印 "[main abc123] xxx"
#   摘要，于是被当成致命错误抛出，函数返回的就不是退出码了 —— 结果就是
#   "git commit 失败" 这种假失败（其实提交已经成功）。
#   `2>&1 | Out-Null` 能在 5.1 下可靠地保留 $LASTEXITCODE，所以用它。
function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
    & git @GitArgs 2>&1 | Out-Null
    return $LASTEXITCODE
}

Push-Location $repo
$failed = $false
try {
    if (-not (Test-Path (Join-Path $repo '.git'))) {
        throw "不是 git 仓库：$repo"
    }

    $branch = (& git rev-parse --abbrev-ref HEAD | Out-String).Trim()
    if ($branch -eq 'HEAD' -or [string]::IsNullOrWhiteSpace($branch)) {
        throw "处于 detached HEAD，先 git checkout main"
    }

    Write-Host "[backup] 仓库: $repo" -ForegroundColor Cyan
    Write-Host "[backup] 分支: $branch" -ForegroundColor Cyan

    # 1. 暂存全部改动（新增 / 修改 / 删除）
    if ((Invoke-Git add -A) -ne 0) { throw "git add -A 失败" }

    # 2. 有改动才提交
    $diffCode = (Invoke-Git diff --cached --quiet)
    $dirty = ($diffCode -ne 0)

    if ($dirty) {
        if (-not $Message) {
            $Message = 'backup: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
        }
        $changed = @(& git status --short 2>$null | Where-Object { $_ -match '\S' }).Count

        if ((Invoke-Git commit -m $Message) -ne 0) { throw "git commit 失败" }
        Write-Host "[backup] 已提交 $changed 处改动：$Message" -ForegroundColor Green
    }
    else {
        Write-Host "[backup] 没有需要提交的改动" -ForegroundColor Yellow
    }

    if ($NoPush) {
        Write-Host "[backup] -NoPush 已指定，跳过推送" -ForegroundColor Yellow
        exit 0
    }

    # 3. 推送前先同步远端，避免分叉
    if ((Invoke-Git fetch --quiet origin $branch) -eq 0) {
        $behind = @(& git rev-list --count "HEAD..origin/$branch" 2>$null | Where-Object { $_ -match '^\d+$' })
        if ($behind.Count -gt 0 -and [int]$behind[0] -gt 0) {
            Write-Host "[backup] 远端领先 $($behind[0]) 个提交，先 rebase" -ForegroundColor Yellow
            if ((Invoke-Git rebase "origin/$branch") -ne 0) {
                Invoke-Git rebase --abort | Out-Null
                throw "rebase 冲突，已回滚。请手动处理后重跑"
            }
        }
    }

    # 4. 推送
    if ((Invoke-Git push origin $branch) -ne 0) { throw "git push 失败" }

    $head = @(& git log -1 --oneline 2>$null | Where-Object { $_ -match '\S' })
    Write-Host "[backup] 推送完成 -> origin/$branch @ $($head[0])" -ForegroundColor Green
}
catch {
    Write-Host "[backup] 失败：$($_.Exception.Message)" -ForegroundColor Red
    $failed = $true
}
finally {
    Pop-Location
}

if ($failed) { exit 1 }
exit 0
