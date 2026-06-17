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
    strengths: ['冷静理性', '精通工具与实战', '应对危机极为果断', '崇尚真实本色'],
    weaknesses: ['不易表露心迹', '语言沟通偏冷硬', '极易对死板秩序生厌', '具有高风险冒险特征'],
    mbtiDescription: '独行千里、沉稳寡言的技术干将。他们习惯用具体的工具和敏锐的临场反应解决危机，用超然冷静的逻辑在暴风中心冷眼旁观。'
  },
  ISFP: {
    type: 'ISFP',
    title: '探险家 (Adventurer)',
    category: 'Explorers',
    categoryCn: '自由探险家',
    colorClass: 'border-yellow-500 text-yellow-600 bg-yellow-50',
    bgClass: 'from-yellow-100 to-amber-100',
    accentColor: '#CA8A04',
    strengths: ['极高艺术与审美敏锐性', '内心纯正深沉的情感信念', '本真生活且不加雕琢', '温和谦逊、不喜苛求他人'],
    weaknesses: ['习惯情感逃避、避免激烈冲突', '长远构想偏于模糊', '行动深受当下本能心情左右', '在被否定时极易自哀自怜'],
    mbtiDescription: '低调沉静却热切拥抱生活的美育实践者。他们习惯在不打破温和面具的前提下，以充满灵性感受的生活韵律、打破框架的无声反叛漫步人世。'
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
    quote: '我要斩断过去的因缘，在黑暗中开创变革。',
    summary: '清冷孤傲、视线永远聚焦于长远历史变革与复仇因果律的 INTJ 建筑师。虽然浑身裹着冰冷利刃，甚至不惜将自己物化为复仇工具（Ni-Te），但内心深处被宇智波一族的命运之痛深深套牢。',
    plotProof: '年幼起便只追求“杀死那个男人”的唯一终极构想（Ni）。在知晓鼬灭族真相后，他的长远视野瞬间由个人意志升级到整个忍界系统，决心斩断一切政治因缘，成为吸纳世间全部仇恨的“独裁之神”（Te变革）。',
    fandomDiscussion: '佐助是 MBTI 社区中最著名的 INTJ 坐标之一。粉丝高度认可他的 Ni 指导行动：他抗拒鸣人那种泛化的温情交流，坚持只有通过彻底的制度革命和承受至高孤寒才能根治忍界动乱，逻辑极其高傲闭环。',
    strengths: ['看透势力博弈与因果长河的长效洞察能与冷静谋划力', '不被俗庸温情干预、一旦决定便以极致刀法破决的执行威慑', '天才级战斗算计技巧，数秒内洞开敌人忍术死穴'],
    weaknesses: ['情感自闭极其顽固，习惯用最恶毒刺耳的言语排拒挚友关怀', '极为容易陷入偏执狂热，在认定的长线黑洞中一条路走到黑'],
    dimensions: { E: 6, N: 88, T: 85, P: 15 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['INTJ', 'INFJ', 'INTP']
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
    mbti: 'ENTJ',
    avatarColor: 'linear-gradient(135deg, #1F2937 0%, #7F1D1D 100%)',
    avatarEmoji: '📓',
    quote: '我是新世界的神！',
    summary: '夜神月是教科书级的霸气 ENTJ 指挥官。他的统治力与野心极大，极力推行由他制定的“绝对正义秩序”，将整个物理世界和人口全部视作可以调配和统治的规则网（Te），辅以极强的战略远见（Ni），每一步都在他掌控之中。',
    plotProof: '在与 L 的博弈中，他不满于偏安一隅或静默自保（Ni主导），而是主动现身、强力干涉调查本部，利用超高配的外倾思考（Te）构建出一套宏大的集权体制来行使新世界“神”的绝对裁判权。即便面临失忆的自我设计，也无法熄灭他对绝对权力掌控的狂热意志。',
    fandomDiscussion: '虽然早期国内网络将他描绘为 INTJ，但经过多年 PDB 社区的激烈论辩，世界范围内最终达成了绝对的 ENTJ consensus。粉丝普遍指出，他行事极其主动、控制欲爆表、疯狂向物理界宣誓其存在秩序（Te-dominant），是动漫界最著名的终极 ENTJ 掌控狂。',
    strengths: ['无可抗拒、将整个世界建制按自我理性逻辑重构的庞大统治魄力', '在长线博弈中永远追求绝对战略支配权的攻坚敏锐度', '一旦敲定目标便能绝对剥离同理、冷酷贯彻执行的钢铁般效率'],
    weaknesses: ['劣势 Fi 狂妄崩溃，坚信自我意志即是天道法则，导致自大傲慢的本性漏洞', '将友情、爱情与亲人都冷酷物化为计划齿轮，导致一生皆无真正灵魂共鸣者'],
    dimensions: { E: 78, N: 85, T: 95, P: 10 },
    matches: {
      perfect: ['INFP', 'INTP'],
      good: ['INFJ', 'ENFP', 'ENTJ']
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
    plotProof: '害怕交流而长年在壁橱里苦练吉他，幻想走红网络避开现实社交。在关键时刻，她甚至会钻进芒果箱子里。但是在结束乐队面临危机、喜多吉他断线时，她能突然爆发出惊人的即兴SOLO（Ne直觉与Fi理想点燃），展现天才实力。',
    fandomDiscussion: '动漫界元老级高阶INFP，极度缺乏自信却能在音乐中爆发出无限纯粹意志。她在遇到社交危机时虽有退缩的一面，但在乐队最无助的时刻也能用吉他破除一切困境，是极具感召力的调停者。',
    strengths: ['无可比拟的艺术专注力与吉他演奏造诣', '极其细腻、毫无攻击性的纯善天良', '关键时刻为守住同伴梦想而爆发出惊人捍力'],
    weaknesses: ['重度社恐导致的灾难级社交逃避与自我设限', '物理情绪调节力弱，在突发事件下容易发生脑内被害妄想并融化'],
    dimensions: { E: 6, N: 85, T: 25, P: 80 },
    matches: {
      perfect: ['ENTJ', 'ENFJ'],
      good: ['INFP', 'INFJ', 'ENFP']
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
    summary: '一时代蔚为神话、将无私守护与一腔无悔极致温柔演绎成永恒奇迹的 ISFJ 守卫者。表面上沉默寡言、带着毒舌且做事一丝不苟的完美主义豪宅女仆，实则内心极重历史创伤，对家族 and 姐姐拉姆有着极致的赎罪感（Si主导）。一旦心墙在崩溃迷雾中被昴（Subaru）推开，她的世界坐标瞬间被昴的笑容填满。',
    plotProof: '无论是在哪一次扭曲绝望的主线死轮中，雷姆永远是即便在众人皆抛弃、昴神智错乱要逃跑时，甘愿斩尽生命为他托底的最后守护神。其在王都长椅上那长达十多分钟的哭干眼泪、愿意为他做一切不占任何名分的“雷姆大告白”，将 ISFJ 不做张声、只凭绝对忠诚和坚贞责任在大地之上支撑至爱者的光芒，燃成了ACG界无法磨灭的高光史画。',
    fandomDiscussion: '全ACG界最强战力的“萌王”与“真爱”不灭丰碑，在 B站同人史和弹幕史上有教皇级的震慑。MBTI 特区无不泪目于她最纯净高阶 of ISFJ 供能：哪怕满身带血（极端的鬼化）、哪怕昴的未来没有她的新房，只要昴能挺直脊背前行，她便可以在微风细碎里充当最大公无私、甘受一切凌辱的温润守护盾，是万千男儿心中的永恒避风港。',
    strengths: ['二次元史诗天花板级、雷打不动的无私真挚守护力与情感托底信度', '家政管理、战术防卫高强冷僻、凡事务求极致严密踏实的一流自律能', '认领纽带后决无一丝自私索补偿、用生命捍守誓约的终极坚定信仰'],
    weaknesses: ['极度容易把一切愧疚归罪于自我的无能，从而爆发病态的自我作践甚至为爱鬼化发狂', '极度抗拒考虑自我任何现实利益诉求，习惯通过在尘泥中将自己彻底牺牲来实现奉献'],
    dimensions: { E: 25, N: 28, T: 30, P: 15 },
    matches: {
      perfect: ['ESFP', 'ESTP'],
      good: ['ISFJ', 'INFJ', 'ESFJ']
    }
  },
  {
    id: 'kakashi',
    name: '旗木卡卡西 / Kakashi Hatake',
    anime: '火影忍者',
    mbti: 'INTP',
    avatarColor: 'linear-gradient(135deg, #94A3B8 0%, #475569 100%)',
    avatarEmoji: '🥷',
    quote: '在忍者的世界里，不遵守规则的人被称为废物。可是，不珍惜同伴的人，比废物还要不如！',
    summary: '卡卡西是慵懒而深邃的天才 INTP 逻辑学家。他外表看似懒散、随性、爱看亲热天堂，实际上却拥有极高阶的逻辑分析与战术复盘能力。他经历过挚友死去的创伤，在沉默中通过内省（Ti）和各种变幻策略（Ne）默默守护着第七班。',
    plotProof: '在面对桃地再不斩或迪达拉时，卡卡西展现了 INTP 惊人的战术解构能力。他的“写轮眼复制千种忍术”更是他 Ne 广泛吸收与 Ti 理性重组的究极外化，能迅速将未知的忍术拆解并化为己用。',
    fandomDiscussion: '全球 PDB 社区长年热议卡卡西是 ISTP 还是 INTP。虽然其战斗技能极强，但其思维中对规则的慵懒嘲讽、对未来的宏观不确定性包容，以及看书时的抽离感，让社区最终达成共识：他是个极具智性魅力的 INTP，用逻辑外衣包裹着不愿外露的深沉温情（Fe发展）。',
    strengths: ['洞若观火的忍术复制与战术解析力', '看淡虚荣、极其宽容开明的授业态度', '经历千般黑暗依然保持底线的人道主义'],
    weaknesses: ['经常性迟到、爱找借口，日常表现出极高的拖延和生活慵懒', '心理防御高墙极厚，不愿在任何人面前表露真实的悲哀创伤'],
    dimensions: { E: 15, N: 78, T: 82, P: 80 },
    matches: {
      perfect: ['ENFJ', 'ENTJ'],
      good: ['INFJ', 'INTP', 'ENFP']
    }
  },
  {
    id: 'itachi',
    name: '宇智波鼬 / Itachi Uchiha',
    anime: '火影忍者',
    mbti: 'INFJ',
    avatarColor: 'linear-gradient(135deg, #7F1D1D 0%, #1E1B4B 100%)',
    avatarEmoji: '🐦',
    quote: '优秀也是有尊严的，拥有力量的人，会因此变得孤立……但无论世界怎么变，你都是我唯一的弟弟。',
    summary: '鼬是悲壮、远瞻且背负了一切罪孽的 INFJ 提倡者。他从小就具备着超越部落和家族界限的宏大和平愿景（Ni）。宁可自我毁灭、蒙受叛国恶名，也要编织出长达十数年的“让佐助在终极憎恨中觉醒并拯救宇智波名义”的宏大终极剧本（Ni-Fe结合），展现了 INFJ 神圣又令人心碎的圣徒悲剧特质。',
    plotProof: '他甚至在灭族前夕就已算尽一生：不仅预测了佐助长年的觉醒轨迹，甚至连自己死后的“别天神”自卫保险、药师兜的意志反省回路（伊邪那美）都提前十数年布局编排。每一次举手抬足的幻术，皆是他直觉对人性的终极解构，其行为是宏大、悲情而利他的典范。',
    fandomDiscussion: '全网 PDB 和二次元论坛无争议的 INFJ 执牛耳者。鼬几乎是日漫史中最经典、最富哲学光晕的 INFJ。粉丝深入剖析他为了全人类大义毅然抹杀私人情感、一生活在宿命和血色幻梦中的绝代哀愁，将其供奉为“神坛上的悲情圣者”。',
    strengths: ['惊天地泣鬼神的超长线命运沙盘洞察与规划能', '无私到近乎残酷的至高精神信念与利他奉献', '看穿一切虚华防线、以幻术直接拷问灵魂的绝对智性'],
    weaknesses: ['习惯将毁灭性的惊天秘密全部独自背负，从不对挚亲沟通坦白', '过于执迷于将弟弟的人生焊死在自己设计的“完美轨道”中导致偏激'],
    dimensions: { E: 12, N: 95, T: 38, P: 18 },
    matches: {
      perfect: ['ENTP', 'ENFP'],
      good: ['INTJ', 'INFJ', 'ENFJ']
    }
  },
  {
    id: 'gaara',
    name: '我爱罗 / Gaara',
    anime: '火影忍者',
    mbti: 'INFJ',
    avatarColor: 'linear-gradient(135deg, #991B1B 0%, #F59E0B 100%)',
    avatarEmoji: '⌛',
    quote: '曾经对我而言，‘爱’只是杀死别人的理由，直到我遇到了他（鸣人），我才明白，所谓的爱，是在痛苦中与同伴共同呼吸。',
    summary: '我爱罗经历了从极端自闭受创（孤影恶魔）到涅槃重生成为极度慈悲、智慧的 INFJ 愿景者的惊人转型。他在痛苦深渊中与鸣人产生了深沉的灵魂共鸣，从此将毕生精力奉献于守护砂隐村。他将曾经内敛受创的深沉理想与精神愿景（Ni）化为至高温和的和平悲悯，温柔守护新一代忍者，展现出 INFJ 纯洁神圣的奉献光辉。',
    plotProof: '他的一生都在探索长远格局与和平宿命（Ni）。早期的极度暴戾本是对外界缺乏爱之真挚反馈的剧烈防卫；被鸣人点醒后，他生发出极其崇高的村落愿景（Ni-Fe），并在第四次忍界大战前动人心弦的大动员演讲中，以饱含真情、心系五大国所有宿仇的温柔同理心（Fe）而非纪律强权，瞬间凝聚起宿敌密布的各影联军。',
    fandomDiscussion: '在中外 MBTI & PDB 社区中，我爱罗作为高阶 INFJ 具有极高的认可度。他身旁的“绝对防御沙之壁”被粉丝深刻解读为 INFJ 极度注重边界、渴望保护心中纯真圣殿的心灵物理投射。动漫迷指出，他的大局观、利他精神与深邃的内省底色，是 INFJ 闪耀群星之战的最佳写照。',
    strengths: ['饱含真实情感、谦逊直指灵魂的深度共鸣与感化能', '对受创或边缘群体具有无与伦补的深层大局同理与守护性', '无坚不摧、宁静而恒定的绝对防御与深沉守护抗压力'],
    weaknesses: ['由于早期深重身心创伤，有时在极度重压下仍有隐秘情感自闭下意识', '习惯独自耗竭所有内在温热查克拉，行事极其利他甚至不惜生命牺牲'],
    dimensions: { E: 15, N: 90, T: 40, P: 18 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['INFJ', 'INFP', 'INTJ']
    }
  },
  {
    id: 'shikamaru',
    name: '奈良鹿丸 / Shikamaru Nara',
    anime: '火影忍者',
    mbti: 'INTP',
    avatarColor: 'linear-gradient(135deg, #065F46 0%, #34D399 100%)',
    avatarEmoji: '♟️',
    quote: '真麻烦……我本来只想随便当个忍者，随便赚点钱，然后和一个不美也不丑的女人结婚，生两个孩子，先老，比老婆先死……',
    summary: '鹿丸是无微不至却整天叫嚷着“麻烦”的智商200+极致 INTP 逻辑学家。他热爱看云，不屑于世俗名位，只在脑内构建沙局。他是天生的军师，能将极其琐碎、看似无用的零星战局变量（Ne联想），通过无死角的理性推演（Ti），编织成百分之百致死敌方的终极棋局。',
    plotProof: '在与飞段一役中，鹿丸凭借一己之力，长线布局复仇。他不仅算准了敌方的术规律，甚至算出了森林中影子和光线的物理偏移，将不死之身的强敌埋葬在奈良一族的古老森林深处，完美诠释了 INTP 逻辑天才在极端杀局中绽放出的致命智商之美。',
    fandomDiscussion: '海内外 PDB 和 B站对鹿丸的评价极高，普遍认为他是动漫界 INTP 智慧形象的绝对巅峰。他不喜争锋，被动却极重死党（如丁次、鸣人）羁绊。他的经典口头禅“真麻烦”是所有 INTP 渴望避开无谓社交、只在中枢神游的灵魂缩影。',
    strengths: ['智商两百、连算百步、无死角的顶尖战棋模拟与战术算计能', '剥离一切热血干扰、在绝境中找寻最简唯一生存链的极端理智', '对伙伴无怨无悔的暗地挑担与作为领军护旗手的绝对大承载力'],
    weaknesses: ['生活处事态度常常极其被动，嫌麻烦不想动笔，能躺平绝不站立', '前期经常因为理智觉得“胜率归零”而产生悲观性退守不战倾向'],
    dimensions: { E: 10, N: 82, T: 90, P: 85 },
    matches: {
      perfect: ['ENFJ', 'ENTJ'],
      good: ['INTP', 'INFJ', 'ENFP']
    }
  },
  {
    id: 'kita',
    name: '喜多郁代 / Ikuyo Kita',
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
    mbti: 'ENTJ',
    avatarColor: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
    avatarEmoji: '👁️',
    quote: '为了让人类摆脱饥荒与死亡，我需要配戴属于我的支配缰绳。',
    summary: '静冷深邃、权谋至极且掌控一切的 ENTJ 指挥官。她的生存核心是依靠无上高效的统御理性和秩序（Te）来服务于宏大、长远的终极救世图景（Ni）：运用“支配恶魔”的力量，吞噬并彻底根除死亡、战争与灾厄，为整个人类社会构建一个绝对无痛的乌托邦。',
    plotProof: '在最极致的杀戮和与国家政界要员的博弈中，她永远是以最高效、冰冷的理性逻辑统筹推进全局（Te）。她将所有人（早川秋、电次、帕瓦）视为可调配和驾驭的精密棋子（Te-Ni），在长线博弈中步步为营。直至劣势 Fi（内倾情感）中对“与唯一对等的电锯人深切拥抱，渴望平等被爱”的深深执念暴露，显微出一代支配者最真实的情感渴望。',
    fandomDiscussion: '在中外 MBTI & PDB 社区中，玛奇玛作为标准的 ENTJ 拥有压倒性的高票判定。粉丝高度赞誉她作为“支配恶魔”所展现出的 Te 主导的绝对压迫感，同时指出，她并非单纯的利己主义，而是将极其强大的实用主义逻辑与超长线意志（Ni）融合成了顶级可怕、不着一丝浮躁情绪波动的至高权力风范。',
    strengths: ['无可匹敌的系统构建力与超长线杀局谋划贯彻能', '能将一切资源、权力契约与人心欲望化为极致效率的工具掌控力', '不为任何温情和眼前混乱所动摇的，绝对冰冷的心智坚韧度'],
    weaknesses: ['将一切微观温情与生命视作工具与“狗”，极度漠视个体的自由意志与存在尊严', '在情感底层（劣势 Fi）极度孤寒空白，由于无法建立正常的平等连接而产生出傲慢的支配宿业'],
    dimensions: { E: 75, N: 90, T: 85, P: 10 },
    matches: {
      perfect: ['INFP', 'INTP'],
      good: ['INFJ', 'INTJ', 'ENTP', 'ENTJ']
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
    id: 'misato',
    name: '葛城美里 / Misato Katsuragi',
    anime: '新世纪福音战士',
    mbti: 'ENFP',
    avatarColor: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
    avatarEmoji: '🍻',
    quote: '既然已经决定了，就要全力以赴！',
    summary: '极具感召力与大爱包容的 ENFP 竞选者/启发者。她是NERV前线战术指挥官，表面上是大大咧咧、嗜啤酒如命且生活一片混乱的散漫御姐，实质上却拥有极其真挚的激情和为了守护孩子们的生命而爆发出逆天决意的强悍情感（Ne-Fi）。',
    plotProof: '在碇真嗣和明日香面临严重的精神破碎与自我怀疑时，她用毫无虚饰的热切温情（Fi）不断将他们拉离虚无的沼泽。她指挥第三新东京市的攻坚配合策略（如屋岛作战）天马行空，将即兴战地配合和直觉想象力（Ne）发挥到了极致。而在终局中，她将最后的配枪挂饰留给真嗣并慷慨赴死，用温热的吻将他推上生命的独立起跑点。',
    fandomDiscussion: 'PDB 以及各大社区对美里的 ENFP 定性极其稳固。粉丝纷纷落泪指出，她是EVA这一暗黑压抑废墟世界中唯一的热度光源，她散发出的不灭能量 and 微醺的豪迈活力，不仅是美里的求生装甲，更是重塑真嗣和明日香破碎自尊的超级情感容器。',
    strengths: ['无可批敌的人际亲和力和点燃绝望战友的情感感召能', '天马行空的战术作战创意与即时直觉指挥魄力', '极致无私，关键时刻宁可粉身碎骨也要托起同伴的深沉母性大义'],
    weaknesses: ['日常微观生活管理紊乱至极，逃避痛苦时情绪带有狂乱的外放倾向', '过于依赖直觉和感性羁绊，容易给自己施加过载的自我毁灭式心理重载'],
    dimensions: { E: 82, N: 85, T: 30, P: 82 },
    matches: {
      perfect: ['INFJ', 'INTJ'],
      good: ['ENFP', 'INFP', 'ENFJ']
    }
  },
  {
    id: 'kaworu',
    name: '渚薰 / Kaworu Nagisa',
    anime: '新世纪福音战士',
    mbti: 'INFJ',
    avatarColor: 'linear-gradient(135deg, #94A3B8 0%, #CBD5E1 100%)',
    avatarEmoji: '🎹',
    quote: '也许，我就是为了与你相遇才出生的。',
    summary: '清澈出尘、宛如神性化身和终极同理代名词的 INFJ 提倡者/预言家。他的灵魂无条件拥抱着人世的一切生灵与自我毁灭的悲剧，将理解人类、化解真嗣的绝对孤独视为自己降临地面的唯一愿景（Ni-Fe）。',
    plotProof: '在真嗣彻底精神垮塌、拒绝与外界沟通时，他用一台四手联弹钢琴（用琴声交叠理解无声灵魂，是纯净的 Ni 直觉精神交汇）和一句“也许我就是为了与你相遇才生下来的”温柔将真嗣融化。在终之战，他洞穿了宿命的循环轮回，主动要求真嗣按下处决锁链以成就真嗣的生存大义，用神圣的利他宿命论（INFJ的利他圣光）完成了自己的离场。',
    fandomDiscussion: '渚薰是无数二次元心中高阶 INFJ 的白月光代表。PDB 全体一致认为他那超越物欲、极致救赎以及用无条件温柔来容纳真嗣破碎情感的能力，是倪（Ni）所能探索到的终极灵魂交汇，是动漫史上最完美、最具精神自毁圣洁感的角色之一。',
    strengths: ['能消弭一切暴戾、毫无死角感知他人灵魂创伤的无上神级同理心', '具有看穿古今宿命与宏大维度轮回的顶级直觉洞察力', '极致高洁、超脱一切低俗计较与占有欲的纯净利他行为底色'],
    weaknesses: ['过于超拔和圣洁带来的空谷回响宿命感，不易被寻常世俗生存逻辑所锚定', '在无尽 of 的利他自毁中习惯性背负和消化所有苦痛，带有近乎凄美的自弃精神'],
    dimensions: { E: 15, N: 95, T: 25, P: 20 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['INFJ', 'INFP', 'INTJ']
    }
  },
  {
    id: 'gendo',
    name: '碇源堂 / Gendo Ikari',
    anime: '新世纪福音战士',
    mbti: 'INTJ',
    avatarColor: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
    avatarEmoji: '👓',
    quote: '人类补完计划，这就是我的最终愿望。',
    summary: '极其阴鸷冷酷、为了执念不择手段的逆天 INTJ 建筑师。他的毕生核心完完全全被执念（与已逝妻子碇唯重逢，Ni愿景）所掌控，可以将儿子真嗣、克隆人唯（丽）以及整个人类帝国的生死存亡都作为战略棋子（Te）冷酷摆盘和精密献祭。',
    plotProof: '在漫长的十余年中，他坐在标志性的黑暗NERV司令席上双手交叉遮面，暗中编织人类补完计划的全部底层回路。他无情地让尚幼的儿子陷入无数次自毁测试，算计了联合国的每一次逼迫和使徒的逆推步伐。甚至在面对使徒突袭 and 死神临门时，他的瞳孔深处除了计划推进的进度百分比，也绝无半点情绪波动。',
    fandomDiscussion: '动漫界最著名的“无情冷面父亲” INTJ 代表。PDB 社区高度论断，在碇源堂身上，劣势 Fi（内倾情感）被彻底扭曲和深度冻结为了一个绝对禁忌执念——碇唯，而他庞大的 Te 战略帝国则是为了这个极其纯粹却带有疯狂毁灭性的 Fi 独创信仰而服务的坚硬铠甲。',
    strengths: ['跨越数十年、算尽全人类与使徒每一个微观战步的究极战略心计与推演网', '任何神威、恐慌与亲情道德绑架皆不可能撼动其执行计划的冰冷钢指', '追求意志完美的极高坚毅和忍辱负重度'],
    weaknesses: ['劣势 Fi 极度狂病自闭，基本零沟通，导致亲近者尽遭情感风暴催折', '由于对计划精密度的偏执与自负，一旦出现不在逻辑线以内的意志扰动（如丽的反抗）会瞬间满盘皆输'],
    dimensions: { E: 5, N: 92, T: 90, P: 10 },
    matches: {
      perfect: ['ENFP', 'ENTP'],
      good: ['INTJ', 'ENTJ', 'INFJ']
    }
  },
  {
    id: 'asuka',
    name: '惣流·明日香·兰格雷 / Asuka Langley Soryu',
    anime: '新世纪福音战士',
    mbti: 'ENTJ',
    avatarColor: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
    avatarEmoji: '🟥',
    quote: '你是白痴吗？（あんたバカァ？）',
    summary: '高傲好胜、自尊心极强的二次元傲娇始祖。在 PDB 社区的精确 MBTI 分析下，明日香被广泛认定为 ENTJ（指挥官）。她由极高强度的 Te（外倾思考）和 Ni（内倾直觉）统治，将自我存在的尊严以及掌控欲凌驾于一切竞争者之上，并将脆弱的内心世界（劣势 Fi）装入好胜狂妄的装甲中。',
    plotProof: '在面临迎击使徒和追求优等生头衔的宏大任务中，她坚定不移地以最有效率的指挥体系和自我绝对掌控（Te）推进战线。而在《新世纪福音战士：终》及旧剧场版中的搏杀，完美外显了其不屑投降、誓死扭转大势的高燃 ENTJ 决断意志和不朽斗魂。',
    fandomDiscussion: '多年来对于明日香是 ESTJ 还是 ENTJ 的论战在 PDB 终于迎来了 ENTJ 的 consensus 倾斜。社区一致认为她并非因循守旧之辈（Si），而是将生命的一切尊严感与她想要确立统治大义的宏远 Ni 愿景深深重合。',
    strengths: ['摧枯拉朽、誓要刺穿和粉碎敌阵的顶级领袖魄力与攻坚执行力', '追求极境卓越的至高自律自强精神，拒绝任何借口 and 退却', '极其高傲自信、决不在任何重压和神明权威下低头的高骨气特征'],
    weaknesses: ['劣势 Fi 被极度压抑，无法诚实面对和表达温柔情感，在情感联结中带有毁灭性自卑', '极易在极高头衔与统治地位被夺走时产生精神失控和全面崩溃'],
    dimensions: { E: 85, N: 75, T: 85, P: 10 },
    matches: {
      perfect: ['INFP', 'INTP'],
      good: ['INFJ', 'ENFP', 'ENTJ']
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
  },
  {
    fromId: 'shinji_ikari',
    toId: 'kaworu',
    relationType: 'love',
    relationLabel: '唯一的灵魂救赎',
    compatibilityScore: 96,
    description: 'INFP(真嗣) 在最无助、彻底绝望于人际刺痛的深渊中，遇到了无条件爱着他、包容他一切污浊碎片的 INFJ(渚薰)。渚薰清澈、富有理想性的精神陪伴和“也许我就是为了与你相遇才生下来的”温柔低语，成了他毕生最珍贵、唯一的灵魂避风港。'
  },
  {
    fromId: 'kaworu',
    toId: 'shinji_ikari',
    relationType: 'love',
    relationLabel: '跨越轮回的终极托付',
    compatibilityScore: 96,
    description: '渚薰作为高阶 INFJ，他的生存愿景纯粹是为了给予那个破碎灵魂一抹安稳。为了扭转真嗣痛苦的宿命循环，他甘愿承受无数次的寂静轮回甚至主动步入自毁，用自己的死亡为真嗣换取走入真实世界的意志和勇气。'
  },
  {
    fromId: 'shinji_ikari',
    toId: 'gendo',
    relationType: 'family',
    relationLabel: '无法企及、令人窒息的父权巨峰',
    compatibilityScore: 45,
    description: '在敏感脆弱的 INFP(真嗣) 眼中，INTJ(碇源堂) 是一座永远冰冷、不可企及的大红线高山。父亲坐在司令官席位上的淡漠审视，以及凡事只讲价值计划、物化亲情的残酷作风，是真嗣一生心理阴影与社交恐惧症的万恶之源。'
  },
  {
    fromId: 'gendo',
    toId: 'shinji_ikari',
    relationType: 'family',
    relationLabel: '软弱情感的回避镜',
    compatibilityScore: 45,
    description: '冷酷理性的 INTJ 碇源堂，视软弱为毁灭的催化剂。他并非不爱儿子，但他由于劣势 Fi 被绝对封印、且不知道如何面对亡妻血脉，唯有用 Te 式的事事务实物化和冰冷使役来防备温情，导致亲子纽带在无休止的伤害 and 利用中血肉模糊。'
  },
  {
    fromId: 'misato',
    toId: 'shinji_ikari',
    relationType: 'mentor',
    relationLabel: '亦姐亦母的炽热锚点',
    compatibilityScore: 88,
    description: 'ENFP(美里) 用她那不甚成熟、却豪迈温暖的市井人间温热，强行拉住了将自己裹在壁垒之中的 INFP(真嗣)。虽然她也历经心灵扭曲，但在前线她是为他遮风挡雨的领跑者，在生活里是用罐装啤酒与温饱拥抱他的最坚强支柱。'
  }
];
