// ================== 小说拼音字、屏蔽字修复 ==================
var replaceRuls = {
    // ===格式整理===
    // "\\(|\\[|\\{|（|【|｛":"（",
    // "\\)|\\]|\\}|）|】|｝":"）",
    ",": "，",
    "\\*|＊":"*",
    "[wWｗＷ]{3}":"www",
    "w{3}(\u3001|\u3002)":"www.",
    "[cCｃＣ][oOｏＯ][mMｍＭ]":"com",
    "[nNｎＮ][eｅEＥ][tｔTＴ]":"net",
    "[cCｃＣ][nNｎＮ]":"cn",
    "(\\.|\u3001|\u3002)com":".com",
    "(\\.|\u3001|\u3002)net":".net",
    "(\\.|\u3001|\u3002)cn":".cn",
    "[pPｐＰ][sSｓＳ][:：]":"ps:",
    "。{5,7}":"……","~{2,50}":"——","…{3,40}": "……","－{3,20}":"——",
    //"。(,|，|。)": "。",
    "？(,|，)": "？",
    //"”(,|，|。)": "”",
    "@{3,}": "",

	// === 一些特殊的替换 ===
    "\\[+CP.*(http://file.*\\.jpg)\\]+": "<img src='$1'>",
    "『(.)』": "$1",  // "『色』": "色",
    
    // === 去广告 ===
    "\\[搜索最新更新尽在[a-z\\.]+\\]": "",
    "<a>手机用户请到m.qidian.com阅读。</a>": "",
    ".{2,4}中文网欢迎广大书友": "",
    "访问下载txt小说":"",
    "\\[\\]":"",
    "全文字无广告": "",
    "uutxt\\.org": "",
    "3vbook\\.cn": "",
    "txt53712/": "",
    "\xa0{4,12}":"\xa0\xa0\xa0\xa0\xa0\xa0\xa0",

    // === 星号屏蔽字还原 ===
    "十有(\\*{2})":"十有八九", "\\*(2)不离十":"八九不离十",
    "G(\\*{2})":"GSM", "感(\\*{2})彩":"感情色彩",
    "强(\\*{2})u5B9D":"强大法宝",

    // === 多字替换 ===
    "cao之过急":"操之过急",
    "大公无si":"大公无私",
    "fu道人家":"妇道人家",
    "空dangdang":"空荡荡",
    "yin奉阳违":"阴奉阳违",

    // === 双字替换 ===
    "暧m[eè][iì]":"暧昧",
    "b[ěe]i(\\s|&nbsp;)*j[īi]ng":"北京","半shen": "半身", "b[ìi]j[ìi]ng":"毕竟", "报(了?)jing":"报$1警",
    "ch[oō]ngd[oò]ng":"冲动", "cao(练|作)":"操$1", "缠mian": "缠绵", "成shu": "成熟", "赤lu[oǒ]": "赤裸", "春guang": "春光", "chun风":"春风", "沉mi":"沉迷", "刺ji":"刺激", "chao红":"潮红", "初chun":"初春",
    "dang校": "党校", "da子": "鞑子", "大tui":"大腿", "diao丝": "屌丝", "d[úu](?:\\s|&nbsp;|<br/>)*l[ìi]": "独立", "dú *cái":"独裁", "d?[iì]f[āa]ng":"地方", "d[ìi]\\s*d[ūu]":"帝都", "di国":"帝国", "du\\s{0,2}c[áa]i":"独裁",
    "f[ǎa]ngf[óo]":"仿佛", "fei踢": "飞踢", "feng流": "风流", "风liu": "风流", "f[èe]nn[ùu]":"愤怒",
    "gao潮": "高潮", "干chai": "干柴", "gu[oò]ch[ée]ng":"过程", "gu[āa]nx[iì]":"关系", "g[ǎa]nji[àa]o":"感觉", "国wu院":"国务院",
    "han住": "含住", "hai洛因": "海洛因", "红fen": "红粉", "火yao": "火药", "h[ǎa]oxi[àa]ng":"好像", "hu[áa]ngs[èe]":"黄色", "皇d[ìi]":"皇帝", "昏昏yu睡":"昏昏欲睡", "回dang":"回荡",
    "jian臣":"奸臣", "jian货":"贱货", "jing察":"警察", "j[ìi]nháng":"进行", "ji烈":"激烈", "j[iì](nv|女)": "妓女", "jirou": "鸡肉", "ji者":"记者", "ju花":"菊花","j[īi]动":"激动", "jili[èe]":"激烈", "肌r[òo]u":"肌肉","ji射":"激射", "ji[ēe]ch[uù]":"接触", "j[ùu]li[èe]": "剧烈", "jǐng惕": "警惕", "节cao":"节操",
    "k[ěe]n[ée]ng": "可能", "开bao": "开苞",  "k[àa]o近": "靠近", "口wen":"口吻",
    "ling辱": "凌辱", "luan蛋": "卵蛋", "脸sè": "脸色", "lu出":"露出",
    "m[ǎa]ny[ìi]":"满意", "m[ǎa]sh[àa]ng":"马上", "m[ée]iy[oǒ]u":"没有", "mei国": "美国", "m[íi]ngb[áa]i":"明白", "迷huan": "迷幻", "mi茫":"迷茫", "m[íi]n\\s{0,2}zh[ǔu]": "民主", "迷jian": "迷奸", "mimi糊糊":"迷迷糊糊", "末(?:\\s|<br/?>)*ì":"末日", "面se":"面色", "mengmeng":"蒙蒙", 
    "nàme":"那么", "n[ée]ngg[oò]u":"能够", "nán\\s{0,2}hǎi": "那会", "内jian":"内奸",
    "pi[áa]o客":"嫖客", "p[áa]ngbi[āa]n":"旁边",
    "q[íi]gu[àa]i":"奇怪", "qin兽":"禽兽", "q[iī]ngch[uǔ]":"清楚", "球mi":"球迷", "青chun":"青春", "青lou":"青楼",
    "r[úu]gu[oǒ]":"如果", "r[oó]ngy[ìi]":"容易", "ru白色": "乳白色", "rén员":"人员", "rén形":"人形", "人chao":"人潮", 
    "she(门|术|手|程|击)":"射$1", "sh[iì]ji[eè]":"世界", "sh[ií]ji[aā]n":"时间", "sh[ií]h[oò]u": "时候", "sh[ií]me":"什么", "si人":"私人", "shi女":"侍女", "shi身": "失身", "sh[ūu]j[ìi]":"书记", "shu女": "熟女", "上chuang": "上床", "呻y[íi]n": "呻吟", "sh[ēe]ngzh[íi]": "生殖", "深gu": "深谷", "双xiu": "双修", "生r[ìi]": "生日", "si盐":"私盐", "shi卫":"侍卫", "si下":"私下", "sao扰":"骚扰", "ｓｈｕａｎｇ　ｆｅｎｇ":"双峰", 
    "t[uū]r[áa]n":"突然", "tiaojiao": "调教", "推dao": "推倒", "脱guang": "脱光", "t[èe]bi[ée]":"特别", "t[ōo]nggu[òo]":"通过", "tian来tian去":"舔来舔去",
    "w[ēe]ixi[ée]":"威胁", "wèizh[ìi]":"位置", "wei员":"委员",
    "xiu长": "修长", "亵du": "亵渎", "xing福": "幸福", "小bo":"小波", "xiong([^a-z])":"胸$1", "小tui":"小腿",
    "yin(谋|险|沉|沟|癸派)":"阴$1", "y[iī]y[àa]ng":"一样", "y[īi]di[ǎa]n":"一点", "y[ǐi]j[īi]ng":"已经", "疑huo":"疑惑", "影mi":"影迷",  "阳w[ěe]i": "阳痿", "yao头": "摇头", "yaotou": "摇头", "摇tou": "摇头", "yezhan": "野战", "you饵": "诱饵", "(?:you|诱)(?:惑|huo)": "诱惑", "you导": "诱导", "引you": "引诱", "you人": "诱人","旖ni":"旖旎", "yu念":"欲念", "you敌深入":"诱敌深入", 
    "z[iì]j[iǐ]": "自己","z[ìi](?:\\s|<br/?>|&nbsp;)*y[oó]u": "自由","zh[iī]d?[àa]u?o":"知道","zha药": "炸药", "zhan有": "占有", "政f[ǔu]": "政府", "zh[èe]ng\\s{0,2}f[uǔ]": "政府", "zong理":"总理", "zh[ōo]ngy[āa]ng": "中央", "中yang":"中央", "zu[oǒ]y[oò]u":"左右", "zh[oō]uw[ée]i":"周围", "中nan海":"中南海", "中j委":"中纪委", "中zu部":"中组部", "政zhi局":"政治局", "(昨|一|时|余)(?:<br/?>|&nbsp;|\\s)*ì":"$1日",

    // === 单字替换 ===
    "b[āà]ng":"棒","bào":"爆","bà":"吧","bī":"逼","bō":"波",
    "cāo": "操", "cǎo": "草", "cào": "操", "chāng": "娼", "chang": "娼", "cháo": "潮", "chā": "插", "chéng": "成", "chōu": "抽", "chuáng": "床", "chún": "唇", "chūn": "春", "cuō": "搓", "cū": "粗",
    "dǎng": "党", "dàng": "荡", "dāo": "刀", "dòng": "洞", "diao": "屌",
    "fǎ": "法", "féi": "肥", "fù": "妇", 
    "guān": "官",
    "hán": "含", "hóu": "喉", "hòu": "厚", "h(u)?ā": "花", "huá": "华", "huò": "惑", "hùn": "混", "hún": "魂",
    "jiǔ": "九", "jīng": "精", "jìn": "禁", "jǐng": "警", "jiāng": "江", "jiān": "奸", "jiāo": "交", "jūn": "军", "jū": "拘", "jú": "局", "jī": "激", "激ān":"奸",
    "kù": "裤", "kàn": "看",
    "[1l]àng": "浪", "liáo": "撩", "liú":"流", "lì":"莉", "liè":"烈", "[1l]uàn":"乱", "lún":"伦", "luǒ":"裸", "lòu":"露", "[l1]ù":"露", "lǜ":"绿",
    "mǎi": "买", "mài": "卖", "máo": "毛", "mā": "妈", "méng": "蒙", "mén": "门", "miè": "灭", "mí": "迷", "mì": "蜜", "mō": "摸",
    "nǎi": "奶", "nèn": "嫩", "niào": "尿", "niē": "捏", "nòng": "弄", "nǚ": "女",
    "pào": "炮", "piàn": "片",
    "qiāng": "枪", "qíng": "情", "qīn": "亲", "qiú": "求", "quán": "全",
    "rén":"人", "rì": "日",  "</p>\\n<p>\\s*ì":"日", "rǔ": "乳",
    "sāo":"骚", "sǎo": "骚", "sè": "色",  "shā": "杀", "shēn":"呻", "shén":"神", "shè": "射", "shǐ": "屎", "shì": "侍", "sǐ": "死", "sī": "私", "shǔn": "吮", "sǔn": "吮", "sū": "酥",
    "tān":"贪", "tiǎn": "舔", "tǐng":"挺", "tǐ": "体", "tǒng": "捅", "tōu": "偷", "tou": "偷", "tuǐ": "腿", "tūn": "吞", "tún": "臀", "tiáo":"调", "tài":"态",
    "wēn": "温", "wěn": "吻",
    "xiǎo":"小", "xìng": "性", "xiōng": "胸", "xī": "吸", "xí": "习", "xué": "穴", "xuè": "穴", "xùe": "穴",  "xuan":"宣",
    "yāng":"央", "yàn":"艳", "yīn":"阴", "yào": "药", "yé": "爷", "yòu": "诱", "zàng": "脏", "yù": "欲", "yín": "淫",
    "zhēn":"针", "zēn":"针", "zhà":"炸", "zhèng":"政", "zǒu": "走", "zuì":"罪", "zuò":"做", "zhōng":"中",

    // === 可能误替换的 ===
    "([^a-z])ri([^a-z])":"$1日$2", "([^a-z])se([^a-z])":"$1色$2", "([^a-z])yu([^a-z])":"$1欲$2", "([^a-z])xing([^a-z])":"$1性$2",
    "([^a-z])jing([^a-z])":"$1精$2", "([^a-z])ting([^a-z])":"$1挺$2",

    // ===误替换还原===
    "碧欲": "碧玉", "美欲": "美玉","欲石": "玉石","惜欲": "惜玉","宝欲": "宝玉",
    "品性": "品行", "德性": "德行",
    "波ok": "book", "波SS": "BOSS",

    // ===其他修正===
    "弥俩": "你俩",
    "妳": "你",
    "圞|垩|卝|龘":""
};

function contentReplacement(text) {
	for (var key in replaceRuls) {
		text = text.replace(new RegExp(key, "ig"), replaceRuls[key]);
	}
	return text;
}
