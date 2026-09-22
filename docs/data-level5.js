/* ============================================================================
 * Verbal Advantage — Level 5 题库（Word 201–250）
 * 来源：[GRE语文优势].Verbal.Advantage.pdf
 *
 * 50 个核心词分 3 个连线段（A/A2/A3）全部覆盖，另有同反义、选词填空、近义辨析。
 * Part 的选项文字由 words 的 zh 字段生成，见 data.js 的 VA.matchChoices()。
 * ==========================================================================*/

VA.registerLevel({
 "level": 5,
 "words": [
  {
   "word": "voluble", "ipa": "VAHL-yuh-bul", "pos": "adj.",
   "def": "Talkative, talking much and easily, characterized by a great and continuous flow of words.",
   "zh": "健谈的，滔滔不绝的",
   "syn": ["garrulous", "loquacious", "talkative", "fluent"],
   "ant": ["taciturn", "laconic", "reticent", "terse"],
   "note": "与 garrulous 近义；voluble 更偏「口若悬河、停不下来」。"
  },
  {
   "word": "commiserate", "ipa": "kuh-MIZ-uh-rayt", "pos": "v.",
   "def": "To sympathize, feel or express sympathy, show sorrow or pity for.",
   "zh": "同情，表示慰问",
   "syn": ["sympathize", "condole", "console", "pity"],
   "ant": ["glory in", "rejoice at"],
   "note": "commiserate with sb on sth。别和 commensurate（相当的）混淆。"
  },
  {
   "word": "dilemma", "ipa": "di-LEM-uh", "pos": "n.",
   "def": "A predicament; a situation requiring a choice between equally undesirable alternatives.",
   "zh": "两难处境，进退维谷",
   "syn": ["predicament", "quandary", "plight", "difficulty"],
   "ant": ["solution", "easy choice"],
   "note": "原本特指「两个选项都不好」；口语里常泛指困境。与 quandary（Level 3）同义群。"
  },
  {
   "word": "transitory", "ipa": "TRAN-si-TOR-ee", "pos": "adj.",
   "def": "Passing, temporary, fleeting, not permanent or enduring; applying to something that by its nature is bound to pass away.",
   "zh": "短暂的，暂时的（本质上终将消逝）",
   "syn": ["transient", "temporary", "fleeting", "impermanent"],
   "ant": ["permanent", "eternal", "enduring"],
   "note": "与 transient（Level 2）的细微差别：transitory 强调「本性上注定要结束」。"
  },
  {
   "word": "philanthropic", "ipa": "FIL-un-THRAHP-ik", "pos": "adj.",
   "def": "Charitable, benevolent, humane; motivated by or done out of a desire to help or improve the welfare of others.",
   "zh": "慈善的，博爱的",
   "syn": ["charitable", "benevolent", "humanitarian", "altruistic"],
   "ant": ["misanthropic", "selfish", "miserly"],
   "note": "名词 philanthropy。phil-（爱）+ anthrop-（人类）。"
  },
  {
   "word": "lethargy", "ipa": "LETH-ur-jee", "pos": "n.",
   "def": "Lack of energy, sluggishness, dullness, apathy, stupor; an abnormally dull, drowsy, inactive condition or state of mind.",
   "zh": "无精打采，昏昏欲睡，倦怠",
   "syn": ["sluggishness", "torpor", "apathy", "languor"],
   "ant": ["vigor", "energy", "alertness", "animation"],
   "note": "形容词 lethargic。"
  },
  {
   "word": "exonerate", "ipa": "eg-ZAHN-ur-ayt", "pos": "v.",
   "def": "To free from blame, free from a charge or the imputation of guilt, declare blameless or innocent.",
   "zh": "免除罪责，证明无罪",
   "syn": ["absolve", "exculpate", "acquit", "vindicate", "clear"],
   "ant": ["incriminate", "accuse", "convict", "inculpate"],
   "note": "与 incriminate（Level 3）互为反义。名词 exoneration。"
  },
  {
   "word": "pugnacious", "ipa": "puhg-NAY-shus", "pos": "adj.",
   "def": "Given to fighting, combative, quarrelsome, ready and willing to fight.",
   "zh": "好斗的，爱争吵的",
   "syn": ["combative", "bellicose", "quarrelsome", "contentious"],
   "ant": ["peaceable", "pacific", "conciliatory"],
   "note": "拉丁 pugnus（拳头）。与 bellicose / contentious 同义。"
  },
  {
   "word": "contrition", "ipa": "kun-TRISH-in", "pos": "n.",
   "def": "Remorse, penitence, repentance, deep and devastating sorrow for one's sins or for something one has done wrong.",
   "zh": "悔悟，痛悔",
   "syn": ["remorse", "penitence", "repentance", "compunction"],
   "ant": ["impenitence", "remorselessness"],
   "note": "形容词 contrite（悔悟的）。"
  },
  {
   "word": "abrogate", "ipa": "AB-ruh-gayt", "pos": "v.",
   "def": "To abolish by legal or authoritative action or decree.",
   "zh": "（依法）废除，取消",
   "syn": ["abolish", "repeal", "annul", "rescind", "revoke"],
   "ant": ["enact", "establish", "institute", "ratify"],
   "note": "与 rescind（Level 3）近义，都指正式废除。abrogate a treaty。"
  },
  {
   "word": "officious", "ipa": "uh-FISH-us", "pos": "adj.",
   "def": "Meddlesome, offering unwanted help or advice, inclined to interfere in others' affairs; also, asserting authority in an overbearing way.",
   "zh": "爱管闲事的，好管闲事地插手的",
   "syn": ["meddlesome", "intrusive", "interfering", "presumptuous"],
   "ant": ["unobtrusive", "indifferent", "reticent"],
   "note": "⚠️ 首音节读 uh-（如 ago 的 a），不读 oh-。别和 official（官方的）混淆：officious 含贬义。"
  },
  {
   "word": "intractable", "ipa": "in-TRAK-tuh-bul", "pos": "adj.",
   "def": "Hard to manage or control, stubborn, unruly.",
   "zh": "难对付的，倔强难管的",
   "syn": ["unruly", "stubborn", "obstinate", "unmanageable", "refractory"],
   "ant": ["tractable", "docile", "manageable", "compliant"],
   "note": "反义 tractable。也可形容难题：an intractable problem。"
  },
  {
   "word": "altruism", "ipa": "AL-troo-iz-'m", "pos": "n.",
   "def": "Selflessness, unselfish concern for the welfare of others.",
   "zh": "利他主义，无私",
   "syn": ["selflessness", "benevolence", "philanthropy"],
   "ant": ["egoism", "selfishness", "narcissism"],
   "note": "形容词 altruistic。与 egoism / narcissism（Level 3）相对。"
  },
  {
   "word": "accolade", "ipa": "ak-uh-LAYD", "pos": "n.",
   "def": "An award; sign of respect or esteem; expression of praise; mark of acknowledgment; anything done or given as a token of appreciation or approval.",
   "zh": "荣誉，褒奖，赞扬",
   "syn": ["award", "honor", "tribute", "laurel", "citation"],
   "ant": ["rebuke", "censure", "insult"],
   "note": "常指正式的嘉奖或舆论的赞誉。"
  },
  {
   "word": "vernacular", "ipa": "vur-NAK-yuh-lur", "pos": "n./adj.",
   "def": "The native language of a people; especially, the common, everyday language of ordinary people as opposed to the literary or cultured language.",
   "zh": "本国语，本地话，日常口语",
   "syn": ["colloquial speech", "dialect", "lingo", "native tongue"],
   "ant": ["formal language", "literary language", "jargon"],
   "note": "与 colloquial（Level 5 后段）同源思路：都指「日常口语」。"
  },
  {
   "word": "judicious", "ipa": "joo-DISH-us", "pos": "adj.",
   "def": "Wise and careful, having or showing sound judgment.",
   "zh": "明智审慎的，有见地的",
   "syn": ["prudent", "discreet", "sensible", "circumspect", "sage"],
   "ant": ["rash", "imprudent", "foolish", "injudicious"],
   "note": "与 judicial（司法的）拼写近似但意思不同。原书把 judicious 列为 prudent（Level 1）的同义词。"
  },
  {
   "word": "chrysalis", "ipa": "KRIS-uh-lis", "pos": "n.",
   "def": "The pupa of a butterfly; the stage in the development of the insect between the larval and adult stages, during which the insect is enclosed in a case or cocoon.",
   "zh": "蝶蛹，蛹期",
   "syn": ["pupa", "cocoon"],
   "ant": [],
   "note": "常用作比喻：处于蜕变、酝酿阶段的事物。复数 chrysalises / chrysalides。"
  },
  {
   "word": "genteel", "ipa": "jen-TEEL", "pos": "adj.",
   "def": "Refined, polite, well-bred, sophisticated, elegantly stylish or fashionable, pertaining or belonging to high society.",
   "zh": "文雅的，上流社会的，有教养的",
   "syn": ["refined", "polite", "well-bred", "cultured", "urbane"],
   "ant": ["vulgar", "uncouth", "boorish", "coarse"],
   "note": "与 urbane（Level 1）近义。有时带「装体面」的轻微讽刺。"
  },
  {
   "word": "jovial", "ipa": "JOH-vee-ul", "pos": "adj.",
   "def": "Merry, full of good humor, hearty and fun-loving, jolly, convivial.",
   "zh": "快活的，开朗和善的",
   "syn": ["merry", "jolly", "convivial", "genial", "mirthful"],
   "ant": ["morose", "sullen", "dour", "gloomy"],
   "note": "与 morose（Level 1）互为反义。源自罗马主神 Jove（朱庇特）。"
  },
  {
   "word": "subterfuge", "ipa": "SUHB-tur-fyooj", "pos": "n.",
   "def": "A deception, trick, underhanded scheme.",
   "zh": "托词，诡计，狡猾的逃避手段",
   "syn": ["deception", "trick", "ruse", "evasion", "ploy"],
   "ant": ["honesty", "candor", "straightforwardness"],
   "note": "常指为逃避责任或批评而耍的花招。"
  },
  {
   "word": "ebullience", "ipa": "i-BUHL-yints", "pos": "n.",
   "def": "Lively enthusiasm, high spirits, bubbly excitement.",
   "zh": "兴高采烈，热情洋溢",
   "syn": ["exuberance", "enthusiasm", "exhilaration", "buoyancy"],
   "ant": ["lethargy", "apathy", "dejection"],
   "note": "形容词 ebullient。字面义「沸腾」。与 lethargy 相对。"
  },
  {
   "word": "impervious", "ipa": "im-PURV-ee-us", "pos": "adj.",
   "def": "Impenetrable, incapable of being entered or passed through; hence, unable to be moved or affected by something.",
   "zh": "不可渗透的；不受影响的，无动于衷的",
   "syn": ["impenetrable", "impermeable", "insusceptible", "unmoved"],
   "ant": ["pervious", "permeable", "susceptible", "receptive"],
   "note": "impervious to criticism = 对批评无动于衷。"
  },
  {
   "word": "remonstrate", "ipa": "ri-MAHN-strayt", "pos": "v.",
   "def": "To object, protest, reprove, rebuke, argue or plead against.",
   "zh": "抗议，规劝，表示反对",
   "syn": ["protest", "object", "expostulate", "reprove"],
   "ant": ["agree", "acquiesce", "concur"],
   "note": "remonstrate with sb about sth。名词 remonstrance。"
  },
  {
   "word": "efface", "ipa": "e-FAYS", "pos": "v.",
   "def": "To rub out, wipe out, obliterate, erase, expunge; also, to make oneself inconspicuous, keep oneself out of the limelight.",
   "zh": "擦去，抹掉；（efface oneself）使自己不显眼",
   "syn": ["erase", "obliterate", "expunge", "delete"],
   "ant": ["preserve", "restore", "highlight"],
   "note": "self-effacing = 谦逊不露锋芒的。与 expunge（Level 3）同义。"
  },
  {
   "word": "chimera", "ipa": "ky-MEER-uh", "pos": "n.",
   "def": "A foolish fancy, fantastic notion or idea, figment of the imagination.",
   "zh": "妄想，荒诞的念头",
   "syn": ["illusion", "fantasy", "delusion", "figment"],
   "ant": ["reality", "fact"],
   "note": "源自希腊神话中狮头羊身蛇尾的怪物。形容词 chimerical。"
  },
  {
   "word": "incorrigible", "ipa": "in-KOR-ij-uh-bul", "pos": "adj.",
   "def": "Bad beyond correction or reform, hopeless, irreformable; also, unruly, unmanageable, difficult to control.",
   "zh": "屡教不改的，不可救药的",
   "syn": ["incurable", "unreformable", "inveterate", "unmanageable"],
   "ant": ["reformable", "correctable", "redeemable"],
   "note": "字面义「不能被纠正的」。an incorrigible optimist 也可用于调侃。"
  },
  {
   "word": "juxtapose", "ipa": "JUHK-stuh-POHZ", "pos": "v.",
   "def": "To place side by side or close together, especially so as to compare or contrast.",
   "zh": "并置，并列（以作对比）",
   "syn": ["place side by side", "compare", "contrast", "appose"],
   "ant": ["separate", "isolate"],
   "note": "名词 juxtaposition。"
  },
  {
   "word": "conversant", "ipa": "kun-VUR-sint", "pos": "adj.",
   "def": "Familiar, acquainted, well-informed or well-versed.",
   "zh": "熟悉的，通晓的",
   "syn": ["familiar", "acquainted", "versed", "well-informed"],
   "ant": ["unfamiliar", "ignorant", "unacquainted"],
   "note": "conversant with sth（通晓某事）。"
  },
  {
   "word": "esoteric", "ipa": "ES-uh-TER-ik", "pos": "adj.",
   "def": "Intended for or designed to be understood only by a select group, known only by a few people; hence, not public, secret, confidential.",
   "zh": "只有内行才懂的，深奥的",
   "syn": ["arcane", "obscure", "recondite", "abstruse"],
   "ant": ["exoteric", "popular", "accessible", "common"],
   "note": "反义 exoteric（通俗的、面向大众的）。"
  },
  {
   "word": "auspicious", "ipa": "aw-SPISH-us", "pos": "adj.",
   "def": "Favorable, fortunate, marked by favorable circumstances or good fortune, conducive to success, boding well.",
   "zh": "吉利的，前途看好的",
   "syn": ["favorable", "propitious", "promising", "fortunate"],
   "ant": ["inauspicious", "ominous", "unfavorable"],
   "note": "an auspicious beginning。反义 inauspicious。"
  },
  {
   "word": "itinerant", "ipa": "eye-TIN-ur-int", "pos": "adj.",
   "def": "Wandering, traveling about, moving from place to place, especially to perform work.",
   "zh": "巡回的，四处奔波的",
   "syn": ["wandering", "nomadic", "peripatetic", "roving"],
   "ant": ["settled", "stationary", "sedentary"],
   "note": "an itinerant preacher / musician。与它形近的 itinerary 指「行程表」。"
  },
  {
   "word": "cull", "ipa": "rhymes with dull", "pos": "v.",
   "def": "To pick out, select from various sources, gather, collect; also, to remove rejected members from a group.",
   "zh": "挑选，采集；剔除（弱劣者）",
   "syn": ["select", "gather", "glean", "pick", "winnow"],
   "ant": ["scatter", "disperse"],
   "note": "cull information from many sources；cull a herd（淘汰牲畜）。"
  },
  {
   "word": "promulgate", "ipa": "pruh-MUHL-gayt", "pos": "v.",
   "def": "To make known, publish, proclaim, make public in an official manner.",
   "zh": "颁布，公开宣布，传播",
   "syn": ["proclaim", "publish", "announce", "disseminate"],
   "ant": ["suppress", "conceal", "withhold"],
   "note": "promulgate a law / a doctrine。名词 promulgation。"
  },
  {
   "word": "gratuitous", "ipa": "gruh-T(Y)OO-i-tus", "pos": "adj.",
   "def": "Free, given without charge or obligation; also, without legitimate cause or reason, uncalled-for, unjustified, baseless, unwarranted.",
   "zh": "无偿的；无端无故的，不必要的",
   "syn": ["unwarranted", "uncalled-for", "baseless", "unjustified"],
   "ant": ["warranted", "justified", "called-for"],
   "note": "两层义都要记住：①免费赠送 ②（更常用）毫无理由的。gratuitous violence 无端的暴力。"
  },
  {
   "word": "nomenclature", "ipa": "NOH-men-KLAY-chur", "pos": "n.",
   "def": "A system of names, especially a system of names used in a science, art, or branch of knowledge.",
   "zh": "命名法，术语体系",
   "syn": ["terminology", "naming system", "taxonomy", "vocabulary"],
   "ant": [],
   "note": "生物学的「双名法」、化学的命名体系都叫 nomenclature。"
  },
  {
   "word": "droll", "ipa": "rhymes with bowl", "pos": "adj.",
   "def": "Amusing, humorous, comical; especially, funny or witty in an odd or outrageous way.",
   "zh": "古怪有趣的，滑稽逗人的",
   "syn": ["amusing", "comical", "whimsical", "facetious", "quaint"],
   "ant": ["dull", "grave", "solemn"],
   "note": "不是大笑式的滑稽，而是「怪得好笑」。"
  },
  {
   "word": "insatiable", "ipa": "in-SAY-shuh-bul", "pos": "adj.",
   "def": "Greedy, hungry, unable to be satisfied or appeased.",
   "zh": "贪得无厌的，无法满足的",
   "syn": ["unquenchable", "voracious", "greedy", "ravenous"],
   "ant": ["satisfiable", "sated", "content"],
   "note": "insatiable appetite / curiosity。in-（不）+ satiable（可满足的）。"
  },
  {
   "word": "beguile", "ipa": "be-GYL", "pos": "v.",
   "def": "To deceive, delude, or mislead; also, to charm, amuse, or delight.",
   "zh": "欺骗，诱骗；使着迷，消磨（时间）",
   "syn": ["deceive", "charm", "enchant", "captivate", "beguile"],
   "ant": ["repel", "disenchant", "undeceive"],
   "note": "两层义：①欺骗 ②以魅力吸引（beguile the hours 消磨时光）。"
  },
  {
   "word": "vindictive", "ipa": "vin-DIK-tiv", "pos": "adj.",
   "def": "Seeking or wanting revenge, vengeful, characterized by a desire to get even.",
   "zh": "怀恨在心的，报复心重的",
   "syn": ["vengeful", "spiteful", "rancorous", "retaliatory"],
   "ant": ["forgiving", "magnanimous", "conciliatory"],
   "note": "别和 vindicate（洗清冤屈、证明正确）混淆 —— 两者意思相差很远。"
  },
  {
   "word": "replete", "ipa": "ri-PLEET", "pos": "adj.",
   "def": "Fully or richly supplied, well-stocked, chock-full, filled to capacity.",
   "zh": "充满的，充盈的",
   "syn": ["full", "abounding", "brimming", "sated", "fraught"],
   "ant": ["devoid", "empty", "bereft"],
   "note": "replete with sth。也可指「吃得饱饱的」。"
  },
  {
   "word": "preclude", "ipa": "pri-KLOOD", "pos": "v.",
   "def": "To prevent, make impossible, exclude or shut off all possibility of something happening.",
   "zh": "排除，阻止，使不可能",
   "syn": ["prevent", "forestall", "avert", "obviate", "rule out"],
   "ant": ["permit", "allow", "facilitate"],
   "note": "preclude the possibility of…；preclude sb from doing sth。"
  },
  {
   "word": "castigate", "ipa": "KAS-ti-gayt", "pos": "v.",
   "def": "To punish or criticize severely.",
   "zh": "严厉斥责，严惩",
   "syn": ["reprimand", "rebuke", "censure", "chastise", "excoriate"],
   "ant": ["praise", "commend", "laud"],
   "note": "比 censure（Level 3）语气更重。名词 castigation。"
  },
  {
   "word": "colloquial", "ipa": "kuh-LOH-kwee-ul", "pos": "adj.",
   "def": "Conversational; pertaining to, characteristic of, or used in spoken language; hence, informal, casual, natural.",
   "zh": "口语的，会话体的",
   "syn": ["informal", "conversational", "vernacular", "casual"],
   "ant": ["formal", "literary", "stilted"],
   "note": "与 vernacular 相关。colloquial 不等于「粗俗」，只是「非正式」。"
  },
  {
   "word": "obfuscate", "ipa": "AHB-fuh-skayt", "pos": "v.",
   "def": "To make obscure, cloud over, darken, make unclear or indistinct.",
   "zh": "使模糊，故意使费解",
   "syn": ["confuse", "obscure", "muddle", "cloud", "becloud"],
   "ant": ["clarify", "elucidate", "illuminate"],
   "note": "常含「故意把话说糊以便蒙混」的意味。名词 obfuscation。"
  },
  {
   "word": "facile", "ipa": "FAS-'l", "pos": "adj.",
   "def": "Easy, easily done; performed or achieved in an easy, effortless way; also, working or acting in a smooth, free, and unrestrained manner; also, superficial, simplistic, without depth.",
   "zh": "轻而易举的；（贬）肤浅的，信口而出的",
   "syn": ["easy", "effortless", "glib", "superficial", "simplistic"],
   "ant": ["difficult", "laborious", "profound"],
   "note": "⚠️ 注意褒贬两用：a facile victory（轻松取胜）vs a facile explanation（肤浅的解释）。原书提醒 facile 常带贬义。"
  },
  {
   "word": "convivial", "ipa": "kun-VIV-ee-ul", "pos": "adj.",
   "def": "Sociable, merry, festive.",
   "zh": "欢快好客的，爱交际的",
   "syn": ["sociable", "festive", "jovial", "genial", "merry"],
   "ant": ["unsociable", "dour", "austere", "reclusive"],
   "note": "a convivial gathering。与原书 Level 5 的 jovial 近义。"
  },
  {
   "word": "eschew", "ipa": "es-CHOO", "pos": "v.",
   "def": "To avoid, shun, abstain from; keep away from something harmful, wrong, or distasteful.",
   "zh": "避开，戒绝",
   "syn": ["avoid", "shun", "abstain from", "forgo", "spurn"],
   "ant": ["embrace", "seek", "indulge in"],
   "note": "读作 es-CHOO（像 s + chew）。eschew violence / luxury。"
  },
  {
   "word": "prodigious", "ipa": "pruh-DIJ-us", "pos": "adj.",
   "def": "Enormous, huge, tremendous, immense; extraordinary in size, extent, force, or degree.",
   "zh": "巨大的，惊人的",
   "syn": ["enormous", "immense", "tremendous", "colossal", "vast"],
   "ant": ["tiny", "minuscule", "insignificant"],
   "note": "a prodigious amount of work。别和 prodigal（挥霍的，Level 2）混淆。"
  },
  {
   "word": "idiosyncrasy", "ipa": "ID-ee-oh-SING-kruh-see", "pos": "n.",
   "def": "A peculiarity, distinctive characteristic of a person or group, an identifying trait or mannerism.",
   "zh": "个人特有的癖好，独特习性",
   "syn": ["peculiarity", "quirk", "eccentricity", "mannerism"],
   "ant": ["conformity", "norm", "typicality"],
   "note": "形容词 idiosyncratic。与 foible（Level 3）相关但侧重「与众不同」。"
  },
  {
   "word": "approbation", "ipa": "AP-roh-BAY-shin", "pos": "n.",
   "def": "Approval, acceptance; especially, official approval or authorization.",
   "zh": "认可，赞许；（正式）批准",
   "syn": ["approval", "sanction", "endorsement", "commendation"],
   "ant": ["disapprobation", "condemnation", "censure"],
   "note": "与 approbation 相反的 disapprobation 也常见。别和 approbation / appropriation 混淆。"
  },

  /* --- 其它级别的词，仅供 B/D 题释义查询 --- */
  {
   "word": "garrulous", "ipa": "GAR-uh-lus", "pos": "adj.", "extra": true,
   "def": "Talkative, especially in a rambling, annoying, pointless, or long-winded way.",
   "zh": "唠叨的，话多而啰嗦的",
   "syn": ["voluble", "loquacious", "verbose", "talkative"], "ant": ["taciturn", "laconic", "reticent"],
   "note": "voluble 的同义词。"
  },
  {
   "word": "tractable", "ipa": "TRAK-tuh-bul", "pos": "adj.", "extra": true,
   "def": "Manageable, easily handled or controlled, docile.",
   "zh": "易驾驭的，温顺的",
   "syn": ["docile", "manageable", "compliant", "malleable"], "ant": ["intractable", "unruly", "obstinate"],
   "note": "intractable 的反义词。"
  },
  {
   "word": "egoism", "ipa": "EE-goh-iz-'m", "pos": "n.", "extra": true,
   "def": "Self-interest as the guiding principle of conduct, selfishness.",
   "zh": "利己主义，自私",
   "syn": ["selfishness", "self-interest", "egotism"], "ant": ["altruism", "selflessness"],
   "note": "altruism 的反义词。"
  },
  {
   "word": "remorse", "ipa": "ri-MORS", "pos": "n.", "extra": true,
   "def": "Deep regret for a wrong committed, bitter repentance.",
   "zh": "悔恨，懊悔",
   "syn": ["contrition", "penitence", "compunction", "guilt"], "ant": ["impenitence", "indifference"],
   "note": "contrition 的同义词。"
  },
  {
   "word": "pupa", "ipa": "PYOO-puh", "pos": "n.", "extra": true,
   "def": "The inactive stage of an insect between larva and adult, enclosed in a case.",
   "zh": "蛹（昆虫幼虫与成虫之间的静止阶段）",
   "syn": ["chrysalis", "cocoon"], "ant": [],
   "note": "chrysalis 的同义词（chrysalis 特指蝴蝶的蛹）。"
  },
  {
   "word": "morose", "ipa": "muh-ROHS", "pos": "adj.", "extra": true,
   "def": "Gloomy, moody, glum, ill-tempered, depressed.",
   "zh": "阴郁的，闷闷不乐的",
   "syn": ["gloomy", "sullen", "dour", "saturnine"], "ant": ["jovial", "merry", "cheerful"],
   "note": "jovial 的反义词（Level 1 学过）。"
  },
  {
   "word": "lethargic", "ipa": "luh-THAHR-jik", "pos": "adj.", "extra": true,
   "def": "Sluggish, dull, lacking energy or vitality.",
   "zh": "无精打采的，倦怠的",
   "syn": ["sluggish", "torpid", "apathetic", "listless"], "ant": ["ebullient", "energetic", "vigorous"],
   "note": "ebullience 的反义形容词。"
  },
  {
   "word": "expunge", "ipa": "ek-SPUHNJ", "pos": "v.", "extra": true,
   "def": "To erase, delete, cancel, wipe out.",
   "zh": "删除，抹去",
   "syn": ["erase", "efface", "obliterate", "delete"], "ant": ["insert", "retain"],
   "note": "efface 的同义词（Level 3 学过）。"
  },
  {
   "word": "colloquialism", "ipa": "kuh-LOH-kwee-uh-liz-'m", "pos": "n.", "extra": true,
   "def": "An informal expression used in ordinary conversation.",
   "zh": "口语表达，口语词",
   "syn": ["informal expression", "vernacularism"], "ant": ["formal expression"],
   "note": "colloquial 的名词形式。"
  },
  {
   "word": "censure", "ipa": "SEN-shur", "pos": "v./n.", "extra": true,
   "def": "To blame, condemn, criticize harshly, express stern disapproval of.",
   "zh": "谴责，严厉批评",
   "syn": ["condemn", "reprimand", "rebuke", "castigate"], "ant": ["commend", "praise", "approbation"],
   "note": "castigate 的近义词（Level 3 学过）。"
  },
  {
   "word": "unquenchable", "ipa": "uhn-KWEN-chuh-bul", "pos": "adj.", "extra": true,
   "def": "Impossible to satisfy or extinguish.",
   "zh": "无法遏制的，无法满足的",
   "syn": ["insatiable", "inextinguishable", "unappeasable"], "ant": ["satisfiable"],
   "note": "insatiable 的同义词。"
  },
  {
   "word": "sated", "ipa": "SAY-tid", "pos": "adj.", "extra": true,
   "def": "Fully satisfied, having had more than enough.",
   "zh": "餍足的，充分满足的",
   "syn": ["satisfied", "gratified", "full"], "ant": ["insatiable", "hungry", "craving"],
   "note": "insatiable 的反义词。"
  },
  {
   "word": "clarify", "ipa": "KLAIR-i-fy", "pos": "v.", "extra": true,
   "def": "To make clear, explain, remove confusion from.",
   "zh": "澄清，阐明",
   "syn": ["elucidate", "explain", "illuminate"], "ant": ["obfuscate", "confuse", "cloud"],
   "note": "obfuscate 的反义词。"
  },
  {
   "word": "pacific", "ipa": "puh-SIF-ik", "pos": "adj.", "extra": true,
   "def": "Peaceful, tending to make peace, calm.",
   "zh": "和平的，爱好和平的",
   "syn": ["peaceable", "conciliatory", "peaceful"], "ant": ["pugnacious", "bellicose", "combative"],
   "note": "pugnacious 的反义词。"
  },
  {
   "word": "disapprobation", "ipa": "dis-AP-roh-BAY-shin", "pos": "n.", "extra": true,
   "def": "Disapproval, condemnation.",
   "zh": "不赞成，谴责",
   "syn": ["disapproval", "condemnation", "censure"], "ant": ["approbation", "approval"],
   "note": "approbation 的反义词。"
  },
  {
   "word": "inauspicious", "ipa": "in-aw-SPISH-us", "pos": "adj.", "extra": true,
   "def": "Unfavorable, ill-omened, not promising success.",
   "zh": "不吉利的，前景不佳的",
   "syn": ["unfavorable", "ominous", "unpromising"], "ant": ["auspicious", "favorable", "promising"],
   "note": "auspicious 的反义词。"
  },
  {
   "word": "prodigal", "ipa": "PRAH-di-gal", "pos": "adj.", "extra": true,
   "def": "Spending money recklessly or extravagantly, wasteful.",
   "zh": "挥霍的，奢侈的",
   "syn": ["wasteful", "spendthrift", "extravagant"], "ant": ["frugal", "thrifty", "provident"],
   "note": "⚠️ 别和 prodigious（巨大的）混淆 —— 只差一个字母，意思完全不同。"
  },
  {
   "word": "vindicate", "ipa": "VIN-di-kayt", "pos": "v.", "extra": true,
   "def": "To clear of blame, justify, prove to be right; also, to exact revenge for.",
   "zh": "证明无罪，为…辩白",
   "syn": ["exonerate", "absolve", "justify", "acquit"], "ant": ["incriminate", "condemn"],
   "note": "⚠️ 别和 vindictive（报复心重的）混淆。"
  },
  {
   "word": "minuscule", "ipa": "MIN-uh-skyool", "pos": "adj.", "extra": true,
   "def": "Very small, tiny, of tiny size.",
   "zh": "极小的，微小的",
   "syn": ["tiny", "minute", "diminutive", "microscopic"], "ant": ["prodigious", "enormous", "huge"],
   "note": "prodigious 的反义词。"
  }
 ],
 "parts": {
  "A": {
   "title": "词义连线（201–220）",
   "instruction": "为每个单词选出意思最接近的中文释义。每个选项只能用一次。",
   "items": [
    { "word": "voluble", "answer": "A" },
    { "word": "commiserate", "answer": "B" },
    { "word": "dilemma", "answer": "C" },
    { "word": "transitory", "answer": "D" },
    { "word": "philanthropic", "answer": "E" },
    { "word": "lethargy", "answer": "F" },
    { "word": "exonerate", "answer": "G" },
    { "word": "pugnacious", "answer": "H" },
    { "word": "contrition", "answer": "I" },
    { "word": "abrogate", "answer": "J" },
    { "word": "officious", "answer": "K" },
    { "word": "intractable", "answer": "L" },
    { "word": "altruism", "answer": "M" },
    { "word": "accolade", "answer": "N" },
    { "word": "vernacular", "answer": "O" },
    { "word": "judicious", "answer": "P" },
    { "word": "chrysalis", "answer": "Q" },
    { "word": "genteel", "answer": "R" },
    { "word": "jovial", "answer": "S" },
    { "word": "subterfuge", "answer": "T" }
   ]
  },
  "A2": {
   "title": "词义连线（221–240）",
   "instruction": "为每个单词选出意思最接近的中文释义。每个选项只能用一次。",
   "items": [
    { "word": "ebullience", "answer": "A" },
    { "word": "impervious", "answer": "B" },
    { "word": "remonstrate", "answer": "C" },
    { "word": "efface", "answer": "D" },
    { "word": "chimera", "answer": "E" },
    { "word": "incorrigible", "answer": "F" },
    { "word": "juxtapose", "answer": "G" },
    { "word": "conversant", "answer": "H" },
    { "word": "esoteric", "answer": "I" },
    { "word": "auspicious", "answer": "J" },
    { "word": "itinerant", "answer": "K" },
    { "word": "cull", "answer": "L" },
    { "word": "promulgate", "answer": "M" },
    { "word": "gratuitous", "answer": "N" },
    { "word": "nomenclature", "answer": "O" },
    { "word": "droll", "answer": "P" },
    { "word": "insatiable", "answer": "Q" },
    { "word": "beguile", "answer": "R" },
    { "word": "vindictive", "answer": "S" },
    { "word": "replete", "answer": "T" }
   ]
  },
  "A3": {
   "title": "词义连线（241–250）",
   "instruction": "为每个单词选出意思最接近的中文释义。每个选项只能用一次。",
   "items": [
    { "word": "preclude", "answer": "A" },
    { "word": "castigate", "answer": "B" },
    { "word": "colloquial", "answer": "C" },
    { "word": "obfuscate", "answer": "D" },
    { "word": "facile", "answer": "E" },
    { "word": "convivial", "answer": "F" },
    { "word": "eschew", "answer": "G" },
    { "word": "prodigious", "answer": "H" },
    { "word": "idiosyncrasy", "answer": "I" },
    { "word": "approbation", "answer": "J" }
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
    { "a": "voluble", "b": "garrulous", "answer": "S", "reason": "同义：都指「话多、滔滔不绝」。" },
    { "a": "intractable", "b": "tractable", "answer": "A", "reason": "反义：in-（不）+ tractable（易驾驭）→ intractable 难管束。" },
    { "a": "altruism", "b": "egoism", "answer": "A", "reason": "反义：altruism 利他 ↔ egoism 利己。" },
    { "a": "contrition", "b": "remorse", "answer": "S", "reason": "同义：都指「深切的悔恨」。" },
    { "a": "jovial", "b": "morose", "answer": "A", "reason": "反义：jovial 快活 ↔ morose 阴郁（Level 1 学过 morose）。" },
    { "a": "ebullience", "b": "lethargy", "answer": "A", "reason": "反义：ebullience 兴高采烈 ↔ lethargy 无精打采。" },
    { "a": "efface", "b": "expunge", "answer": "S", "reason": "同义：都指「擦去、抹掉」（Level 3 学过 expunge）。" },
    { "a": "pugnacious", "b": "pacific", "answer": "A", "reason": "反义：pugnacious 好斗 ↔ pacific 爱好和平。" },
    { "a": "insatiable", "b": "sated", "answer": "A", "reason": "反义：insatiable 无法满足 ↔ sated 已餍足。" },
    { "a": "obfuscate", "b": "clarify", "answer": "A", "reason": "反义：obfuscate 使模糊费解 ↔ clarify 澄清。" },
    { "a": "auspicious", "b": "inauspicious", "answer": "A", "reason": "反义：in- 否定前缀。auspicious 吉利 ↔ inauspicious 不吉利。" },
    { "a": "approbation", "b": "disapprobation", "answer": "A", "reason": "反义：dis- 否定前缀。approbation 赞许 ↔ disapprobation 谴责。" },
    { "a": "castigate", "b": "censure", "answer": "S", "reason": "同义：都指「严厉斥责」，castigate 语气更重（Level 3 学过 censure）。" },
    { "a": "prodigious", "b": "minuscule", "answer": "A", "reason": "反义：prodigious 巨大惊人的 ↔ minuscule 极小的。⚠️ prodigious「巨大」别与 prodigal「挥霍」混淆。" },
    { "a": "exonerate", "b": "vindicate", "answer": "S", "reason": "同义：都指「洗清罪名、证明无罪」。⚠️ vindicate 别与 vindictive（报复心重的）混淆。" }
   ]
  },
  "C": {
   "title": "选词填空",
   "instruction": "从下面的词库中为每个句子选出最合适的词。每个词只能用一次。",
   "bank": ["commiserate", "lethargy", "exonerate", "officious", "accolade", "judicious", "esoteric", "itinerant", "preclude", "obfuscate", "eschew", "prodigious"],
   "items": [
    {
     "text": "When her project failed, her colleagues called to ______ with her rather than offer advice.",
     "answer": "commiserate",
     "reason": "commiserate (with sb) = 同情、表示慰问。"
    },
    {
     "text": "A heavy lunch left the whole team in a state of ______ for the rest of the afternoon.",
     "answer": "lethargy",
     "hint": "需要「无精打采、昏昏欲睡」的含义",
     "reason": "lethargy = 无精打采、倦怠、昏昏欲睡。"
    },
    {
     "text": "New DNA evidence served to ______ the man who had spent twelve years in prison.",
     "answer": "exonerate",
     "reason": "exonerate = 免除罪责、证明无罪。与 incriminate 相对。"
    },
    {
     "text": "An ______ receptionist kept interrupting to suggest a faster route, though no one had asked.",
     "answer": "officious",
     "reason": "officious = 爱管闲事的、好插手他人事务的（含贬义）。别与 official 混淆。"
    },
    {
     "text": "The film won every major ______ the industry has to offer.",
     "answer": "accolade",
     "reason": "accolade = 荣誉、褒奖、赞扬（award, honor, tribute）。"
    },
    {
     "text": "A ______ investor spreads risk instead of chasing the hottest tip.",
     "answer": "judicious",
     "reason": "judicious = 明智审慎的、有见地的（sound judgment）。与 prudent 近义。"
    },
    {
     "text": "His lecture was so ______ that only three specialists in the audience could follow it.",
     "answer": "esoteric",
     "reason": "esoteric = 只有内行才懂的、深奥的（understood only by a select group）。"
    },
    {
     "text": "The ______ judge traveled from town to town hearing cases in remote districts.",
     "answer": "itinerant",
     "reason": "itinerant = 巡回的、四处奔波的（traveling from place to place to work）。"
    },
    {
     "text": "The company's refusal to release the data does not ______ a later review.",
     "answer": "preclude",
     "reason": "preclude = 排除、使不可能（make impossible, rule out）。"
    },
    {
     "text": "Critics accused the ministry of trying to ______ the facts with a fog of technical jargon.",
     "answer": "obfuscate",
     "hint": "需要「故意把事实搅浑」的含义",
     "reason": "obfuscate = 使模糊、故意使费解（make obscure, cloud over）。与 clarify 相反。"
    },
    {
     "text": "Her doctor advised her to ______ all processed sugar for at least six months.",
     "answer": "eschew",
     "reason": "eschew = 避开、戒绝（avoid, abstain from）。读作 es-CHOO。"
    },
    {
     "text": "Rebuilding the cathedral required a ______ amount of stone — over forty thousand tons.",
     "answer": "prodigious",
     "reason": "prodigious = 巨大的、惊人的（enormous, immense）。⚠️ 别与 prodigal（挥霍的）混淆。"
    }
   ]
  },
  "D": {
   "title": "近义辨析",
   "instruction": "选出与题干词意思最接近的一项。",
   "items": [
    {
     "word": "officious", "answer": "b",
     "reason": "officious = 爱管闲事的、好插手他人事务的（含贬义）。⚠️ 别与 official（官方的）混淆。",
     "choices": [
      { "k": "a", "t": "官方的，正式的" },
      { "k": "b", "t": "爱管闲事的，好插手的" },
      { "k": "c", "t": "冷漠疏远的" },
      { "k": "d", "t": "效率很高的" }
     ]
    },
    {
     "word": "altruism", "answer": "a",
     "reason": "altruism = 利他主义、无私。与 egoism / narcissism 相对。",
     "choices": [
      { "k": "a", "t": "利他主义，无私" },
      { "k": "b", "t": "利己主义，自私" },
      { "k": "c", "t": "自恋，自我陶醉" },
      { "k": "d", "t": "中立，不偏不倚" }
     ]
    },
    {
     "word": "impervious", "answer": "c",
     "reason": "impervious = 不可渗透的；引申为「不受影响的、无动于衷的」。impervious to criticism。",
     "choices": [
      { "k": "a", "t": "容易被感动的" },
      { "k": "b", "t": "乐于接受的" },
      { "k": "c", "t": "不可渗透的；无动于衷的" },
      { "k": "d", "t": "变化无常的" }
     ]
    },
    {
     "word": "chimera", "answer": "b",
     "reason": "chimera = 妄想、荒诞的念头（foolish fancy, figment of the imagination）。源自希腊神话的怪物。",
     "choices": [
      { "k": "a", "t": "确凿的事实" },
      { "k": "b", "t": "妄想，荒诞的念头" },
      { "k": "c", "t": "精巧的机关" },
      { "k": "d", "t": "古老的传说" }
     ]
    },
    {
     "word": "gratuitous", "answer": "d",
     "reason": "gratuitous 常用义 = 无端无故的、不必要的（uncalled-for, unwarranted）。gratuitous violence。",
     "choices": [
      { "k": "a", "t": "心怀感激的" },
      { "k": "b", "t": "需要付费的" },
      { "k": "c", "t": "理所当然的" },
      { "k": "d", "t": "无端无故的，不必要的" }
     ]
    },
    {
     "word": "facile", "answer": "a",
     "reason": "facile = 轻而易举的；⚠️ 也常带贬义指「肤浅的、信口而出的」。原书提醒这个褒贬两用。",
     "choices": [
      { "k": "a", "t": "轻而易举的；肤浅的" },
      { "k": "b", "t": "困难重重的" },
      { "k": "c", "t": "精心准备的" },
      { "k": "d", "t": "令人信服的" }
     ]
    },
    {
     "word": "vindictive", "answer": "c",
     "reason": "vindictive = 怀恨在心的、报复心重的。⚠️ 别与 vindicate（洗清冤屈）混淆。",
     "choices": [
      { "k": "a", "t": "被证明无罪的" },
      { "k": "b", "t": "宽宏大量的" },
      { "k": "c", "t": "报复心重的，怀恨在心的" },
      { "k": "d", "t": "犹豫不决的" }
     ]
    },
    {
     "word": "replete", "answer": "b",
     "reason": "replete = 充满的、充盈的（full, well-stocked）。replete with sth。",
     "choices": [
      { "k": "a", "t": "空无一物的" },
      { "k": "b", "t": "充满的，充盈的" },
      { "k": "c", "t": "被消耗殆尽的" },
      { "k": "d", "t": "反复出现的" }
     ]
    },
    {
     "word": "prodigious", "answer": "d",
     "reason": "prodigious = 巨大的、惊人的（enormous, immense）。⚠️ 别与 prodigal（挥霍的，Level 2）混淆。",
     "choices": [
      { "k": "a", "t": "挥霍无度的" },
      { "k": "b", "t": "平庸乏味的" },
      { "k": "c", "t": "极为罕见的" },
      { "k": "d", "t": "巨大的，惊人的" }
     ]
    },
    {
     "word": "idiosyncrasy", "answer": "a",
     "reason": "idiosyncrasy = 个人特有的癖好、独特习性（peculiarity, distinctive characteristic）。",
     "choices": [
      { "k": "a", "t": "个人特有的癖好，独特习性" },
      { "k": "b", "t": "普遍的共识" },
      { "k": "c", "t": "严重的疾病" },
      { "k": "d", "t": "无知的状态" }
     ]
    }
   ]
  }
 }
});
