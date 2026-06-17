import { MBTIType, MBTIDetails, Character, Relationship } from '../types';

export const MBTI_INFOS: Record<MBTIType, MBTIDetails> = {
  INTJ: {
    type: 'INTJ',
    title: '建筑师 (Architect)',
    category: 'Analysts',
    categoryCn: '理性分析家',
    colorClass: 'border-purple-500 text-purple-600 bg-purple-50',
    bgClass: 'from-purple-100 to-indigo-100',
    accentColor: '#8B5CF6',
    strengths: ['见解独到', '追求高效', '独立自主', '策略性思维'],
    weaknesses: ['容易自负', '情感疏离', '过于吹毛求疵', '不喜常规约束'],
    mbtiDescription: '具有宏伟的愿景与深谋远虑，善于通过逻辑与战略达成目标。通常显得冷静少言，是极致的智多星。'
  },
  INTP: {
    type: 'INTP',
    title: '逻辑学家 (Logician)',
    category: 'Analysts',
    categoryCn: '理性分析家',
    colorClass: 'border-violet-500 text-violet-600 bg-violet-50',
    bgClass: 'from-violet-100 to-purple-100',
    accentColor: '#7C3AED',
    strengths: ['头脑聪明', '思维严谨', '不拘一格', '纯粹客观'],
    weaknesses: ['行动力弱', '容易焦虑', '容易沉浸在概念中忽视现实', '难以捉摸'],
    mbtiDescription: '对知识与逻辑有极高的热忱。他们像不懈的发现者，通过拆解和重新组合系统来获得智力上的满足。'
  },
  ENTJ: {
    type: 'ENTJ',
    title: '指挥官 (Commander)',
    category: 'Analysts',
    categoryCn: '理性分析家',
    colorClass: 'border-indigo-500 text-indigo-600 bg-indigo-50',
    bgClass: 'from-indigo-100 to-sky-100',
    accentColor: '#4F46E5',
    strengths: ['决断力强', '意志坚定', '天生的领导者', '卓越的组织能力'],
    weaknesses: ['过于固执', '容易独断', '缺乏感性支持', '可能显得冷酷'],
    mbtiDescription: '将效率和秩序放在第一位，天生具有统御全盘与战略眼光，能够果断地制定和执行最具挑战性的长远规划。'
  },
  ENTP: {
    type: 'ENTP',
    title: '辩论家 (Debater)',
    category: 'Analysts',
    categoryCn: '理性分析家',
    colorClass: 'border-fuchsia-500 text-fuchsia-600 bg-fuchsia-50',
    bgClass: 'from-fuchsia-100 to-pink-100',
    accentColor: '#D946EF',
    strengths: ['博学多才', '风趣幽默', '创造力爆棚', '适应力强'],
    weaknesses: ['缺乏耐心', '热衷刁难', '不拘小节导致承诺难以兑现', '容易分心'],
    mbtiDescription: '他们是智力拼图的狂热爱好者，追求用新颖的、出人意料的方法颠覆传统和解决问题。'
  },
  INFJ: {
    type: 'INFJ',
    title: '提倡者 (Advocate)',
    category: 'Diplomats',
    categoryCn: '温和外交家',
    colorClass: 'border-teal-500 text-teal-600 bg-teal-50',
    bgClass: 'from-teal-100 to-emerald-100',
    accentColor: '#0D9488',
    strengths: ['富有洞察力', '信念坚定', '热心助人', '极其富有利他信念'],
    weaknesses: ['极其敏感', '追求完美至极', '保护色彩浓厚', '极易精力耗尽'],
    mbtiDescription: '极为罕见的性格类型，天生怀揣理想，不仅是空想家，更是脚踏实地改变现状、温暖他人的奉献者。'
  },
  INFP: {
    type: 'INFP',
    title: '调停者 (Mediator)',
    category: 'Diplomats',
    categoryCn: '温和外交家',
    colorClass: 'border-emerald-500 text-emerald-600 bg-emerald-50',
    bgClass: 'from-emerald-100 to-green-100',
    accentColor: '#059669',
    strengths: ['极具共情力', '思想开明', '充满艺术灵感', '忠于自我追求'],
    weaknesses: ['过分理想化', '自我贬低', '容易在压力下逃避', '忽视现实细节'],
    mbtiDescription: '温柔、体贴而充满创造力，对内心信念有着极高的忠诚度，热衷于在精神世界中追寻和谐、美感与生活的深层意义。'
  },
  ENFJ: {
    type: 'ENFJ',
    title: '主人公 (Protagonist)',
    category: 'Diplomats',
    categoryCn: '温和外交家',
    colorClass: 'border-rose-500 text-rose-600 bg-rose-50',
    bgClass: 'from-rose-100 to-orange-100',
    accentColor: '#E11D48',
    strengths: ['富有感召力', '利他而无私', '忠诚可靠', '极佳的人际沟通者'],
    weaknesses: ['过度理想化', '容易把责任往身上揽', '过于在乎他人的认可', '容易过度敏感'],
    mbtiDescription: '极具领袖气质的理想主义者，散发着坚定的热忱，致力于感召他人、创造更为宽仁和平等的美好世界。'
  },
  ENFP: {
    type: 'ENFP',
    title: '竞选者 (Campaigner)',
    category: 'Diplomats',
    categoryCn: '温和外交家',
    colorClass: 'border-amber-500 text-amber-600 bg-amber-50',
    bgClass: 'from-amber-100 to-orange-100',
    accentColor: '#D97706',
    strengths: ['天性活泼', '想象力奇特', '热情洋溢的社交达人', '富有同理心'],
    weaknesses: ['极度情绪起伏', '难以坚持细节', '渴求被人关注', '思虑过度陷入内耗'],
    mbtiDescription: '不受拘束的探险家，他们是温暖的社交催化剂。在任何人事物中，他们都能敏锐察觉出新奇的可能性和美好愿景。'
  },
  ISTJ: {
    type: 'ISTJ',
    title: '物流师 (Logistician)',
    category: 'Sentinels',
    categoryCn: '踏实守护者',
    colorClass: 'border-blue-500 text-blue-600 bg-blue-50',
    bgClass: 'from-blue-100 to-slate-100',
    accentColor: '#2563EB',
    strengths: ['极其诚实', '责任心极强', '作风严谨', '做事井井有条'],
    weaknesses: ['固执古板', '不善变通', '容易习惯性自责', '略显不近人情'],
    mbtiDescription: '社会的基石，极重规则与家庭诺言，冷静而坚定地履行每一个任务，是所有人眼中最稳重、最靠得住的守护人。'
  },
  ISFJ: {
    type: 'ISFJ',
    title: '守卫者 (Defender)',
    category: 'Sentinels',
    categoryCn: '踏实守护者',
    colorClass: 'border-cyan-500 text-cyan-600 bg-cyan-50',
    bgClass: 'from-cyan-100 to-sky-100',
    accentColor: '#0891B2',
    strengths: ['极其忠诚', '体贴入微', '可靠且脚踏实地', '出色的敏锐观察'],
    weaknesses: ['过于谦逊', '容易把情绪憋在心里', '抗拒改变现状', '时常超负荷工作'],
    mbtiDescription: '极为温暖、无私的保护者，不喜声张，时刻细心关注着身边人的生活需要，用默而无言的行动默默支撑着他人的避风港。'
  },
  ESTJ: {
    type: 'ESTJ',
    title: '总经理 (Executive)',
    category: 'Sentinels',
    categoryCn: '踏实守护者',
    colorClass: 'border-sky-500 text-sky-600 bg-sky-50',
    bgClass: 'from-sky-100 to-indigo-100',
    accentColor: '#0284C7',
    strengths: ['坚忍不拔', '办事效率高', '忠实履行诺言', '组织井然有序'],
    weaknesses: ['过于死板', '不易接受不合常规的事物', '忽略情感需求', '控制欲较强'],
    mbtiDescription: '传统的守护与创造者，代表着极佳的权威规范，能迅速建立起社会准则，督促团队朝着共同的目的地大步前行。'
  },
  ESFJ: {
    type: 'ESFJ',
    title: '执政官 (Consul)',
    category: 'Sentinels',
    categoryCn: '踏实守护者',
    colorClass: 'border-pink-500 text-pink-600 bg-pink-50',
    bgClass: 'from-pink-100 to-red-100',
    accentColor: '#DB2777',
    strengths: ['非常有热心', '注重家庭与秩序', '极其擅长照拂他人', '务实坦率'],
    weaknesses: ['容易讨好别人', '非常抗拒被孤立', '面对指责会受伤', '思维可能偏局促'],
    mbtiDescription: '社交核心的温暖存在。他们总是主动协助大家、调节气氛。在家庭、同僚和同伴中编织出一张关爱周密的安全网。'
  },
  ISTP: {
    type: 'ISTP',
    title: '鉴赏家 (Virtuoso)',
    category: 'Explorers',
    categoryCn: '自由探险家',
    colorClass: 'border-orange-500 text-orange-600 bg-orange-50',
    bgClass: 'from-orange-100 to-amber-100',
    accentColor: '#EA580C',
    strengths: ['极客精神', '动手能力极强', '临危不乱', '思维极度务实'],
    weaknesses: ['自说自话', '私密空间极高', '厌恶长期承诺', '容易冒险过火'],
    mbtiDescription: '充满好奇心的实干家，他们通常通过感官探索、制作工具、或者用惊人的动作直觉在危机和战场中力挽狂澜。'
  },
  ISFP: {
    type: 'ISFP',
    title: '探险家 (Adventurer)',
    category: 'Explorers',
    categoryCn: '自由探险家',
    colorClass: 'border-yellow-500 text-yellow-600 bg-yellow-50',
    bgClass: 'from-yellow-100 to-rose-100',
    accentColor: '#CA8A04',
    strengths: ['感知艺术美', '随遇而安', '行动力充满激情', '待人真诚质朴'],
    weaknesses: ['时间观念若无', '容易被情绪拉扯', '强烈抗拒束缚', '极不善于逻辑说服'],
    mbtiDescription: '纯粹的生活艺术家。他们不愿被常规拘限，渴望探索新的视觉、美学、甚至打破框架的生活方式，用丰沛的情感度过当下。'
  },
  ESTP: {
    type: 'ESTP',
    title: '挑战者 (Entrepreneur)',
    category: 'Explorers',
    categoryCn: '自由探险家',
    colorClass: 'border-red-500 text-red-600 bg-red-50',
    bgClass: 'from-red-100 to-amber-100',
    accentColor: '#DC2626',
    strengths: ['敢做敢当', '适应极为敏捷', '极富说服力', '善于化危机为生机'],
    weaknesses: ['缺乏长远眼光', '急躁鲁莽', '可能缺乏社交委婉', '抗拒抽象条理'],
    mbtiDescription: '极其充沛和充满爆发力的求生者，他们热衷穿梭于社交派对、运动场或紧迫的关头中，极其不凡的本能直觉总能开辟生路。'
  },
  ESFP: {
    type: 'ESFP',
    title: '表演者 (Entertainer)',
    category: 'Explorers',
    categoryCn: '自由探险家',
    colorClass: 'border-amber-600 text-amber-700 bg-amber-50',
    bgClass: 'from-amber-100 to-yellow-100',
    accentColor: '#D97706',
    strengths: ['具有感召力', '极其合群乐观', '高超的即兴展示', '极懂生活乐趣'],
    weaknesses: ['极其缺乏深思', '极易对抽象事物厌倦', '不喜面对冲突压力', '理财极易无序'],
    mbtiDescription: '他们是聚光灯偏爱的灵魂，时刻向世界挥洒能量。不仅拥有强烈的直观美感，更能调配全场的感官狂欢。'
  }
};

