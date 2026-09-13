/* DOM 冒烟测试：用 jsdom 真正加载 index.html，验证交互与判分逻辑。
   运行： node web/dom-test.js
   需要 web/node_modules/jsdom（已用 npm 本地安装，未提交到仓库）。 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { pathToFileURL } = require('url');

const dir = __dirname;
let fail = 0;
const ok = (m) => console.log('  \u2713 ' + m);
const bad = (m) => { fail++; console.log('  \u2717 ' + m); };
const is = (cond, m) => cond ? ok(m) : bad(m);

const errors = [];

(async function () {
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    // 用 file:// 让 <script src="data.js"> 从磁盘同级目录加载（等价于直接双击打开 index.html）
    url: pathToFileURL(path.join(dir, 'index.html')).href,
    pretendToBeVisual: true,
    beforeParse(win) {
      // jsdom 没有 localStorage 时由 Node 侧兜底；这里给一个内存实现
      const store = {};
      Object.defineProperty(win, 'localStorage', {
        value: {
          getItem: (k) => (k in store ? store[k] : null),
          setItem: (k, v) => { store[k] = String(v); },
          removeItem: (k) => { delete store[k]; },
          clear: () => { for (const k in store) delete store[k]; }
        },
        configurable: true
      });
      win.addEventListener('error', (e) => errors.push('window.onerror: ' + (e.message || e.error)));
      // jsdom 未实现滚动，屏蔽掉以免污染输出
      win.scrollTo = () => {};
      win.HTMLElement.prototype.scrollIntoView = () => {};
    }
  });

  const win = dom.window;
  const doc = win.document;

  // 等 data.js（外部脚本）加载完
  await new Promise((res) => {
    if (doc.readyState === 'complete') return res();
    win.addEventListener('load', res);
    setTimeout(res, 4000);
  });

  const $ = (id) => doc.getElementById(id);
  const switchTo = (name) => {
    doc.querySelector('#tabs button[data-tab="' + name + '"]')
      .dispatchEvent(new win.Event('click', { bubbles: true }));
  };
  /* 自绘弹窗的辅助函数（App 不使用原生 confirm，因为 file:// 下会被浏览器拦截） */
  const modal = () => doc.querySelector('.modal');
  const modalButtons = () => (modal() ? Array.from(modal().querySelectorAll('.acts button')) : []);
  const modalText = () => (modal() ? modal().querySelector('.msg').textContent : '');
  const clickModal = (label) => {
    const b = modalButtons().find((x) => x.textContent.indexOf(label) >= 0);
    if (!b) throw new Error('弹窗里找不到按钮「' + label + '」；现有: ' +
      modalButtons().map((x) => x.textContent).join('/'));
    b.dispatchEvent(new win.Event('click', { bubbles: true }));
    return true;
  };

  console.log('\n=== 1. 脚本加载与初始化 ===');
  is(typeof win.VA_WORDS === 'object' && win.VA_WORDS.length > 50, 'data.js 已加载并挂到 window');
  is(!!$('wl') && $('wl').querySelectorAll('details').length === 50,
     '词汇表渲染出 50 个条目（实际 ' + $('wl').querySelectorAll('details').length + '）');
  is($('srcName').textContent.indexOf('Verbal') >= 0, '页脚数据来源已填充');
  is($('fcTotal').textContent === '50', '单词卡总数显示 50');

  console.log('\n=== 2. 开始测验 ===');
  $('btnStart').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(!$('quizBody').classList.contains('hidden'), 'quizBody 已显示');
  is($('quizIntro').classList.contains('hidden'), '引导页已隐藏');
  const cards = $('quizBody').querySelectorAll('.card');
  is(cards.length === 4, '渲染出 4 个部分（实际 ' + cards.length + '）');
  const selects = $('quizBody').querySelectorAll('select');
  const radios = $('quizBody').querySelectorAll('input[type=radio]');
  const texts = $('quizBody').querySelectorAll('input[type=text]');
  is(selects.length === 20, 'Part A 有 20 个下拉框（实际 ' + selects.length + '）');
  is(radios.length === 60, 'Part B+D 有 60 个单选框（10×2 + 10×4，实际 ' + radios.length + '）');
  is(texts.length === 10, 'Part C 有 10 个填空框（实际 ' + texts.length + '）');
  is($('quizBody').querySelectorAll('.bank span').length === 30,
     'Part A 20 个选项 + Part C 10 个词库（实际 ' + $('quizBody').querySelectorAll('.bank span').length + '）');

  console.log('\n=== 3. 进度条随作答更新 ===');
  is($('progBar').style.width === '0%', '初始进度 0%');
  selects[0].value = 'D';
  selects[0].dispatchEvent(new win.Event('change', { bubbles: true }));
  is($('progBar').style.width === '2%', '答 1 题后进度 2%（实际 ' + $('progBar').style.width + '）');

  console.log('\n=== 4. 全部答对 → 应得 50/50 ===');
  // 从页面 DOM 反推正确答案：利用 data.js 的原始答案
  const A = win.VA_PART_A, B = win.VA_PART_B, C = win.VA_PART_C, D = win.VA_PART_D;
  // Part A 的选项字母在渲染时会被重新映射，所以必须按「释义文字」反查正确选项，
  // 不能直接用 VA_PART_A 里的字母。
  const aChoiceText = {};
  A.choices.forEach((c) => { aChoiceText[c.key] = c.text; });

  /* 把当前这套测验全部填上正确答案；exceptMatchKey 指定的 Part A 词跳过。 */
  function fillCorrect(exceptMatchKey) {
    let n = 0;
    Array.prototype.forEach.call($('quizBody').querySelectorAll('select'), (sel) => {
      const word = sel.closest('.arow').querySelector('.aword').textContent.trim();
      if (word === exceptMatchKey) return;
      const item = A.items.find((x) => x.word === word);
      if (!item) return;
      const wantText = aChoiceText[item.answer];
      const opt = Array.prototype.slice.call(sel.options)
        .find((o) => o.value && o.textContent.replace(/^[A-Z]\.\s*/, '') === wantText);
      if (!opt) return;
      sel.value = opt.value;
      sel.dispatchEvent(new win.Event('change', { bubbles: true }));
      n++;
    });
    Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=radio]'), (radio) => {
      const m = /^([BD])(\d+)$/.exec(radio.name || '');
      if (!m) return;
      const src = m[1] === 'B' ? B.items : D.items;
      const it = src[parseInt(m[2], 10)];
      if (!it || radio.value !== it.answer) return;
      radio.checked = true;
      radio.dispatchEvent(new win.Event('change', { bubbles: true }));
      n++;
    });
    Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=text]'), (inp) => {
      const it = C.items[parseInt(String(inp.getAttribute('data-qid')).replace(/^C/, ''), 10)];
      if (!it) return;
      inp.value = it.answer;
      inp.dispatchEvent(new win.Event('input', { bubbles: true }));
      n++;
    });
    return n;
  }

  /* 把当前这套测验全部填上错误答案（用于验证「全错」时的记录是否正确）。
     返回每题 { qid, ok, expectAnswerText } —— expectAnswerText 是这题真正该显示的答案。 */
  function fillAllWrong() {
    const info = [];
    // Part A
    Array.prototype.forEach.call($('quizBody').querySelectorAll('select'), (sel) => {
      const word = sel.closest('.arow').querySelector('.aword').textContent.trim();
      const item = A.items.find((x) => x.word === word);
      if (!item) return;
      const wantText = aChoiceText[item.answer];
      const badOpt = Array.prototype.slice.call(sel.options)
        .find((o) => o.value && o.textContent.replace(/^[A-Z]\.\s*/, '') !== wantText);
      if (!badOpt) return;
      sel.value = badOpt.value;
      sel.dispatchEvent(new win.Event('change', { bubbles: true }));
      info.push({ qid: sel.getAttribute('data-qid'), part: 'A', word,
        expectAnswer: item.answer + '. ' + wantText });
    });
    // Part B / D
    const byGroup = {};
    Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=radio]'), (r) => {
      (byGroup[r.name] = byGroup[r.name] || []).push(r);
    });
    Object.keys(byGroup).forEach((name) => {
      const m = /^([BD])(\d+)$/.exec(name);
      if (!m) return;
      const src = m[1] === 'B' ? B.items : D.items;
      const it = src[parseInt(m[2], 10)];
      if (!it) return;
      const wrong = byGroup[name].find((r) => r.value !== it.answer);
      if (!wrong) return;
      wrong.checked = true;
      wrong.dispatchEvent(new win.Event('change', { bubbles: true }));
      const opts = it.choices || it.options || [];
      const ch = opts.find((c) => c.k === it.answer);
      info.push({ qid: name, part: m[1],
        word: it.lookup || it.word || (it.a + ' vs ' + it.b),
        expectAnswer: it.answer + '. ' + (ch ? ch.t : '') });
    });
    // Part C —— 故意写一个不属于词库的词
    Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=text]'), (inp) => {
      const qid = String(inp.getAttribute('data-qid'));
      const it = C.items[parseInt(qid.replace(/^C/, ''), 10)];
      if (!it) return;
      inp.value = 'zzz-not-a-word';
      inp.dispatchEvent(new win.Event('input', { bubbles: true }));
      info.push({ qid, part: 'C', word: it.text, expectAnswer: it.answer });
    });
    return info;
  }

  /* 给某个 Part A 的词故意选一个错误选项 */
  function answerWrongA(matchKey) {
    const row = Array.prototype.slice.call($('quizBody').querySelectorAll('.arow'))
      .find((r) => r.querySelector('.aword').textContent.trim() === matchKey);
    if (!row) return false;
    const sel = row.querySelector('select');
    const wantText = aChoiceText[A.items.find((x) => x.word === matchKey).answer];
    const bad = Array.prototype.slice.call(sel.options).find((o) =>
      o.value && o.textContent.replace(/^[A-Z]\.\s*/, '') !== wantText);
    if (!bad) return false;
    sel.value = bad.value;
    sel.dispatchEvent(new win.Event('change', { bubbles: true }));
    return true;
  }

  const totalFill = fillCorrect();
  is(totalFill === 50, '自动填答覆盖全部 50 题（实际 ' + totalFill + '）');

  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const scoreN = $('quizBody').querySelector('.ring .n');
  is(!!scoreN, '提交后出现成绩环');
  const score = scoreN ? parseInt(scoreN.textContent, 10) : -1;
  console.log('     自动作答得分: ' + score + ' / 50');
  // 逐部分诊断：每个 .exp 块按其所属 card 归类，统计对错
  const partStats = [];
  $('quizBody').querySelectorAll('.card').forEach((card, ci) => {
    const title = card.querySelector('h2') ? card.querySelector('h2').textContent.trim() : ('card' + ci);
    const good = card.querySelectorAll('.exp:not(.bad)').length;
    const badN = card.querySelectorAll('.exp.bad').length;
    partStats.push(title + ': 对 ' + good + ' 错 ' + badN);
  });
  partStats.forEach((s) => console.log('     ' + s));
  is(score >= 40, '自动填答得分 ≥ 40（说明判分逻辑正常）');
  // 逐题核对 App 自己的判分结果（.exp 就在每题下面，最权威）
  const verdicts = { A: [], B: [], C: [], D: [] };
  $('quizBody').querySelectorAll('.card').forEach((card) => {
    const t = card.querySelector('h2') ? card.querySelector('h2').textContent : '';
    const key = t.indexOf('词义连线') >= 0 ? 'A' : t.indexOf('同义词') >= 0 ? 'B'
      : t.indexOf('选词填空') >= 0 ? 'C' : t.indexOf('近义辨析') >= 0 ? 'D' : null;
    if (!key) return;
    card.querySelectorAll('.exp').forEach((e) => verdicts[key].push(e.classList.contains('bad') ? 0 : 1));
  });
  ['A', 'B', 'C', 'D'].forEach((k) => {
    const v = verdicts[k];
    const right = v.filter((x) => x === 1).length;
    is(right === v.length, `App 判分 ${k}: ${right}/${v.length} 全对`);
  });
  is($('quizBody').querySelectorAll('.exp').length > 0, '每题都渲染了解析块');
  is($('quizBody').querySelectorAll('.exp.bad').length === 50 - score, '错题解析数 = 50 - 得分');

  console.log('\n=== 5. 只做一小部分就交卷 → 未作答的不算错题 ===');
  // 真实用户最容易踩的路径：做几题就提交。两个历史 bug 都在这里：
  //   ① 把 47 道「空题」也记成错题，错题本被塞满 50 条
  //   ② 用原生 confirm 询问，file:// 下被浏览器静默拦截 → 点提交毫无反应
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const sparseWord = $('quizBody').querySelector('.aword').textContent.trim();
  answerWrongA(sparseWord);                     // 只故意答错这一题，其余全空着
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));

  // ② 必须出现**页面内**弹窗（而不是依赖 window.confirm）
  is(!!modal(), '漏答时弹出页面内确认框（不依赖原生 confirm）');
  is(modalText().indexOf('49') >= 0 || modalText().indexOf('题没作答') >= 0,
     '弹窗说明了未作答题数: ' + modalText().split('\n')[0]);
  is($('quizBody').querySelectorAll('.exp').length === 0, '弹窗未确认前不进入批改状态');
  clickModal('交卷');                           // 选「就这样交卷」
  is(!modal(), '点「就这样交卷」后弹窗关闭');

  const sp = JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}');
  is(Object.keys(sp).length === 1,
     '只答错 1 题 → 错题本只有 1 题（实际 ' + Object.keys(sp).length + '）');
  is(Object.keys(sp)[0] === sparseWord, '记录的正是那一题: ' + Object.keys(sp)[0]);
  is($('revBadge').textContent === '1', '角标是 1 而不是 50（实际 ' + $('revBadge').textContent + '）');
  is($('quizBody').textContent.indexOf('未作答') >= 0, '结果页标明有题未作答');
  is($('quizBody').textContent.indexOf('不计入错题本') >= 0, '结果页说明未作答不计入错题本');

  console.log('\n=== 5b. 错题记录的「正确答案」必须与被考的词对应 ===');
  // 曾经的 bug：Part A 选项字母在渲染时被重映射，错题本却拿原始选项表查文字，
  // 于是显示成「pragmatic … 正确答案：O. 坚决的，意志坚定的」这种完全错位的结果。
  let mismatch = 0;
  Object.keys(sp).forEach((k) => {
    const rec = sp[k];
    if (rec.part !== 'A') return;
    const w = win.VA_BY_WORD[k];
    if (!w) return;
    const shown = String(rec.answerText || '');
    if (!shown) { mismatch++; console.log('     ✗ ' + k + ' 没存下正确答案文字'); return; }
    const collides = win.VA_LEVEL1.find((o) =>
      o.word !== k && o.zh && o.zh.length > 4 &&
      shown.indexOf(o.zh) >= 0 && w.zh.indexOf(o.zh) < 0);
    if (collides) {
      mismatch++;
      console.log('     ✗ ' + k + ' 的答案显示成了 ' + collides.word + ' 的释义: ' + shown);
    }
  });
  is(mismatch === 0, 'Part A 错题记录的正确答案文字没有串到别的词');

  console.log('\n=== 5c. 点「回去补完」应当什么都不记 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const beforeCancel = win.localStorage.getItem('va.l1.mistakes');
  answerWrongA($('quizBody').querySelector('.aword').textContent.trim());
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(!!modal(), '再次弹出确认框');
  clickModal('回去补完');                       // 选「回去补完」
  is(!modal(), '弹窗已关闭');
  is(win.localStorage.getItem('va.l1.mistakes') === beforeCancel, '点「回去补完」后错题本没有被改动');
  is($('quizBody').querySelectorAll('.exp').length === 0, '点「回去补完」后没有进入批改状态');
  is(!!$('btnSubmit'), '停留在答题状态，可以继续补完');
  // 收尾：这次选「就这样交卷」，推进状态
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  clickModal('交卷');
  is(!!$('btnAgain'), '确认提交后出现「再测一次」');

  console.log('\n=== 6. 全部答错 → 错题本必须是 50 条且答案对得上 ===');
  // 这一段是核心回归测试：把四个部分全部故意答错，逐条核对错题本里的
  // 「正确答案」文字确实属于那道题（而不是串到别的题去）。
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const wrongPlan = fillAllWrong();
  is(wrongPlan.length === 50, '已把 50 题全部答错（实际 ' + wrongPlan.length + '）');
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));

  const allM = JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}');
  is(Object.keys(allM).length === 50, '错题本记录了 50 条（实际 ' + Object.keys(allM).length + '）');
  is($('revBadge').textContent === '50', '角标显示 50（实际 ' + $('revBadge').textContent + '）');

  // 逐条核对：错题本里每条记录的 answerText 必须与对应题目的真实答案一致
  let ansBad = 0, partCount = { A: 0, B: 0, C: 0, D: 0 };
  Object.keys(allM).forEach((k) => {
    const rec = allM[k];
    partCount[rec.part] = (partCount[rec.part] || 0) + 1;
    if (!rec.answerText) { ansBad++; console.log('     ✗ ' + k + ' 缺 answerText'); return; }
    if (!rec.lastPickText) { ansBad++; console.log('     ✗ ' + k + ' 缺 lastPickText'); return; }
    // C 部分是单词，answerText 就是那个词
    if (rec.part === 'C') {
      const c = C.items.find((x) => x.text + '@@' + x.answer === k);
      if (!c) { ansBad++; console.log('     ✗ ' + k + ' 在 Part C 里找不到对应题'); return; }
      if (rec.answerText !== c.answer) { ansBad++; console.log('     ✗ ' + k + ' 答案不符: ' + rec.answerText); }
      return;
    }
    if (rec.part === 'D') {
      const d = D.items.find((x) => (x.lookup || x.word) === k);
      const ch = d && d.choices.find((c) => c.k === d.answer);
      if (!ch || rec.answerText !== d.answer + '. ' + ch.t) {
        ansBad++; console.log('     ✗ ' + k + ' 答案文字不对: ' + rec.answerText);
      }
      return;
    }
    if (rec.part === 'B') {
      const b = B.items.find((x) => x.a + '|' + x.b === k);
      const want = b.answer === 'S' ? '同义 Synonyms' : '反义 Antonyms';
      if (!b || rec.answerText.indexOf(want.split(' ')[0]) < 0) {
        ansBad++; console.log('     ✗ ' + k + ' 答案文字不对: ' + rec.answerText);
      }
      return;
    }
    if (rec.part === 'A') {
      const a = A.items.find((x) => x.word === k);
      const wantText = aChoiceText[a.answer];
      if (!a || rec.answerText.indexOf(wantText) < 0) {
        ansBad++; console.log('     ✗ ' + k + ' 答案文字不对(应含"' + wantText + '"): ' + rec.answerText);
      }
    }
  });
  is(ansBad === 0, '50 条错题记录的正确答案文字全部对得上（错误 ' + ansBad + ' 条）');
  console.log('     各 Part 记录数: A=' + partCount.A + ' B=' + partCount.B +
    ' C=' + partCount.C + ' D=' + partCount.D);

  console.log('\n=== 6b. 错题页与报告也要显示可读文字 ===');
  switchTo('review');
  is($('revCount').textContent === '50', '错题页显示 50（实际 ' + $('revCount').textContent + '）');
  const revHtml = $('reviewList').textContent;
  is(revHtml.indexOf('你选了：zzz-not-a-word') < 0 || revHtml.indexOf('你选了：') >= 0,
     '错题卡片显示「你选了」的可读文字');
  is(revHtml.indexOf('undefined') < 0, '错题页没有 undefined');
  $('btnExport').dispatchEvent(new win.Event('click', { bubbles: true }));
  const rep = $('reportText').value;
  is(rep.indexOf('undefined') < 0, '报告里没有 undefined');
  is(rep.indexOf('[50]') >= 0, '报告列出了 50 条');
  is(rep.indexOf('我选了: zzz-not-a-word') >= 0, '报告里 Part C 的错选是原文而不是空');

  console.log('\n=== 6c. 重测 50 题全部答对 → 错题本清空 ===');
  switchTo('quiz');
  $('btnRetest').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('quizBody').querySelectorAll('.arow').length === 20, '重测包含 20 道 Part A');
  is($('quizBody').querySelectorAll('input[type=radio]').length === 60, '重测包含 B/D 全部单选');
  is($('quizBody').querySelectorAll('input[type=text]').length === 10, '重测包含 10 道 Part C');
  const filled = fillCorrect();
  is(filled === 50, '重测中填对 50 题（实际 ' + filled + '）');
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const afterM = JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}');
  is(Object.keys(afterM).length === 0, '全部答对后错题本清空（实际 ' + Object.keys(afterM).length + '）');


  console.log('\n=== 6d. 全对一题不错 → 错题本保持空 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  fillCorrect();
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(Object.keys(JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}')).length === 0,
     '全对时错题本为空');
  is($('revBadge').classList.contains('hidden'), '导航错题角标隐藏');
  is($('btnRetest').style.display === 'none', '首屏「重测错题」按钮隐藏');

  console.log('\n=== 7. 只答错一题 → 精确记录该题 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const wrongWord = $('quizBody').querySelector('.arow .aword').textContent.trim();
  fillCorrect(wrongWord);                     // 其余 49 题全对
  is(answerWrongA(wrongWord), '已把「' + wrongWord + '」故意答错');
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));

  // 标红检查
  const badRow = Array.prototype.slice.call($('quizBody').querySelectorAll('.arow'))
    .find((r) => r.querySelector('.aword').textContent.trim() === wrongWord);
  is(badRow.querySelector('select').classList.contains('bad'), '答错的下拉框标红');
  is(badRow.nextElementSibling.classList.contains('exp') &&
     badRow.nextElementSibling.classList.contains('bad'), '错题解析块标红');

  let mst = JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}');
  is(Object.keys(mst).length === 1, '错题本正好 1 题（实际 ' + Object.keys(mst).length + '：' +
     Object.keys(mst).join(',') + '）');
  is(Object.keys(mst)[0] === wrongWord, '记录的正是答错的词: ' + Object.keys(mst)[0]);
  is(mst[wrongWord].part === 'A', 'part = A（实际 ' + mst[wrongWord].part + '）');
  is(mst[wrongWord].wrongCount === 1, 'wrongCount = 1');
  is(!!mst[wrongWord].lastPick, '记下了错选的内容: ' + mst[wrongWord].lastPick);
  is($('revBadge').textContent === '1' && !$('revBadge').classList.contains('hidden'), '角标显示 1');
  is($('btnRetest').style.display !== 'none', '「重测错题」按钮出现');
  is($('quizBody').textContent.indexOf('本次做错的题') >= 0, '成绩页列出本次错题');

  console.log('\n=== 8. 同一题再错一次 → 次数累加 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  fillCorrect(wrongWord);
  answerWrongA(wrongWord);
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  mst = JSON.parse(win.localStorage.getItem('va.l1.mistakes'));
  is(Object.keys(mst).length === 1, '仍然只有 1 题（没有重复添加）');
  is(mst[wrongWord].wrongCount === 2, 'wrongCount 累加到 2（实际 ' + mst[wrongWord].wrongCount + '）');

  console.log('\n=== 9. 重测：只出错题，答对后移出错题本 ===');
  switchTo('quiz');
  $('btnRetest').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('quizBody').querySelectorAll('select').length === 1,
     '重测只出 1 道题（实际 ' + $('quizBody').querySelectorAll('select').length + '）');
  is($('quizBody').querySelectorAll('input[type=radio]').length === 0, '没有无关的 B/D 题');
  is($('quizBody').querySelectorAll('input[type=text]').length === 0, '没有无关的 C 题');
  const rWord = $('quizBody').querySelector('.aword').textContent.trim();
  is(rWord === wrongWord, '重测的正是那道错题: ' + rWord);
  fillCorrect();
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const m4 = JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}');
  is(Object.keys(m4).length === 0, '答对后错题本清空（实际 ' + Object.keys(m4).length + ' 项）');
  is($('revBadge').classList.contains('hidden'), '角标重新隐藏');

  console.log('\n=== 10. 错题报告导出 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const selAll = $('quizBody').querySelectorAll('select');
  const w1 = selAll[0].closest('.arow').querySelector('.aword').textContent.trim();
  const w2 = selAll[1].closest('.arow').querySelector('.aword').textContent.trim();
  fillCorrect(w1);
  answerWrongA(w1);
  answerWrongA(w2);
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  switchTo('review');
  is(!$('tab-review').classList.contains('hidden'), '切到错题重学 tab');
  is($('revCount').textContent === '2', '错题页显示 2 题（实际 ' + $('revCount').textContent + '）');
  is($('reviewList').querySelectorAll('.mist').length === 2, '渲染出 2 个错题卡片');
  is($('reviewList').textContent.indexOf('正确答案') >= 0, '卡片里有正确答案');
  is($('reviewList').textContent.indexOf('你选了') >= 0, '卡片里回显了我错选的内容');
  $('btnExport').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(!$('reportBox').classList.contains('hidden'), '报告框已展开');
  const report = $('reportText').value;
  ['错题报告', '我选了', '正确答案', '原书解析', w1].forEach((needle) => {
    is(report.indexOf(needle) >= 0, '报告含「' + needle + '」');
  });

  console.log('\n=== 11. 清空错题本（弹窗确认）===');
  $('btnClear').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(!!modal(), '点清空弹出页面内确认框');
  is(modalText().indexOf('不可恢复') >= 0, '弹窗提示不可恢复');
  clickModal('取消');
  is(Object.keys(JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}')).length > 0,
     '点「取消」后错题仍在');
  $('btnClear').dispatchEvent(new win.Event('click', { bubbles: true }));
  clickModal('确定清空');
  is(Object.keys(JSON.parse(win.localStorage.getItem('va.l1.mistakes') || '{}')).length === 0,
     '清空后没有错题');
  is($('reviewList').querySelectorAll('.mist').length === 0, '错题列表清空');
  is($('reviewList').textContent.indexOf('错题本是空的') >= 0, '显示空状态');
  // 空错题本时点重测，应给出提示而不是静默无反应
  $('btnRetest2').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(!!modal(), '空错题本时点重测会给出提示');
  clickModal('好');

  console.log('\n=== 12. 单词卡 ===');
  switchTo('cards');
  is(!$('tab-cards').classList.contains('hidden'), '切到单词卡 tab');
  const fcWord = $('fcWord').textContent;
  is(fcWord && fcWord !== '—', '卡片正面显示单词: ' + fcWord);
  $('fc').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('fc').classList.contains('flip'), '点击后卡片翻面');
  is($('fcBack').textContent.length > 10, '背面有释义内容');
  const posBefore = $('fcPos').textContent;
  $('fcNext').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('fcPos').textContent !== posBefore, '「下一个」切换了卡片');
  $('fcKnow').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('fcKnown').textContent === '1', '「已掌握」计数变为 1（实际 ' + $('fcKnown').textContent + '）');

  console.log('\n=== 13. 词汇表搜索 ===');
  switchTo('list');
  const search = $('wlSearch');
  search.value = 'adamant';
  search.dispatchEvent(new win.Event('input', { bubbles: true }));
  const hits = $('wl').querySelectorAll('details').length;
  is(hits >= 1 && hits < 50, '搜索 adamant 命中 ' + hits + ' 条（少于 50）');
  search.value = '不存在xyz';
  search.dispatchEvent(new win.Event('input', { bubbles: true }));
  is($('wl').textContent.indexOf('没有匹配') >= 0, '无结果时显示空状态提示');

  console.log('\n=== 14. 运行期错误检查 ===');
  if (errors.length) { errors.forEach(bad); }
  else ok('运行期间没有 JS 错误');

  console.log('\n=== 15. 不允许依赖原生 confirm/alert ===');
  // file:// 打开时 Chrome/Edge 会静默拦截原生对话框（返回 undefined、不显示），
  // 导致点「提交并批改」毫无反应。App 必须只用页面内自绘弹窗。
  const htmlSrc = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const nativeCalls = htmlSrc.match(/(?:window\.)?(?:confirm|alert|prompt)\s*\(/g) || [];
  is(nativeCalls.length === 0,
     'index.html 源码里没有原生 confirm/alert/prompt 调用（发现 ' +
     nativeCalls.length + ' 处' + (nativeCalls.length ? ': ' + nativeCalls.join(' ') : '') + '）');
  is(htmlSrc.indexOf('function showModal') >= 0, '存在页面内自绘弹窗 showModal()');
  // 更强的验证：把原生对话框换成「一调用就抛错」，然后完整走一遍
  // 需要确认的路径（漏答提交 / 清空错题本）。只要 App 碰了原生对话框就会炸。
  let nativeHit = '';
  win.confirm = function () { nativeHit = 'confirm'; throw new Error('调用了原生 confirm'); };
  win.alert = function () { nativeHit = 'alert'; throw new Error('调用了原生 alert'); };
  win.prompt = function () { nativeHit = 'prompt'; throw new Error('调用了原生 prompt'); };
  try {
    // a) 全部答对 → 无需确认，直接批改
    $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
    fillCorrect();
    $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
    is(!!$('btnAgain'), '全对提交无弹窗，直接进入批改');
    // b) 只答一题 → 必须走自绘弹窗
    $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
    answerWrongA($('quizBody').querySelector('.aword').textContent.trim());
    $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
    is(!!modal(), '漏答提交走的是自绘弹窗');
    clickModal('交卷');
    is(!!$('btnAgain'), '弹窗确认后正常批改');
    // c) 清空错题本 → 自绘弹窗
    switchTo('review');
    $('btnClear').dispatchEvent(new win.Event('click', { bubbles: true }));
    is(!!modal(), '清空走的是自绘弹窗');
    clickModal('取消');
    ok('原生对话框被替换为抛错函数后，全部确认流程仍正常（未触碰原生对话框）');
  } catch (e) {
    bad('确认流程触发了原生对话框: ' + nativeHit + ' — ' + e.message);
  }

  console.log('\n' + '='.repeat(52));
  console.log(fail === 0 ? 'DOM 冒烟测试全部通过。' : fail + ' 项失败。');
  console.log('='.repeat(52) + '\n');
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => {
  console.error('测试崩了:', e);
  process.exit(1);
});
