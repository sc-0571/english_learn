/* 数据自检：验证各级题库结构是否完整、答案是否合法、与原书复习题是否一致。
   运行： node docs/verify.js
   退出码 0 = 全部通过。 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const ctx = { console };
vm.createContext(ctx);

/* 载入核心 + 所有已存在的级别数据文件 */
const CORE = 'data.js';
vm.runInContext(fs.readFileSync(path.join(dir, CORE), 'utf8'), ctx);
const levelFiles = fs.readdirSync(dir)
  .filter(f => /^data-level\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
levelFiles.forEach(f => {
  try {
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx);
  } catch (e) {
    console.log(`  ✗ ${f} 载入失败: ${e.message}`);
    process.exitCode = 1;
  }
});

const VA = ctx.VA;
let fail = 0, warn = 0;
const ok = (m) => console.log('  \u2713 ' + m);
const bad = (m) => { fail++; console.log('  \u2717 ' + m); };
const wrn = (m) => { warn++; console.log('  ! ' + m); };

const LEVELS = VA.availableLevels();

console.log('\n=== 0. 模块与注册 ===');
console.log('     级别数据文件: ' + levelFiles.join(', '));
console.log('     已注册级别: ' + LEVELS.join(', '));
if (!LEVELS.length) bad('没有任何级别被注册');
else ok(`${LEVELS.length} 个级别已注册`);

/* matchKey 由 data.js 的 VA.matchKeyOf 统一提供，避免两处实现走偏。
   （曾因 verify 里另写一份、忘了带 Part 前缀，漏掉了 A/D 同名的冲突。） */
const matchKeyOf = (partId, it) => VA.matchKeyOf(partId, it);

