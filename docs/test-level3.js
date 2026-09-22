/* 针对 Level 3（多连线段）的端到端测试 */
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const { pathToFileURL } = require('url');
const dir = __dirname;

let fail = 0;
const ok = m => console.log('  \u2713 ' + m);
const bad = m => { fail++; console.log('  \u2717 ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);

(async () => {
  const errors = [];
  const dom = new JSDOM(fs.readFileSync(path.join(dir, 'index.html'), 'utf8'), {
    runScripts: 'dangerously', resources: 'usable',
    url: pathToFileURL(path.join(dir, 'index.html')).href, pretendToBeVisual: true,
    beforeParse(win) {
      const s = {};
      Object.defineProperty(win, 'localStorage', {
        value: { getItem: k => (k in s ? s[k] : null), setItem: (k, v) => { s[k] = String(v); }, removeItem: k => { delete s[k]; } },
        configurable: true
      });
      win.scrollTo = () => {};
      win.addEventListener('error', e => errors.push(e.message || e.error));
    }
  });
  const win = dom.window, doc = win.document, $ = id => doc.getElementById(id);
  await new Promise(r => { if (doc.readyState === 'complete') return r(); win.addEventListener('load', r); setTimeout(r, 5000); });

  console.log('=== 级别注册 ===');
  is(win.VA.availableLevels().join(',') === '1,2,3', '已注册 ' + win.VA.availableLevels().join(','));

  const sel = $('levelSelect');
  sel.value = '3';
  sel.dispatchEvent(new win.Event('change', { bubbles: true }));
  console.log('\n=== 切到 Level 3 ===');
  is($('quizTitle').textContent.indexOf('Level 3') >= 0, '标题: ' + $('quizTitle').textContent);
  is($('levelInfo').textContent.indexOf('87') >= 0, '题数信息: ' + $('levelInfo').textContent);
  is($('wl').querySelectorAll('details').length === 50, '词汇表 50 条');

  const L3 = win.VA.getLevel(3);
  const parts = win.VA.partsOf(3);
  const matchParts = parts.filter(p => p.type === 'match');
  is(matchParts.length === 3, '有 3 个词义连线段（实际 ' + matchParts.length + '）');

  $('btnStart').dispatchEvent(new win.Event('click', { bubbles: true }));
  console.log('\n=== 渲染 ===');
  is($('quizBody').querySelectorAll('.card').length === 6, '渲染 6 个部分（实际 ' +
     $('quizBody').querySelectorAll('.card').length + '）');
  const selCount = $('quizBody').querySelectorAll('select').length;
  is(selCount === 50, '50 个词义连线下拉框（实际 ' + selCount + '）');
  const radCount = $('quizBody').querySelectorAll('input[type=radio]').length;
  is(radCount === 15 * 2 + 10 * 4, '单选 ' + radCount + ' 个（B 15×2 + D 10×4）');
  const txtCount = $('quizBody').querySelectorAll('input[type=text]').length;
  is(txtCount === 12, '12 个选词填空（实际 ' + txtCount + '）');

  // 自动全答对
  // 注意：每个连线段各自用 A..T 编号，所以必须**分段**取正确释义，
  // 不能把三段的字母混在一起查。
  console.log('\n=== 全部答对 ===');
  let n = 0;
  // 按 DOM 里的顺序拿到「这一段渲染出来的选项表」（与 quiz.parts 对应）
  const cardChoices = Array.from($('quizBody').querySelectorAll('.card')).map(card => {
    const bank = card.querySelectorAll('.bank span');
    const map = {};
    Array.from(bank).forEach(s => {
      const t = s.textContent;
      const m = /^([A-Z])\.\s*(.*)$/.exec(t);
      if (m) map[m[1]] = m[2];
    });
    return map;
  });
  let cardIdx = -1;
  Array.prototype.forEach.call($('quizBody').querySelectorAll('.card'), card => {
    cardIdx++;
    const rows = card.querySelectorAll('.arow');
    if (!rows.length) return;
    const choiceMap = cardChoices[cardIdx];
    Array.prototype.forEach.call(rows, row => {
      const w = row.querySelector('.aword').textContent.trim();
      const s = row.querySelector('select');
      // 这一段里，正确释义就是该词的 zh
      const wDef = L3.byWord[w] && L3.byWord[w].zh;
      const o = Array.prototype.slice.call(s.options)
        .find(x => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') === wDef);
      if (!o) return;
      s.value = o.value;
      s.dispatchEvent(new win.Event('change', { bubbles: true }));
      n++;
    });
  });
  is(n === 50, '填对 50 个连线题（实际 ' + n + '）');
  // 单选
  const radioN = { v: 0 };
  Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=radio]'), r => {
    const pid = r.name.split('_')[0];
    const idx = parseInt(r.name.split('_')[1], 10);
    const def = L3.parts[pid];
    if (!def) return;
    const it = def.items[idx];
    if (!it || r.value !== it.answer) return;
    r.checked = true;
    r.dispatchEvent(new win.Event('change', { bubbles: true }));
    radioN.v++;
  });
  is(radioN.v === 15 + 10, '填对 ' + radioN.v + ' 个单选（B 15 + D 10）');
  // 填空
  Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=text]'), inp => {
    const pid = inp.getAttribute('data-qid').split('_')[0];
    const idx = parseInt(inp.getAttribute('data-qid').split('_')[1], 10);
    const it = L3.parts[pid] && L3.parts[pid].items[idx];
    if (!it) return;
    inp.value = it.answer;
    inp.dispatchEvent(new win.Event('input', { bubbles: true }));
    n++;
  });
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  if (doc.querySelector('.modal')) {
    const b = Array.from(doc.querySelectorAll('.modal .acts button')).find(x => x.textContent.includes('交卷'));
    if (b) b.dispatchEvent(new win.Event('click', { bubbles: true }));
  }
  const score = $('quizBody').querySelector('.ring .n');
  is(!!score && score.textContent === '87', 'Level 3 全对得 87/87（实际 ' + (score ? score.textContent : '无') + '）');
  is(Object.keys(JSON.parse(win.localStorage.getItem('va.l3.mistakes') || '{}')).length === 0,
     '全对后错题本为空');

  console.log('\n=== 故意错一题 → 错题本 ===');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const row0 = $('quizBody').querySelector('.arow');
  const w0 = row0.querySelector('.aword').textContent.trim();
  const s0 = row0.querySelector('select');
  const w0def = L3.byWord[w0].zh;
  const badOpt = Array.prototype.slice.call(s0.options)
    .find(x => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') !== w0def);
  s0.value = badOpt.value;
  s0.dispatchEvent(new win.Event('change', { bubbles: true }));
  // 其余全部答对
  Array.prototype.forEach.call($('quizBody').querySelectorAll('.arow'), row => {
    if (row === row0) return;
    const w = row.querySelector('.aword').textContent.trim();
    const s = row.querySelector('select');
    const o = Array.prototype.slice.call(s.options)
      .find(x => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') === L3.byWord[w].zh);
    if (o) { s.value = o.value; s.dispatchEvent(new win.Event('change', { bubbles: true })); }
  });
  Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=radio]'), r => {
    const pid = r.name.split('_')[0], idx = parseInt(r.name.split('_')[1], 10);
    const it = L3.parts[pid] && L3.parts[pid].items[idx];
    if (it && r.value === it.answer) { r.checked = true; r.dispatchEvent(new win.Event('change', { bubbles: true })); }
  });
  Array.prototype.forEach.call($('quizBody').querySelectorAll('input[type=text]'), inp => {
    const pid = inp.getAttribute('data-qid').split('_')[0], idx = parseInt(inp.getAttribute('data-qid').split('_')[1], 10);
    const it = L3.parts[pid] && L3.parts[pid].items[idx];
    if (it) { inp.value = it.answer; inp.dispatchEvent(new win.Event('input', { bubbles: true })); }
  });
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  if (doc.querySelector('.modal')) {
    const b = Array.from(doc.querySelectorAll('.modal .acts button')).find(x => x.textContent.includes('交卷'));
    if (b) b.dispatchEvent(new win.Event('click', { bubbles: true }));
  }
  const m3 = JSON.parse(win.localStorage.getItem('va.l3.mistakes') || '{}');
  const keys = Object.keys(m3);
  is(keys.length === 1, '错题本只记 1 条（实际 ' + keys.length + '）');
  is(/^3:A\d*::/.test(keys[0]), '键带级别与 Parts 前缀: ' + keys[0]);
  is(m3[keys[0]] && m3[keys[0]].answerText && m3[keys[0]].answerText.length > 2,
     '存下了可读的正确答案: ' + (m3[keys[0]] || {}).answerText);

  console.log('\n=== 错题页显示 ===');
  doc.querySelector('#tabs button[data-tab="review"]').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('revCount').textContent === '1', '错题页 1 条');
  is($('reviewList').textContent.indexOf('undefined') < 0, '错题页无 undefined');
  is($('reviewList').textContent.indexOf('词义连线') >= 0, '显示「词义连线」类型');

  console.log('\n=== 重测只出错题 ===');
  doc.querySelector('#tabs button[data-tab="quiz"]').dispatchEvent(new win.Event('click', { bubbles: true }));
  doc.querySelector('#tabs button[data-tab="review"]').dispatchEvent(new win.Event('click', { bubbles: true }));
  $('btnRetest2').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('quizBody').querySelectorAll('.arow').length === 1,
     '重测只出 1 道连线题（实际 ' + $('quizBody').querySelectorAll('.arow').length + '）');

  console.log('\n=== 运行期错误 ===');
  is(errors.length === 0, errors.length ? errors.join(' | ') : '无');

  console.log('\n' + '='.repeat(52));
  console.log(fail === 0 ? 'Level 3 测试全部通过。' : fail + ' 项失败。');
  console.log('='.repeat(52));
  process.exit(fail === 0 ? 0 : 1);
})().catch(e => { console.error('崩了:', e); process.exit(1); });
