<#
    安装 `git backup` 别名（写入你的全局 git 配置，只做这一件事）。
    在本机跑一次即可（Windows PowerShell 5.1 或 PowerShell 7 都行）：

        powershell -NoProfile -ExecutionPolicy Bypass -File scripts\install-alias.ps1

    之后在 workspace 目录里直接：

        git backup

    就会把整个目录提交并推送到 GitHub。
#>
$ErrorActionPreference = 'Stop'

# $PSScriptRoot 在 5.1 里可用；兜底用脚本自身路径
$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
$repo = Split-Path -Parent $scriptDir
$scriptPath = Join-Path $repo 'backup.ps1'

if (-not (Test-Path $scriptPath)) { throw "找不到 $scriptPath" }

# 用正斜杠，避免 git alias 反斜杠转义问题
$fwd = $scriptPath.Replace('\', '/')
$cmd = '!powershell -NoProfile -ExecutionPolicy Bypass -File ' + $fwd

# 值与目标一致就不重写，防止 git 反复转义路径
$current = (& git config --global --get alias.backup 2>$null)
if ($current -eq $cmd) {
    Write-Host "[skip] 别名已是最新，无需修改" -ForegroundColor Yellow
}
else {
    & git config --global alias.backup $cmd
    if ($LASTEXITCODE -ne 0) { throw "写入 git alias 失败" }
    Write-Host "[ok] 已安装别名" -ForegroundColor Green
}

Write-Host ""
Write-Host "  git backup   ->   $scriptPath" -ForegroundColor Cyan
Write-Host "  在 workspace 目录下执行即可。" -ForegroundColor Gray
