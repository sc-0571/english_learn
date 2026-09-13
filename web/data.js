/* ============================================================================
 * Verbal Advantage — Level 1 题库数据
 * 来源：[GRE语文优势].Verbal.Advantage.pdf
 *
 * 每个单词都带 srcLevel 字段，标明它出自书中哪一级。
 * 本页面的「Level 1」测验只以 srcLevel === 1 的 50 个 keyword 为主体。
 * ==========================================================================*/

const VA_SOURCE = '[GRE语文优势].Verbal.Advantage.pdf';

/* --- Level 1 的 50 个 keyword（原书 Word 1–50） --------------------------- */
const VA_WORDS = [
  {
    id: 1, word: 'paraphrase', ipa: 'PAR-uh-frayz', pos: 'v./n.', srcLevel: 1,
    def: 'To restate, put what someone else has expressed into different words.',
    zh: '用不同的话重述（别人的话）',
    syn: ['restate', 'reword', 'rephrase'],
    ant: [],
    note: '与 quote 相对：quote 是照引原话并注明出处，paraphrase 是换一种说法。'
  },
  {
    id: 2, word: 'ostensible', ipa: 'ah-STEN-si-bul', pos: 'adj.', srcLevel: 1,
    def: 'Apparent, appearing or seeming to be true, professed or declared as true without being demonstrated or proved.',
    zh: '表面上/声称的（未经证实）',
    syn: ['apparent', 'seeming', 'professed', 'plausible', 'specious'],
    ant: ['actual', 'real', 'genuine'],
    note: '常与 real / actual 对立。ostensible motive 未必是真动机。specious 带"用欺骗使假象成真"的贬义。'
  },
  {
    id: 3, word: 'digress', ipa: 'di-GRES / dy-GRES', pos: 'v.', srcLevel: 1,
    def: 'To wander, stray from the point, ramble, deviate, go off in another direction.',
    zh: '离题，跑题',
    syn: ['stray', 'ramble', 'deviate', 'wander'],
    ant: ['stay on point'],
    note: '名词 digression。字面义"走开"（dis- 分开 + gradi 走）。'
  },
  {
    id: 4, word: 'uncanny', ipa: 'uhn-KAN-ee', pos: 'adj.', srcLevel: 1,
    def: 'Eerie, strange, weird, mysterious; also beyond what is normal or expected, strange in a remarkable or marvelous way.',
    zh: '离奇到令人不安的；异乎寻常地奇妙的',
    syn: ['eerie', 'weird', 'mysterious', 'unearthly'],
    ant: ['ordinary', 'mundane'],
    note: 'an uncanny resemblance / an uncanny ability 是"奇妙得不可思议"，不含恐怖义。'
  },
  {
    id: 5, word: 'candor', ipa: 'KAN-dur', pos: 'n.', srcLevel: 1,
    def: 'Frankness, openness, sincere expression.',
    zh: '坦诚，直率',
    syn: ['frankness', 'openness', 'forthrightness', 'ingenuousness'],
    ant: ['evasiveness', 'deceit'],
    note: '形容词 candid。同源的 ingenuous 强调"honest and sincere, no evasiveness"。'
  },
  {
    id: 6, word: 'morose', ipa: 'muh-ROHS', pos: 'adj.', srcLevel: 1,
    def: 'Gloomy, moody, glum, grumpy, ill-tempered, depressed.',
    zh: '阴郁的，闷闷不乐的',
    syn: ['gloomy', 'dolorous', 'lugubrious', 'saturnine', 'sullen'],
    ant: ['optimistic', 'jovial', 'sanguine'],
    note: 'sullen 是"闹情绪不理人"；morose 是"因苦涩、怨恨而阴郁沉默"。'
  },
  {
    id: 7, word: 'adept', ipa: 'uh-DEPT (adj.) / AD-ept (n.)', pos: 'adj./n.', srcLevel: 1,
    def: 'Skilled.',
    zh: '熟练的，精通的；（名词）高手',
    syn: ['skilled', 'deft', 'expert', 'adroit', 'dexterous', 'proficient'],
    ant: ['inept', 'clumsy'],
    note: '形容词读 uh-DEPT，名词"高手"读 AD-ept。来自拉丁语"炼金术士"。'
  },
  {
    id: 8, word: 'saturated', ipa: 'SACH-uh-RAY-tid', pos: 'adj.', srcLevel: 1,
    def: 'Soaked, thoroughly wet, full of moisture.',
    zh: '浸透的，饱和的',
    syn: ['drenched', 'steeped', 'permeated', 'imbued', 'sodden'],
    ant: ['dry', 'parched'],
    note: '可实指（saturated with oil）也可喻指（the market is saturated）。'
  },
  {
    id: 9, word: 'pragmatic', ipa: 'prag-MAT-ik', pos: 'adj.', srcLevel: 1,
    def: 'Practical, having to do with actual practice, concerned with everyday affairs as opposed to theory or speculation.',
    zh: '务实的，讲求实际的',
    syn: ['practical', 'realistic', 'businesslike'],
    ant: ['idealistic', 'speculative', 'impractical'],
    note: '关注事实与证据，无暇理会空想。'
  },
  {
    id: 10, word: 'congenial', ipa: 'kun-JEE-nee-ul', pos: 'adj.', srcLevel: 1,
    def: 'Sympathetic, agreeable, compatible, kindred, harmonious, having the same taste, nature, or temperament.',
    zh: '性情相投的，合得来的',
    syn: ['sympathetic', 'compatible', 'kindred', 'harmonious', 'agreeable'],
    ant: ['alien', 'dissident', 'incongruous'],
    note: '强调"趣味、性情相合"，不是单纯"友善"。'
  },
  {
    id: 11, word: 'capricious', ipa: 'kuh-PRISH-us', pos: 'adj.', srcLevel: 1,
    def: 'Unpredictable, tending to change abruptly for no apparent or logical reason.',
    zh: '反复无常的，变化莫测的',
    syn: ['flighty', 'changeable', 'impulsive', 'fickle', 'erratic', 'whimsical', 'mercurial', 'volatile'],
    ant: ['steady', 'constant', 'predictable'],
    note: '名词 caprice（突发的念头）。书中力荐 kuh-PRISH-us（与 delicious 押韵），而非 kuh-PREE-shus。'
  },
  {
    id: 12, word: 'blatant', ipa: 'BLAYT-nt', pos: 'adj.', srcLevel: 1,
    def: 'Noisy, disagreeably or offensively loud, boisterous, clamorous; also sticking out in a glaring way, obtrusive, flagrant.',
    zh: '喧闹刺耳的；（错误、谎言等）明目张胆的',
    syn: ['boisterous', 'clamorous', 'obtrusive', 'flagrant', 'conspicuous'],
    ant: ['quiet', 'inconspicuous', 'subtle'],
    note: '两种义项都含"显眼且令人不快"。a blatant lie / a blatant error。'
  },
  {
    id: 13, word: 'obligatory', ipa: 'uh-BLIG-uh-tor-ee', pos: 'adj.', srcLevel: 1,
    def: 'Required, necessary, binding, mandatory.',
    zh: '义务性的，必须做的',
    syn: ['required', 'binding', 'mandatory', 'compulsory'],
    ant: ['optional', 'voluntary'],
    note: '首音节 o 读如 above 的 a，不读如 open 的 o。'
  },
  {
    id: 14, word: 'negligible', ipa: 'NEG-li-ji-bul', pos: 'adj.', srcLevel: 1,
    def: 'Unimportant, trifling, of little consequence.',
    zh: '微不足道的，可忽略的',
    syn: ['trifling', 'insignificant', 'trivial', 'slight'],
    ant: ['significant', 'substantial', 'considerable'],
    note: '能被 neglect（忽略）的东西 → negligible。'
  },
  {
    id: 15, word: 'adamant', ipa: 'AD-uh-mint', pos: 'adj.', srcLevel: 1,
    def: 'Unyielding, immovable, inflexible, refusing to give in, unshakable, unrelenting, implacable.',
    zh: '坚定不移的，拒不退让的',
    syn: ['unyielding', 'immovable', 'inflexible', 'unrelenting', 'implacable', 'obstinate'],
    ant: ['flexible', 'yielding', 'compliant'],
    note: '源自"坚不可摧的石头（金刚石）"。旧词 adamantine 已被 adamant 取代。'
  },
  {
    id: 16, word: 'sporadic', ipa: 'spuh-RAD-ik / spor-AD-ik', pos: 'adj.', srcLevel: 1,
    def: 'Occasional, infrequent, irregular, not constant, happening from time to time, occurring in a scattered or random way.',
    zh: '零星的，偶发的',
    syn: ['occasional', 'infrequent', 'irregular', 'intermittent', 'fitful'],
    ant: ['constant', 'incessant', 'unremitting', 'continuous'],
    note: 'sporadic crimes 指散落在城市各处的零星犯罪。'
  },
  {
    id: 17, word: 'vanguard', ipa: 'VAN-gahrd', pos: 'n.', srcLevel: 1,
    def: 'The forefront of an action or movement, leading position or persons in a movement.',
    zh: '先锋，前沿；先头部队',
    syn: ['forefront', 'spearhead', 'advance guard', 'cutting edge'],
    ant: ['rear guard', 'rearguard', 'backwater'],
    note: '军事本义：走在主力之前的先头部队。'
  },
  {
    id: 18, word: 'concur', ipa: 'kun-KUR', pos: 'v.', srcLevel: 1,
    def: 'To agree, be in accord with, unite in opinion; also to act together, or to happen together.',
    zh: '同意，一致；（时间上）同时发生',
    syn: ['agree', 'accord', 'coincide', 'converge'],
    ant: ['differ', 'disagree', 'dissent'],
    note: '三层义：①共同起作用 ②同时发生 ③（最常用）同意。'
  },
  {
    id: 19, word: 'precociousness', ipa: 'pruh-KOH-shus-nis', pos: 'n.', srcLevel: 1,
    def: 'Early development or maturity, especially in mental ability.',
    zh: '早熟（尤指智力发育超前）',
    syn: ['precocity', 'early maturity'],
    ant: ['retardation', 'slowness'],
    note: '形容词 precocious。拉丁语 praecox = "提前成熟的"。反义是 retardation。'
  },
  {
    id: 20, word: 'aloof', ipa: 'uh-LOOF', pos: 'adj.', srcLevel: 1,
    def: 'Apart, at a distance, removed, withdrawn, not wishing to speak or associate with others.',
    zh: '疏远的，冷漠的，不与人来往的',
    syn: ['unsympathetic', 'unapproachable', 'standoffish', 'indifferent', 'distant'],
    ant: ['gregarious', 'friendly', 'affable', 'warm'],
    note: 'aloofness 指不愿参与、不愿关心。'
  },
  {
    id: 21, word: 'creed', ipa: 'rhymes with need', pos: 'n.', srcLevel: 1,
    def: 'Belief, professed faith or opinion, especially a system of religious belief.',
    zh: '信条，教义；（泛指）信念',
    syn: ['doctrine', 'dogma', 'faith', 'belief', 'credo'],
    ant: [],
    note: '同源词 credulous（轻信的）、incredible、credible。credo 更"书面、正式"。'
  },
  {
    id: 22, word: 'tawdry', ipa: 'TAW-dree', pos: 'adj.', srcLevel: 1,
    def: 'Cheap and showy, gaudy, garish, sleazy.',
    zh: '廉价而花哨的，俗气的',
    syn: ['gaudy', 'garish', 'sleazy', 'showy', 'flashy'],
    ant: ['elegant', 'tasteful', 'refined'],
    note: '源自"Saint Audrey lace"（劣质花边）。可形容衣着，也可形容名声（a tawdry reputation）。'
  },
  {
    id: 23, word: 'peevish', ipa: 'PEE-vish', pos: 'adj.', srcLevel: 1,
    def: 'Irritable, cross, complaining, fretful, ill-humored and impatient, difficult to please.',
    zh: '易怒的，爱抱怨的，难以取悦的',
    syn: ['irritable', 'cross', 'fretful', 'petulant', 'querulous'],
    ant: ['placid', 'even-tempered', 'good-natured'],
    note: '名词 peeve（惹人恼火的事）：her pet peeve。'
  },
  {
    id: 24, word: 'arduous', ipa: 'AHR-joo-us', pos: 'adj.', srcLevel: 1,
    def: 'Very difficult, hard to achieve or accomplish, requiring great effort.',
    zh: '艰苦的，费力的',
    syn: ['strenuous', 'laborious', 'toilsome', 'onerous', 'difficult'],
    ant: ['easy', 'effortless', 'facile'],
    note: 'an arduous task / an arduous responsibility。'
  },
  {
    id: 25, word: 'personable', ipa: 'PUR-suh-nuh-buul', pos: 'adj.', srcLevel: 1,
    def: 'Attractive, pleasing in appearance, handsome, comely, fair, presentable.',
    zh: '仪表出众的，相貌好看的',
    syn: ['attractive', 'comely', 'presentable', 'good-looking'],
    ant: ['unbecoming', 'unattractive'],
    note: '⚠️ 原书明确警告：不要用 personable 表示"性格好"。那该用 sociable / affable / amiable。'
  },
  {
    id: 26, word: 'resolute', ipa: 'REZ-uh-loot', pos: 'adj.', srcLevel: 1,
    def: 'Firmly determined or settled, resolved, having a set opinion or purpose, steadfast, unwavering, persevering.',
    zh: '坚决的，意志坚定的',
    syn: ['determined', 'steadfast', 'unwavering', 'persevering', 'staunch'],
    ant: ['irresolute', 'unsteady', 'vacillating', 'wavering'],
    note: '动词 resolve = 决定、解决；resolute 是"已下定决心的"。'
  },
  {
    id: 27, word: 'supposition', ipa: 'SUHP-uh-ZISH-in', pos: 'n.', srcLevel: 1,
    def: 'An assumption, theory, hypothesis.',
    zh: '假设，推测',
    syn: ['assumption', 'hypothesis', 'conjecture', 'theory', 'premise'],
    ant: ['certainty', 'fact'],
    note: 'hypothesis 依据不足的初步理论；conjecture 依据极少、近乎猜测；supposition 依据可多可少。'
  },
  {
    id: 28, word: 'arbitrary', ipa: 'AHR-bi-TRAIR-ee', pos: 'adj.', srcLevel: 1,
    def: 'Unreasoned, based on personal feelings or preferences rather than on reason, logic, or law; also random or illogical; also exercising unrestrained absolute power.',
    zh: '武断的，任意的；专横的',
    syn: ['unreasoned', 'capricious', 'random', 'haphazard', 'despotic'],
    ant: ['rational', 'reasoned', 'principled', 'just'],
    note: '三层义：①凭好恶而非理性 ②随意、无章法 ③权力不受约束。同源 arbiter / arbitrator（裁决者）。'
  },
  {
    id: 29, word: 'monotonous', ipa: 'muh-NAHT-uh-nus', pos: 'adj.', srcLevel: 1,
    def: 'Lacking variety, tediously uniform, unvarying and dull.',
    zh: '单调乏味的',
    syn: ['tedious', 'uniform', 'unvarying', 'dull', 'repetitive'],
    ant: ['varied', 'diverse', 'interesting'],
    note: '名词 monotony。字面义"单一音调"（mono- 一 + tone）。'
  },
  {
    id: 30, word: 'legacy', ipa: 'LEG-uh-see', pos: 'n.', srcLevel: 1,
    def: 'Something handed down from the past, an inheritance.',
    zh: '遗产；传承下来的东西',
    syn: ['inheritance', 'bequest', 'heritage'],
    ant: [],
    note: '既指遗嘱留下的财产，也指文化、精神上的传承。'
  },
  {
    id: 31, word: 'manifold', ipa: 'MAN-i-fohld', pos: 'adj.', srcLevel: 1,
    def: 'Numerous and varied, consisting of many kinds, containing many elements, features, or characteristics.',
    zh: '多种多样的，形形色色的',
    syn: ['multifarious', 'multitudinous', 'diverse', 'varied', 'numerous'],
    ant: ['uniform', 'single', 'homogeneous'],
    note: '不是 many 的花哨说法：many 只表"多"，manifold 强调"多样"。'
  },
  {
    id: 32, word: 'pliant', ipa: 'PLY-int', pos: 'adj.', srcLevel: 1,
    def: 'Bending easily, flexible, adaptable, workable.',
    zh: '易弯曲的，柔韧的；易受影响的',
    syn: ['pliable', 'supple', 'flexible', 'adaptable', 'workable'],
    ant: ['rigid', 'stiff', 'inflexible'],
    note: 'pliant / pliable 多指物件易加工；supple 可指材料或身体柔韧。'
  },
  {
    id: 33, word: 'retort', ipa: 'ri-TORT', pos: 'n./v.', srcLevel: 1,
    def: 'A quick reply, especially one that is cutting or witty.',
    zh: '（尖刻或机智的）快速回击',
    syn: ['riposte', 'rejoinder', 'comeback', 'reply'],
    ant: [],
    note: 'rejoinder 是泛指的"回答/再回答"；retort 特指迅捷、带锋芒的回击。'
  },
  {
    id: 34, word: 'obstinate', ipa: 'AHB-sti-nit', pos: 'adj.', srcLevel: 1,
    def: 'Stubborn, inflexible, unwilling to give in or compromise, not yielding to argument or persuasion.',
    zh: '倔强固执的，不肯让步的',
    syn: ['stubborn', 'hidebound', 'intractable', 'intransigent', 'adamant'],
    ant: ['compliant', 'tractable', 'yielding', 'flexible'],
    note: '⚠️ 别拼成/读成 obstinant（多加了个 n）。注意原书干扰项用 nasty —— 那是错的。'
  },
  {
    id: 35, word: 'lacerate', ipa: 'LAS-uh-rayt', pos: 'v.', srcLevel: 1,
    def: 'To tear, cut roughly, rend, mangle; figuratively, to wound or cause pain.',
    zh: '撕裂，割伤；（喻）刺痛、伤害',
    syn: ['tear', 'rend', 'mangle', 'gash', 'wound'],
    ant: ['heal', 'mend'],
    note: '既可指肉体（thorn lacerated his thumb），也可指情感（lacerated her pride）。'
  },
  {
    id: 36, word: 'omnipotent', ipa: 'ahm-NIP-uh-tint', pos: 'adj.', srcLevel: 1,
    def: 'All-powerful, almighty, having unlimited power or authority.',
    zh: '全能的，无所不能的',
    syn: ['almighty', 'all-powerful'],
    ant: ['impotent', 'powerless'],
    note: 'omni-（全部）+ potent（有力）。对比 omniscient（全知）、omnipresent（无所不在）、omnivorous（杂食的）。'
  },
  {
    id: 37, word: 'unscrupulous', ipa: 'uhn-SKROO-pyuh-lus', pos: 'adj.', srcLevel: 1,
    def: 'Untrustworthy, dishonorable, deceitful, corrupt, lacking integrity or moral principles.',
    zh: '无道德原则的，不择手段的',
    syn: ['unprincipled', 'dishonorable', 'deceitful', 'corrupt'],
    ant: ['scrupulous', 'honest', 'principled', 'ethical'],
    note: 'scruple = 良心上的顾忌。scrupulous 是"一丝不苟、诚实"；加 un- 即翻转。'
  },
  {
    id: 38, word: 'renaissance', ipa: 'ren-uh-SAHNS', pos: 'n.', srcLevel: 1,
    def: 'A revival, rebirth, resurgence, renewal of life or vigor.',
    zh: '复兴，重生，复苏',
    syn: ['revival', 'rebirth', 'resurgence', 'renewal'],
    ant: ['decline', 'decay', 'death'],
    note: '小写泛指任何复兴；大写 Renaissance 特指欧洲文艺复兴。'
  },
  {
    id: 39, word: 'genesis', ipa: 'JEN-uh-sis', pos: 'n.', srcLevel: 1,
    def: 'A coming into being, beginning, origin, birth, creation.',
    zh: '起源，诞生，创生',
    syn: ['origin', 'beginning', 'birth', 'creation', 'inception'],
    ant: ['completion', 'end', 'conclusion'],
    note: '⚠️ genesis 是"开始"不是"结束"—— 原书复习题正是用 completion 做干扰项。'
  },
  {
    id: 40, word: 'warrant', ipa: 'WAHR-int', pos: 'v./n.', srcLevel: 1,
    def: 'To justify, give good reason for, authorize, sanction; also to guarantee or give formal assurance of.',
    zh: '使…有正当理由/有必要；授权；保证',
    syn: ['justify', 'authorize', 'sanction', 'guarantee'],
    ant: ['prohibit', 'forbid'],
    note: '形容词 unwarranted = 无正当理由的（unwarranted search and seizure）。'
  },
  {
    id: 41, word: 'cantankerous', ipa: 'kan-TANGK-uh-rus', pos: 'adj.', srcLevel: 1,
    def: 'Difficult to deal with, disagreeable, argumentative, quick to quarrel or to exhibit ill will.',
    zh: '爱争吵的，难相处的，脾气坏的',
    syn: ['contentious', 'irascible', 'malicious', 'quarrelsome', 'disagreeable'],
    ant: ['agreeable', 'amiable', 'congenial', 'conciliatory'],
    note: '原书复习题：cantankerous = stubborn / disagreeable / violent 三选一 → 答案是 disagreeable。'
  },
  {
    id: 42, word: 'flippant', ipa: 'FLIP-nt', pos: 'adj.', srcLevel: 1,
    def: 'Disrespectful in a frivolous way, treating something serious in a trivial manner.',
    zh: '轻慢的，把严肃的事当儿戏的',
    syn: ['cheeky', 'fresh', 'thoughtless', 'impertinent', 'frivolous'],
    ant: ['solemn', 'sober', 'sedate', 'grave'],
    note: '指言谈把本该受尊重的事拿来打趣；偶尔也可显得幽默。'
  },
  {
    id: 43, word: 'subjugate', ipa: 'SUHB-juh-gayt', pos: 'v.', srcLevel: 1,
    def: 'To conquer, defeat, vanquish, overwhelm completely, bring under rigid control, make submissive, dominate, enslave.',
    zh: '征服并置于绝对控制之下，奴役',
    syn: ['conquer', 'vanquish', 'enslave', 'dominate', 'subdue'],
    ant: ['liberate', 'free', 'emancipate'],
    note: 'defeat 是单场击败；conquer 是系列较量后彻底取胜；subjugate 更进一层，含"奴役、严酷支配"。也可喻指克制瘾好、情绪。'
  },
  {
    id: 44, word: 'wry', ipa: 'like rye', pos: 'adj.', srcLevel: 1,
    def: 'Twisted, crooked, lopsided, askew, distorted in an odd, amusing way.',
    zh: '扭曲的；（现代多指）带嘲讽/古怪意味的',
    syn: ['twisted', 'crooked', 'askew', 'ironic', 'dry'],
    ant: ['straight', 'earnest'],
    note: 'a wry smile / a wry sense of humor —— 现代用法偏"自嘲、反讽的幽默"。'
  },
  {
    id: 45, word: 'urbane', ipa: 'ur-BAYN', pos: 'adj.', srcLevel: 1,
    def: 'Polished, sophisticated, suave, cosmopolitan.',
    zh: '温文尔雅的，老练世故的',
    syn: ['suave', 'sophisticated', 'polished', 'cosmopolitan', 'refined'],
    ant: ['rustic', 'boorish', 'uncouth', 'provincial'],
    note: '与 urban（城市的）同源：暗示都市人那种有礼、精致的气度。'
  },
  {
    id: 46, word: 'jargon', ipa: 'JAHR-gun', pos: 'n.', srcLevel: 1,
    def: 'Specialized and often pretentious language; speech or writing that is highly technical and difficult to understand.',
    zh: '行话，专业术语（常含贬义）',
    syn: ['terminology', 'lingo', 'argot', 'cant', 'computerese'],
    ant: ['plain language', 'vernacular'],
    note: '本为群体内部精确交流而生，后果却是把外人排除在外。'
  },
  {
    id: 47, word: 'prudent', ipa: 'PROO-dint', pos: 'adj.', srcLevel: 1,
    def: 'Cautious, careful, planning wisely, exercising sound judgment in practical matters; also spending carefully.',
    zh: '审慎的，精明的；（花钱上）节俭的',
    syn: ['discreet', 'judicious', 'circumspect', 'thrifty', 'frugal', 'cautious'],
    ant: ['rash', 'reckless', 'imprudent', 'extravagant'],
    note: 'circumspect 强调"环顾四周、防患未然"；prudent 更强调"为自己利益打算、未雨绸缪（尤其钱财）"。'
  },
  {
    id: 48, word: 'inviolable', ipa: 'in-VY-ul-uh-bul', pos: 'adj.', srcLevel: 1,
    def: 'Secure, safe from assault, infringement, or destruction, sacred, untouchable, unassailable, incorruptible.',
    zh: '不可侵犯的，神圣不可违背的',
    syn: ['sacred', 'untouchable', 'unassailable', 'incorruptible', 'secure'],
    ant: ['violable', 'vulnerable'],
    note: 'in-（不）+ violable（可侵犯的）。inviolable rights / contract / oath。'
  },
  {
    id: 49, word: 'commodious', ipa: 'kuh-MOH-dee-us', pos: 'adj.', srcLevel: 1,
    def: 'Spacious, having plenty of room, comfortably convenient.',
    zh: '宽敞的，空间充裕的',
    syn: ['spacious', 'ample', 'capacious', 'roomy'],
    ant: ['cramped', 'confined', 'cramped'],
    note: '与 accommodate / accommodations / commode 同源。注意别和"方便的"或"友好的"混淆。'
  },
  {
    id: 50, word: 'proximity', ipa: 'prahk-SIM-i-tee', pos: 'n.', srcLevel: 1,
    def: 'Nearness, closeness, the state of being in the vicinity of something.',
    zh: '接近，临近',
    syn: ['nearness', 'closeness', 'vicinity', 'propinquity'],
    ant: ['distance', 'remoteness'],
    note: '⚠️ 原书指出 "close proximity" 是冗余表达 —— proximity 本身就已是"接近"。'
  },

  /* --- 以下为其他级别的词，仅用于同/反义与辨析题，均标注来源级别 --- */
  {
    id: 101, word: 'greet', ipa: '', pos: 'v.', srcLevel: 2,
    def: 'To welcome, address with good humor.', zh: '问候，迎接',
    syn: [], ant: [], note: ''
  },
  {
    id: 102, word: 'succinct', ipa: 'suhk-SINGKT', pos: 'adj.', srcLevel: 2,
    def: 'Expressed in the briefest, most compressed way possible.',
    zh: '简洁的，言简意赅的',
    syn: ['concise', 'terse', 'pithy', 'laconic'], ant: ['verbose', 'prolix'],
    note: '★ 出自 Level 2（word 3 terse 的辨析处）。'
  },
  {
    id: 103, word: 'laconic', ipa: 'luh-KAHN-ik', pos: 'adj.', srcLevel: 2,
    def: 'Using few words, terse, concise.',
    zh: '言简意赅的，话少的',
    syn: ['terse', 'succinct', 'concise', 'pithy', 'taciturn'], ant: ['verbose', 'garrulous', 'voluble'],
    note: '★ 出自 Level 2 word 18。'
  },
  {
    id: 104, word: 'boon', ipa: 'rhymes with moon', pos: 'n.', srcLevel: 2,
    def: 'A blessing, something beneficial, a welcome gift.',
    zh: '恩惠，大有好处的东西',
    syn: ['blessing', 'benefit', 'godsend'], ant: ['liability', 'burden', 'curse'],
    note: '★ 出自 Level 2 word 4。'
  },
  {
    id: 105, word: 'callow', ipa: 'KAL-oh', pos: 'adj.', srcLevel: 2,
    def: 'Immature, inexperienced, unsophisticated; literally, unfledged.',
    zh: '稚嫩无经验的',
    syn: ['immature', 'inexperienced', 'naive', 'green'], ant: ['sophisticated', 'seasoned', 'mature'],
    note: '★ 出自 Level 2 word 30。本义"还没长出羽毛的"。'
  },
  {
    id: 106, word: 'sanction', ipa: 'SANGK-shun', pos: 'v./n.', srcLevel: 2,
    def: 'To approve, authorize, permit; as a noun, an authorization or a penalty meant to enforce a rule.',
    zh: '批准，认可；制裁',
    syn: ['approve', 'authorize', 'ratify', 'permit'], ant: ['prohibit', 'forbid', 'proscribe'],
    note: '★ 出自 Level 2 word 24。注意这是"自反义词"（contronym）：既可指批准，也可指制裁。'
  },
  {
    id: 107, word: 'gregarious', ipa: 'gri-GAIR-ee-us', pos: 'adj.', srcLevel: 2,
    def: 'Fond of company, sociable, outgoing.',
    zh: '爱社交的，合群的',
    syn: ['sociable', 'outgoing', 'affable', 'companionable'], ant: ['aloof', 'solitary', 'reclusive'],
    note: '★ 书中出现在 Level 2。原书复习题原句："gregarious, solitary"。'
  },
  {
    id: 108, word: 'multifarious', ipa: 'MUHL-ti-FAIR-ee-us', pos: 'adj.', srcLevel: 1,
    def: 'Having great variety or diversity, many-sided.',
    zh: '形形色色的，多种多样的',
    syn: ['manifold', 'diverse', 'varied', 'multitudinous'], ant: ['uniform', 'homogeneous'],
    note: '原书在 Level 1 manifold（word 31）处把它列为 "equally difficult synonym"。'
  },
  {
    id: 109, word: 'prosaic', ipa: 'proh-ZAY-ik', pos: 'adj.', srcLevel: 4,
    def: 'Dull, ordinary, unimaginative, matter-of-fact.',
    zh: '平淡无奇的，乏味的',
    syn: ['dull', 'ordinary', 'unimaginative', 'mundane', 'commonplace'], ant: ['poetic', 'imaginative', 'enthralling', 'lyrical'],
    note: '★ 出自 Level 4 word 16（本页作为加分题，不算 Level 1 内容）。'
  },
  {
    id: 110, word: 'retardation', ipa: 'ree-tahr-DAY-shun', pos: 'n.', srcLevel: 1,
    def: 'Slowness or delay in development.',
    zh: '迟缓，发育迟缓',
    syn: ['slowness', 'delay'], ant: ['precociousness', 'acceleration'],
    note: '原书在 Level 1 precociousness（word 19）处指出：precociousness 是 retardation 的反面。'
  },
  {
    id: 111, word: 'standoffish', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Distant, reserved, unfriendly in manner.',
    zh: '冷淡疏远的',
    syn: ['aloof', 'distant', 'unsympathetic', 'unapproachable'], ant: ['friendly', 'warm', 'gregarious'],
    note: '列在 Level 1 aloof（word 20）的同义词表中。'
  },
  {
    id: 112, word: 'strenuous', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Requiring great effort or energy, vigorous.',
    zh: '费力的，紧张的',
    syn: ['arduous', 'laborious', 'toilsome', 'vigorous'], ant: ['easy', 'effortless'],
    note: '列在 Level 1 arduous（word 24）的同义词表中。'
  },
  {
    id: 113, word: 'fretful', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Irritable, restless, complaining, disposed to fret.',
    zh: '烦躁不满的',
    syn: ['peevish', 'irritable', 'cross', 'restless'], ant: ['placid', 'content'],
    note: 'Level 1 复习题原句：fretful and peevish（同义）。'
  },
  {
    id: 114, word: 'cautious', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Careful, wary, showing forethought.',
    zh: '谨慎的，小心的',
    syn: ['prudent', 'discreet', 'circumspect', 'wary'], ant: ['rash', 'reckless'],
    note: 'prudent（word 47）的核心近义词之一。'
  },
  {
    id: 115, word: 'liability', ipa: '', pos: 'n.', srcLevel: 2,
    def: 'A disadvantage, burden, or something that holds one back; also a legal debt or obligation.',
    zh: '负担，累赘；债务',
    syn: ['burden', 'drawback', 'disadvantage', 'hindrance'], ant: ['boon', 'asset', 'benefit'],
    note: '★ 与 Level 2 的 boon（word 4）构成反义。'
  },
  {
    id: 116, word: 'sophisticated', ipa: '', pos: 'adj.', srcLevel: 2,
    def: 'Worldly-wise, refined, lacking naivety; also complex or advanced.',
    zh: '老练世故的；（技术）复杂的',
    syn: ['urbane', 'worldly', 'refined', 'cosmopolitan'], ant: ['callow', 'naive', 'unsophisticated', 'provincial'],
    note: '★ 与 Level 2 的 callow（word 30）构成反义；也与 Level 1 的 urbane 近义。'
  },
  {
    id: 117, word: 'prohibit', ipa: '', pos: 'v.', srcLevel: 2,
    def: 'To forbid, ban, formally restrain from doing something.',
    zh: '禁止',
    syn: ['forbid', 'ban', 'proscribe', 'interdict'], ant: ['sanction', 'permit', 'allow', 'authorize'],
    note: '★ 与 Level 2 的 sanction（作动词=批准）构成反义。'
  },
  {
    id: 118, word: 'unyielding', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Not giving way to pressure or argument; firm, inflexible.',
    zh: '不让步的，不屈服的',
    syn: ['adamant', 'inflexible', 'immovable', 'unrelenting', 'resolute'], ant: ['yielding', 'flexible', 'compliant'],
    note: 'Level 1 adamant（word 15）释义的首词即 unyielding。'
  },
  {
    id: 119, word: 'inconspicuous', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Not readily noticed, attracting little attention, unobtrusive.',
    zh: '不显眼的，不起眼的',
    syn: ['unobtrusive', 'unnoticeable', 'discreet'], ant: ['blatant', 'conspicuous', 'obtrusive'],
    note: '★ 与 Level 1 blatant（word 12）构成反义：blatant suggests something conspicuous and disagreeable。'
  },
  {
    id: 120, word: 'elegant', ipa: '', pos: 'adj.', srcLevel: 1,
    def: 'Tasteful, graceful, refined in appearance or manner.',
    zh: '优雅的，有品位的',
    syn: ['tasteful', 'refined', 'graceful', 'polished'], ant: ['tawdry', 'gaudy', 'garish', 'vulgar'],
    note: '★ 与 Level 1 tawdry（word 22）构成反义。'
  }
];

