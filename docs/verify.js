/* 数据自检：验证 data.js 的题库是否与原书答案一致、结构是否完整。
   运行： node docs/verify.js                                         */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir, 'data.js'), 'utf8'), ctx);

const {
  VA_WORDS, VA_LEVEL1, VA_BY_WORD,
  VA_PART_A, VA_PART_B, VA_PART_C, VA_PART_D, VA_PARTS, VA_LEVELS
} = ctx;

let fail = 0, warn = 0;
const ok = (m) => console.log('  \u2713 ' + m);
const bad = (m) => { fail++; console.log('  \u2717 ' + m); };
const wrn = (m) => { warn++; console.log('  ! ' + m); };

console.log('\n=== 1. Level 1 单词表完整性 ===');
if (VA_LEVEL1.length !== 50) bad(`Level 1 应为 50 词，实际 ${VA_LEVEL1.length}`);
else ok('Level 1 = 50 词');
const ids = VA_LEVEL1.map(w => w.id).sort((a, b) => a - b);
let gap = null;
for (let i = 1; i <= 50; i++) if (ids[i - 1] !== i) { gap = i; break; }
if (gap) bad(`Level 1 id 不连续，缺失 ${gap}`); else ok('id 1–50 连续无缺');
const dupW = {};
VA_WORDS.forEach(w => { dupW[w.word] = (dupW[w.word] || 0) + 1; });
const dups = Object.keys(dupW).filter(k => dupW[k] > 1);
if (dups.length) bad('重复单词: ' + dups.join(', ')); else ok('无重复单词');
VA_LEVEL1.forEach(w => {
  ['def', 'zh'].forEach(f => { if (!w[f]) bad(`${w.word} 缺字段 ${f}`); });
});

console.log('\n=== 2. 总分应为 50 题 ===');
let total = 0;
VA_PARTS.forEach(p => total += p.items.length);
if (total === 50) ok('A+B+C+D = 50 题'); else bad(`总题数 = ${total}，应为 50`);
console.log(`     A=${VA_PART_A.items.length} B=${VA_PART_B.items.length} C=${VA_PART_C.items.length} D=${VA_PART_D.items.length}`);

console.log('\n=== 3. Part A：答案字母合法 + 与 markdown 版一致 ===');
const keys = VA_PART_A.choices.map(c => c.key);
if (keys.length !== 20) bad(`Part A 选项数 ${keys.length}，应为 20`);
const badKey = VA_PART_A.items.filter(it => keys.indexOf(it.answer) < 0);
if (badKey.length) bad('非法答案字母: ' + badKey.map(x => x.word).join(', ')); else ok('所有答案字母都在选项内');
const usedAns = {};
VA_PART_A.items.forEach(it => { usedAns[it.answer] = (usedAns[it.answer] || 0) + 1; });
const dupAns = Object.keys(usedAns).filter(k => usedAns[k] > 1);
if (dupAns.length) bad('Part A 答案重复（应一一对应）: ' + dupAns.join(', '));
else ok('20 个答案字母互不重复（标准连线题）');
VA_PART_A.items.forEach(it => {
  if (!VA_BY_WORD[it.word]) bad(`Part A 的词 ${it.word} 不在 VA_WORDS 里`);
  else if (VA_BY_WORD[it.word].srcLevel !== 1) bad(`Part A 的词 ${it.word} 不是 Level 1`);
});

// 与 level1-quiz.md 的答案表交叉核对。
// 注意：md 里 Part A/B/C/D 的答案表都用 1,2,3… 重新编号，所以必须先把
// 「Part A 答案表」这一段单独截出来，否则会错配到 Part B 的表上。
const mdPath = path.join(dir, '..', 'level1-quiz.md');
if (fs.existsSync(mdPath)) {
  const md = fs.readFileSync(mdPath, 'utf8');
  const start = md.indexOf('## Part A（1–20）');
  const end = md.indexOf('## Part B', start);
  const section = (start >= 0 && end > start) ? md.slice(start, end) : '';
  if (!section) {
    wrn('无法在 markdown 中定位 Part A 答案段，跳过交叉核对');
  } else {
    let mismatch = 0, checked = 0;
    // md 的 Part A 表按「题目序号 (1–20)」索引，答案顺序与 Part A 题面顺序一致
    VA_PART_A.items.forEach((it, i) => {
      const re = new RegExp('^\\|\\s*' + (i + 1) + '\\s*\\|\\s*([A-T])\\s*\\|', 'm');
      const m = section.match(re);
      if (!m) { wrn(`markdown Part A 表中未找到第 ${i + 1} 行`); return; }
      checked++;
      if (m[1] !== it.answer) {
        mismatch++;
        bad(`Part A 第 ${i + 1} 题 (${it.word}): data.js=${it.answer} 但 md=${m[1]}`);
      }
    });
    if (!mismatch) ok(`Part A 已核对 ${checked} 题，答案与 level1-quiz.md 完全一致`);
  }
} else wrn('未找到 level1-quiz.md，跳过交叉核对');