export const CHARACTERS: Character[] = [
  {
    id: 'naruto',
    name: '漩涡鸣人 / Naruto Uzumaki',
    anime: '火影忍者',
    mbti: 'ENFP',
    avatarColor: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
    avatarEmoji: '🍥',
    quote: '说到做到，这就是我的忍道！',
    summary: '鸣人是经典的 ENFP 竞选者。他乐观开朗，具有不可思议的感染力，能将曾经的敌人变成同伴。他由直觉和崇高的情感愿景驱动，不屑于死板的传统规则，坚持追寻“打破仇恨锁链”的未来。',
    plotProof: '在《佩恩突袭篇》中，鸣人不仅依靠实力击败佩恩，更是在精神世界凭着强大的理想主义，纯靠言语和真诚说服了长门，促使其复活村子的人。这展现了 ENFP 难以置信的共情力和愿景驱动力。',
    fandomDiscussion: '粉丝社区普遍一致认为鸣人是标准 ENFP 的教科书案例。国内外论坛如 Reddit、DBDB 等在讨论鸣人时，都高度赞扬他那种“把不可能变成可能”的直觉创造性，以及在痛苦中依然能保持对理想未来的乐观不屈。',
    strengths: ['无可比拟的领袖感染力', '强大的利他精神', '在绝境中寻找新路的出色灵感'],
    weaknesses: ['冲动鲁莽，前期极其反感条条框框', '常常忽略逻辑可行性'],
    dimensions: { E: 85, N: 75, T: 25, P: 80 },
    matches: {
      perfect: ['INTJ', 'INFJ'],
      good: ['INFP', 'ENFJ', 'ENTP']
    }
  },
  {
    id: 'sasuke',
    name: '宇智波佐助 / Sasuke Uchiha',
    anime: '火影忍者',
    mbti: 'INTJ',
    avatarColor: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
    avatarEmoji: '⚡',
    quote: '我已经睁开了双眼，我将在黑暗中看到未来。',
    summary: '佐助是典型的 INTJ 建筑师。他是一个极其内敛、冷静、高智商且目标极其明确的独行侠。他的决策完全由长期的缜密复仇战略引导，不轻易为无谓 of 社交或情感波动所动摇。',
    plotProof: '他在复仇鼬的过程中表现出惊人的计划性：跟随大蛇丸习武，一旦完成修习便无情弑师；在面对死局时通过写轮眼洞察并拆解敌人所有术逻辑。佐助甚至曾在最后提出通过“承担世间所有仇恨”来重组忍界格局的终极理性（又有些偏激）的长远设想。',
    fandomDiscussion: '虽然中途佐助的情绪有些因写轮眼疯狂，但粉丝多认为这是 INTJ 的“功能重组”现象（Ni-Fi loop）。他在大部分行动中极度自律且目标主导，是个智力超群、不废话的执行者。',
    strengths: ['惊人的战略性洞察力', '不屈不挠、超常的专注力', '极其独立与理智的自我控制'],
    weaknesses: ['极端孤立，易陷入一意孤行的偏执', '对友情等社交情感极度笨拙、抗拒'],
    dimensions: { E: 15, N: 85, T: 80, P: 20 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['INFJ', 'INTP', 'ENTJ']
    }
  },
  {
    id: 'luffy',
    name: '蒙奇·D·路飞 / Luffy',
    anime: '航海王',
    mbti: 'ESFP',
    avatarColor: 'linear-gradient(135deg, #DC2626 0%, #F87171 100%)',
    avatarEmoji: '👒',
    quote: '我是要成为海贼王的男人！',
    summary: '路飞是十足的 ESFP 表演者。他彻底活在当下，由强烈的感官体验与本能引导。他从不规划二十年后的详细战略，而是跟随每一个岛屿的冒险直率而行。他极富感染力，能迅速把四周的人拉入欢乐和激情的旋涡中。',
    plotProof: '在空岛篇、水之都篇以及和之国篇展现得淋漓尽致：他能用无比热情的即兴行动让所有人为之振奋，面对路上的不平直接出拳。他爱派对、爱吃肉、爱热闹，每一次战斗都充满了惊人的即兴发挥（如齿轮变身）。',
    fandomDiscussion: '粉丝常开玩笑说路飞大脑完全不装复杂概念（极低N），是感官运动（Se）的巅峰代表。社区一致认定任何深沉反思都不符合路飞，他的魅力来自于毫无保留和虚饰的纯粹当下能量。',
    strengths: ['超凡的即兴环境适应力', '纯粹、能瞬间感染万众的乐观热忱', '在感官世界中有极高的本能反应'],
    weaknesses: ['极度缺乏周密长远的规划思维', '经常无视任何客观理论与风险预演'],
    dimensions: { E: 90, N: 15, T: 30, P: 85 },
    matches: {
      perfect: ['ISFJ', 'ISTJ'],
      good: ['ISFP', 'ESFJ', 'ESTP']
    }
  },
  {
    id: 'zoro',
    name: '罗罗诺亚·索隆 / Roronoa Zoro',
    anime: '航海王',
    mbti: 'ISTP',
    avatarColor: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    avatarEmoji: '⚔️',
    quote: '受尽苦难而不厌，此乃阿修罗之路。',
    summary: '索隆是卓越的 ISTP 鉴赏家。他沉默寡言，是一个喜欢依靠实际行动解决问题的硬汉。他对周遭环境拥有致命的洞察和极其冷静的抗压能力，日常沉浸在不断打磨剑术技艺（Ti-Se）的枯燥修行中。',
    plotProof: '在《恐怖三桅帆船篇》中，索隆说出“什么都没发生过”并吞下路飞全部伤痛。这是他极重承诺而把情感藏于沉默之中的终极展现。在每一次遇到迷宫、强敌时，他总能以实干家的方式迅速杀出一条血路，虽然是个路痴，但他绝不放弃对剑阵精湛动作细节的追求。',
    fandomDiscussion: '论坛普遍将其归入 ISTP，因为他和 INTP 的抽象思考不同，他极度关注身体表现与真实物体的刀锋交互（Se）。他是个冷静的大哥，不娇气、不动摇、极其专注于实用主义行动。',
    strengths: ['临危不乱的钢铁意志与抗压性', '对动作、技能高水平的实地专精', '重义气，行动高效，拒绝任何华而不实'],
    weaknesses: ['极其孤僻，拒绝分享内心脆弱', '缺乏人际温情沟通的耐性'],
    dimensions: { E: 12, N: 30, T: 85, P: 75 },
    matches: {
      perfect: ['ESTJ', 'ENTJ'],
      good: ['ISTJ', 'ISFP', 'ESTP']
    }
  },
  {
    id: 'tanjiro',
    name: '灶门炭治郎 / Tanjiro Kamado',
    anime: '鬼灭之刃',
    mbti: 'ENFJ',
    avatarColor: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
    avatarEmoji: '🌊',
    quote: '就算痛苦得要死，也要努力向前迈进！',
    summary: '炭治郎是温柔而具有强大感召力的 ENFJ 主人公。他天生利他，不仅深爱着自己的家人们与朋友们，甚至能对悲伤离散的“恶鬼”产生发自内心的悲悯与理解，用温柔感化着残酷世界的每一个角落。',
    plotProof: '无论是忍受刺骨严寒日夜练习水之呼吸，还是在击败手鬼、蛛鬼累等强敌后，为它们落泪并双手合十祈祷往生，炭治郎始终是由高尚纯正的道德责任和深沉的无私大爱推动前行，他的一举一动深深鼓舞着怯懦的善逸与粗鲁的伊之助。',
    fandomDiscussion: '粉丝在讨论炭治郎时，无不被其“暖男天花板”的魅力打动。MBTI 社区认为他的主导功能是外向情感（Fe），总是在细致考虑每个群体的感受，是典型的、高阶的理想感化型领袖。',
    strengths: ['无人能及的终极同理心与善良', '强大的精神感召力与凝聚力', '高度负责，做事认真条理'],
    weaknesses: ['容易牺牲自我到透支生命的程度', '常给他人带来过于沉重的完美道德背负'],
    dimensions: { E: 75, N: 70, T: 20, P: 25 },
    matches: {
      perfect: ['INFP', 'INTP'],
      good: ['ENFP', 'INFJ', 'ISFJ']
    }
  },
  {
    id: 'gojo',
    name: '五条悟 / Satoru Gojo',
    anime: '咒术回战',
    mbti: 'ENTP',
    avatarColor: 'linear-gradient(135deg, #1E40AF 0%, #60A5FA 100%)',
    avatarEmoji: '🕶️',
    quote: '没关系，因为我是最强的。',
    summary: '五条悟是闪耀而离经叛道的 ENTP 辩论家。他行事作风随性洒脱、风趣爱开玩笑，极其抗拒死板的保守派高层规则（Ne）。他热衷于打破常规思维，挑战旧体制，用一种半玩乐、半挑衅的戏谑形式颠覆咒术界。',
    plotProof: '他没有选择简单杀光所有保守高层，而是出于深谋远虑的未来主义眼光，决定“通过教育培养新一代强大伙伴”来温和革新，这展现了极强的远瞻直觉（Ne）。面对强敌时，他的无量空处与六眼逻辑甚至充满了解析维度的创新戏耍，让人叹为观止。',
    fandomDiscussion: '社区一致热议并认定五条悟是 ENTP。他思维雀跃闪烁、不按套路出牌、爱恶作剧戏弄伏黑惠，但心底里对未来有着长远的、充满前瞻意义的反叛规划，具有颠覆性的个人魅力。',
    strengths: ['顶尖的创新性问题解决力', '强大的打破旧界限反叛精神', '充满魔力、让人无法移开视线的社交凝聚力'],
    weaknesses: ['过于狂妄散漫，极易显得不尊重他人', '不爱处理繁杂而必须遵守的日常行政细节'],
    dimensions: { E: 82, N: 88, T: 75, P: 78 },
    matches: {
      perfect: ['INFJ', 'INTJ'],
      good: ['INFP', 'ENFP', 'INTP']
    }
  },
  {
    id: 'eren',
    name: '艾伦·耶格尔 / Eren Yeager',
    anime: '进击的巨人',
    mbti: 'ISFP',
    avatarColor: 'linear-gradient(135deg, #78350F 0%, #92400E 100%)',
    avatarEmoji: '🕊️',
    quote: '如果不战斗，就赢不了；只要赢了，就能活下去。',
    summary: '艾伦是狂热、执拗而深具艺术悲剧感的 ISFP 探险家。他内外交织着对“自由”极其偏执的独特价值追求。他极少使用复杂的逻辑功利主义算计（如阿尔敏或吉克），而是一生受困并受赐于那一股追求纯粹自由的内心强烈情感。',
    plotProof: '在看清海洋彼端的残酷真相前，他的所有愤怒都极度直观且发自肺腑：对墙内安逸如家畜的耻辱感。他在第四季《地鸣篇》中的抉择绝非精细地平衡利益，而是为了那一幅“干净的、没有任何墙阻挡的、绝对自由的开辟大地”的纯粹而执拗的内心图景。',
    fandomDiscussion: '艾伦的 MBTI 曾引发数年论战。部分人提过他是 ESFP 或 INTJ（在伪装成救世主时）。但如今共识倾向于他是 Fi-Se 高度爆发的 ISFP（处于偏激悲剧状态下）。他活在自己对于自由的纯度信念中，并将其付诸地动山摇的惊人身体行动。',
    strengths: ['无视一切规劝禁锢的破壁意志', '极强的信念驱动与行动投射性', '对所爱同伴极度热烈而深沉的私密守护'],
    weaknesses: ['极其偏激与狭隘，完全不接受妥协路线', '情绪容易在主观痛苦中走向毁灭性的地步'],
    dimensions: { E: 20, N: 40, T: 25, P: 70 },
    matches: {
      perfect: ['ESFJ', 'ENFJ'],
      good: ['ESTJ', 'ISFP', 'ISTP']
    }
  },
  {
    id: 'mikasa',
    name: '三笠·阿克曼 / Mikasa Ackerman',
    anime: '进击的巨人',
    mbti: 'ISTJ',
    avatarColor: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
    avatarEmoji: '🧣',
    quote: '世界是残酷的，但也是如此的美丽。',
    summary: '三笠是典型的 ISTJ 物流师。她性格缄默、重诺重责，几乎将“保护艾伦的生命安全”奉为生命中不容违抗的绝对天职（Si）。她不喜空谈宏大理想，只想守在家人身边过着踏实、一成不变的平凡生活。',
    plotProof: '在战斗中，三笠执行命令冷静、迅速而精准，被称为媲美一个旅的绝顶战力。尽管世界崩塌，只要听到艾伦的名字，她就能瞬间调整所有的身体指标，严丝合缝、坚定不移地跨越战壕。为了守住最后的红线，她数十年如一日地佩戴着艾伦送的那条红围巾。',
    fandomDiscussion: '评论普遍认为她是极佳的 ISTJ 守护者样板。她对过去的依赖纽带（Si）极其沉重。她的世界只有几个人，其余都奉献给责任与保护职责。她是沉稳厚重、无声守护、最强力量的完美结合。',
    strengths: ['近乎奇迹的、可绝对信赖的主干力量', '坚贞不渝、雷打不动的奉献守诺', '极强的纪律性与实操冷静性'],
    weaknesses: ['面对执念变故时极易盲目或丧失自我', '言辞匮乏，难以进行敏锐宽广的情感探讨'],
    dimensions: { E: 10, N: 15, T: 75, P: 15 },
    matches: {
      perfect: ['ESFP', 'ESTP'],
      good: ['ISFP', 'ESTJ', 'ISFJ']
    }
  },
  {
    id: 'light',
    name: '夜神月 / Light Yagami',
    anime: '死亡笔记',
    mbti: 'INTJ',
    avatarColor: 'linear-gradient(135deg, #1F2937 0%, #7F1D1D 100%)',
    avatarEmoji: '📓',
    quote: '我是新世界的神！',
    summary: '夜神月是负面极端型 INTJ 建筑师。他的智商惊人，自傲于看透并改造腐朽世界的究极规律（Ni-Te）。他策划了数以百计、跨度长达数年的“绝对正义圈套”，每一步都在他脑型沙盘的计算之中，冷酷抛弃任何非理性的同理心。',
    plotProof: '在与 L 长达数年的博弈中，无论是故意暴露破绽寻找破局机会，还是通过主动放弃死亡笔记持有权、并计算自己恢复记忆的时机来洗清嫌疑，都充分体现了 INTJ 级别的战略远见、精密逻辑推理和绝不手软的铁石心肠。',
    fandomDiscussion: '动漫界著名的 INTJ 代表。他的内倾直觉（Ni）让他能编织出虚无的新世界愿景，外倾思考（Te）提供最冷酷、最有条理的执行。他的疯狂来自于自恋和缺乏外界反馈，是高智商犯罪策划者的绝对代名词。',
    strengths: ['跨越时间与战线周密的绝对战略计算', '对规则破绽及人类心理非凡的逻辑洞察', '一旦认领目标便绝对无情贯彻的执行力'],
    weaknesses: ['目空一切，自负到极致从而导致最后的疏忽', '彻底斩断同理心，对生命及情感纯粹作为棋子物化'],
    dimensions: { E: 30, N: 90, T: 92, P: 12 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['ENTJ', 'INTP', 'INFJ']
    }
  },
  {
    id: 'l_lawliet',
    name: 'L / L Lawliet',
    anime: '死亡笔记',
    mbti: 'INTP',
    avatarColor: 'linear-gradient(135deg, #4B5563 0%, #D1D5DB 100%)',
    avatarEmoji: '🍭',
    quote: '我的推理是，你是基拉的概率是 5%。',
    summary: 'L 是不修边幅而极度执着的 INTP 逻辑学家。他行事离奇孤僻，不遵守任何常规社交界限，唯独对“解开未知谜题与追求纯粹概率逻辑”充满永不枯竭的热忱（Ti-Ne）。他不带主观道德滤镜，只拿证据和事实推理说话。',
    plotProof: '他蜷缩在前排椅子上的经典诡异坐姿（声称这样能提高40%推理能力），常年嗜糖，以及用最平淡却最戳破谎言的方式直言挑衅夜神月。他看穿重重伪装，即使没有绝对证据，纯凭完美的逻辑链推理死咬夜神月，体现了高智纯碎的分析力。',
    fandomDiscussion: '粉丝高度尊奉 L 为 INTP 的化身。他那种只为“解决有趣难题”不为金钱荣誉的纯粹，乱蓬蓬的黑发与随意的白T，完美融合了古怪非凡的智力与对人情套路的慵懒和漠不关心。',
    strengths: ['剥离一切情绪误导的至臻逻辑穿透力', '对微妙线索惊人的关联想象力', '极其谦逊、不沾染名利欲的真理探求'],
    weaknesses: ['社交作风极其缺乏委婉，让人难以适从', '日常自我料理能力基本近于零'],
    dimensions: { E: 5, N: 92, T: 95, P: 88 },
    matches: {
      perfect: ['ENFJ', 'ENTJ'],
      good: ['INFJ', 'INTP', 'ENFP']
    }
  },
  {
    id: 'chihiro',
    name: '千寻 / Chihiro',
    anime: '千与千寻',
    mbti: 'ISFP',
    avatarColor: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    avatarEmoji: '🎒',
    quote: '我们一定会再见面的，绝对！',
    summary: '千寻是真诚且能在困境中蜕变成长出生命坚韧的 ISFP 探险家。她心思细腻，一开始显得胆小柔弱，但随着世界重筑，她用那份拒绝一切金钱权势诱惑的至真至纯、富有高度同理心的内心信念（Fi），治愈了无脸男与白龙。',
    plotProof: '在洗油屋面对满身泥浆腐臭的腐烂神时，全员逃窜，只有她以真挚耐心的直观态度默默帮忙拉出深陷的刺；在众人抢夺金子而沉沦时，她淡然拒绝。最后她为了救助白龙，毫不犹豫踏上单程水上电车。这些都在静默中展示了 ISFP 清澈不移的内心准则。',
    fandomDiscussion: '影迷常提及千寻是宫崎骏对人类真善美最清澈的刻画。MBTI 社区认为她的成长轨迹极为写实：Fi 的纯真道德底红线加上 Se 在油屋劳动中磨砺出的灵活反应，谱写成了最美的勇气之诗。',
    strengths: ['清澈无比的心灵底色与防物化力', '在压迫和改变中能迅速淬炼出极高韧劲', '待人没有偏见，具有融化执迷的温柔'],
    weaknesses: ['开局时易因敏感而表现出逃避和怯弱', '不擅逻辑言辞说服，纯凭直观行动表达'],
    dimensions: { E: 20, N: 35, T: 15, P: 78 },
    matches: {
      perfect: ['ESFJ', 'ENFJ'],
      good: ['ISFP', 'INFP', 'ISFJ']
    }
  },
  {
    id: 'howl',
    name: '哈尔 / Howl',
    anime: '哈尔的移动城堡',
    mbti: 'ENFP',
    avatarColor: 'linear-gradient(135deg, #FCD34D 0%, #10B981 100%)',
    avatarEmoji: '🏰',
    quote: '如果不美丽，活着还有什么意义。',
    summary: '哈尔是举手投足尽显浪漫华丽而内心脆弱敏感的 ENFP 竞选者。他充满着对魔法世界各种美丽奇迹、奇特造物的无限幻想（Ne），一生热爱追求华美的事物与无拘无束的飞行自由，痛恨一切世俗战争与机械奴役。',
    plotProof: '他那座满世界毫无轨道乱跑的移动城堡就是他思维的最佳折画——古怪、拼凑、充满浪漫的折中奇幻色彩。当他的头发染色不当变黑时，他几乎崩溃到融化，展现了极其强烈并极富戏剧性的自我情感执迷（Fi-Si loop）。',
    fandomDiscussion: '粉丝对他那令人眩目的优雅气质与孩童般恐惧逃避的脆弱完美结合极具共情。社区几乎公认哈尔为极富魅力的 ENFP 形象：用华美和想象力构建属于自己的避风港，直至遇到苏菲才终于学会脚落地、肩担责。',
    strengths: ['溢出屏幕的自由审美与艺术创造力', '面对世俗污浊保持童话般的纯爱追求', '温暖而富有包容，能接纳一切异类伙伴'],
    weaknesses: ['遇到严峻责任压力和创伤时极其退缩、逃避', '情绪起大起大落，稍有打击即意志动摇'],
    dimensions: { E: 72, N: 85, T: 25, P: 80 },
    matches: {
      perfect: ['INTJ', 'INFJ'],
      good: ['ENFJ', 'INFP', 'ENTP']
    }
  },
  {
    id: 'bocchi',
    name: '后藤一里 / Hitori Gotoh',
    anime: '孤独摇滚！',
    mbti: 'INFP',
    avatarColor: 'linear-gradient(135deg, #FF9FF3 0%, #FEC2D1 100%)',
    avatarEmoji: '🎸',
    quote: '好、好可怕……社交什么的，对我来说绝对是不可能的……',
    summary: '经典得不能再经典的“社交恐慌症” INFP 调停者。极度敏感，脑内世界极其丰富活跃（Fi-Ne），但面对外部真实物理社会时会瞬间“融化解体”甚至变成抽象主义表情包。',
    plotProof: '害怕交流而长年在壁橱里苦练吉他，幻想走红网络避开现实社交；面对“大孤独/波奇酱”这个略带贬义的绰号却感到异样安心。面对现场压力时，她宁愿钻进芒果垃圾桶打鼓、或在学园祭演出中由于嗓音和弦线崩溃而上演“神之即兴飞身下台跳跃”，生动外化了 INFP 特有的深沉内心红线、以及 Ne 神经质的联想创造力。',
    fandomDiscussion: 'B站弹幕区与全球 PDB 社区一致封祂为人类史上最写实、最令人心疼却又忍俊不禁的社恐代言人。无论是她的精神崩溃演出还是日常胡思乱想，都引发了万千宅家青年的共鸣，被冠以“波奇酱就是我”的神圣称号。',
    strengths: ['惊才绝艳的电吉他演奏细节与音乐表达力', '内心极其善良纯正，对任何微小温暖都铭记在心', '脑洞奇特爆发力强，能蹦出意想不到的神奇脑内灵感'],
    weaknesses: ['极容易自我贬低，在重大决策时习惯退缩到舒适壁橱中', '抗御外界环境刺激和社交冲突的心理耐受度近乎零'],
    dimensions: { E: 5, N: 88, T: 20, P: 82 },
    matches: {
      perfect: ['ENFJ', 'ENTJ'],
      good: ['INFJ', 'INFP', 'ENFP']
    }
  },
  {
    id: 'himmel',
    name: '欣梅尔 / Himmel',
    anime: '葬送的芙莉莲',
    mbti: 'ENFJ',
    avatarColor: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    avatarEmoji: '🗡️',
    quote: '即使是微不足道的事情，只要能改变芙莉莲的未来，我就一定会去做。',
    summary: '极致闪耀、光芒和煦且纯粹利他的 ENFJ 主人公。他拥有天然的精神感召力，不单是因为其凡人中顶尖的实力，更是因为他总能精准地感知到任何角落里同伴或路人的微弱情感呼唤，用温柔改变残酷。',
    plotProof: '为了让“对时间迟钝”的精灵芙莉莲在未来不会感到孤单，欣梅尔在千百个村落执意立下许多不同姿态的搞怪帅气铜像。他微笑着对她说：“只要立了铜像，未来的芙莉莲即使失去我们，也能一眼认出我。”他对虚假勇者剑毫无介怀、一生践行至臻勇者义行，体现了 Fe (外倾情感) 救赎般的光焰。',
    fandomDiscussion: 'B站近年来公认最温润、最受尊奉的主角之一，“欣梅尔倒下了，但他留下的足迹与对平凡生命的爱，成了改变整部故事所有人的齿轮”是极具震撼力的评价。网民称其为“南极星”，把 ENFJ 的感召关怀施展到了浪漫神圣的高度。',
    strengths: ['如微风拂面、无可比拟的温柔沟通与凝聚力', '将生命的短暂化为永恒浪漫和远景的非凡胸襟', '大公无私、敢于守护最无助者的人格天花板'],
    weaknesses: ['偶尔会表现出极为臭美自恋、喜欢四处炫耀自己绝世美颜的小嗜好', '习惯将最深沉的哀伤孤独和对时光流逝的恐惧藏在心底'],
    dimensions: { E: 85, N: 78, T: 15, P: 22 },
    matches: {
      perfect: ['INFP', 'INTP'],
      good: ['INFJ', 'ENFJ', 'ENFP']
    }
  },
  {
    id: 'frieren',
    name: '芙莉莲 / Frieren',
    anime: '葬送的芙莉莲',
    mbti: 'INTP',
    avatarColor: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
    avatarEmoji: '🪄',
    quote: '既然我的时间多得是，那多了解一下人类也无妨。',
    summary: '白发如雪、时间流速与常人完全脱节的 INTP 逻辑学家。她对世俗的功绩册与权力斗争了无情致，唯独对一万种奇特无聊的民间魔法（Ti-Ne）——诸如“把葡萄变酸”、“擦去铜像锈迹”的魔咒，怀有横跨千年的狂热求知收藏欲。',
    plotProof: '十年远征在她眼中宛如电光石火，面对勇者的约定她轻描淡写地约在“五十年后”。直到欣梅尔葬礼上见其化为黄土，她才猛然在崩溃大哭中发现自己从未了解过他。从此踏上了长达半世纪的、名义上为“顺便收集废柴法术”实则在旅程细节中重新解读欣梅尔温柔的漫长漫步。',
    fandomDiscussion: '全网讨论区将其奉为 INTP 智性与空灵的化身。她那游离于常人逻辑之外的天然呆（比如在千百年里反复被“宝箱怪”吃掉）、在危机时却能靠庞大底蕴瞬间算尽魔族施法轨道的极冷极致反差，完美诠释了内倾思考（Ti）对本质规律的精解。',
    strengths: ['超然物外、冷静拆解世间一切魔法和规则本质的硬核魔导力', '永动机般的求知趣味，在细小碎物中感知美妙的童真', '历经千载沧桑依然能守住的，对于温暖事物的笨拙靠近'],
    weaknesses: ['对微观人类个体生命的极其短暂的敏感度一度极度麻木', '作息生活能力令人绝望，喜欢赖床并且爱朝徒弟耍赖皮'],
    dimensions: { E: 8, N: 82, T: 75, P: 85 },
    matches: {
      perfect: ['ENTJ', 'ENFJ'],
      good: ['INTP', 'INFJ', 'ENFP']
    }
  },
  {
    id: 'kita',
    name: '喜多郁代 / Kita Ikuyo',
    anime: '孤独摇滚！',
    mbti: 'ESFP',
    avatarColor: 'linear-gradient(135deg, #F87171 0%, #F59E0B 100%)',
    avatarEmoji: '☀️',
    quote: '我们要让结束乐队，在学园祭上大放异彩！',
    summary: '浑身散放着让人无法睁眼的高能社交光波（Kita-aura）的 ESFP 表演者。喜多对生活中的视觉自拍、群体聚会、时尚博主等所有感官美好细节（Se）有着顶尖的敏锐与本能热爱，是无时无刻不在发光的社交磁石。',
    plotProof: '起初完全不会任何乐器，单纯因为憧憬山田凉的“帅气个性”便误将六弦贝斯认为吉他买下并阴差阳错成为主唱兼吉他手。尽管中途曾因为怕给别人添乱而临阵脱逃，但一旦接受了这份关系，她便在现实的不断磨练中爆发出极高水平的技术进阶，在舞台上成为了光彩四射、带领大家往前冲的最强锚点。',
    fandomDiscussion: 'B站常有“喜多氏射线能消杀一切内向社恐微生物”的趣味说法。社区全票认定她为治愈和阳光的 ESFP 模板：她用毫无虚饰的热忱（Fi），在被垃圾桶隔绝的阴暗角落里拉住了小孤独，是整个乐队能持续发出耀眼合音的动力。',
    strengths: ['堪称融化冰山、拥有极致同理的超凡人际粘合剂', '天生适合聚光灯与舞台，展示和歌喉都充满勃勃生机', '在情绪低落时能迅速将阴霾转成阳光细节的超高配行动力'],
    weaknesses: ['社交激情偶尔过于澎湃高涨，无意中会给超级内向者带来过载压力', '对枯燥而死板的深度抽象概念或枯干理论容易产生心理烦躁'],
    dimensions: { E: 95, N: 20, T: 30, P: 76 },
    matches: {
      perfect: ['ISFJ', 'ISTJ'],
      good: ['ESFP', 'ISFP', 'ENFP']
    }
  },
  {
    id: 'levi',
    name: '利威尔·阿克曼 / Levi Ackerman',
    anime: '进击的巨人',
    mbti: 'ISTP',
    avatarColor: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
    avatarEmoji: '🧹',
    quote: '自己做选择吧，选一个你不会后悔的那个。',
    summary: '经典硬核非凡、冷傲死鱼眼与骨灰级洁癖完美融合的 ISTP 鉴赏家。虽然常以毒舌、粗暴不留情面的长官模样示人，但他的血液中流淌着极重的誓言与对部下的深沉战情（Ti-Fi）。不屑于空洞宏伟的政治动员，只执着于以极致刀法击倒巨人，保护同伴。',
    plotProof: '在丛林中击溃“女巨人”的陀螺高速旋转圆步，以及数秒内将魔兽般庞大的兽之巨人体面切割的壮举，将 ISTP 对物理空间、飞行动力、速度与肌体爆发（Se）的极限控场展现得淋漓尽致。他从不给下属空头大饼，而是冷淡地让艾伦自行选择在战场上面对自己本能的意志。',
    fandomDiscussion: '兵长作为一代人心目中的“人类最强”，在 PDB、论坛以及 B站的宿命 MBTI 判定中，曾掀起多年的 ISTJ vs ISTP 巨澜。如今共识趋向于他是不带常规包袱、将 Se 重组和极致的实战解构法术（Ti）融合的最强 ISTP 行动力狂魔，而洁癖只是他对物质环境（Se）极致掌控的外化。',
    strengths: ['神经反射、空间轨迹控制力以及肉搏速度的究极世界天花板', '看透一切温情粉饰、一言中的极其直接务实的可托付性', '生死边缘巍然不动的极限意志与极深重的无言情义'],
    weaknesses: ['言谈用词极其辛辣刻薄（粗糙 Te/Fe），常让人产生退避和惊惶', '极度封闭个人的微观情感波流，导致心理重担在缄默中逐渐堆积'],
    dimensions: { E: 8, N: 25, T: 82, P: 70 },
    matches: {
      perfect: ['ESTJ', 'ENTJ'],
      good: ['ISTP', 'ISFP', 'ESTP']
    }
  },
  {
    id: 'kira_yoshikage',
    name: '吉良吉影 / Yoshikage Kira',
    anime: 'JOJO的奇妙冒险',
    mbti: 'ISTJ',
    avatarColor: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
    avatarEmoji: '🐱',
    quote: '我的名字叫吉良吉影。33岁。我只想过平静的生活。',
    summary: '怪诞病态、优雅考究却又在日常自律中达到精算级神鬼莫测的 ISTJ 物流师。虽然身怀“杀手皇后”这种毁尸灭迹的神技，但他毕生最大的野心和满足感，竟然是“绝对地融入人群，当一个完全不起眼的平凡小白领，过着绝不引起人瞩目的平静生活”。',
    plotProof: '他的指甲长度规律有极其详细的本子记录，每天早睡早起做伸展运动、温温牛奶，洗完澡准时入睡且睡满八小时。他抗拒一切让他被推上社交风口浪尖的名气与竞争（Si特征）。但在为了排除“妨碍他过宁静日子的人”时，他又表现出了将现场粉尘、弹壳等细节算到微米级（Te）的恐怖精确性。',
    fandomDiscussion: 'JOJO 圈 B站三大鬼畜顶流领袖之一，其“吉良吉影长篇自我介绍”更是圣经级的流传弹幕。粉丝称叹他将 ISTJ 的逻辑带到了带有黑色美学的极端——那就是在破坏凡世一切的同时，也要严丝合缝地把家务扫尘、领带搭配和精准的下午茶时间过成不差分毫的艺术品。',
    strengths: ['精确到秒的自控、自律和严密至极的生活保密功底', '不带任何虚浮张耀和无谓追求、极度严实脚踏实地的执行力', '能在混乱战场上极度冰冷细致、按准物理破绽下手的敏锐度'],
    weaknesses: ['极容易在生活轨迹突变（Ne变化）时发生情绪的疯狂波动重载', '彻底断绝一切微观温情与大同理，视阻碍其平静日程的鲜活生命如扫地垃圾'],
    dimensions: { E: 10, N: 15, T: 85, P: 10 },
    matches: {
      perfect: ['ESFP', 'ESTP'],
      good: ['ISTJ', 'ISFJ', 'ESTJ']
    }
  },
  {
    id: 'makima',
    name: '玛奇玛 / Makima',
    anime: '电锯人',
    mbti: 'INFJ',
    avatarColor: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
    avatarEmoji: '👁️',
    quote: '为了让人类摆脱饥荒与死亡，我需要配戴属于我的支配缰绳。',
    summary: '静默芬芳、极具宗教审判感与深层掌控欲的 INFJ 提倡者。她的生存核心是建立在一个宏伟、利他的终极救世愿景（Ni-Fe）之上：那就是用“支配恶魔”的力量，吃掉并根除死亡、灾厄与不公，向所有人赋予无痛的乌托邦乐园。',
    plotProof: '在最极致的屠杀和与国家政高要员的博弈中，她永远是不着一丝尘埃地微笑、倒茶、细嗅或倾听。她将每一个相遇的人（早川秋、电次、帕瓦）的人生悲剧、情感爆发像乐谱一样精准演绎，一切的宽厚、陪伴和治愈，实则是她冷酷物化万物以达成那个“与唯一对等的电锯人深切拥抱”之不移Ni愿景的垫脚石。',
    fandomDiscussion: '全网圈近几年热度最劲、引发论辩狂潮的邪道女领袖之一，“我要做玛奇玛小姐的狗”早已破圈。社区对她的 Ni-Fe 底色深度痴迷：她爱人类并非爱在宏大的利益平衡上（ENTJ），而是用一种母性却又高傲将万物视同宠物、家畜的平等包容（Twisted Fe），是顶级可怕且动人心魄的 INFJ 掌控者。',
    strengths: ['幽幽莫测、不可一世的全局策略排布力与超长线意志贯彻力', '能以温言软香、真挚至极的微表情及情绪操纵轻易支配任何灵魂', '不为任何眼前微小挫折、世俗嘲怒动摇的惊人定力'],
    weaknesses: ['严重缺乏对个体生命平等微观权利的认可，将一切降格为神坛之下的臣服泥偶', '极易为了宏伟而抽象的绝对彼岸极乐，不惜毁灭眼前世间一切充满生机、具有瑕疵的微弱幸福'],
    dimensions: { E: 65, N: 92, T: 40, P: 15 },
    matches: {
      perfect: ['ENTP', 'ENFP'],
      good: ['INTJ', 'INFJ', 'ENFJ']
    }
  },
  {
    id: 'shinji_ikari',
    name: '碇真嗣 / Shinji Ikari',
    anime: '新世纪福音战士',
    mbti: 'INFP',
    avatarColor: 'linear-gradient(135deg, #1E2937 0%, #4B5563 100%)',
    avatarEmoji: '🎧',
    quote: '不能逃避，不能逃避，不能逃避……',
    summary: '背负了世纪之交人类精神受难悲情的 INFP 调停者。他极其敏感脆弱，毕生都在寻找一个能不需要伤害他人、不需要承载父权重压，而又能被同伴温柔接纳的安全精神边界（Fi-Si loop）。',
    plotProof: '在面临废墟轰鸣、父亲在指挥舱内的冰冷视线时，他常蜷缩在白色病床上用耳机播放 SDAT 的 25、26 轨道（将自闭具象化）。但他脑叶深处又拥有着无可比拟的人本同理力：一看到绫波丽微笑、或者渚薰那不求回报的温柔接纳（Fi共鸣），他便能爆发出足以凌驾神明、重组人类心灵补完的极致深沉动力。',
    fandomDiscussion: 'EVA 三十年，碇真嗣是全ACG人道主义中最伟大的 INFP 精神剖析图斑。他在国内 B站弹幕里常被怒斥懦弱却又在主线里因其“无法逃避的共情”触碰着无数人内心的痛感、被戏称为“万恶社恐的自闭神话”。',
    strengths: ['水晶般晶莹细腻、能洞穿任何虚妄硬冷防线的心灵感同深度', '一旦燃尽灵魂便能为绝望他人撑起整座天幕的极度温柔救赎', '对不公冷硬的世界大义持有终极、发自肺腑的天然抗拒底红线'],
    weaknesses: ['遭遇严苛环境或高频指责批判时会迅速自暴自弃、遁入痛苦精神内耗壳中', '对自保和战局完全缺乏逻辑前瞻，极易在创伤中彻底瘫痪心智'],
    dimensions: { E: 5, N: 85, T: 15, P: 80 },
    matches: {
      perfect: ['ENFJ', 'ENTJ'],
      good: ['INFP', 'ISFP', 'INFJ']
    }
  },
  {
    id: 'asuka',
    name: '惣流·明日香·兰格雷 / Asuka Langley Soryu',
    anime: '新世纪福音战士',
    mbti: 'ESTJ',
    avatarColor: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
    avatarEmoji: '🟥',
    quote: '你是白痴吗？（あんたバカァ？）',
    summary: '极致惊艳狂傲的二次元“傲娇”代名词始祖、也是童年创伤被好胜铠甲紧锁的 ESTJ 总经理。她将自律和完美操作贯彻到神经质的边缘（Te），用高分业绩及统驭一切的傲慢，向母亲冰冷的死影及整个人世粉饰她极其脆弱渴求关怀的内心。',
    plotProof: '极度厌恶并攻击真嗣那种“不愿直视竞争、毫无主大方向、畏首畏尾”的逃匿态度。对于美里的指令与迎战使徒的公式步骤，她像军规一样严格遵从和执行（Te高效）。然而，一旦战绩被打破（输给真嗣或被二号机背叛丢失霸制），她脑内那套“以我是完美的从而不容拒绝”的自控支点便陷入了崩解。',
    fandomDiscussion: '全网动漫史、B站同人圈最深刻闪耀的红宝石，明日香在 MBTI 社区普遍被划为强横的 Te 主导 ESTJ。她那种“绝对不当傀儡不服输”的钢铁气焰，与她像刺猬般在爱恨交缠中抗拒真嗣的手心、却在临终前对着二号机咆哮战斗的史诗，交织成了最令人心裂的篇章。',
    strengths: ['雷厉风行、一旦迎战巨灵便决意搏杀撕碎敌阵的顶级执行威慑', '对日常规训及操作极限毫发不差的高端自律与高效自我规束', '永远不屑于在借口中流泪，高傲直面残酷生存风暴的硬骨作风'],
    weaknesses: ['对人性的软嫩和同伴的创伤社恐完全缺乏理解耐烦度，说辞极其尖刻伤人', '强烈地伪装自我所有绝望，最终常因心理阀门焊死而面临毁灭性融化'],
    dimensions: { E: 85, N: 20, T: 80, P: 10 },
    matches: {
      perfect: ['ISFP', 'ISTP'],
      good: ['ESTJ', 'ENTJ', 'ESFJ']
    }
  },
  {
    id: 'gintoki',
    name: '坂田银时 / Sakata Gintoki',
    anime: '银魂',
    mbti: 'INTP',
    avatarColor: 'linear-gradient(135deg, #81ECEC 0%, #74B9FF 100%)',
    avatarEmoji: '🍓',
    quote: '既然是自己决定的生活，那就挺直腰杆走下去啊！',
    summary: '整日死鱼眼、爱挠头看 Jump、交不起房租、甚至能为一盒草莓牛奶双眼放光的 INTP 逻辑学家。他长年用戏谑和完全拆卸任何宏大叙事的废柴生活逻辑（Ti-Ne）行走于大江户，却在背后握着绝不能斩断的同伴羁绊红线。',
    plotProof: '对于当权高位大主教以及幕府政客那些华丽不诚实的“家国大义大愿”，他的反应一般是极其精妙的跨次元脱口槽（Ne），用底层解构将其狠狠踩烂。但在同伴遭到绞杀时，他又往往展现出最高超、最不屑大道理的战能，只为“在我木刀摸得到的尺寸内，保住你们的破笑容”这极度私自温存（Ti）的目标。',
    fandomDiscussion: 'B站顶流、滋养了一两代中国 ACG 玩世不恭吐槽趣味的神级大哥。海内外在划分他是 ISTP (直观搏杀) 还是 INTP 上曾反复争夺，但其脑电波中那一秒钟吐槽两百字、将十个风马牛不相及次元理论连缀重组的爆发力和对现世传统的百般解构（Ne大成），证实了他的 INTP 性格内核——他是在看透现实深渊后，依然选择带着微小甜意、慵懒又坚守废柴地陪同万事屋的一流温柔智者。',
    strengths: ['将世间一切道貌岸然、宏伟叙事解构得寸草不留的至高幽默才华', '彻底斩断不切实际执迷、心底静享微观平凡同伴温暖的洒脱心智', '无畏于宿命狂澜，一柄洞爷湖木刀即可打破一切规制围困的野路破局能'],
    weaknesses: ['极致懒散摆烂，严重缺乏对于资产或长远人居宏大未来的任何正规设想规划', '习惯在深度和严肃沟通需要时逃避并朝人扮鬼脸，把伤口全留给自己在雨夜里吞咽'],
    dimensions: { E: 35, N: 82, T: 78, P: 82 },
    matches: {
      perfect: ['ENTJ', 'ENFJ'],
      good: ['INTP', 'ENTP', 'ISFP']
    }
  },
  {
    id: 'dio',
    name: '迪奥·布兰度 / DIO',
    anime: 'JOJO的奇妙冒险',
    mbti: 'ENTJ',
    avatarColor: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    avatarEmoji: '🧛',
    quote: '人类的生命是有极限的……我不做人啦，JOJO！',
    summary: '绝对的主宰欲望四溢、把大野心与恐怖控制力化为二次元丰碑的完美 ENTJ 指挥官。他毕生追求着对乔斯达庄园、吸血鬼始祖乃至全人类命运的支配大权。他擅长整合长期远瞻规划、算无遗策以谋取通往所谓“绝对天堂安稳”的阶梯（Te-Ni）。',
    plotProof: '在与大乔博弈中夺产夺宅，化为吸血鬼后转头就组拼出庞大的丧尸团。第三季在埃及沉钟大宅里，他利用深邃的“天堂宿命理论”及绝对的精神支配诱惑（甚至嵌入肉芽控制），将整个大陆最凶恶的替身使者群结缀成极度忠诚、视其为神的帝国，一字一句皆是将弱小生命视为“你记得你吃过多少块面包”的 Te 物化写照。',
    fandomDiscussion: 'B站二次元鬼畜史的最强始祖巨头之一，“是我DIO哒！”、无尽的“砸瓦鲁多”是中文网络不灭的圣言。MBTI 社区普遍分析他拥有极为狂暴、不容悖抗且一旦发现弱者即狠辣践踏的 Te 意志。他在狂人外表下，其 Ni 指导的“天堂计划”带有一种对于宇宙必然必然律和心灵安枕的哲学探索，是恶人中霸气冲霄的最亮异数。',
    strengths: ['对万千宵小、恶徒和雄枭具有不可抵抗的魔鬼级凝聚感召大权', '跨越整整百年暗海、算计乔斯达五代家族的长远而强横的霸图贯彻力', '做事狠绝不拖泥带水，具备为了支配目标彻底物化、压榨一切资源的绝对大魄力'],
    weaknesses: ['极度目空一切，自负在命运的死角里终将因对凡人弱质（如承太郎）的轻蔑而失算', '对任何不服从支配权威的微小异动持极高频神经质暴怒，无法坦荡容忍失败'],
    dimensions: { E: 88, N: 85, T: 90, P: 10 },
    matches: {
      perfect: ['INFP', 'INTP'],
      good: ['ENTJ', 'ENFJ', 'ENTP']
    }
  },
  {
    id: 'conan',
    name: '江户川柯南 / Conan Edogawa',
    anime: '名侦探柯南',
    mbti: 'INTP',
    avatarColor: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
    avatarEmoji: '眼镜',
    quote: '真相只有一个！',
    summary: '智商傲世、万能百科全书级的高玩 INTP 逻辑学家。他唯一的生存燃料是“依靠纯粹客观因果推导，揭开世上一切违背常理逻辑的黑盒迷局”（Ti-Ne）。脑中容不下任何迷信废话或感性遮障。',
    plotProof: '尽管变回小学生，对血腥杀戮之境毫无恐惧，第一反应是眼神放亮并寻找哪怕毫米级的水蒸气、挂钟指针变动，在重组Ne联想后用绝对不容辩驳的逻辑多维剥茧，在黑屋中让最善伪装的元凶跪地抱破防。万事皆求严密客观求证，是彻底由求真逻辑和智力游戏引导的万能侦探。',
    fandomDiscussion: '国民级侦探主角，MBTI 圈里 INTJ 与 INTP 的多年交火地头，如今多偏定为经典 INTP。因为他解决一个案子并非出于建立某种宏伟的规条法律（Te），而只是不能忍受案发现场“逻辑上的矛盾与不守事实”。他日常中展现的各类完全无关紧要的、枯燥却广泛的冷知识炫技狂欢，活脱脱是 INTP 的天性。',
    strengths: ['万能百科级、令人发指的冷门学科数据库与至高无上的严密推导功力', '身处深仇包围、死亡指面时依然能在数秒内找出真相破绽的心理稳定度', '看透人性百般贪墨仇怨后、依然执守那份对平凡生命的理智呵护与人道救助心'],
    weaknesses: ['经常在追求“真相真相”时极度冷冰硬理，忽略案发现场无助者的细微心灵焦虑', '往往单枪匹马、不告家长便犯险挑战庞大的黑衣怪物，在个人防范计划上毫无周密自保'],
    dimensions: { E: 30, N: 88, T: 85, P: 82 },
    matches: {
      perfect: ['ENFJ', 'ENTJ'],
      good: ['INTP', 'INFJ', 'ENFP']
    }
  },
  {
    id: 'haibara',
    name: '灰原哀 / Ai Haibara',
    anime: '名侦探柯南',
    mbti: 'INTJ',
    avatarColor: 'linear-gradient(135deg, #A855F7 0%, #D8B4FE 100%)',
    avatarEmoji: '🧪',
    quote: '如果能像梦境一样，把所有伤痛和痛苦都抹去就好了。',
    summary: '清冷高雅、双眸宛如深海冰封、智力如冰刀般冷彻的天才 INTJ 建筑师。作为逃离黑衣帝国的药物开发高层（宫野志保），她浑身裹挟着危险高墙、黑色幽默和对一切俗鄙事物的智商压制。对于局势有顶级冷静的风险演算和密不可漏的长线算计。',
    plotProof: '每次在柯南热血、一根筋地上冲对抗组织时，她总是在阴暗过道冷酷扼杀其不实执念：“你会害死周遭所有人，根本不知道你在和怎样黑暗的巨噬在对垒”。她凡事均从最惨重的结局开始反推长远自卫方案（Ni-Te），暗自默不作声编算逆改APTX药理的策略，理智坚贞，傲骨天成。',
    fandomDiscussion: 'B站、各大论坛中文圈二十年来最具尊奉地位的宿命“灰女皇”。在无数柯迷心中，唯有小哀高阶清冷的一字一句可以接下那个侦探狂人的傲气频率。社区大赞她将 INTJ 拒绝一切虚泛交际、在冰冷刺甲内却独独为了极少的至亲战友，燃尽生命和温柔红线的精髓诠释得至伤至美。',
    strengths: ['顶级严实、任何狂徒不可突防的超长线风险推算防线与高智防御力', '完全不带情绪渣滓、超等科学专注力和极具格调的黑色幽默智识', '历经人道毁灭深渊依然在最深处守住的、对极少数同道的高傲且真挚的守护'],
    weaknesses: ['极容易在极端压制下（琴酒阴影）发生悲剧的主观宿命论摆烂塌缩，从而一意认死绝望', '常用带毒或过于刻薄的死结清冷话语去防御和刺疼试图善意靠近的旁人'],
    dimensions: { E: 12, N: 90, T: 82, P: 18 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['INTJ', 'INTP', 'INFJ']
    }
  },
  {
    id: 'rem',
    name: '蕾姆 / Rem',
    anime: 'Re:从零开始的异世界生活',
    mbti: 'ISFJ',
    avatarColor: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
    avatarEmoji: '💙',
    quote: '哪怕全世界都不相信斯巴鲁君，蕾姆也一定会相信你！',
    summary: '一时代蔚为神话、将无私守护与一腔无悔极致温柔演绎成永恒奇迹的 ISFJ 守卫者。表面上沉默寡言、带着毒舌且做事一丝不苟的完美主义豪宅女仆，实则内心极重历史创伤，对家族和姐姐拉姆有着极致的赎罪感（Si主导）。一旦心墙在崩溃迷雾中被昴（Subaru）推开，她的世界坐标瞬间被昴的笑容填满。',
    plotProof: '无论是在哪一次扭曲绝望的主线死轮中，雷姆永远是即便在众人皆抛弃、昴神智错乱要逃跑时，甘愿斩尽生命为他托底的最后守护神。其在王都长椅上那长达十多分钟的哭干眼泪、愿意为他做一切不占任何名分的“雷姆大告白”，将 ISFJ 不做张声、只凭绝对忠诚和坚贞责任在大地之上支撑至爱者的光芒，燃成了ACG界无法磨灭的高光史画。',
    fandomDiscussion: '全ACG界最强战力的“萌王”与“真爱”不灭丰碑，在 B站同人史和弹幕史上有教皇级的震慑。MBTI 特区无不泪目于她最纯净高阶的 ISFJ 供能：哪怕满身带血（极端的鬼化）、哪怕昴的未来没有她的新房，只要昴能挺直脊背前行，她便可以在微风细碎里充当最大公无私、甘受一切凌辱的温润守护盾，是万千男儿心中的永恒避风港。',
    strengths: ['二次元史诗天花板级、雷打不动的无私真挚守护力与情感托底信度', '家政管理、战术防卫高强冷僻、凡事务求极致严密踏实的一流自律能', '认领纽带后决无一丝自私索补偿、用生命捍守誓约的终极坚定信仰'],
    weaknesses: ['极度容易把一切愧疚归罪于自我的无能，从而爆发病态的自我作践甚至为爱鬼化发狂', '极度抗拒考虑自我任何现实利益诉求，习惯通过在尘泥中将自己彻底牺牲来实现奉献'],
    dimensions: { E: 25, N: 28, T: 30, P: 15 },
    matches: {
      perfect: ['ESFP', 'ESTP'],
      good: ['ISFJ', 'INFJ', 'ESFJ']
    }
  }
];

