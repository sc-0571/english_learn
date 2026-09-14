/* ============================================================================
 * Verbal Advantage — Level 2 题库（Word 51–100）
 * 来源：[GRE语文优势].Verbal.Advantage.pdf
 *
 * words 里的 50 个核心词即 Level 2 的 50 个 keyword（原书 Word 1–50 of Level 2）；
 * 后面带 extra:true 的词来自其它级别，只用于 B/D 题的释义查询。
 * Part A 的选项文字由 words 的 zh 字段生成，见 data.js 的 VA.matchChoices()。
 * ==========================================================================*/

VA.registerLevel({
 "level": 2,
 "words": [
  {
   "word": "advocate", "ipa": "AD-vuh-kayt", "pos": "v./n.",
   "def": "To support, plead for, be in favor of, defend by argument; especially, to speak or write in favor or in defense of a person or cause.",
   "zh": "拥护，主张，为…辩护；（名词）拥护者",
   "syn": ["champion", "endorse", "espouse", "support", "uphold"],
   "ant": ["oppose", "denounce", "impugn"],
   "note": "同源词：vocation（职业）、avocation（业余爱好）、evoke（唤起）、convoke（召集）。"
  },
  {
   "word": "delegate", "ipa": "DEL-uh-gayt", "pos": "v./n.",
   "def": "To entrust with authority or power, deliver to another's care or management, hand over to an agent or representative.",
   "zh": "授权，委派，把（职责）交给他人",
   "syn": ["entrust", "assign", "transfer", "deputize"],
   "ant": ["retain", "withhold", "usurp"],
   "note": "名词 delegate（代表）重音在前。核心是「把权力交出去」。"
  },
  {
   "word": "unprecedented", "ipa": "uhn-PRES-i-den-tid", "pos": "adj.",
   "def": "Unheard-of, novel, new, having no precedent or parallel, having no prior example.",
   "zh": "史无前例的，空前的",
   "syn": ["unheard-of", "novel", "unparalleled", "unexampled"],
   "ant": ["commonplace", "familiar", "routine"],
   "note": "precedent = 先例。un- + precedent + -ed → 没有先例的。"
  },
  {
   "word": "poignant", "ipa": "POYN-yint", "pos": "adj.",
   "def": "Piercing, sharp, biting, penetrating, keen — affecting the senses, the emotions, or the intellect.",
   "zh": "尖锐的，深刻的；（情感上）痛切的，令人心酸的",
   "syn": ["piercing", "keen", "moving", "touching", "acute"],
   "ant": ["bland", "dull", "vapid"],
   "note": "g 不发音。三层义：感官上强烈 / 情感上动人 / 言辞上犀利。同源：pungent（刺鼻）、expunge（删除）。"
  },
  {
   "word": "nebulous", "ipa": "NEB-yuh-lus", "pos": "adj.",
   "def": "Unclear, vague, obscure, hazy, indefinite, indistinct.",
   "zh": "模糊的，含混不清的",
   "syn": ["vague", "hazy", "obscure", "indefinite", "indistinct"],
   "ant": ["clear", "definite", "distinct", "explicit"],
   "note": "本义「云雾状的」（nebula 星云）。现在多用于「想法/计划模糊不清」。"
  },
  {
   "word": "clandestine", "ipa": "klan-DES-tin", "pos": "adj.",
   "def": "Kept secret, done in secrecy, especially for an evil, immoral, or illegal purpose.",
   "zh": "秘密的，暗中的（多含不正当意味）",
   "syn": ["covert", "furtive", "surreptitious", "stealthy", "underhand"],
   "ant": ["open", "overt", "aboveboard"],
   "note": "读 klan-DES-tin（DES 同 destiny）。避免 klan-DES-tyn / KLAN-des-teen 等变体。"
  },
  {
   "word": "tirade", "ipa": "TY-rayd", "pos": "n.",
   "def": "A long-drawn-out speech, especially a vehement and abusive one.",
   "zh": "长篇的激烈指责，长篇大论的痛骂",
   "syn": ["diatribe", "harangue", "rant", "philippic"],
   "ant": ["encomium", "panegyric", "tribute"],
   "note": "三大特征：protracted（冗长）、vituperative（充满辱骂）、censorious（谴责性的）。"
  },
  {
   "word": "recur", "ipa": "ri-KUR", "pos": "v.",
   "def": "To happen again, occur again, especially at intervals or after some lapse of time.",
   "zh": "再发生，反复出现（尤指间隔性地）",
   "syn": ["reoccur", "repeat", "return", "persist"],
   "ant": ["cease", "stop"],
   "note": "辨析：reoccur 指「只再发生一次」；recur 指「一再发生、周期性出现」。"
  },
  {
   "word": "tacit", "ipa": "TAS-it", "pos": "adj.",
   "def": "Unspoken, silent, implied or understood without words.",
   "zh": "心照不宣的，默许的，不明说的",
   "syn": ["implicit", "unspoken", "implied", "understood"],
   "ant": ["explicit", "expressed", "stated"],
   "note": "tacit consent 默许；tacit agreement 默契。同源 taciturn（沉默寡言的）。"
  },
  {
   "word": "allegation", "ipa": "AL-uh-GAY-shin", "pos": "n.",
   "def": "An assertion or declaration, especially one made without proof.",
   "zh": "指控，断言（尤指未经证实的）",
   "syn": ["assertion", "charge", "claim", "accusation"],
   "ant": ["proof", "demonstration"],
   "note": "法律语境：allegation 是「打算去证明的断言」，常暗示缺乏证据。"
  },
  {
   "word": "gullible", "ipa": "GUHL-uh-bul", "pos": "adj.",
   "def": "Easily deceived, fooled, or cheated.",
   "zh": "易受骗的，轻信的",
   "syn": ["credulous", "naive", "trusting", "dupeable"],
   "ant": ["skeptical", "suspicious", "cynical"],
   "note": "辨析：dupe 强调受害者「不设防」；gull 强调受害者「乐于相信」。"
  },
  {
   "word": "benign", "ipa": "bi-NYN", "pos": "adj.",
   "def": "Kindly, good-natured, gracious, mild, having or showing a gentle disposition; also favorable or propitious; also healthful; in medicine, mild, not deadly.",
   "zh": "和善的，温和的；吉利的；有益健康的；（医学）良性的",
   "syn": ["kindly", "gracious", "mild", "gentle", "propitious"],
   "ant": ["malignant", "malevolent", "harsh"],
   "note": "与 resign 押韵。良性肿瘤 = benign tumor；反义 malignant。"
  },
  {
   "word": "peripheral", "ipa": "puh-RIF-uh-rul", "pos": "adj.",
   "def": "External, outer, lying at or forming the outside or boundary of something; hence, not essential, irrelevant.",
   "zh": "外围的，边缘的；次要的，无关紧要的",
   "syn": ["marginal", "outlying", "secondary", "incidental"],
   "ant": ["central", "essential", "core", "crucial"],
   "note": "名词 periphery（外围）。peripheral issues = 次要问题。"
  },
  {
   "word": "rebuff", "ipa": "ri-BUHF", "pos": "v./n.",
   "def": "To refuse bluntly, reject sharply, turn down abruptly, snub, spurn.",
   "zh": "断然拒绝，冷落",
   "syn": ["snub", "spurn", "reject", "refuse", "repulse"],
   "ant": ["accept", "welcome", "embrace"],
   "note": "名词同形：a rebuff = 断然的拒绝。"
  },
  {
   "word": "animosity", "ipa": "AN-i-MAHS-i-tee", "pos": "n.",
   "def": "Ill will, hostility, antagonism, strong dislike or hatred.",
   "zh": "敌意，憎恶，仇恨",
   "syn": ["hostility", "antipathy", "enmity", "rancor", "malevolence", "malice"],
   "ant": ["goodwill", "amity", "cordiality"],
   "note": "同义词群：malice / aversion / malevolence / antipathy / rancor / enmity。"
  },
  {
   "word": "tenuous", "ipa": "TEN-yoo-us", "pos": "adj.",
   "def": "Thin, slender, slight, flimsy, weak, not dense or substantial, lacking a strong basis.",
   "zh": "薄弱的，站不住脚的；稀薄的",
   "syn": ["flimsy", "slight", "fragile", "insubstantial", "thin"],
   "ant": ["substantial", "solid", "strong", "cogent"],
   "note": "a tenuous argument 站不住脚的论点；高空空气 tenuous（稀薄）。"
  },
  {
   "word": "complacent", "ipa": "kum-PLAY-sint", "pos": "adj.",
   "def": "Self-satisfied, smug, overly pleased with oneself.",
   "zh": "自满的，得意的，安于现状的",
   "syn": ["smug", "self-satisfied", "unconcerned", "gratified"],
   "ant": ["dissatisfied", "humble", "self-critical"],
   "note": "⚠️ 别和 complaisant（kum-PLAY-zint，殷勤的、乐于讨好的）混了：后者是褒义。"
  },
  {
   "word": "acme", "ipa": "AK-mee", "pos": "n.",
   "def": "The peak, highest point, summit, zenith, especially the point of culmination, the highest possible point in the development or progress of something.",
   "zh": "顶点，顶峰，最高点",
   "syn": ["peak", "summit", "zenith", "pinnacle", "culmination"],
   "ant": ["nadir", "bottom", "low point"],
   "note": "反义词是 nadir（最低点）。形容词 acmatic。"
  },
  {
   "word": "defunct", "ipa": "di-FUHNGKT", "pos": "adj.",
   "def": "Dead, extinct, obsolete; no longer in existence, effect, operation, or use.",
   "zh": "已死的，已废除的，不再存在的",
   "syn": ["obsolete", "extinct", "vanished", "disused"],
   "ant": ["extant", "existing", "operative"],
   "note": "defunct law 失效的法律；defunct company 已倒闭的公司。"
  },
  {
   "word": "abet", "ipa": "uh-BET", "pos": "v.",
   "def": "To encourage, support, help, aid, promote, assist in achieving a purpose.",
   "zh": "怂恿，协助，支持（常指协助做坏事）",
   "syn": ["aid", "assist", "foment", "incite", "support"],
   "ant": ["hinder", "thwart", "discourage"],
   "note": "法律套话「aid and abet」= 协助犯罪。也可用于正面：abet a worthy cause。"
  },
  {
   "word": "haggard", "ipa": "HAG-urd", "pos": "adj.",
   "def": "Worn out, tired, gaunt, drawn, emaciated. A haggard person has a wild-eyed and wasted look, as from exhaustion, illness, or grief.",
   "zh": "憔悴的，形容枯槁的",
   "syn": ["gaunt", "emaciated", "drawn", "careworn", "exhausted"],
   "ant": ["refreshed", "radiant", "robust"],
   "note": "因疲惫、疾病或悲伤而「眼窝深陷、面容枯槁」。"
  },
  {
   "word": "waive", "ipa": "WAYV", "pos": "v.",
   "def": "To relinquish voluntarily, give up, forgo; also to postpone, defer, or dispense with.",
   "zh": "（自愿）放弃（权利、要求）；搁置",
   "syn": ["relinquish", "forgo", "surrender", "cede"],
   "ant": ["claim", "assert", "insist on"],
   "note": "辨析：relinquish 常指「不情愿或被迫」放弃；waive 强调「自愿」不坚持。"
  },
  {
   "word": "carnal", "ipa": "KAHR-nal", "pos": "adj.",
   "def": "Bodily, pertaining to the flesh as opposed to the spirit, sensual, corporeal.",
   "zh": "肉体的，肉欲的（与精神相对）",
   "syn": ["sensual", "corporeal", "fleshly", "bodily"],
   "ant": ["spiritual", "ethereal", "chaste"],
   "note": "不用于中性的「身体的」（不说 carnal aches）。特指基本肉体欲望，尤指性欲。"
  },
  {
   "word": "sanction", "ipa": "SANGK-shun", "pos": "v./n.",
   "def": "To approve, allow, permit, authorize, certify, ratify; as a noun, an authorization or a penalty meant to enforce a rule.",
   "zh": "批准，认可，授权；（名词）制裁",
   "syn": ["approve", "authorize", "ratify", "permit", "certify"],
   "ant": ["prohibit", "forbid", "proscribe"],
   "note": "⚠️ 自反义词（contronym）：既可指「批准」，也可指「制裁」。辨析：ratify 批准代表所做的；certify 认证符合标准。"
  },
  {
   "word": "ambiguous", "ipa": "am-BIG-yoo-us", "pos": "adj.",
   "def": "Uncertain, unclear, doubtful, dubious, questionable, puzzling, having an obscure or indefinite meaning; capable of being understood in more than one way.",
   "zh": "模棱两可的，含糊不清的",
   "syn": ["equivocal", "enigmatic", "cryptic", "vague", "obscure"],
   "ant": ["unequivocal", "distinct", "evident", "manifest", "explicit"],
   "note": "字面义「有两种以上可能的含义」。反义是 unequivocal。"
  },
  {
   "word": "spendthrift", "ipa": "rhymes with bend lift", "pos": "adj./n.",
   "def": "Wasteful, spending extravagantly or foolishly, squandering one's resources; as a noun, a wasteful person.",
   "zh": "挥霍的，浪费的；（名词）挥霍者",
   "syn": ["wasteful", "prodigal", "profligate", "extravagant", "improvident"],
   "ant": ["frugal", "thrifty", "miserly", "parsimonious"],
   "note": "辨析：improvident 不为将来打算；prodigal 挥霍以维持奢华；profligate 挥霍且纵情享乐。"
  },
  {
   "word": "mollify", "ipa": "MAHL-uh-fy", "pos": "v.",
   "def": "To calm, soothe, pacify, appease, soften in feeling or tone, make less harsh or severe.",
   "zh": "安抚，平息，使缓和",
   "syn": ["appease", "pacify", "soothe", "assuage", "placate"],
   "ant": ["enrage", "inflame", "provoke"],
   "note": "字面义「使变软」（拉丁 mollis 软 + facere 做）。同源 emollient（润肤的/缓和剂）。"
  },
  {
   "word": "unequivocal", "ipa": "UHN-i-KWIV-uh-kul", "pos": "adj.",
   "def": "Clear and direct, definite, straightforward, certain, having a single, obvious meaning, capable of being interpreted in only one way.",
   "zh": "明确无误的，毫不含糊的",
   "syn": ["unambiguous", "explicit", "definite", "unmistakable", "categorical"],
   "ant": ["ambiguous", "equivocal", "vague"],
   "note": "⚠️ 是五个音节 un-e-quiv-o-cal，别读成 / 拼成 unequivocable。"
  },
  {
   "word": "malleable", "ipa": "MAL-ee-uh-bul", "pos": "adj.",
   "def": "Capable of being shaped, able to be molded or manipulated, adaptable, impressionable.",
   "zh": "可塑的，易成形的；易受影响的",
   "syn": ["pliable", "pliant", "tractable", "adaptable", "impressionable"],
   "ant": ["inflexible", "unyielding", "intransigent", "rigid"],
   "note": "金属可锻（金、铁）。喻指人心智可塑。近义 tractable 强调「可驾驭、好管理」。"
  },
  {
   "word": "verbose", "ipa": "vur-BOHS", "pos": "adj.",
   "def": "Wordy, having too many words, long-winded, full of verbiage.",
   "zh": "啰嗦的，冗长的",
   "syn": ["wordy", "garrulous", "loquacious", "voluble", "prolix"],
   "ant": ["concise", "terse", "laconic", "succinct"],
   "note": "名词 verbosity。⚠️ 辨析：oral 指「口头的」，verbal 指「用言辞表达的（口笔均可）」。"
  },
  {
   "word": "transient", "ipa": "TRAN-shint", "pos": "adj./n.",
   "def": "Temporary, passing away with time, lasting only a short while, momentary, fleeting, short-lived.",
   "zh": "短暂的，转瞬即逝的；（名词）流浪者",
   "syn": ["transitory", "evanescent", "ephemeral", "fleeting", "momentary"],
   "ant": ["permanent", "eternal", "everlasting", "timeless"],
   "note": "读 TRAN-shint（与 ancient 押韵）。辨析：transitory 指本质上终将消逝；evanescent 指如雾气般消散；ephemeral 本义「只活一天」。"
  },
  {
   "word": "nettle", "ipa": "NET-l", "pos": "v./n.",
   "def": "To irritate, annoy, vex, harass, pester, provoke.",
   "zh": "使恼火，激怒",
   "syn": ["irritate", "annoy", "vex", "provoke", "pester"],
   "ant": ["soothe", "please", "placate"],
   "note": "本义是荨麻（茎叶刺人），动词义由此而来。「被 nettled」= 恼火到暗自生闷气。"
  },
  {
   "word": "repudiate", "ipa": "ri-PYOO-dee-ayt", "pos": "v.",
   "def": "To reject, cast off, disown, renounce, refuse to accept as one's own; also, to reject as false, deny the authority of.",
   "zh": "否认，拒绝接受，断绝关系；驳斥",
   "syn": ["renounce", "disown", "disavow", "reject", "reject as false"],
   "ant": ["acknowledge", "accept", "embrace", "affirm"],
   "note": "语气正式且常激烈。可搭配：repudiate a child / a belief / a claim / a charge。"
  },
  {
   "word": "impetuous", "ipa": "im-PECH-oo-us", "pos": "adj.",
   "def": "Hasty, rash, overeager, acting in a sudden, vigorous, emotional way, with little thought.",
   "zh": "鲁莽的，冲动的，急躁的",
   "syn": ["impulsive", "rash", "hasty", "impetuous", "headlong"],
   "ant": ["prudent", "circumspect", "deliberate", "cautious"],
   "note": "辨析：rash 暗含「不顾后果的莽撞」；impulsive 强调「内心冲动难以自控」；impetuous 强调「精力旺盛、急切、缺耐心」。"
  },
  {
   "word": "frugal", "ipa": "FROO-gul", "pos": "adj.",
   "def": "Spending carefully and wisely, thrifty, economical; also involving little expense, not lavish.",
   "zh": "节俭的，节约的；不铺张的",
   "syn": ["thrifty", "economical", "provident", "sparing"],
   "ant": ["spendthrift", "extravagant", "wasteful", "profligate"],
   "note": "辨析：thrifty 强调勤俭致富；economical 强调用钱最有效；provident 强调为将来打算；parsimonious 是「极度节俭、吝啬」。"
  },
  {
   "word": "incongruous", "ipa": "in-KAHNG-groo-wus", "pos": "adj.",
   "def": "Out of place, inappropriate, inconsistent, unsuitable, lacking harmony of parts or agreement in character.",
   "zh": "不协调的，格格不入的，不相称的",
   "syn": ["inappropriate", "inconsistent", "unsuitable", "discordant", "unfitting"],
   "ant": ["congruous", "appropriate", "consistent", "harmonious"],
   "note": "in- 是否定前缀（privative）。congruous / congruent = 协调一致的。"
  },
  {
   "word": "assuage", "ipa": "uh-SWAYJ", "pos": "v.",
   "def": "To relieve, ease, allay, mitigate, make less severe or intense; also, to satisfy, appease, make content.",
   "zh": "缓和，减轻（痛苦、怒气）；满足（饥渴、欲望）",
   "syn": ["relieve", "ease", "allay", "mitigate", "appease"],
   "ant": ["aggravate", "intensify", "worsen"],
   "note": "读 uh-SWAYJ（与 a stage 押韵），不是 uh-SWAYZH。搭配：assuage grief / anger / fears / hunger。"
  },
  {
   "word": "corroborate", "ipa": "kuh-RAHB-uh-rayt", "pos": "v.",
   "def": "To confirm, support, make more certain or believable.",
   "zh": "证实，佐证，支持（某人的说法）",
   "syn": ["confirm", "substantiate", "verify", "authenticate", "validate"],
   "ant": ["contradict", "refute", "disprove"],
   "note": "辨析：authenticate 鉴定真伪；verify 核实准确性；substantiate 提供可靠证据支持；corroborate 特指「用额外证据支持别人的说法」。"
  },
  {
   "word": "embellish", "ipa": "em-BEL-ish", "pos": "v.",
   "def": "To decorate, dress up, adorn, enhance with ornamentation, make more beautiful, elegant, or interesting.",
   "zh": "装饰，美化；（叙述时）添枝加叶",
   "syn": ["adorn", "decorate", "ornament", "enhance", "garnish"],
   "ant": ["strip", "simplify", "deface"],
   "note": "名词 embellishment。可指「给故事添油加醋」，甚至添上不实细节。"
  },
  {
   "word": "avaricious", "ipa": "AV-uh-RISH-us", "pos": "adj.",
   "def": "Greedy, money-grubbing, miserly, consumed with a selfish desire to accumulate money or property.",
   "zh": "贪婪的，贪财的",
   "syn": ["greedy", "covetous", "miserly", "acquisitive", "rapacious"],
   "ant": ["generous", "altruistic", "liberal"],
   "note": "名词 avarice。辨析：covetous 觊觎「别人拥有的」；avaricious 强调「疯狂聚敛财富并囤积」。"
  },
  {
   "word": "cursory", "ipa": "KUR-sur-ee", "pos": "adj.",
   "def": "Quick, hasty, not methodical, done rapidly with little attention to detail, passing quickly over something that deserves closer examination.",
   "zh": "草率的，粗略的，走马观花的",
   "syn": ["hasty", "superficial", "hurried", "slapdash", "perfunctory"],
   "ant": ["thorough", "careful", "exhaustive", "meticulous"],
   "note": "与「诅咒」无关。源自拉丁 currere（跑）—— 同源：course、curriculum、courier。"
  },
  {
   "word": "vacillate", "ipa": "VAS-i-layt", "pos": "v.",
   "def": "To waver, fluctuate, be indecisive, show uncertainty, hesitate in making up one's mind.",
   "zh": "犹豫不决，摇摆不定",
   "syn": ["waver", "hesitate", "fluctuate", "equivocate", "dither"],
   "ant": ["decide", "resolve", "commit"],
   "note": "字面义「前后摇摆」。强领导者果断，弱领导者 vacillates。"
  },
  {
   "word": "clement", "ipa": "KLEM-int", "pos": "adj.",
   "def": "Mild, calm, tranquil, moderate, temperate, not severe or extreme; also, merciful, lenient, inclined to pardon or forgive.",
   "zh": "温和的（天气）；（人）宽厚的，仁慈的",
   "syn": ["mild", "temperate", "lenient", "merciful", "forgiving"],
   "ant": ["inclement", "severe", "harsh", "merciless"],
   "note": "天气恶劣是 inclement（反义）。名词 clemency（宽恕、减刑）。"
  },
  {
   "word": "lucrative", "ipa": "LOO-kruh-tiv", "pos": "adj.",
   "def": "Profitable, producing wealth, money-making, financially productive, remunerative.",
   "zh": "赚钱的，有利可图的",
   "syn": ["profitable", "remunerative", "gainful", "moneymaking"],
   "ant": ["unprofitable", "loss-making"],
   "note": "源自拉丁 lucrum（收益）。lucre 单独用时多指 filthy lucre（不义之财）。"
  },
  {
   "word": "allocate", "ipa": "AL-uh-kayt", "pos": "v.",
   "def": "To assign, designate, earmark, set aside for a specific purpose.",
   "zh": "分配，拨给，指定用途",
   "syn": ["assign", "designate", "earmark", "apportion", "distribute"],
   "ant": ["withhold", "misappropriate"],
   "note": "名词 allocation。搭配：allocate funds / time / resources。"
  },
  {
   "word": "reconcile", "ipa": "REK-un-syl", "pos": "v.",
   "def": "To make friendly again, restore friendly relations between, settle, resolve, bring into harmony or agreement; also to make consistent; also to resign oneself to accept something undesirable.",
   "zh": "使和解，调和；使一致；使甘心接受",
   "syn": ["settle", "harmonize", "reunite", "square", "accommodate"],
   "ant": ["estrange", "alienate", "divide"],
   "note": "三层义：①重修旧好 ②使（矛盾的说法）一致 ③reconcile oneself to（认命接受）。"
  },
  {
   "word": "paragon", "ipa": "PAR-uh-gahn", "pos": "n.",
   "def": "A model of excellence, perfect example.",
   "zh": "典范，完美的榜样",
   "syn": ["exemplar", "epitome", "model", "quintessence", "apotheosis"],
   "ant": ["travesty", "mockery"],
   "note": "a paragon of virtue / beauty / eloquence。"
  },
  {
   "word": "analogous", "ipa": "un-NAL-uh-gus", "pos": "adj.",
   "def": "Similar, akin, comparable, corresponding partially, sharing some aspects of form, function, or content.",
   "zh": "类似的，可类比的",
   "syn": ["similar", "comparable", "akin", "corresponding"],
   "ant": ["identical", "dissimilar", "unrelated"],
   "note": "⚠️ analogous 不指「完全相同」。名词 analogy（类比）。"
  },
  {
   "word": "diurnal", "ipa": "dy-UR-nul", "pos": "adj.",
   "def": "Daily, recurring each day, performed or happening in the course of a day; also active during the day.",
   "zh": "每天的，昼间的（与 nocturnal 相对）",
   "syn": ["daily", "everyday", "daytime"],
   "ant": ["nocturnal", "nightly"],
   "note": "反义 nocturnal（夜间的）。潮汐、地球自转都是 diurnal。"
  },
  {
   "word": "pretext", "ipa": "PREE-tekst", "pos": "n.",
   "def": "An excuse, ostensible reason or motive, professed purpose.",
   "zh": "借口，托词（用以掩盖真实目的）",
   "syn": ["excuse", "pretense", "guise", "ruse", "cover"],
   "ant": ["real reason", "genuine motive"],
   "note": "字面义「织在前面的东西」→ 用来遮掩的门面。真实目的藏在借口之下。"
  },

  /* --- 以下为其它级别的词，仅供 B/D 题的释义查询 --- */
  {
   "word": "cautious", "ipa": "", "pos": "adj.", "extra": true,
   "def": "Careful, wary, showing forethought.",
   "zh": "谨慎的，小心的",
   "syn": ["prudent", "discreet", "circumspect", "wary"], "ant": ["rash", "reckless"],
   "note": "与 prudent（Level 1 word 47）近义。"
  },
  {
   "word": "miserly", "ipa": "MY-zur-lee", "pos": "adj.", "extra": true,
   "def": "Hoarding money, extremely reluctant to spend, stingy, penny-pinching.",
   "zh": "吝啬的，爱财如命的",
   "syn": ["stingy", "tightfisted", "penurious", "niggardly"], "ant": ["spendthrift", "generous", "extravagant"],
   "note": "与 spendthrift 构成反义：一个死攒，一个乱花。"
  },
  {
   "word": "prodigal", "ipa": "PRAH-di-gal", "pos": "adj.", "extra": true,
   "def": "Spending money recklessly or extravagantly, usually to support a lavish or luxurious lifestyle.",
   "zh": "挥霍的，奢侈的",
   "syn": ["wasteful", "spendthrift", "extravagant", "profligate"], "ant": ["frugal", "thrifty"],
   "note": "《圣经》「浪子」（the prodigal son）即此词。"
  },
  {
   "word": "profligate", "ipa": "PRAHF-li-git", "pos": "adj.", "extra": true,
   "def": "Extremely prodigal or spendthrift; shamelessly devoted to pleasure.",
   "zh": "极度挥霍的；放荡的",
   "syn": ["wasteful", "dissolute", "extravagant", "debauched"], "ant": ["frugal", "temperate"],
   "note": "比 spendthrift 程度更重，且含「纵情享乐」义。"
  },
  {
   "word": "credulous", "ipa": "KREJ-uh-lus", "pos": "adj.", "extra": true,
   "def": "Inclined to believe, willing to accept something as true without questioning.",
   "zh": "轻信的，易受骗的",
   "syn": ["gullible", "naive", "trusting"], "ant": ["skeptical", "incredulous"],
   "note": "与 gullible 同义，但 credulous 更强调「愿意相信」。"
  },
  {
   "word": "enmity", "ipa": "EN-mi-tee", "pos": "n.", "extra": true,
   "def": "Deep-seated hostility, hatred, ill will.",
   "zh": "敌意，仇恨",
   "syn": ["animosity", "hostility", "antipathy", "rancor"], "ant": ["amity", "goodwill"],
   "note": "与 animosity 同义。反义 amity（友好）。"
  },
  {
   "word": "rancor", "ipa": "RANG-kur", "pos": "n.", "extra": true,
   "def": "Bitter, long-lasting resentment or ill will.",
   "zh": "深仇，积怨",
   "syn": ["animosity", "bitterness", "spite", "malice"], "ant": ["forgiveness", "goodwill"],
   "note": "与 animosity 同义，强调「积存已久的怨恨」。"
  },
  {
   "word": "ephemeral", "ipa": "i-FEM-uh-rul", "pos": "adj.", "extra": true,
   "def": "Lasting only a short while, short-lived; by derivation, living or lasting for only a day.",
   "zh": "朝生暮死的，极短暂的",
   "syn": ["transient", "fleeting", "evanescent", "momentary"], "ant": ["permanent", "enduring"],
   "note": "出自 Level 3。本义「只活一天」。"
  },
  {
   "word": "evanescent", "ipa": "EV-uh-NES-int", "pos": "adj.", "extra": true,
   "def": "Fading away like vapor, vanishing as if into thin air.",
   "zh": "瞬息即逝的，易消散的",
   "syn": ["transient", "fleeting", "ephemeral"], "ant": ["permanent", "lasting"],
   "note": "出自 Level 3。强调「像雾气一样消散」。"
  },
  {
   "word": "transitory", "ipa": "TRAN-si-TOR-ee", "pos": "adj.", "extra": true,
   "def": "Applying to something that by its nature is bound to pass away or come to an end.",
   "zh": "短暂的，暂时的（本质上终将消逝）",
   "syn": ["transient", "temporary", "impermanent"], "ant": ["permanent", "eternal"],
   "note": "出自 Level 3。原书用它辨析 transient 的细微差别。"
  },
  {
   "word": "obstinate", "ipa": "AHB-sti-nit", "pos": "adj.", "extra": true,
   "def": "Stubborn, inflexible, unwilling to give in or compromise.",
   "zh": "倔强固执的",
   "syn": ["stubborn", "intransigent", "intractable", "adamant"], "ant": ["compliant", "tractable"],
   "note": "Level 1 word 34。malleable 的反义词之一。"
  },
  {
   "word": "intransigent", "ipa": "in-TRAN-zi-jint", "pos": "adj.", "extra": true,
   "def": "Refusing to compromise, uncompromising, irreconcilable.",
   "zh": "不妥协的，不让步的",
   "syn": ["uncompromising", "obstinate", "intractable", "inflexible"], "ant": ["malleable", "compliant", "tractable"],
   "note": "malleable 的反义词之一。"
  },
  {
   "word": "tractable", "ipa": "TRAK-tuh-bul", "pos": "adj.", "extra": true,
   "def": "Manageable, easily handled or controlled; capable of being pulled or hauled.",
   "zh": "易驾驭的，温顺的",
   "syn": ["malleable", "docile", "manageable", "compliant"], "ant": ["intractable", "obstinate", "unruly"],
   "note": "与 malleable 近义（同源 tractor）。"
  },
  {
   "word": "garrulous", "ipa": "GAR-uh-lus", "pos": "adj.", "extra": true,
   "def": "Talkative, wordy, excessively chatty.",
   "zh": "唠叨的，话多的",
   "syn": ["verbose", "loquacious", "voluble", "talkative"], "ant": ["taciturn", "laconic", "reticent"],
   "note": "出自 Level 5。verbose 的近义词之一。"
  },
  {
   "word": "prolix", "ipa": "PROH-liks", "pos": "adj.", "extra": true,
   "def": "Tediously long and wordy, verbose to the point of boredom.",
   "zh": "冗长乏味的",
   "syn": ["verbose", "wordy", "long-winded", "tedious"], "ant": ["concise", "terse", "succinct"],
   "note": "出自 Level 9。verbose 的近义词之一。"
  },
  {
   "word": "nadir", "ipa": "NAY-dur", "pos": "n.", "extra": true,
   "def": "The lowest point, the point of greatest adversity or despair.",
   "zh": "最低点，最糟的时刻",
   "syn": ["low point", "bottom", "trough"], "ant": ["acme", "zenith", "peak"],
   "note": "acme 的反义词。"
  },
  {
   "word": "inclement", "ipa": "in-KLEM-int", "pos": "adj.", "extra": true,
   "def": "Stormy, severe, harsh, not mild — used especially of weather.",
   "zh": "（天气）恶劣的，严酷的",
   "syn": ["stormy", "severe", "harsh", "rigorous"], "ant": ["clement", "mild", "temperate"],
   "note": "clement 的反义词。"
  },
  {
   "word": "relinquish", "ipa": "ri-LING-kwish", "pos": "v.", "extra": true,
   "def": "To give up something one does not want to part with, either out of necessity or because one is compelled.",
   "zh": "（不情愿地）放弃，让出",
   "syn": ["give up", "surrender", "cede", "abandon"], "ant": ["retain", "keep", "hold"],
   "note": "与 waive 近义但语气不同：relinquish 常含「不情愿或被迫」，waive 强调「自愿」不坚持。"
  },
  {
   "word": "spiritual", "ipa": "", "pos": "adj.", "extra": true,
   "def": "Pertaining to the spirit or soul, as opposed to the body.",
   "zh": "精神的，心灵的",
   "syn": ["incorporeal", "ethereal", "inner"], "ant": ["carnal", "corporeal", "bodily"],
   "note": "carnal（肉体的）的反义词。"
  },
  {
   "word": "doubtful", "ipa": "", "pos": "adj.", "extra": true,
   "def": "Uncertain, questionable, dubious; open to question.",
   "zh": "可疑的，不确定的",
   "syn": ["dubious", "questionable", "uncertain", "ambiguous"], "ant": ["certain", "definite", "sure"],
   "note": "ambiguous 的释义里就含 doubtful / dubious。"
  },
  {
   "word": "enrage", "ipa": "", "pos": "v.", "extra": true,
   "def": "To make very angry, infuriate.",
   "zh": "激怒，使暴怒",
   "syn": ["infuriate", "incense", "madden"], "ant": ["mollify", "pacify", "soothe"],
   "note": "mollify（安抚）的反义词。"
  },
  {
   "word": "wordy", "ipa": "", "pos": "adj.", "extra": true,
   "def": "Using or containing too many words, verbose.",
   "zh": "啰嗦的，冗长的",
   "syn": ["verbose", "long-winded", "prolix", "garrulous"], "ant": ["concise", "terse", "laconic"],
   "note": "verbose 的定义即是 wordy, long-winded。"
  },
  {
   "word": "everlasting", "ipa": "", "pos": "adj.", "extra": true,
   "def": "Lasting forever, eternal, never ending.",
   "zh": "永恒的，永久的",
   "syn": ["eternal", "permanent", "timeless", "endless"], "ant": ["transient", "ephemeral", "fleeting"],
   "note": "transient 的反义词之一。"
  },
  {
   "word": "prohibit", "ipa": "pruh-HIB-it", "pos": "v.", "extra": true,
   "def": "To forbid, ban, formally restrain from doing something.",
   "zh": "禁止",
   "syn": ["forbid", "ban", "proscribe", "interdict"], "ant": ["sanction", "permit", "allow", "authorize"],
   "note": "与 sanction（作动词 = 批准）构成反义。"
  }
 ],
 "parts": {
  "A": {
   "title": "词义连线",
   "instruction": "为每个单词选出意思最接近的中文释义。每个选项只能用一次。",
   "items": [
    { "word": "advocate", "answer": "A" },
    { "word": "delegate", "answer": "B" },
    { "word": "unprecedented", "answer": "C" },
    { "word": "poignant", "answer": "D" },
    { "word": "nebulous", "answer": "E" },
    { "word": "clandestine", "answer": "F" },
    { "word": "tirade", "answer": "G" },
    { "word": "recur", "answer": "H" },
    { "word": "tacit", "answer": "I" },
    { "word": "allegation", "answer": "J" },
    { "word": "gullible", "answer": "K" },
    { "word": "benign", "answer": "L" },
    { "word": "peripheral", "answer": "M" },
    { "word": "rebuff", "answer": "N" },
    { "word": "animosity", "answer": "O" },
    { "word": "tenuous", "answer": "P" },
    { "word": "complacent", "answer": "Q" },
    { "word": "acme", "answer": "R" },
    { "word": "defunct", "answer": "S" },
    { "word": "abet", "answer": "T" }
   ]
  },
  "B": {
   "title": "同义词 / 反义词判断",
   "instruction": "判断每组两个词是同义（S）还是反义（A）。",
   "options": [
    { "k": "S", "t": "同义 Synonyms" },
    { "k": "A", "t": "反义 Antonyms" }
   ],
   "items": [
    { "a": "waive", "b": "relinquish", "answer": "S", "reason": "同义：waive = 自愿放弃；relinquish = 放弃。原书 Level 2 复习题原句：To waive and to relinquish are synonyms。" },
    { "a": "spiritual", "b": "carnal", "answer": "A", "reason": "反义：carnal 指肉体的（与 spirit 相对）。原书复习题原句：Spiritual and carnal are antonyms。" },
    { "a": "sanction", "b": "prohibit", "answer": "A", "reason": "反义：sanction 作动词 = 批准、认可；prohibit = 禁止。原书复习题原句：To sanction and to prohibit are antonyms。" },
    { "a": "doubtful", "b": "ambiguous", "answer": "S", "reason": "同义：ambiguous 的释义就含 doubtful, dubious, uncertain。" },
    { "a": "spendthrift", "b": "miserly", "answer": "A", "reason": "反义：spendthrift 挥霍无度；miserly 一毛不拔。原书复习题原句：Miserly and spendthrift are antonyms。" },
    { "a": "mollify", "b": "enrage", "answer": "A", "reason": "反义：mollify = 安抚、使平静；enrage = 激怒。" },
    { "a": "ambiguous", "b": "unequivocal", "answer": "A", "reason": "反义。原书原文：unequivocal, clear and direct, and ambiguous, uncertain, unclear, are antonyms。" },
    { "a": "malleable", "b": "tractable", "answer": "S", "reason": "同义：malleable 可塑、易影响；tractable 易驾驭。原书列为 close in meaning。" },
    { "a": "verbose", "b": "wordy", "answer": "S", "reason": "同义：verbose 的定义即是 wordy, long-winded, full of verbiage。" },
    { "a": "transient", "b": "everlasting", "answer": "A", "reason": "反义：原书列出 transient 的反义词为 permanent, timeless, eternal, everlasting。" }
   ]
  },
  "C": {
   "title": "选词填空",
   "instruction": "从下面的词库中为每个句子选出最合适的词。每个词只能用一次。",
   "bank": ["clandestine", "poignant", "tacit", "gullible", "complacent", "acme", "defunct", "mollify", "assuage", "pretext"],
   "items": [
    {
     "text": "The two executives held a ______ meeting after hours, hoping no one would learn about the merger talks.",
     "answer": "clandestine",
     "reason": "clandestine = 秘密的、暗中的，多含「不正当」意味，正合此处偷偷摸摸的场景。"
    },
    {
     "text": "The documentary was so ______ that many viewers were moved to tears.",
     "answer": "poignant",
     "hint": "需要「情感上痛切、动人」的含义",
     "reason": "poignant = 尖锐深刻的，尤指情感上令人心酸、动人（a poignant drama）。"
    },
    {
     "text": "Nothing was written down, but their ______ agreement was understood by everyone in the room.",
     "answer": "tacit",
     "reason": "tacit = 不明说的、心照不宣的。tacit agreement 就是「默契」。"
    },
    {
     "text": "Scam artists prey on the ______ because they believe almost anything they are told.",
     "answer": "gullible",
     "reason": "gullible = 易受骗的、轻信的。近义 credulous。"
    },
    {
     "text": "After three straight profitable quarters, the management team grew ______ and stopped watching its competitors.",
     "answer": "complacent",
     "reason": "complacent = 自满的、安于现状的，以致忽视周遭情况。注意别与 complaisant（殷勤讨好，褒义）混淆。"
    },
    {
     "text": "Winning the Nobel Prize marked the ______ of a career that had begun in a tiny village school.",
     "answer": "acme",
     "reason": "acme = 顶点、最高点（the acme of his career）。反义是 nadir。"
    },
    {
     "text": "The typewriter is now a ______ technology, found only in museums and attics.",
     "answer": "defunct",
     "reason": "defunct = 已废弃、不再使用的（dead, extinct, obsolete）。"
    },
    {
     "text": "She tried everything to ______ her furious client, but nothing she said softened his anger.",
     "answer": "mollify",
     "reason": "mollify = 安抚、平息怒气。原书例句：He was furious, and nothing she said mollified him。"
    },
    {
     "text": "A glass of cold water did little to ______ his thirst after the long hike.",
     "answer": "assuage",
     "hint": "需要「缓解、满足（饥渴）」的含义",
     "reason": "assuage = 缓和、减轻（痛苦、怒气）；也可指满足饥渴。assuage one's thirst。"
    },
    {
     "text": "The government used the border incident as a ______ for tightening its control over the press.",
     "answer": "pretext",
     "reason": "pretext = 借口、托词，用来掩盖真实目的。与 ostensible（表面上的）同源思路。"
    }
   ]
  },
  "D": {
   "title": "近义辨析",
   "instruction": "选出与题干词意思最接近的一项。",
   "items": [
    {
     "word": "advocate", "answer": "a",
     "reason": "advocate = 拥护、主张、为…辩护。原书：to support, plead for, be in favor of, defend by argument。",
     "choices": [
      { "k": "a", "t": "拥护，主张，为…辩护" },
      { "k": "b", "t": "放弃，让与" },
      { "k": "c", "t": "谴责，控诉" },
      { "k": "d", "t": "分配，拨给" }
     ]
    },
    {
     "word": "unprecedented", "answer": "c",
     "reason": "unprecedented = 史无前例的、空前的。⚠️ 干扰项「有先例的」是它的反义。",
     "choices": [
      { "k": "a", "t": "有先例可循的" },
      { "k": "b", "t": "意料之中的" },
      { "k": "c", "t": "史无前例的，空前的" },
      { "k": "d", "t": "备受争议的" }
     ]
    },
    {
     "word": "nebulous", "answer": "b",
     "reason": "nebulous = 模糊不清的、含混的（vague, hazy, indistinct）。本义「云雾状的」，与「星云」同源。",
     "choices": [
      { "k": "a", "t": "阴云密布的" },
      { "k": "b", "t": "模糊的，含混不清的" },
      { "k": "c", "t": "宏伟壮观的" },
      { "k": "d", "t": "有毒害的" }
     ]
    },
    {
     "word": "tirade", "answer": "d",
     "reason": "tirade = 长篇的激烈指责、痛骂。三大特征：冗长、充满辱骂、谴责性。",
     "choices": [
      { "k": "a", "t": "简短的赞美" },
      { "k": "b", "t": "严肃的演讲" },
      { "k": "c", "t": "幽默的段子" },
      { "k": "d", "t": "长篇的激烈指责" }
     ]
    },
    {
     "word": "peripheral", "answer": "b",
     "reason": "peripheral = 外围的、次要的、无关紧要的。⚠️ 干扰项「核心的、至关重要的」是它的反义。",
     "choices": [
      { "k": "a", "t": "核心的，至关重要的" },
      { "k": "b", "t": "外围的，次要的" },
      { "k": "c", "t": "永久不变的" },
      { "k": "d", "t": "难以理解的" }
     ]
    },
    {
     "word": "tenuous", "answer": "a",
     "reason": "tenuous = 薄弱的、站不住脚的（flimsy, weak, lacking a strong basis）。",
     "choices": [
      { "k": "a", "t": "薄弱的，站不住脚的" },
      { "k": "b", "t": "顽固坚持的" },
      { "k": "c", "t": "冗长啰嗦的" },
      { "k": "d", "t": "令人信服的" }
     ]
    },
    {
     "word": "haggard", "answer": "c",
     "reason": "haggard = 憔悴的、形容枯槁的（gaunt, emaciated, drawn）。⚠️ 干扰项「精力充沛的」是复习题里的反义项。",
     "choices": [
      { "k": "a", "t": "精力充沛的" },
      { "k": "b", "t": "衣着讲究的" },
      { "k": "c", "t": "憔悴的，形容枯槁的" },
      { "k": "d", "t": "性情温和的" }
     ]
    },
    {
     "word": "impetuous", "answer": "b",
     "reason": "impetuous = 鲁莽冲动的、急躁的。⚠️ 原书复习题正是拿 hostile（敌意的）当干扰项 —— 那是错的。",
     "choices": [
      { "k": "a", "t": "敌意的，充满仇恨的" },
      { "k": "b", "t": "鲁莽的，冲动的" },
      { "k": "c", "t": "节俭的" },
      { "k": "d", "t": "犹豫不决的" }
     ]
    },
    {
     "word": "cursory", "answer": "a",
     "reason": "cursory = 草率粗略的、走马观花的（hasty, superficial）。与「诅咒」无关，源自拉丁「跑」。",
     "choices": [
      { "k": "a", "t": "草率的，粗略的" },
      { "k": "b", "t": "详尽彻底的" },
      { "k": "c", "t": "充满恶意的" },
      { "k": "d", "t": "循环往复的" }
     ]
    },
    {
     "word": "paragon", "answer": "b",
     "reason": "paragon = 典范、完美的榜样。⚠️ 原书复习题的干扰项是「复制品」和「最高点」—— 后者是 acme，不是 paragon。",
     "choices": [
      { "k": "a", "t": "复制品，仿制品" },
      { "k": "b", "t": "典范，完美的榜样" },
      { "k": "c", "t": "最高点，顶点" },
      { "k": "d", "t": "冗长的说教" }
     ]
    }
   ]
  }
 }
});