/* 便捷索引 */
const VA_BY_WORD = {};
VA_WORDS.forEach(function (w) { VA_BY_WORD[w.word] = w; });
const VA_LEVEL1 = VA_WORDS.filter(function (w) { return w.srcLevel === 1 && w.id <= 50; });

/* ============================================================================
 * 题目
 * ==========================================================================*/

/* Part A — 词义连线：题面 20 个 Level 1 词，选项 20 个中文释义（乱序由 JS 处理） */
const VA_PART_A = {
  id: 'A',
  title: '词义连线',
  instruction: '为每个单词选出意思最接近的中文释义。每个选项只能用一次。',
  choices: [
    { key: 'A', text: '假设，推测' },
    { key: 'B', text: '表面上/声称的（未经证实）' },
    { key: 'C', text: '坦诚，直率' },
    { key: 'D', text: '用不同的话重述' },
    { key: 'E', text: '离题，跑题' },
    { key: 'F', text: '阴沉忧郁的，闷闷不乐的' },
    { key: 'G', text: '离奇的，怪异的，不可思议的' },
    { key: 'H', text: '熟练的，精通的' },
    { key: 'I', text: '湿透的，浸透的' },
    { key: 'J', text: '务实的，讲求实际的' },
    { key: 'K', text: '性情相投的，合得来的' },
    { key: 'L', text: '易怒的，爱抱怨的' },
    { key: 'M', text: '艰苦的，费力的' },
    { key: 'N', text: '相貌好看的，仪表出众的' },
    { key: 'O', text: '坚决的，意志坚定的' },
    { key: 'P', text: '武断的，任意的（凭个人好恶而非理性）' },
    { key: 'Q', text: '单调乏味的，缺乏变化的' },
    { key: 'R', text: '遗产，传承下来的东西' },
    { key: 'S', text: '多种多样的，包含许多种类的' },
    { key: 'T', text: '易弯曲的，柔韧的；易受影响的' }
  ],
  items: [
    { word: 'paraphrase', answer: 'D' },
    { word: 'ostensible', answer: 'B' },
    { word: 'digress', answer: 'E' },
    { word: 'uncanny', answer: 'G' },
    { word: 'candor', answer: 'C' },
    { word: 'morose', answer: 'F' },
    { word: 'adept', answer: 'H' },
    { word: 'saturated', answer: 'I' },
    { word: 'pragmatic', answer: 'J' },
    { word: 'congenial', answer: 'K' },
    { word: 'peevish', answer: 'L' },
    { word: 'arduous', answer: 'M' },
    { word: 'personable', answer: 'N' },
    { word: 'resolute', answer: 'O' },
    { word: 'supposition', answer: 'A' },
    { word: 'arbitrary', answer: 'P' },
    { word: 'monotonous', answer: 'Q' },
    { word: 'legacy', answer: 'R' },
    { word: 'manifold', answer: 'S' },
    { word: 'pliant', answer: 'T' }
  ]
};

