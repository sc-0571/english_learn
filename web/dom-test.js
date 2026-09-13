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
  // Part A：下拉框顺序 = 打乱后的题面顺序，按单词匹配答案
  Array.prototype.forEach.call(selects, (sel) => {
    const word = sel.closest('.arow').querySelector('.aword').textContent.trim();
    const item = A.items.find((x) => x.word === word);
    sel.value = item.answer;
    sel.dispatchEvent(new win.Event('change', { bubbles: true }));
  });
  // Part B / D：单选框的 name 就是稳定的 qid（B0、B1… / D0、D1…），
  // 直接按索引对齐原题，不依赖任何文本匹配。
  let unmatchedQ = 0;
  const radioDbg = [];
  Array.prototype.forEach.call(radios, (radio) => {
    const name = radio.name || '';
    const m = /^([BD])(\d+)$/.exec(name);
    if (!m) return;
    const idx = parseInt(m[2], 10);
    const src = m[1] === 'B' ? B.items : D.items;
    const it = src[idx];
    if (!it) { unmatchedQ++; return; }
    if (radio.value !== it.answer) return;
    radio.checked = true;
    radio.dispatchEvent(new win.Event('change', { bubbles: true }));
    if (radioDbg.length < 4) radioDbg.push(name + ' set -> ' + JSON.stringify(radio.value) + ' (ans=' + it.answer + ') checked=' + radio.checked);
  });
  radioDbg.forEach((s) => console.log('     ' + s));
  // 统计每组单选是否都选上了，并核对选中的值是否就是正确答案
  let groupsMissing = 0, groupsWrong = 0;
  const wrongDetail = [];
  ['B', 'D'].forEach((p) => {
    const src = p === 'B' ? B.items : D.items;
    for (let i = 0; i < src.length; i++) {
      const el = $('quizBody').querySelector('input[name="' + p + i + '"]:checked');
      if (!el) { groupsMissing++; wrongDetail.push(p + i + ':未选'); continue; }
      if (el.value !== src[i].answer) {
        groupsWrong++;
        wrongDetail.push(p + i + ':' + el.value + '≠' + src[i].answer);
      }
    }
  });
  is(groupsMissing === 0, 'Part B/D 共 20 组单选全部选上（缺失 ' + groupsMissing + '）');
  is(groupsWrong === 0, 'Part B/D 选中的值都等于正确答案（错 ' + groupsWrong + '）');
  if (wrongDetail.length) console.log('     明细: ' + wrongDetail.slice(0, 20).join('  '));
  // 直接看 DOM 上单选按钮真实存在的 value
  console.log('     抽样 value: ' + Array.prototype.map.call(
    $('quizBody').querySelectorAll('input[type=radio]'), (r) => r.name + '=' + JSON.stringify(r.value)
  ).slice(0, 6).join(' '));

  // Part C：填空框的 data-qid 形如 C0..C9，与 data.js 中 Part C items 顺序一一对应
  let cFilled = 0;
  Array.prototype.forEach.call(texts, (inp) => {
    const qid = inp.getAttribute('data-qid') || '';
    const idx = parseInt(qid.replace(/^C/, ''), 10);
    const it = C.items[idx];
    if (!it) return;
    inp.value = it.answer;
    inp.dispatchEvent(new win.Event('input', { bubbles: true }));
    if (inp.value === it.answer) cFilled++;
  });
  is(cFilled === 10, 'Part C 10 个空全部填入正确答案（实际 ' + cFilled + '）');

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

  console.log('\n=== 5. 故意答错 → 判分与红绿标记 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const sel2 = $('quizBody').querySelectorAll('select')[0];
  const firstWord = sel2.closest('.arow').querySelector('.aword').textContent.trim();
  const rightAns = A.items.find((x) => x.word === firstWord).answer;
  const wrongOpt = Array.prototype.slice.call(sel2.options)
    .map((o) => o.value).find((v) => v && v !== rightAns);
  sel2.value = wrongOpt;
  sel2.dispatchEvent(new win.Event('change', { bubbles: true }));
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const selAfter = $('quizBody').querySelectorAll('select')[0];
  is(selAfter.classList.contains('bad'), '答错的下拉框标红 (class=bad)');
  const exp = selAfter.closest('.arow').nextElementSibling;
  is(exp && exp.classList.contains('exp') && exp.classList.contains('bad'), '错题解析块标红');

  console.log('\n=== 6. 单词卡 ===');
  doc.querySelector('#tabs button[data-tab="cards"]').dispatchEvent(new win.Event('click', { bubbles: true }));
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

  console.log('\n=== 7. 词汇表搜索 ===');
  doc.querySelector('#tabs button[data-tab="list"]').dispatchEvent(new win.Event('click', { bubbles: true }));
  const search = $('wlSearch');
  search.value = 'adamant';
  search.dispatchEvent(new win.Event('input', { bubbles: true }));
  const hits = $('wl').querySelectorAll('details').length;
  is(hits >= 1 && hits < 50, '搜索 adamant 命中 ' + hits + ' 条（少于 50）');
  search.value = '不存在xyz';
  search.dispatchEvent(new win.Event('input', { bubbles: true }));
  is($('wl').textContent.indexOf('没有匹配') >= 0, '无结果时显示空状态提示');

  console.log('\n=== 8. 运行期错误检查 ===');
  if (errors.length) { errors.forEach(bad); }
  else ok('运行期间没有 JS 错误');

  console.log('\n' + '='.repeat(52));
  console.log(fail === 0 ? 'DOM 冒烟测试全部通过。' : fail + ' 项失败。');
  console.log('='.repeat(52) + '\n');
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => {
  console.error('测试崩了:', e);
  process.exit(1);
});
