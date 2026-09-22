/* 多连线段级别（Level 3+）的端到端测试。
   用法： node docs/test-level3.js [level]
   不给 level 时，自动测所有「连线段合计 50 题」的已注册级别。 */
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const { pathToFileURL } = require('url');
const dir = __dirname;

let fail = 0;
const ok = m => console.log('  \u2713 ' + m);
const bad = m => { fail++; console.log('  \u2717 ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);

async function runLevel(dom, win, doc, $, LV, expectedTotal) {
  const sel = $('levelSelect');
  sel.value = String(LV);
  sel.dispatchEvent(new win.Event('change', { bubbles: true }));

  console.log('\n' + '#'.repeat(58));
  console.log('# Level ' + LV);
  console.log('#'.repeat(58));
  is($('quizTitle').textContent.indexOf('Level ' + LV) >= 0, '标题: ' + $('quizTitle').textContent);
  is($('levelInfo').textContent.indexOf(String(expectedTotal)) >= 0,
     '题数信息: ' + $('levelInfo').textContent);
  is($('wl').querySelectorAll('details').length === 50, '词汇表 50 条');

  const L = win.VA.getLevel(LV);
  const parts = win.VA.partsOf(LV);
  const matchParts = parts.filter(p => p.type === 'match');
  const matchTotal = matchParts.reduce((s, p) => s + p.items.length, 0);
  is(matchTotal === 50, '连线段合计 50 题（' +
     matchParts.map(p => p.id + '=' + p.items.length).join(' ') + '）');

  $('btnStart').dispatchEvent(new win.Event('click', { bubbles: true }));
  const cardN = $('quizBody').querySelectorAll('.card').length;
  is(cardN === parts.length, '渲染 ' + parts.length + ' 个部分（实际 ' + cardN + '）');
  const selN = $('quizBody').querySelectorAll('select').length;
  is(selN === 50, '50 个连线下拉框（实际 ' + selN + '）');
  const txtN = $('quizBody').querySelectorAll('input[type=text]').length;
  const bankN = parts.filter(p => p.type === 'bank').reduce((s, p) => s + p.items.length, 0);
  is(txtN === bankN, txtN + ' 个选词填空（实际 ' + txtN + '）');

  /* ---- 全部答对 ---- */
  console.log('\n--- 全部答对 ---');
  let n = 0;
  // 每段各自用 A..T 编号 → 必须分段按「释义文字」反查
  Array.from($('quizBody').querySelectorAll('.card')).forEach(card => {
    if (!card.querySelector('.arow')) return;
    Array.from(card.querySelectorAll('.arow')).forEach(row => {
      const w = row.querySelector('.aword').textContent.trim();
      const want = (L.byWord[w] || {}).zh;
      const s = row.querySelector('select');
      const o = Array.from(s.options)
        .find(x => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') === want);
      if (o) { s.value = o.value; s.dispatchEvent(new win.Event('change', { bubbles: true })); n++; }
    });
  });
  is(n === 50, '填对 50 个连线题（实际 ' + n + '）');
  Array.from($('quizBody').querySelectorAll('input[type=radio]')).forEach(r => {
    const pid = r.name.split('_')[0], i = parseInt(r.name.split('_')[1], 10);
    const it = L.parts[pid] && L.parts[pid].items[i];
    if (it && r.value === it.answer) { r.checked = true; r.dispatchEvent(new win.Event('change', { bubbles: true })); }
  });
  Array.from($('quizBody').querySelectorAll('input[type=text]')).forEach(inp => {
    const q = inp.getAttribute('data-qid');
    const pid = q.split('_')[0], i = parseInt(q.split('_')[1], 10);
    const it = L.parts[pid] && L.parts[pid].items[i];
    if (it) { inp.value = it.answer; inp.dispatchEvent(new win.Event('input', { bubbles: true })); }
  });
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const md = doc.querySelector('.modal');
  if (md) { const b = Array.from(md.querySelectorAll('.acts button')).find(x => x.textContent.includes('交卷')); if (b) b.dispatchEvent(new win.Event('click', { bubbles: true })); }
  const sc = $('quizBody').querySelector('.ring .n');
  is(!!sc && parseInt(sc.textContent, 10) === expectedTotal,
     '全对得 ' + expectedTotal + '/' + expectedTotal + '（实际 ' + (sc ? sc.textContent : '无') + '）');
  is(Object.keys(JSON.parse(win.localStorage.getItem('va.l' + LV + '.mistakes') || '{}')).length === 0,
     '全对后错题本为空');

  /* ---- 故意错一题 ---- */
  console.log('\n--- 故意错一题 → 错题本 ---');
  $('btnAgain').dispatchEvent(new win.Event('click', { bubbles: true }));
  const row0 = $('quizBody').querySelector('.arow');
  const w0 = row0.querySelector('.aword').textContent.trim();
  const s0 = row0.querySelector('select');
  const want0 = L.byWord[w0].zh;
  const badOpt = Array.from(s0.options)
    .find(x => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') !== want0);
  s0.value = badOpt.value;
  s0.dispatchEvent(new win.Event('change', { bubbles: true }));
  Array.from($('quizBody').querySelectorAll('.arow')).forEach(row => {
    if (row === row0) return;
    const w = row.querySelector('.aword').textContent.trim();
    const s = row.querySelector('select');
    const o = Array.from(s.options)
      .find(x => x.value && x.textContent.replace(/^[A-Z]\.\s*/, '') === L.byWord[w].zh);
    if (o) { s.value = o.value; s.dispatchEvent(new win.Event('change', { bubbles: true })); }
  });
  Array.from($('quizBody').querySelectorAll('input[type=radio]')).forEach(r => {
    const pid = r.name.split('_')[0], i = parseInt(r.name.split('_')[1], 10);
    const it = L.parts[pid] && L.parts[pid].items[i];
    if (it && r.value === it.answer) { r.checked = true; r.dispatchEvent(new win.Event('change', { bubbles: true })); }
  });
  Array.from($('quizBody').querySelectorAll('input[type=text]')).forEach(inp => {
    const q = inp.getAttribute('data-qid');
    const pid = q.split('_')[0], i = parseInt(q.split('_')[1], 10);
    const it = L.parts[pid] && L.parts[pid].items[i];
    if (it) { inp.value = it.answer; inp.dispatchEvent(new win.Event('input', { bubbles: true })); }
  });
  $('btnSubmit').dispatchEvent(new win.Event('click', { bubbles: true }));
  const md2 = doc.querySelector('.modal');
  if (md2) { const b = Array.from(md2.querySelectorAll('.acts button')).find(x => x.textContent.includes('交卷')); if (b) b.dispatchEvent(new win.Event('click', { bubbles: true })); }
  const m = JSON.parse(win.localStorage.getItem('va.l' + LV + '.mistakes') || '{}');
  const keys = Object.keys(m);
  is(keys.length === 1, '错题本只记 1 条（实际 ' + keys.length + '）');
  is(new RegExp('^' + LV + ':A').test(keys[0]), '键带级别 + Parts 前缀: ' + keys[0]);
  is(!!(m[keys[0]] && m[keys[0]].answerText && m[keys[0]].answerText.length > 2),
     '存下可读的正确答案: ' + (m[keys[0]] || {}).answerText);

  /* ---- 错题页 + 重测 ---- */
  console.log('\n--- 错题页与重测 ---');
  doc.querySelector('#tabs button[data-tab="review"]').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('revCount').textContent === '1', '错题页 1 条');
  is($('reviewList').textContent.indexOf('undefined') < 0, '错题页无 undefined');
  is($('reviewList').textContent.indexOf('词义连线') >= 0, '显示「词义连线」类型');
  $('btnRetest2').dispatchEvent(new win.Event('click', { bubbles: true }));
  is($('quizBody').querySelectorAll('.arow').length === 1,
     '重测只出 1 道连线题（实际 ' + $('quizBody').querySelectorAll('.arow').length + '）');

  /* ---- 单词卡跟着换 ---- */
  console.log('\n--- 单词卡同步 ---');
  doc.querySelector('#tabs button[data-tab="cards"]').dispatchEvent(new win.Event('click', { bubbles: true }));
  const cardWords = Array.from($('fcGrid').querySelectorAll('.cardx')).map(c => c.getAttribute('data-w'));
  const set = new Set(L.words.filter(w => !w.extra).map(w => w.word));
  is(cardWords.length === 10 && cardWords.every(w => set.has(w)),
     '单词卡是 Level ' + LV + ' 的词（例: ' + cardWords.slice(0, 3).join(',') + '）');
}

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
  await new Promise(r => { if (doc.readyState === 'complete') return r(); win.addEventListener('load', r); setTimeout(r, 6000); });

  console.log('已注册级别:', win.VA.availableLevels().join(', '));

  // 决定要测哪些级别：命令行指定，或自动挑「连线段合计 50 题」的级别
  let targets = process.argv[2]
    ? [parseInt(process.argv[2], 10)]
    : win.VA.availableLevels().filter(lv => {
        const mp = win.VA.partsOf(lv).filter(p => p.type === 'match');
        return mp.reduce((s, p) => s + p.items.length, 0) === 50;
      });
  if (!targets.length) { console.error('没有找到多连线段的级别'); process.exit(1); }
  console.log('将测试级别:', targets.join(', '));

  for (const lv of targets) {
    const total = win.VA.getLevel(lv).questionCount;
    await runLevel(dom, win, doc, $, lv, total);
  }

  console.log('\n=== 运行期错误 ===');
  is(errors.length === 0, errors.length ? errors.join(' | ') : '无');

  console.log('\n' + '='.repeat(52));
  console.log(fail === 0 ? '测试全部通过。' : fail + ' 项失败。');
  console.log('='.repeat(52));
  process.exit(fail === 0 ? 0 : 1);
})().catch(e => { console.error('崩了:', e); process.exit(1); });