export const RELATIONSHIPS: Relationship[] = [
  {
    fromId: 'naruto',
    toId: 'sasuke',
    relationType: 'rival',
    relationLabel: '羁绊与宿敌',
    compatibilityScore: 92,
    description: 'ENFP(鸣人) 与 INTJ(佐助) 是MBTI界的黄金对照。鸣人的无限热情与理想主义追逐，成了将封闭在孤独复仇中的佐助重新拽回人生的救赎之光。两人的博弈贯穿始终，是理解忍界的核心。'
  },
  {
    fromId: 'sasuke',
    toId: 'naruto',
    relationType: 'rival',
    relationLabel: '一生唯一的对手',
    compatibilityScore: 92,
    description: '作为极致理性的 INTJ，佐助对鸣人那种毫不讲理、不屈服于现实逻辑的执念感到费解却由衷震撼。这种极度的黑与白交织出了最为坚固和撕不碎的生死羁绊。'
  },
  {
    fromId: 'luffy',
    toId: 'zoro',
    relationType: 'friend',
    relationLabel: '极致信任的右臂',
    compatibilityScore: 95,
    description: 'ESFP(路飞) 依靠天马行空的直觉体验前行，常忽略逻辑防线；而 ISTP(索隆) 冷静寡言，以绝对的刀锋战力在背后支撑船长所有的任性。两人都极其崇尚行动、不慕繁琐，是用生命对饮的死党。'
  },
  {
    fromId: 'eren',
    toId: 'mikasa',
    relationType: 'family',
    relationLabel: '病态而又宿命的守护',
    compatibilityScore: 78,
    description: 'ISFP(艾伦) 一生绝不停止对外界“自由”的打破性呐喊；而 ISTJ(三笠) 极其保守踏实，一生追求守在炉火旁、紧锁艾伦围巾的平凡长相厮守。艾伦觉得窒息，而三笠却无法不跟从她的天职。这演变出了悲怆凄美的终局史诗。'
  },
  {
    fromId: 'light',
    toId: 'l_lawliet',
    relationType: 'rival',
    relationLabel: '极致的黑白智斗',
    compatibilityScore: 89,
    description: 'INTJ(夜神月) 极力构建自以为正义的宏大集权神龛（Ni-Te），而 INTP(L) 则凭借拆穿一切谎言的多向求真逻辑和怀疑态度与之生死相搏。两颗极端高智大脑的共舞，是人类对绝对权欲与客观真相的最佳探讨。'
  },
  {
    fromId: 'gojo',
    toId: 'sasuke',
    relationType: 'mentor',
    relationLabel: '次元跨越契合度',
    compatibilityScore: 85,
    description: '只是一个跨次元的MBTI配对对照，作为 ENTP(五条悟) 的玩世不恭，绝对会让冷静认真的 INTJ(佐助) 一秒狂暴。'
  },
  {
    fromId: 'bocchi',
    toId: 'kita',
    relationType: 'friend',
    relationLabel: '社恐与太照耀',
    compatibilityScore: 94,
    description: 'INFP (后藤一里) 的自闭脑内社恐世界，被 ESFP (喜多郁代) 那散发着Kita-aura的耀眼太阳辐射光辉彻底融解。两人在结束乐团中携手共鸣，成了让千万宅众会心大笑却又飙泪的传奇纽带。'
  },
  {
    fromId: 'kita',
    toId: 'bocchi',
    relationType: 'friend',
    relationLabel: '最崇拜的超凡主奏',
    compatibilityScore: 94,
    description: '看似现充完美的喜多极度仰慕着波奇那在指法爆发上极致高超、宛若野兽派的电吉他炫技，她用她满格的外向陪伴能量，努力走入波奇那怪诞而质朴的内心世界。'
  },
  {
    fromId: 'frieren',
    toId: 'himmel',
    relationType: 'love',
    relationLabel: '超越时代的追索',
    compatibilityScore: 98,
    description: 'INTP (芙莉莲) 在长寿漫行中，重新踏上当年的十年远征足迹。历经种种细节，她终于明白了那个早已逝去多年的 ENFJ (欣梅尔) 对她倾注的、超越时间桎梏的最温柔执念。'
  },
  {
    fromId: 'himmel',
    toId: 'frieren',
    relationType: 'love',
    relationLabel: '温柔的来生远瞻',
    compatibilityScore: 98,
    description: '欣梅尔太明白芙莉莲作为精灵的永恒孤单滋味，所以他在神州大陆立慢了帅气铜像并带她收集无聊魔术。这些铜像，是他在往后无尽岁月里一如既往温柔指引芙莉莲去追逐人性的温暖星标。'
  },
  {
    fromId: 'shinji_ikari',
    toId: 'asuka',
    relationType: 'rival',
    relationLabel: '刺猬的隔水心防',
    compatibilityScore: 72,
    description: 'INFP (真嗣) 为寻求自保展现的极度逃匿，让渴望大包大揽完美成功的 ESTJ (明日香) 感到绝顶焦躁并痛骂。但在内心深处，这两只孤寒的刺猬由于同等的灵魂残疾而深深相互需要、相爱相杀。'
  },
  {
    fromId: 'asuka',
    toId: 'shinji_ikari',
    relationType: 'rival',
    relationLabel: '白痴真嗣宿业',
    compatibilityScore: 72,
    description: '性格泼辣又好胜心爆棚的 ESTJ，明日香将对真嗣怯退作风的鄙夷写在了每一次怒吼（"あんたバカァ？"）中，却又在面临绝对孤独与精神濒死时，只容许他那份不带威胁、纤软敏感的心去碰触自我的痛觉。'
  },
  {
    fromId: 'conan',
    toId: 'haibara',
    relationType: 'friend',
    relationLabel: '知己的科学同伙',
    compatibilityScore: 92,
    description: 'INTP (柯南) 是只求事实细节的推理之眼，而 INTJ (灰原哀) 是将一切危险预演在前的防守之盾。两颗同样背负了身体宿命的顶尖智力大脑，在清冷低频中背对背迎击整个琴酒组织的庞大黑影。'
  },
  {
    fromId: 'haibara',
    toId: 'conan',
    relationType: 'friend',
    relationLabel: '阳光下的终极救星',
    compatibilityScore: 92,
    description: '清冷孤零的灰原哀，习惯了将自己囚禁于冰点药物研究与自我灭绝的重度防备中。而柯南那种宛若耀眼夏日阳光、明火执剑要去捣翻宿命黑洞的狂徒身影，是她心中最后的安稳。'
  },
  {
    fromId: 'kira_yoshikage',
    toId: 'dio',
    relationType: 'rival',
    relationLabel: '荒谬的魔帝交汇',
    compatibilityScore: 50,
    description: '哪怕跨越了世代（JOJO Crossover），一心想躲过任何惹麻烦风波以得寿享大限安稳的 ISTJ (吉良吉影)，要是知道他的替身异能会被大野心、要把杜王町变面包的 ENTJ (DIO) 强制收为征服之棋，绝对会一秒在惊骇中彻底狂暴。'
  }
];