/* Part B — 同义(S) / 反义(A) */
const VA_PART_B = {
  id: 'B',
  title: '同义词 / 反义词判断',
  instruction: '判断每组两个词是同义（S）还是反义（A）。每对至少有一个词来自 Level 1。',
  /* 与 Part D 保持同一种形状：k = 选项字母，t = 选项文字 */
  options: [
    { k: 'S', t: '同义 Synonyms' },
    { k: 'A', t: '反义 Antonyms' }
  ],
  items: [
    { a: 'manifold', b: 'multifarious', answer: 'S', reason: 'manifold = multifarious，都是"多种多样的"。原书把二者并列为同等难度的同义词。' },
    { a: 'prudent', b: 'cautious', answer: 'S', reason: 'prudent = 审慎的；cautious = 谨慎的。二者是 Level 1 word 47 的核心近义词。' },
    { a: 'aloof', b: 'gregarious', answer: 'A', reason: 'aloof（疏远冷漠）↔ gregarious（爱社交、合群）。' },
    { a: 'adamant', b: 'unyielding', answer: 'S', reason: 'adamant 的释义原句就是 unyielding, immovable, inflexible。' },
    { a: 'blatant', b: 'inconspicuous', answer: 'A', reason: 'blatant（喧闹、明目张胆、显眼）↔ inconspicuous（不显眼的）。原书：blatant suggests something conspicuous and disagreeable。' },
    { a: 'peevish', b: 'fretful', answer: 'S', reason: 'peevish = 易怒爱抱怨；fretful = 烦躁不满。原书 Level 1 复习题原句即为 "fretful and peevish"。' },
    { a: 'aloof', b: 'standoffish', answer: 'S', reason: 'aloof 的同义词表里就包含 standoffish（冷淡疏远）。' },
    { a: 'tawdry', b: 'elegant', answer: 'A', reason: 'tawdry（廉价而花哨、俗气）↔ elegant（优雅的）。' },
    { a: 'arduous', b: 'strenuous', answer: 'S', reason: 'arduous 的同义词表：strenuous, laborious, toilsome。' },
    { a: 'congenial', b: 'cantankerous', answer: 'A', reason: 'congenial（性情相投、合得来）↔ cantankerous（爱争吵、难相处）。原书把 congenial 的反义列为 alien / dissident / incongruous，cantankerous 与之同向。' }
  ]
};