console.log('\n=== 4. Part B：S/A 合法 + 词汇存在 ===');
VA_PART_B.items.forEach(it => {
  if (['S', 'A'].indexOf(it.answer) < 0) bad(`Part B ${it.a}/${it.b} 答案非法: ${it.answer}`);
  if (!it.reason) wrn(`Part B ${it.a}/${it.b} 缺解析`);
});
ok(`Part B 共 ${VA_PART_B.items.length} 题，答案均为 S/A`);
VA_PART_B.items.forEach(it => {
  [it.a, it.b].forEach(w => { if (!VA_BY_WORD[w]) wrn(`Part B 的词 "${w}" 未收录进 VA_WORDS`); });
});
// 出题约定：每对至少有一个词来自 Level 1
VA_PART_B.items.forEach(it => {
  const la = VA_BY_WORD[it.a], lb = VA_BY_WORD[it.b];
  const okA = la && la.srcLevel === 1, okB = lb && lb.srcLevel === 1;
  if (!okA && !okB) bad(`Part B "${it.a}/${it.b}" 两个词都不是 Level 1（违背出题约定）`);
});
ok('Part B 每对至少含一个 Level 1 词汇');

console.log('\n=== 5. Part C：答案在词库内 + 无重复使用 ===');
const bankSet = {};
VA_PART_C.bank.forEach(w => { bankSet[w] = (bankSet[w] || 0) + 1; });
if (VA_PART_C.bank.length !== 10) bad(`词库 ${VA_PART_C.bank.length} 个词，应为 10`);
if (VA_PART_C.items.length !== 10) bad(`Part C ${VA_PART_C.items.length} 题，应为 10`);
VA_PART_C.items.forEach(it => {
  if (bankSet[it.answer] == null) bad(`Part C 答案 "${it.answer}" 不在词库中`);
  if ((it.text.match(/______/g) || []).length !== 1) bad(`Part C 句子空格数异常: ${it.text.slice(0, 40)}…`);
});
const cAns = VA_PART_C.items.map(i => i.answer);
if (new Set(cAns).size !== cAns.length) bad('Part C 答案有重复，与「每词只用一次」矛盾');
else ok('Part C 10 个答案互不重复，且都在词库内');
const bankDup = Object.keys(bankSet).filter(k => bankSet[k] > 1);
if (bankDup.length) bad('词库有重复项: ' + bankDup.join(', ')); else ok('词库 10 词无重复');
VA_PART_C.items.forEach(it => {
  if (!VA_BY_WORD[it.answer]) wrn(`Part C 答案 "${it.answer}" 未收录进 VA_WORDS（无释义可查）`);
  else if (VA_BY_WORD[it.answer].srcLevel !== 1) bad(`Part C 答案 "${it.answer}" 不是 Level 1 词`);
});

console.log('\n=== 6. Part D：正确选项合法 ===');
// Part B / Part D 的选项统一用 { k, t } 形状 —— 顺手校验，防止模板读到 undefined
if (!VA_PART_B.options.every(o => o.k && o.t)) bad('Part B options 应为 { k, t } 形状');
VA_PART_D.items.forEach(it => {
  const ks = it.choices.map(c => c.k);
  if (ks.indexOf(it.answer) < 0) bad(`Part D "${it.word}" 答案 ${it.answer} 不在选项中`);
  if (it.choices.length !== 4) bad(`Part D "${it.word}" 选项数 ${it.choices.length}，应为 4`);
  if (!it.choices.every(c => c.k && c.t)) bad(`Part D "${it.word}" 选项缺 k/t 字段（会渲染成 undefined）`);
  if (!it.reason) wrn(`Part D "${it.word}" 缺解析`);
});
ok(`Part D 共 ${VA_PART_D.items.length} 题，答案均为合法选项且选项字段完整`);

