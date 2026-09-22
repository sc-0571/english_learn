/* ============================================================================
 * Verbal Advantage — 题库核心
 * 来源：[GRE语文优势].Verbal.Advantage.pdf
 *
 * 每一级的数据放在独立的文件里（data-level1.js / data-level2.js …），
 * 通过 VA.registerLevel(...) 注册进来。应用只跟已注册的级别打交道。
 *
 * 一个「level」对象长这样：
 *   {
 *     level: 1,
 *     words: [ { word, ipa, pos, def, zh, syn:[], ant:[], note } … ],
 *     parts: {
 *       A: { title, instruction, items:[{ word, answer }] },       // answer = 选项字母
 *       B: { title, instruction, options:[{k,t}], items:[{a,b,answer,reason}] },
 *       C: { title, instruction, bank:[], items:[{text,answer,hint?,reason}] },
 *       D: { title, instruction, items:[{word,lookup?,answer,reason,choices:[{k,t}]}] }
 *     }
 *   }
 *
 * Part A 的选项文字直接从 words 的 zh 字段生成，所以同一份中文释义
 * 既用于「词汇表 / 单词卡」，也用于连线题，不会出现两处不一致。
 * ==========================================================================*/

var VA_SOURCE = '[GRE语文优势].Verbal.Advantage.pdf';

/* 全书目录；available 由注册情况决定 */
var VA_LEVEL_META = [
  { level: 1, range: 'Word 1–50' },
  { level: 2, range: 'Word 51–100' },
  { level: 3, range: 'Word 101–150' },
  { level: 4, range: 'Word 151–200' },
  { level: 5, range: 'Word 201–250' },
  { level: 6, range: 'Word 251–300' },
  { level: 7, range: 'Word 301–350' },
  { level: 8, range: 'Word 351–400' },
  { level: 9, range: 'Word 401–450' },
  { level: 10, range: 'Word 451–500' }
];

/* 选项字母表，最多支持到 50 个连线选项 */
var VA_ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var VA_LEVELS = {};      // level -> 已注册的 level 数据
var VA_LEVEL_ORDER = []; // 注册顺序

var VA = {
  source: VA_SOURCE,
  abc: VA_ABC,

  /* 由各级数据文件调用 */
  registerLevel: function (data) {
    if (!data || !data.level || !data.words) return;
    VA_LEVELS[data.level] = data;
    if (VA_LEVEL_ORDER.indexOf(data.level) < 0) VA_LEVEL_ORDER.push(data.level);
    VA_LEVEL_ORDER.sort(function (a, b) { return a - b; });

    // 建立单词索引
    data.byWord = {};
    data.words.forEach(function (w) { data.byWord[w.word] = w; });

    // 总题数
    var n = 0;
    Object.keys(data.parts || {}).forEach(function (k) {
      n += data.parts[k].items.length;
    });
    data.questionCount = n;
  },

  availableLevels: function () { return VA_LEVEL_ORDER.slice(); },
  meta: function () { return VA_LEVEL_META; },

  getLevel: function (lv) { return VA_LEVELS[lv] || null; },

  /* 某一级的题目数组。
     Part 的 id 可以是 A / A2 / A3 …（多个词义连线段）或 B / C / D。
     类型由 id 推断：A* → match、C* → bank、其余 → choice。 */
  partsOf: function (lv) {
    var d = VA_LEVELS[lv];
    if (!d) return [];
    return Object.keys(d.parts).map(function (k) {
      var p = d.parts[k];
      if (!p || !p.items) return null;
      var type = p.type || (/^A/.test(k) ? 'match' : (/^C/.test(k) ? 'bank' : 'choice'));
      return {
        id: k, title: p.title, instruction: p.instruction, type: type,
        choices: p.choices, options: p.options, bank: p.bank, items: p.items
      };
    }).filter(Boolean);
  },

  /* 某个「词义连线」段的选项表：从单词的 zh 释义生成。
     注意：选项字母用 it.answer 本身，**不能**按数组下标另编字母 ——
     数据里 answer 字母是出题时定好的，按下标重编会让全对的人被判成错。
     key 必须与其代表那条 item 的 answer 一致。 */
  matchChoices: function (lv, partId) {
    var pid = partId || 'A';
    var d = VA_LEVELS[lv];
    if (!d || !d.parts[pid]) return [];
    return d.parts[pid].items.map(function (it) {
      var w = d.byWord[it.word] || {};
      return { key: it.answer, text: w.zh || it.word, answer: it.answer };
    });
  },

  /* 取某一段的原始定义 */
  partDef: function (lv, partId) {
    var d = VA_LEVELS[lv];
    return (d && d.parts[partId]) || null;
  },

  /* 查某个词的释义（错题页 / 报告用） */
  wordOf: function (lv, word) {
    var d = VA_LEVELS[lv];
    return (d && d.byWord[word]) || null;
  },

  /* 每题在错题本里的稳定标识。
     必须带 Part 前缀：同一个词可能既出现在连线段（选释义）又出现在
     近义辨析段（D），若只用单词做 key，两条记录会互相覆盖。 */
  matchKeyOf: function (partId, it) {
    var base;
    if (/^A/.test(partId)) base = it.word;
    else if (/^B/.test(partId)) base = it.a + '|' + it.b;
    else if (/^C/.test(partId)) base = it.text + '@@' + it.answer;
    else base = it.lookup || it.word;
    return base == null ? null : partId + '::' + base;
  },

  /* 从错题本的存储键里取出 matchKey。
     存储键有两种历史格式：
       "1:paraphrase"          旧版：级别前缀 + 裸 key
       "1:A::paraphrase"       现在：级别前缀 + "Part::" + 裸 key
     两种都要能解析，否则老记录会显示不出来。 */
  bareKeyOf: function (storeKey) {
    var s = String(storeKey);
    var dc = s.indexOf('::');
    if (dc >= 0) {
      // 新格式 "<level>:<part>::<key>"：只去掉级别前缀
      var c = s.indexOf(':');
      return (c >= 0 && c < dc) ? s.slice(c + 1) : s;
    }
    // 旧格式 "<level>:<key>"：去掉级别前缀，结果是裸 key
    var i = s.indexOf(':');
    return i >= 0 ? s.slice(i + 1) : s;
  }
};

if (typeof globalThis !== 'undefined') {
  globalThis.VA = VA;
  globalThis.VA_LEVELS = VA_LEVELS;
  globalThis.VA_LEVEL_META = VA_LEVEL_META;
  globalThis.VA_SOURCE = VA_SOURCE;
}