/* Part C — 选词填空 */
const VA_PART_C = {
  id: 'C',
  title: '选词填空',
  instruction: '从下面的词库中为每个句子选出最合适的词。每个词只能用一次。',
  bank: ['tawdry', 'adamant', 'personable', 'monotonous', 'omnipotent', 'unscrupulous', 'warrant', 'subjugate', 'inviolable', 'proximity'],
  items: [
    {
      text: 'The lawyer\'s closing statement was so compelling that the jury did not ______ further deliberation.',
      answer: 'warrant',
      hint: '需要"认为…有正当理由/有必要"的含义',
      reason: 'warrant = 使…有正当理由/有必要。did not warrant further deliberation = 无需进一步评议。'
    },
    {
      text: 'The con artist\'s ______ schemes eventually landed him in federal prison.',
      answer: 'unscrupulous',
      reason: 'unscrupulous = 无道德原则的、不择手段的。scruple 是"良心上的顾忌"。'
    },
    {
      text: 'Doctors have sworn to treat their patients\' confidences as ______ — they can never be divulged.',
      answer: 'inviolable',
      reason: 'inviolable = 不可侵犯的、神圣不可违背的（in- 不 + violable 可侵犯的）。'
    },
    {
      text: 'Her resume was impressive, but what clinched the interview was her ______ manner and striking good looks.',
      answer: 'personable',
      hint: '注意：原书特意警告不要用这个词表示"性格好"',
      reason: 'personable = 仪表出众的。原书明确说：不能用来指"性格好"，那该用 sociable / affable / amiable。'
    },
    {
      text: 'After twenty years on the same assembly line, he found the work utterly ______.',
      answer: 'monotonous',
      reason: 'monotonous = 单调乏味的、一成不变的。'
    },
    {
      text: 'The rock star\'s ______ lifestyle — the gaudy cars, the cheap gold jewelry — was splashed across every tabloid.',
      answer: 'tawdry',
      reason: 'tawdry = 廉价而花哨的、俗气的。gaudy（花哨）正是它的同义词。'
    },
    {
      text: 'The emperor\'s armies brutally ______ the neighboring kingdoms, yoking their peoples to his rule.',
      answer: 'subjugate',
      reason: 'subjugate = 征服并置于绝对控制之下。yoke（套上轭）对应其拉丁词源 sub- + jugum（轭）。'
    },
    {
      text: 'The dictator\'s propaganda portrayed him as virtually ______, though his power was in fact far from unlimited.',
      answer: 'omnipotent',
      reason: 'omnipotent = 全能的、无所不能的（omni- 全部 + potent 有力）。'
    },
    {
      text: 'Standing so close to the cliff\'s edge, she suddenly became aware of the ______ of danger.',
      answer: 'proximity',
      reason: 'proximity = 接近、临近。原书提醒："close proximity" 是冗余表达。'
    },
    {
      text: 'Even after everyone presented contrary evidence, he remained ______ and refused to change his position.',
      answer: 'adamant',
      reason: 'adamant = 坚定不移、拒不退让的（unyielding, immovable, inflexible）。'
    }
  ]
};