console.log('\n=== 7. Level 1 出题覆盖率 ===');
// Part A 覆盖 20 词、Part C 覆盖 10 词、Part B/D 再补若干，并非全部 50 词都出题。
// 这里只做统计报告，不算错误（未出题的词仍可在「单词卡 / 词汇表」里学习）。
const askedInA = new Set(VA_PART_A.items.map(i => i.word));
const askedInC = new Set(VA_PART_C.items.map(i => i.answer));
const askedInB = new Set();
VA_PART_B.items.forEach(i => { askedInB.add(i.a); askedInB.add(i.b); });
const askedInD = new Set(VA_PART_D.items.map(i => i.word.replace(/（.*$/, '')));
const allAsked = new Set([...askedInA, ...askedInC, ...askedInB, ...askedInD]);
const uncovered = VA_LEVEL1.filter(w => !allAsked.has(w.word)).map(w => w.word);
const l1Covered = VA_LEVEL1.filter(w => allAsked.has(w.word)).length;
const pctCov = Math.round(l1Covered / VA_LEVEL1.length * 100);
ok(`Level 1 有 ${l1Covered}/50 个词（${pctCov}%）进入测验；其余可在单词卡/词汇表中学习`);
if (uncovered.length) console.log('     未出题: ' + uncovered.join(', '));

console.log('\n=== 7b. 所有题面词汇都有释义可查 ===');
const missingDef = [];
[...askedInA, ...askedInC, ...askedInB].forEach(w => {
  if (w && !VA_BY_WORD[w]) missingDef.push(w);
});
// Part D 的 word 字段可能是一句题干（如「cantankerous 与 disagreeable 的关系」），
// 优先用 lookup 字段，没有则取开头的英文单词。
VA_PART_D.items.forEach(it => {
  const key = it.lookup || String(it.word).match(/^[A-Za-z][A-Za-z-]*/);
  if (!key) return;
  if (!VA_BY_WORD[key]) missingDef.push(key);
});
if (missingDef.length) bad('以下题面词汇在 VA_WORDS 中查不到释义: ' + [...new Set(missingDef)].join(', '));
else ok('全部题面词汇都能在词汇表中查到释义');

console.log('\n=== 8. 目录数据 ===');
if (VA_LEVELS.length !== 10) bad(`VA_LEVELS 应为 10 项，实际 ${VA_LEVELS.length}`);
else ok('VA_LEVELS = 10 级');
const avail = VA_LEVELS.filter(l => l.available).map(l => l.level);
console.log(`     已实现: Level ${avail.join(', ')}；其余待补`);

console.log('\n=== 9. 错题本用的 matchKey 必须唯一 ===');
// 与 docs/index.html 的 matchKeyOf 保持一致；重复会导致错题记录互相覆盖
const mk = {
  A: it => it.word,
  B: it => it.a + '|' + it.b,
  C: it => it.text + '@@' + it.answer,
  D: it => it.lookup || it.word
};
const seen = {};
let dupKey = 0;
['A', 'B', 'C', 'D'].forEach(p => {
  const src = p === 'A' ? VA_PART_A.items : p === 'B' ? VA_PART_B.items
    : p === 'C' ? VA_PART_C.items : VA_PART_D.items;
  src.forEach(it => {
    const k = mk[p](it);
    if (seen[k]) { dupKey++; bad(`matchKey 重复: "${k}"（${seen[k]} 与 ${p}）`); }
    else seen[k] = p;
  });
  if (!src.every(it => mk[p](it))) bad(`Part ${p} 有项的 matchKey 为空`);
});
if (!dupKey) ok(`全部 ${Object.keys(seen).length} 个 matchKey 唯一，错题记录不会互相覆盖`);

// Part A 的词必须都能在单词表里查到（错题页要显示释义）
const missA = VA_PART_A.items.filter(it => !VA_BY_WORD[it.word]).map(it => it.word);
if (missA.length) bad('Part A 有词不在单词表里: ' + missA.join(', '));
else ok('Part A 所有词都能查到释义（错题页可正常展示）');

console.log('\n' + '='.repeat(52));
console.log(fail === 0 ? `通过，无错误。${warn ? '（' + warn + ' 条提醒）' : ''}` : `${fail} 项错误，${warn} 条提醒`);
console.log('='.repeat(52) + '\n');
process.exit(fail === 0 ? 0 : 1);