LEVELS.forEach(lv => {
  const D = VA.getLevel(lv);
  console.log('\n' + '='.repeat(56));
  console.log(`Level ${lv}   （${levelFiles.filter(f => f.includes('level' + lv)).join(' ') || '?'}）`);
  console.log('='.repeat(56));

  /* ---- 单词表 ---- */
  console.log('\n--- 单词表 ---');
  const core = D.words.filter(w => !w.extra);
  const extra = D.words.filter(w => w.extra);
  if (core.length !== 50) bad(`核心词应为 50，实际 ${core.length}`);
  else ok(`核心词 50 个（另有 ${extra.length} 个跨级释义查询词）`);

  const seen = {};
  let dup = 0;
  D.words.forEach(w => {
    if (seen[w.word]) { dup++; bad(`重复单词: ${w.word}`); }
    seen[w.word] = 1;
    ['def', 'zh'].forEach(f => { if (!w[f]) bad(`${w.word} 缺字段 ${f}`); });
    if (typeof w.zh !== 'string' || w.zh.length < 2) bad(`${w.word} 的 zh 释义过短: ${w.zh}`);
  });
  if (!dup) ok('无重复单词，且每个词都有 def / zh');

  /* ---- 题目结构 ---- */
  console.log('\n--- 题目结构 ---');
  const parts = VA.partsOf(lv);
  // 每一级至少要有：词义连线段 + 同反义 + 选词填空 + 近义辨析
  const hasType = t => parts.some(p => p.type === t);
  ['match', 'choice', 'bank'].forEach(t => {
    if (!hasType(t)) bad(`缺少类型为 ${t} 的题目段`);
  });
  let total = 0;
  parts.forEach(p => { total += p.items.length; });
  const breakdown = parts.map(p => `${p.id}=${p.items.length}`).join(' ');
  // 题量下限：连线段合计覆盖 50 词为「满分」，少于 50 只是覆盖率不足（用提醒标注）
  const matchTotal = parts.filter(p => p.type === 'match')
    .reduce((s, p) => s + p.items.length, 0);
  if (matchTotal > 50) bad(`词义连线段合计 ${matchTotal} 题，超过 50 个核心词`);
  else if (matchTotal === 50) ok(`词义连线段合计 50 题（50 个核心词全部覆盖）`);
  else wrn(`词义连线段合计 ${matchTotal} 题（50 词中覆盖 ${matchTotal} 个，其余只能在卡片/词汇表里学）`);
  parts.filter(p => p.type !== 'match').forEach(p => {
    if (p.items.length < 8) bad(`${p.id} 只有 ${p.items.length} 题（至少 8）`);
  });
  ok(`共 ${parts.length} 段、${total} 题（${breakdown}）`);

  const defB = D.parts.B, defC = D.parts.C, defD = D.parts.D;

  /* ---- 词义连线段（A / A2 / A3 …，可以有多段） ---- */
  console.log('\n--- 词义连线段 ---');
  const matchParts = parts.filter(p => p.type === 'match');
  if (!matchParts.length) bad('没有词义连线段');
  let covA = 0;
  matchParts.forEach(p => {
    if (!p.items.length) { bad(`连线段 ${p.id} 没有题目`); return; }
    if (p.items.length > 26) bad(`连线段 ${p.id} 有 ${p.items.length} 题，超过 26 个字母上限`);
    const letters = {};
    p.items.forEach(it => {
      if (!seen[it.word]) bad(`${p.id} 的词 "${it.word}" 不在单词表里`);
      if (!/^[A-Z]$/.test(it.answer)) bad(`${p.id} "${it.word}" 的答案不是单个大写字母: ${it.answer}`);
      letters[it.answer] = (letters[it.answer] || 0) + 1;
    });
    const dupL = Object.keys(letters).filter(k => letters[k] > 1);
    if (dupL.length) bad(`${p.id} 选项字母重复（连线题必须一一对应）: ${dupL.join(',')}`);
    if (Object.keys(letters).length !== p.items.length) {
      bad(`${p.id} 选项字母数(${Object.keys(letters).length}) 与题数(${p.items.length}) 不一致`);
    }

    // 关键校验：matchChoices 的 key 必须与 items 的 answer 对应
    // （曾因按下标另编字母，导致全对的人被判成错）
    const mc = VA.matchChoices(lv, p.id);
    const letterMap = {};
    mc.forEach(c => { letterMap[c.key] = c.text; });
    let wrongMap = 0;
    p.items.forEach(it => {
      const w = D.byWord[it.word];
      if (!letterMap[it.answer]) { wrongMap++; bad(`${p.id} matchChoices 缺字母 ${it.answer}（${it.word}）`); return; }
      if (letterMap[it.answer] !== w.zh) {
        wrongMap++;
        bad(`${p.id} 字母 ${it.answer} 对应「${letterMap[it.answer]}」，应为「${w.zh}」(${it.word})`);
      }
    });
    if (!wrongMap && !dupL.length) ok(`${p.id}：${p.items.length} 题，字母互不重复、释义映射正确`);
    covA += p.items.length;
  });
  if (matchParts.length > 1) ok(`共 ${matchParts.length} 个连线段，合计 ${covA} 题`);

  /* ---- Part B ---- */
  console.log('\n--- Part B 同反义 ---');
  if (!defB) bad('缺少 Part B');
  else {
    if (!defB.options.every(o => o.k && o.t)) bad('options 应为 {k,t} 形状');
    let l1 = 0, miss = 0;
    defB.items.forEach(it => {
      if (['S', 'A'].indexOf(it.answer) < 0) bad(`Part B "${it.a}/${it.b}" 答案非法: ${it.answer}`);
      if (!it.reason) wrn(`Part B "${it.a}/${it.b}" 缺解析`);
      const inLevel = seen[it.a] || seen[it.b];
      if (inLevel) l1++;
      [it.a, it.b].forEach(w => { if (!seen[w]) miss++; });
    });
    if (l1 === defB.items.length) ok(`${defB.items.length} 对，每对至少含一个本级词汇`);
    else wrn(`${defB.items.length - l1} 对两个词都不是本级词汇`);
    if (miss) wrn(`有 ${miss} 个题面词不在单词表里（错题页无释义可查）`);
  }

  /* ---- Part C ---- */
  console.log('\n--- Part C 选词填空 ---');
  if (!defC) bad('缺少 Part C');
  else {
    const bankSet = {};
    defC.bank.forEach(w => { bankSet[w] = (bankSet[w] || 0) + 1; });
    const bankDup = Object.keys(bankSet).filter(k => bankSet[k] > 1);
    if (bankDup.length) bad('词库有重复项: ' + bankDup.join(', '));
    const ansList = defC.items.map(i => i.answer);
    if (new Set(ansList).size !== ansList.length) bad('Part C 答案有重复，与「每词只用一次」矛盾');
    defC.items.forEach(it => {
      if (bankSet[it.answer] == null) bad(`Part C 答案 "${it.answer}" 不在词库里`);
      if ((it.text.match(/______/g) || []).length !== 1) bad(`Part C 空格数异常: ${it.text.slice(0, 40)}…`);
      if (!it.reason) wrn(`Part C "${it.answer}" 缺解析`);
    });
    if (defC.bank.length < defC.items.length) {
      bad(`词库(${defC.bank.length}) 少于题目数(${defC.items.length})，「每词只用一次」不成立`);
    } else {
      ok(`${defC.items.length} 题、词库 ${defC.bank.length} 词无重复，每题恰好一个空格，答案都在词库内`);
    }
  }

  /* ---- Part D ---- */
  console.log('\n--- Part D 近义辨析 ---');
  if (!defD) bad('缺少 Part D');
  else {
    defD.items.forEach(it => {
      const ks = it.choices.map(c => c.k);
      if (ks.indexOf(it.answer) < 0) bad(`Part D "${it.word}" 答案 ${it.answer} 不在选项内`);
      if (it.choices.length !== 4) bad(`Part D "${it.word}" 选项数 ${it.choices.length}，应为 4`);
      if (!it.choices.every(c => c.k && c.t)) bad(`Part D "${it.word}" 选项缺 k/t（会渲染成 undefined）`);
      if (!it.reason) wrn(`Part D "${it.word}" 缺解析`);
    });
    ok(`${defD.items.length} 题，答案均为合法选项且选项字段完整`);
  }

  /* ---- matchKey 唯一性 ---- */
  console.log('\n--- 错题本 matchKey 唯一性 ---');
  const mkSeen = {};
  let mkDup = 0;
  parts.forEach(p => {
    p.items.forEach(it => {
      const k = matchKeyOf(p.id, it);
      if (!k) { bad(`Part ${p.id} 有项的 matchKey 为空`); return; }
      if (mkSeen[k]) { mkDup++; bad(`matchKey 重复: "${k}"（${mkSeen[k]} 与 ${p.id}）`); }
      else mkSeen[k] = p.id;
    });
  });
  if (!mkDup) ok(`全部 ${Object.keys(mkSeen).length} 个 matchKey 唯一`);

  /* ---- 出题覆盖率 ---- */
  console.log('\n--- 出题覆盖率 ---');
  const asked = new Set();
  matchParts.forEach(p => p.items.forEach(it => asked.add(it.word)));
  if (defC) defC.items.forEach(it => asked.add(it.answer));
  if (defB) defB.items.forEach(it => { asked.add(it.a); asked.add(it.b); });
  if (defD) defD.items.forEach(it => asked.add(it.lookup || String(it.word).replace(/（.*$/, '')));
  const uncovered = core.filter(w => !asked.has(w.word)).map(w => w.word);
  const cov = core.length - uncovered.length;
  ok(`${cov}/${core.length} 个核心词进入测验（${Math.round(cov / core.length * 100)}%）`);
  if (uncovered.length) console.log('     未出题: ' + uncovered.join(', '));

  /* ---- 题面词都有释义可查 ---- */
  const noDef = [...asked].filter(w => w && !seen[w]);
  if (noDef.length) bad('以下题面词查不到释义: ' + [...new Set(noDef)].join(', '));
  else ok('全部题面词都能在单词表里查到释义');
});