/* Part D — 近义辨析 */
const VA_PART_D = {
  id: 'D',
  title: '近义辨析',
  instruction: '选出与题干词意思最接近的一项。',
  items: [
    { word: 'retort', answer: 'b', reason: 'retort = 快速、尖锐（且常机智）的回击。', choices: [{ k: 'a', t: '咒骂' }, { k: 'b', t: '尖刻机智的快速回击' }, { k: 'c', t: '沉默的抗议' }, { k: 'd', t: '冗长的演讲' }] },
    {
      word: 'obstinate', answer: 'b',
      reason: 'obstinate = 倔强固执、不肯妥协。⚠️ 原书复习题正是拿 nasty（恶毒）当干扰项 —— 那是错的。',
      choices: [{ k: 'a', t: '恶毒的，凶狠的' }, { k: 'b', t: '倔强固执的，不肯让步的' }, { k: 'c', t: '困惑不解的' }, { k: 'd', t: '含糊其辞的' }]
    },
    {
      word: 'flippant', answer: 'a',
      reason: 'flippant = 以轻慢 frivolous 的态度对待本该严肃的事。',
      choices: [{ k: 'a', t: '过于轻慢的，把严肃的事当儿戏的' }, { k: 'b', t: '古怪离奇的' }, { k: 'c', t: '令人愤慨的' }, { k: 'd', t: '装模作样的' }]
    },
    {
      word: 'commodious', answer: 'b',
      reason: 'commodious = 宽敞的、空间充裕的。原书复习题的干扰项正是 appropriate（恰当的）和 friendly（友好的）。',
      choices: [{ k: 'a', t: '合适的，恰当的' }, { k: 'b', t: '宽敞的，空间充裕的' }, { k: 'c', t: '友好的，亲切的' }, { k: 'd', t: '廉价的，劣质的' }]
    },
    {
      word: 'cantankerous 与 disagreeable 的关系', lookup: 'cantankerous', answer: 'b',
      reason: '近义。cantankerous 就是 disagreeable + argumentative。',
      choices: [{ k: 'a', t: '反义' }, { k: 'b', t: '近义' }, { k: 'c', t: '无关联' }, { k: 'd', t: '后者是前者的结果' }]
    },
    {
      word: 'negligible', answer: 'a',
      reason: 'negligible = 微不足道、可忽略的（能被 neglect）。',
      choices: [{ k: 'a', t: '可以忽略不计的，微不足道的' }, { k: 'b', t: '粗心大意的' }, { k: 'c', t: '遭到忽视的' }, { k: 'd', t: '宽容大量的' }]
    },
    {
      word: 'precociousness', answer: 'a',
      reason: 'precociousness = 早熟，尤指智力发育超前（反义 retardation）。',
      choices: [{ k: 'a', t: '早熟，心智发育超前' }, { k: 'b', t: '早衰' }, { k: 'c', t: '谨小慎微' }, { k: 'd', t: '先见之明' }]
    },
    {
      word: 'vanguard', answer: 'b',
      reason: 'vanguard = 先锋、前沿、领先位置。',
      choices: [{ k: 'a', t: '后卫' }, { k: 'b', t: '先锋，前沿' }, { k: 'c', t: '卫兵' }, { k: 'd', t: '守旧派' }]
    },
    {
      word: 'genesis', answer: 'c',
      reason: 'genesis = 起源、诞生、创生。⚠️ 原书干扰项 completion（完成）—— genesis 是开始，不是结束。',
      choices: [{ k: 'a', t: '结局，完成' }, { k: 'b', t: '遗传' }, { k: 'c', t: '起源，诞生' }, { k: 'd', t: '类型，种类' }]
    },
    {
      word: 'prosaic（反义词）', answer: 'b', bonus: true,
      reason: 'prosaic = 平淡无奇的；反义为 poetic / imaginative / enthralling。★ prosaic 出自 Level 4，本题为加分题。',
      choices: [{ k: 'a', t: '平庸的' }, { k: 'b', t: '富有诗意的，引人入胜的' }, { k: 'c', t: '冗长的' }, { k: 'd', t: '精确的' }]
    }
  ]
};

