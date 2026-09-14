# Verbal Advantage 自测网页

**纯静态单页应用**：没有后端、没有构建步骤、不联网也能用。
`docs/index.html` 是应用本体，数据在 `docs/data.js`；仓库根目录的 `index.html` 只是跳转入口。

## 在线使用（GitHub Pages）

<https://sc-0571.github.io/english_learn/>

仓库已设为 public，Pages 从 `main` 分支的 `/docs` 目录发布。详见文末「部署」。

## 本地打开

直接双击仓库根目录的 `index.html`（或 `docs/index.html`）即可 —— 就是普通网页，不需要起服务器。

## 功能

| 模块 | 说明 |
|---|---|
| **测验** | 50 题：词义连线 20 + 同反义 10 + 选词填空 10 + 近义辨析 10。提交后逐题给答案与原书解析。 |
| **错题重学** | 答错的题自动入册；答对即移出；同一题反复错会累计次数。「重测」只出错题。可导出错题报告。 |
| **单词卡** | 50 张翻转卡，含音标、中英释义、同反义词、易错点。可标记「已掌握」并跳过。 |
| **词汇表** | 50 词可搜索的速查表。 |

每次开始测验会重新打乱**选项**顺序（题目保持原书顺序，因为原书次序有难度递进）。
成绩、单词卡进度与错题本都存在浏览器 `localStorage`，**不会上传到任何地方**。

## 错题机制

- 提交后，答错的题按稳定的 `matchKey` 记入错题本：`A→单词`、`B→词对`、`C→句子`、`D→单词`。
- **没作答的题不算错题**（只提示你漏答了几题），也不会计入错题本。
- 答对一次即从错题本移除；答错则 `wrongCount++`，按错得最多的排在前面。
- **重测**只出这些错题：Part A 只保留错过的词并**重新映射选项字母**（避免靠记字母蒙对），
  Part C 的词库收窄到本题答案涉及的词。
- 「生成错题报告」输出纯文本（题目、你选的、正确答案、原书解析），可存档或贴给 AI 助手。

> 页面没有服务器，作者**看不到**你的作答。想让人/AI 帮你复盘，必须自己把报告贴出去。
> 界面上所有确认框都是页面内自绘的，不使用 `confirm()` —— 因为 `file://` 下会被浏览器静默拦截。

## 文件

```
index.html         入口页（跳转到 docs/index.html）
docs/index.html    应用本体（HTML + CSS + JS 全内联，无外部依赖）
docs/data.js       题库：50 个 Level 1 单词 + 四部分题目
docs/verify.js     数据自检（纯 node，无依赖）
docs/dom-test.js   jsdom 冒烟测试（需要 jsdom）
```

## 跑测试

```powershell
# 1) 数据自检：单词表完整性、答案合法性、matchKey 唯一性、与 level1-quiz.md 交叉核对
node docs/verify.js

# 2) 应用冒烟测试：真实加载页面，自动答完 50 题并核对判分与错题本
cd docs
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install --no-save jsdom@24
cd ..
node docs/dom-test.js
```

两个脚本都以退出码 0 表示通过。`dom-test.js` 覆盖 19 组、100+ 条断言，包括：

- 四个部分全部答对 → 50/50；全部答错 → 错题本 50 条且答案文字逐条对得上
- 只做几题就交卷 → 未作答的不算错题（角标必须是 1 而不是 50）
- 错题重测 → 只出错题；答对后移出错题本
- 把原生 `confirm/alert` 换成「一调用就抛错」的函数后，所有确认流程仍正常

## 部署到 GitHub Pages

仓库已设为 **public**（private 仓库发布 Pages 需要付费的 GitHub Pro）。
当前配置：

- **Source**: `Deploy from a branch`
- **Branch**: `main`
- **Folder**: `/docs`

发布地址：<https://sc-0571.github.io/english_learn/>

> 也可以把 Folder 选成 `/ (root)`；根目录的 `index.html` 会跳到 `docs/`，两种都能用。

## 怎么扩展 Level 2–10

1. 往 `docs/data.js` 的 `VA_WORDS` 里加单词，`srcLevel` 填对应级别。
2. 加对应的 `VA_PART_*` 题目数组。
3. 把 `VA_LEVELS` 里该级的 `available` 改成 `true`。
4. 跑 `node docs/verify.js` 确认没有结构错误。

页面本身不用改。`verify.js` 会检查答案合法性、选项字段完整性、`matchKey` 唯一性，
以及「答案是否都在词库里」。
