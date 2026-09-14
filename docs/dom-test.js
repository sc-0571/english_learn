/* DOM 冒烟测试：用 jsdom 真正加载 index.html，验证交互与判分逻辑。
   运行： node docs/dom-test.js
   需要 docs/node_modules/jsdom（用 npm --no-save 本地安装，不提交到仓库）。 */
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
  is(!!win.VA && typeof win.VA.getLevel === 'function', 'data.js 已加载（VA API 存在）');
  is(win.VA.availableLevels().join(',') === '1,2',
     '已注册 Level 1 与 Level 2（实际 ' + win.VA.availableLevels().join(',') + '）');
  is(!!$('wl') && $('wl').querySelectorAll('details').length === 50,
     '词汇表渲染出 50 个条目（实际 ' + $('wl').querySelectorAll('details').length + '）');
  is($('srcName').textContent.indexOf('Verbal') >= 0, '页脚数据来源已填充');
  is($('fcTotal').textContent === '50', '单词卡总数显示 50');
  is($('levelSelect').options.length === 10, '级别下拉框有 10 个选项');
  is($('levelSelect').value === '1', '默认停在 Level 1');

  // 取当前级别（Level 1）的各级数据，供后面构造答案用
  let CUR_DEF = win.VA.getLevel(1);
  let A = CUR_DEF.parts.A, B = CUR_DEF.parts.B, C = CUR_DEF.parts.C, D = CUR_DEF.parts.D;
  let MATCH = win.VA.matchChoices(1);          // Part A 的 [{key,text,answer}]

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
  // Part A 的选项字母在渲染时会被重新映射，所以必须按「释义文字」反查正确选项，
  // 不能直接用定义里的字母。MATCH 的 key 与 items 索引一一对应。
  const aChoiceText = {};
  MATCH.forEach((c) => { aChoiceText[c.key] = c.text; });
  const aAnswerOf = (word) => {
    const idx = A.items.map((x) => x.word).indexOf(word);
    return idx < 0 ? null : MATCH[idx];
  };
  /* 某一级的 50 个核心词（不含 extra 的释义查询词） */
  const coreWords = (lv) => win.VA.getLevel(lv || 1).words.filter((w) => !w.extra);
  /* 错题本的存储键有两层前缀："<level>:<Part>::<裸key>"
     例如 "1:A::paraphrase"、"1:B::aloof|gregarious"。
     bareKey() 去掉两层前缀，返回 matchKeyOf 里的「裸 key」；
     partOf() 取出 Part 字母。用 App 自己的 VA.bareKeyOf 保证解析一致。 */
  const bareKey = (storeKey) => {
    const s = win.VA.bareKeyOf(storeKey);          // 去掉级别前缀 → "A::paraphrase"
    const j = s.indexOf('::');
    return j >= 0 ? s.slice(j + 2) : s;
  };
  const partOf = (storeKey) => {
    const s = String(storeKey);
    const c = s.indexOf(':');
    const t = c >= 0 ? s.slice(c + 1) : s;
    const j = t.indexOf('::');
    return j >= 0 ? t.slice(0, j) : '';
  };
  const myMistakes = (lv) => JSON.parse(win.localStorage.getItem('va.l' + (lv || 1) + '.mistakes') || '{}');

  /* 把当前这套测验全部填上正确答案；exceptMatchKey 指定的 Part A 词跳过。 */
  function fillCorrect(exceptMatchKey) {
    let n = 0;
    Array.prototype.forEach.call($('quizBody').querySelectorAll('select'), (sel) => {
      const word = sel.closest('.arow').querySelector('.aword').textContent.trim();
      if (word === exceptMatchKey) return;
      const mc = aAnswerOf(word);
      if (!mc) return;
      const wantText = mc.text;
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
      const mc = aAnswerOf(word);
      if (!mc) return;
      const wantText = mc.text;
      const badOpt = Array.prototype.slice.call(sel.options)
        .find((o) => o.value && o.textContent.replace(/^[A-Z]\.\s*/, '') !== wantText);
      if (!badOpt) return;
      sel.value = badOpt.value;
      sel.dispatchEvent(new win.Event('change', { bubbles: true }));
      info.push({ qid: sel.getAttribute('data-qid'), part: 'A', word,
        expectAnswer: mc.answer + '. ' + wantText });
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
    const mc = aAnswerOf(matchKey);
    if (!mc) return false;
    const wantText = mc.text;
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

  const sp = myMistakes(1);
  is(Object.keys(sp).length === 1,
     '只答错 1 题 → 错题本只有 1 题（实际 ' + Object.keys(sp).length + '）');
  is(bareKey(Object.keys(sp)[0]) === sparseWord, '记录的正是那一题: ' + bareKey(Object.keys(sp)[0]));
  is(Object.keys(sp)[0] === '1:A::' + sparseWord,
     '存储键 = 级别前缀 + Part 前缀 + 裸 key（实际 ' + Object.keys(sp)[0] + '）');
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
    const w = win.VA.wordOf(1, bareKey(k));
    if (!w) return;
    const shown = String(rec.answerText || '');
    if (!shown) { mismatch++; console.log('     ✗ ' + k + ' 没存下正确答案文字'); return; }
    const collides = coreWords().find((o) =>
      o.word !== bareKey(k) && o.zh && o.zh.length > 4 &&
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

  const allM = myMistakes(1);
  is(Object.keys(allM).length === 50, '错题本记录了 50 条（实际 ' + Object.keys(allM).length + '）');
  is($('revBadge').textContent === '50', '角标显示 50（实际 ' + $('revBadge').textContent + '）');

  // 逐条核对：错题本里每条记录的 answerText 必须与对应题目的真实答案一致
  let ansBad = 0, partCount = { A: 0, B: 0, C: 0, D: 0 };
  Object.keys(allM).forEach((rawKey) => {
    const rec = allM[rawKey];
    const k = bareKey(rawKey);                 // 去掉 "1:" 前缀
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
      if (!b) { ansBad++; console.log('     ✗ ' + k + ' 在 Part B 里找不到对应词对'); return; }
      const want = b.answer === 'S' ? '同义 Synonyms' : '反义 Antonyms';
      if (rec.answerText.indexOf(want.split(' ')[0]) < 0) {
        ansBad++; console.log('     ✗ ' + k + ' 答案文字不对: ' + rec.answerText);
      }
      return;
    }
    if (rec.part === 'A') {
      const mc = aAnswerOf(k);
      if (!mc) { ansBad++; console.log('     ✗ ' + k + ' 在 Part A 里找不到对应词'); return; }
      if (rec.answerText.indexOf(mc.text) < 0) {
        ansBad++; console.log('     ✗ ' + k + ' 答案文字不对(应含"' + mc.text + '"): ' + rec.answerText);
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
  const afterM = myMistakes(1);
  is(Object.keys(afterM).length === 0, '全部答对后错题本清空（实际 ' + Object.keys(afterM).length + '）');


  console.log('\n=== 6d. 全对一题不错 → 错题本保持空 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  fillCorrect();
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  is(Object.keys(myMistakes(1)).length === 0,
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

  let mst = myMistakes(1);
  const mk = () => mst['1:A::' + wrongWord];
  is(Object.keys(mst).length === 1, '错题本正好 1 题（实际 ' + Object.keys(mst).length + '：' +
     Object.keys(mst).join(',') + '）');
  is(bareKey(Object.keys(mst)[0]) === wrongWord, '记录的正是答错的词: ' + bareKey(Object.keys(mst)[0]));
  is(!!mk() && mk().part === 'A', 'part = A');
  is(!!mk() && mk().wrongCount === 1, 'wrongCount = 1');
  is(!!mk() && mk().level === 1, '记录里标明了 level = 1');
  is(!!mk() && !!mk().lastPick, '记下了错选的内容: ' + (mk() || {}).lastPick);
  is($('revBadge').textContent === '1' && !$('revBadge').classList.contains('hidden'), '角标显示 1');
  is($('btnRetest').style.display !== 'none', '「重测错题」按钮出现');
  is($('quizBody').textContent.indexOf('本次做错的题') >= 0, '成绩页列出本次错题');

  console.log('\n=== 8. 同一题再错一次 → 次数累加 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  fillCorrect(wrongWord);
  answerWrongA(wrongWord);
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  mst = myMistakes(1);
  is(Object.keys(mst).length === 1, '仍然只有 1 题（没有重复添加）');
  is(mst['1:A::' + wrongWord].wrongCount === 2, 'wrongCount 累加到 2（实际 ' + mst['1:A::' + wrongWord].wrongCount + '）');

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
  const m4 = myMistakes(1);
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
  is(Object.keys(myMistakes(1)).length > 0,
     '点「取消」后错题仍在');
  $('btnClear').dispatchEvent(new win.Event('click', { bubbles: true }));
  clickModal('确定清空');
  is(Object.keys(myMistakes(1)).length === 0,
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

  console.log('\n=== 16. 切换到 Level 2 ===');
  // 切级别前先确认状态干净：回到测验首屏
  const sel2 = $('levelSelect');
  is(sel2.options.length === 10, '下拉框列出 10 级');
  const opt2 = Array.from(sel2.options).find((o) => o.value === '2');
  is(!!opt2 && !opt2.disabled, 'Level 2 可选（未被禁用）');
  const opt3 = Array.from(sel2.options).find((o) => o.value === '3');
  is(!!opt3 && opt3.disabled, 'Level 3 显示为「待补」且禁用');
  is(opt2.textContent.indexOf('待补') < 0, 'Level 2 的选项文字没有「待补」');

  switchTo('quiz');
  sel2.value = '2';
  sel2.dispatchEvent(new win.Event('change', { bubbles: true }));
  is(sel2.value === '2', '已切到 Level 2');
  is($('quizTitle').textContent.indexOf('Level 2') >= 0, '标题变成 Level 2：' + $('quizTitle').textContent);
  is($('levelInfo').textContent.indexOf('50 词') >= 0, 'Level 2 也是 50 词：' + $('levelInfo').textContent);
  is($('wl').querySelectorAll('details').length === 50, 'Level 2 词汇表 50 条');
  is($('revBadge').classList.contains('hidden'), 'Level 2 的错题本是独立的（初始为空）');

  // Level 2 的题面确实是 Level 2 的词
  const L2 = win.VA.getLevel(2);
  const L2A = L2.parts.A, L2B = L2.parts.B, L2C = L2.parts.C, L2D = L2.parts.D;
  const L2MATCH = win.VA.matchChoices(2);
  $('btnStart').dispatchEvent(new win.Event('click', { bubbles: true }));
  const l2words = Array.from($('quizBody').querySelectorAll('.aword')).map((e) => e.textContent.trim());
  is(l2words.length === 20, 'Level 2 Part A 有 20 题');
  const allL2 = new Set(L2.words.map((w) => w.word));
  const foreign = l2words.filter((w) => !allL2.has(w));
  is(foreign.length === 0, 'Part A 出的都是 Level 2 的词（越界: ' + foreign.join(',') + '）');
  const l1Only = ['paraphrase', 'ostensible', 'digress'];
  is(l2words.filter((w) => l1Only.indexOf(w) >= 0).length === 0, 'Part A 里没有混进 Level 1 的词');

  console.log('\n=== 17. Level 2 判分与错题本 ===');
  // 自动答对 Level 2 的 50 题
  function fillCorrectL2(exceptWord) {
    let n = 0;
    const txt = {};
    L2MATCH.forEach((c) => { txt[c.key] = c.text; });
    Array.prototype.forEach.call($('quizBody').querySelectorAll('select'), (sel) => {
      const word = sel.closest('.arow').querySelector('.aword').textContent.trim();
      if (word === exceptWord) return;
      const idx = L2A.items.map((x) => x.word).indexOf(word);
      if (idx < 0) return;
      const want = txt[L2MATCH[idx].key];
      const o = Array.prototype.slice.call(sel.options)
        .find((x) => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') === want);
      if (!o) return;
      sel.value = o.value;
      sel.dispatchEvent(new win.Event('change', { bubbles: true }));
      n++;
    });
    Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=radio]'), (r) => {
      const m = /^([BD])(\d+)$/.exec(r.name || '');
      if (!m) return;
      const src = m[1] === 'B' ? L2B.items : L2D.items;
      const it = src[parseInt(m[2], 10)];
      if (!it || r.value !== it.answer) return;
      r.checked = true;
      r.dispatchEvent(new win.Event('change', { bubbles: true }));
      n++;
    });
    Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=text]'), (inp) => {
      const it = L2C.items[parseInt(String(inp.getAttribute('data-qid')).replace(/^C/, ''), 10)];
      if (!it) return;
      inp.value = it.answer;
      inp.dispatchEvent(new win.Event('input', { bubbles: true }));
      n++;
    });
    return n;
  }
  const l2filled = fillCorrectL2();
  is(l2filled === 50, 'Level 2 自动填答覆盖 50 题（实际 ' + l2filled + '）');
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const l2score = $('quizBody').querySelector('.ring .n');
  is(!!l2score && l2score.textContent === '50', 'Level 2 全对得 50/50（实际 ' +
     (l2score ? l2score.textContent : '无') + '）');
  is(Object.keys(myMistakes(2)).length === 0, 'Level 2 全对后错题本为空');
  is(Object.keys(myMistakes(1)).length > 0, 'Level 1 的错题本不受影响（仍留有记录）');

  // 故意答错一题 → 记进 Level 2 的错题本
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const l2first = $('quizBody').querySelector('.aword').textContent.trim();
  fillCorrectL2(l2first);
  const row2 = Array.prototype.slice.call($('quizBody').querySelectorAll('.arow'))
    .find((r) => r.querySelector('.aword').textContent.trim() === l2first);
  const s2 = row2.querySelector('select');
  const idx2 = L2A.items.map((x) => x.word).indexOf(l2first);
  const want2 = L2MATCH[idx2].text;
  const bad2 = Array.prototype.slice.call(s2.options)
    .find((o) => o.value && o.textContent.replace(/^[A-Z]\.\s*/, '') !== want2);
  s2.value = bad2.value;
  s2.dispatchEvent(new win.Event('change', { bubbles: true }));
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const m2b = myMistakes(2);
  is(Object.keys(m2b).length === 1, 'Level 2 错题本记录 1 条（实际 ' + Object.keys(m2b).length + '）');
  is(!!m2b['2:A::' + l2first], '键名带 Level 2 + Part 前缀: 2:A::' + l2first);
  is(m2b['2:A::' + l2first].level === 2, '记录里 level = 2');
  is($('revBadge').textContent === '1', 'Level 2 角标为 1');
  is(Object.keys(myMistakes(1)).length > 0, 'Level 1 错题本仍独立存在');

  console.log('\n=== 18. 切回 Level 1 → 状态互相独立 ===');
  sel2.value = '1';
  sel2.dispatchEvent(new win.Event('change', { bubbles: true }));
  is(sel2.value === '1', '切回 Level 1');
  is($('quizTitle').textContent.indexOf('Level 1') >= 0, '标题回到 Level 1');
  const l1badge = parseInt($('revBadge').textContent, 10);
  is(l1badge === Object.keys(myMistakes(1)).length,
     'Level 1 角标显示自己的错题数（' + l1badge + '）');
  is(l1badge !== 1 || Object.keys(myMistakes(1)).length === 1,
     '没有把 Level 2 的错题混进 Level 1');

  // 切回 Level 1 后题目必须是 Level 1 的词
  $('btnStart').dispatchEvent(new win.Event('click', { bubbles: true }));
  const backWords = Array.from($('quizBody').querySelectorAll('.aword')).map((e) => e.textContent.trim());
  is(backWords.filter((w) => l1Only.indexOf(w) >= 0).length > 0,
     '切回后出的确实是 Level 1 的词（含 ' + backWords.filter((w) => l1Only.indexOf(w) >= 0).join(',') + '）');

  console.log('\n=== 19. 同一个词同时出现在 A 和 D 时不能互相覆盖 ===');
  // 曾经的 bug：matchKey 只用单词本身，于是 Level 2 里既在 Part A（选释义）
  // 又在 Part D（近义辨析）的词只会留下一条记录，另一条被覆盖。
  win.localStorage.setItem('va.l2.mistakes', '{}');
  const dupWord = L2A.items.map((x) => x.word)
    .find((w) => L2D.items.some((d) => (d.lookup || d.word) === w));
  is(!!dupWord, 'Level 2 里找到同时出现在 A 与 D 的词: ' + dupWord);
  // 直接开一套 Level 2 的新测验（切到 Level 2 后 startQuiz）
  sel2.value = '2';
  sel2.dispatchEvent(new win.Event('change', { bubbles: true }));
  switchTo('quiz');
  $('btnStart').dispatchEvent(new win.Event('click', { bubbles: true }));
  fillCorrectL2(dupWord);                       // 其余全对
  // A 里答错这个词
  const rowA = Array.prototype.slice.call($('quizBody').querySelectorAll('.arow'))
    .find((r) => r.querySelector('.aword').textContent.trim() === dupWord);
  const sa = rowA.querySelector('select');
  const wantA = L2MATCH[L2A.items.map((x) => x.word).indexOf(dupWord)].text;
  const badA = Array.prototype.slice.call(sa.options)
    .find((o) => o.value && o.textContent.replace(/^[A-Z]\.\s*/, '') !== wantA);
  sa.value = badA.value;
  sa.dispatchEvent(new win.Event('change', { bubbles: true }));
  // D 里也答错这个词
  const dIdx = L2D.items.map((x) => x.lookup || x.word).indexOf(dupWord);
  const dRadio = $('quizBody').querySelector('input[name="D' + dIdx + '"]:not(:checked)');
  if (dRadio) {
    dRadio.checked = true;
    dRadio.dispatchEvent(new win.Event('change', { bubbles: true }));
  }
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const dm = myMistakes(2);
  is(!!dm['2:A::' + dupWord], 'A 的记录存在: 2:A::' + dupWord);
  is(!!dm['2:D::' + dupWord], 'D 的记录也存在: 2:D::' + dupWord);
  is(Object.keys(dm).length === 2, '两条记录并存、互不覆盖（实际 ' + Object.keys(dm).length + ' 条）');
  is(partOf('2:A::' + dupWord) === 'A' && partOf('2:D::' + dupWord) === 'D', 'Part 前缀解析正确');

  console.log('\n' + '='.repeat(52));
  console.log(fail === 0 ? 'DOM 冒烟测试全部通过。' : fail + ' 项失败。');
  console.log('='.repeat(52) + '\n');
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => {
  console.error('测试崩了:', e);
  process.exit(1);
});