/* 全书目录（供后续扩展其它 level） */
const VA_LEVELS = [
  { level: 1, words: 50, available: true, range: 'Word 1–50' },
  { level: 2, words: 50, available: false, range: 'Word 51–100' },
  { level: 3, words: 50, available: false, range: 'Word 101–150' },
  { level: 4, words: 50, available: false, range: 'Word 151–200' },
  { level: 5, words: 50, available: false, range: 'Word 201–250' },
  { level: 6, words: 50, available: false, range: 'Word 251–300' },
  { level: 7, words: 50, available: false, range: 'Word 301–350' },
  { level: 8, words: 50, available: false, range: 'Word 351–400' },
  { level: 9, words: 50, available: false, range: 'Word 401–450' },
  { level: 10, words: 50, available: false, range: 'Word 451–500' }
];

const VA_PARTS = [VA_PART_A, VA_PART_B, VA_PART_C, VA_PART_D];

/* ----------------------------------------------------------------------------
 * 显式挂到全局，供浏览器与 node 校验脚本共同读取。
 * （顶层的 const 在 vm/node 中不会自动成为 global 属性，所以这里显式赋值。）
 * --------------------------------------------------------------------------*/
if (typeof globalThis !== 'undefined') {
  globalThis.VA_SOURCE = VA_SOURCE;
  globalThis.VA_WORDS = VA_WORDS;
  globalThis.VA_BY_WORD = VA_BY_WORD;
  globalThis.VA_LEVEL1 = VA_LEVEL1;
  globalThis.VA_PART_A = VA_PART_A;
  globalThis.VA_PART_B = VA_PART_B;
  globalThis.VA_PART_C = VA_PART_C;
  globalThis.VA_PART_D = VA_PART_D;
  globalThis.VA_PARTS = VA_PARTS;
  globalThis.VA_LEVELS = VA_LEVELS;
}
