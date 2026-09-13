# Verbal Advantage 自测网页

**纯静态单页应用**：没有后端、没有构建步骤、不联网也能用。
`index.html` 是入口（会跳到 `web/index.html`），数据在 `web/data.js`。

## 本地打开

直接双击 `index.html`（或 `web/index.html`）即可 —— 就是普通网页，不需要起服务器。

如果想用本地服务器：

```powershell
# 任选其一
node -e "const h=require('http'),f=require('fs'),p=require('path');h.createServer((q,s)=>{let u=q.url.split('?')[0];if(u==='/')u='/index.html';let fp=p.join('web',u);f.readFile(fp,(e,d)=>{if(e){s.writeHead(404);return s.end('404')}s.writeHead(200,{'Content-Type':u.endsWith('.js')?'text/javascript':u.endsWith('.html')?'text/html; charset=utf-8':'text/plain'});s.end(d)})}).listen(8080,()=>console.log('http://127.0.0.1:8080'))"
```

## 功能

| 模块 | 说明 |
|---|---|
| **测验** | 50 题：词义连线 20 + 同反义 10 + 选词填空 10 + 近义辨析 10。提交后逐题给答案与原书解析。 |
| **错题重学** | 答错的题自动入册；答对即移出；同一题反复错会累计次数。「重测」只出错题。可导出错题报告。 |
| **单词卡** | 50 张翻转卡，含音标、中英释义、同反义词、易错点。可标记「已掌握」并跳过。 |
| **词汇表** | 50 词可搜索的速查表。 |
| **说明** | 数据来源与使用说明。 |

每次开始测验会重新打乱**选项**顺序（题目本身保持原书顺序，因为原书次序有难度递进）。
成绩、单词卡进度与错题本都存在浏览器 `localStorage`，**不会上传到任何地方**。

## 错题机制

- 提交测验后，答错的题按稳定的 `matchKey` 记入错题本：`A→单词`、`B→词对`、`C→句子`、`D→单词`。
- 答对一次即从错题本移除（视为已掌握）；答错则 `wrongCount++`，按错得最多的排在前面。
- **重测**只出这些错题：Part A 只保留错过的词并**重新映射选项字母**（避免靠记字母蒙对），
  Part C 的词库收窄到本题答案涉及的词，B/D 按原顺序保留。
- 「生成错题报告」会输出一段纯文本（含题目、你选的、正确答案、原书解析），
  可以自己存档，也可以贴给 AI 助手做针对性讲解 —— 页面本身不会发送任何数据。

> 浏览器没有服务器，所以页面作者**看不到**你的作答。想让人/AI 帮你复盘，
> 必须自己把导出的报告贴出去。

## 文件

```
index.html        入口页（跳转到 web/index.html）
web/index.html    应用本体（HTML + CSS + JS 全内联，无外部依赖）
web/data.js       题库：50 个 Level 1 单词 + 四部分题目
web/verify.js     数据自检（纯 node，无依赖）
web/dom-test.js   jsdom 冒烟测试（需要 jsdom）
```

## 跑测试

```powershell
# 1) 数据自检：单词表完整性、答案合法性、与 level1-quiz.md 交叉核对
node web/verify.js

# 2) 应用冒烟测试：真实加载页面，自动答完 50 题并核对判分
cd web
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install --no-save jsdom@24
cd ..
node web/dom-test.js
```

`verify.js` 退出码 0 表示通过。`dom-test.js` 会把 50 题全部答对并断言得分为 50/50。

## 部署到 GitHub Pages

在仓库 **Settings → Pages** 里：

- **Source**: `Deploy from a branch`
- **Branch**: `main`，目录选 **`/ (root)`**

因为根目录有 `index.html` 会跳到 `web/`，所以这样配置就能直接用。
发布后的地址形如 `https://sc-0571.github.io/english_learn/`。

> 也可以把目录选成 `web/`（如果界面允许），那样根 `index.html` 就不参与。

## 怎么扩展 Level 2–10

1. 往 `web/data.js` 的 `VA_WORDS` 里加单词，`srcLevel` 填对应级别。
2. 加对应的 `VA_PART_*` 题目数组。
3. 把 `VA_LEVELS` 里该级的 `available` 改成 `true`。
4. 跑 `node web/verify.js` 确认没有结构错误。

页面本身不用改：`verify.js` 会检查答案合法性、选项字段完整性、以及「答案是否都在词库里」。