/* ---- 与原书复习题的交叉核对（仅 Level 1 的 Part A 有 markdown 版） ---- */
console.log('\n' + '='.repeat(56));
console.log('与 level1-quiz.md 交叉核对');
console.log('='.repeat(56));
const mdPath = path.join(dir, '..', 'level1-quiz.md');
if (!fs.existsSync(mdPath)) {
  wrn('未找到 level1-quiz.md，跳过');
} else {
  const md = fs.readFileSync(mdPath, 'utf8');
  const start = md.indexOf('## Part A（1–20）');
  const end = md.indexOf('## Part B', start);
  const section = (start >= 0 && end > start) ? md.slice(start, end) : '';
  if (!section) wrn('无法定位 Part A 答案段，跳过');
  else {
    const MC1 = VA.matchChoices(1);
    const l1 = VA.getLevel(1);
    let mismatch = 0, checked = 0;
    l1.parts.A.items.forEach((it, i) => {
      const re = new RegExp('^\\|\\s*' + (i + 1) + '\\s*\\|\\s*([A-T])\\s*\\|', 'm');
      const m = section.match(re);
      if (!m) { wrn(`markdown Part A 表中未找到第 ${i + 1} 行`); return; }
      checked++;
      if (m[1] !== it.answer) {
        mismatch++;
        bad(`Part A 第 ${i + 1} 题 (${it.word}): data=${it.answer} 但 md=${m[1]}`);
      }
    });
    if (!mismatch) ok(`Level 1 Part A 已核对 ${checked} 题，答案与 markdown 一致`);
    // 释义文字只做「参考」对比：网页版是精炼过的措辞，markdown 版更接近原书，
    // 两者不一致属正常，不算错误。
    const mdChoice = {};
    const reChoice = /^-\s*([A-T])\.\s*(.+)$/gm;
    let mm;
    while ((mm = reChoice.exec(md))) mdChoice[mm[1]] = mm[2].trim();
    let txtDiff = 0;
    MC1.forEach(c => {
      if (!mdChoice[c.key]) return;
      if (mdChoice[c.key].indexOf(c.text) < 0 && c.text.indexOf(mdChoice[c.key]) < 0) txtDiff++;
    });
    console.log(`     参考：${txtDiff}/${MC1.length} 条释义措辞与 markdown 版略有不同（正常）`);
  }
}

console.log('\n' + '='.repeat(56));
console.log(fail === 0 ? `通过，无错误。${warn ? '（' + warn + ' 条提醒）' : ''}` : `${fail} 项错误，${warn} 条提醒`);
console.log('='.repeat(56) + '\n');
process.exit(fail === 0 ? 0 : 1);
