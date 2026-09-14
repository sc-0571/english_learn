# english_learn

本仓库是 `D:\study\ai\english_learn` workspace 的 GitHub **private** 备份。
远端：<https://github.com/sc-0571/english_learn>（SSH：`git@github.com:sc-0571/english_learn.git`）

## 备份方式

在 workspace 目录下执行任意一条：

```powershell
git backup        # 别名，推荐
```

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File backup.ps1
```

脚本会：`git add -A`（整个目录，含新增/修改/删除）→ 提交（时间戳信息）→ 推送 `origin/main`。
没有改动时不会产生空提交；推送前会先 `fetch` 并在需要时 `rebase`，避免多机器推送分叉。

可选参数：

```powershell
.\backup.ps1 -Message "自定义提交信息"   # 自定义 commit message
.\backup.ps1 -NoPush                    # 只提交，不推送
```

## 首次配置（换新机器时）

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\install-alias.ps1
```

这会写入全局 git 别名 `alias.backup`，之后 `git backup` 即可用。
需要该机器上的 SSH key 已加入 GitHub 账号 `sc-0571`。

## 内容

| 路径 | 说明 |
|---|---|
| `docs/index.html` | **Verbal Advantage 词汇自测网页**（纯静态，详见 `docs/README.md`） |
| `index.html` | 网页入口（跳转到 `docs/index.html`） |
| `level1-quiz.md` | Level 1 的 50 道题（Markdown 版，含答案解析） |
| `backup.ps1` | 备份脚本 |
| `scripts/install-alias.ps1` | 安装 `git backup` 别名 |

## 在线使用

<https://sc-0571.github.io/english_learn/>

仓库为 public，GitHub Pages 从 `main` 分支的 `/docs` 目录发布。
也可以直接双击本地的 `index.html`，完全离线可用，不需要服务器或联网。
