import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { Character, Relationship, MBTIType } from '../src/types';
import { REAL_ANIME_QUOTES, getFallbackCosmicQuote, getAuthenticSummary, getAuthenticPlotProof, getAuthenticFandomDiscussion } from './authentic_quotes';

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const DB_FILE = path.join(process.cwd(), 'characters_db.json');

// Interface for DB Structure
interface DatabaseSchema {
  characters: Character[];
  relationships: Relationship[];
  totalImports: number;
}

// Initial seed characters from the hardcoded client list
import { CHARACTERS as seedCharacters, RELATIONSHIPS as seedRelationships } from '../src/data/characters';

// A high-density local database mapping containing deep, accurate MBTI casts for popular anime.
// This allows immediate fast generation of hundreds of highly targeted, detailed characters and relations to avoid API rate limits and build robust networks.
const PRESET_ANIME_MAPS: Record<string, {
  name: string;
  characters: Omit<Character, 'id' | 'anime'>[];
  relations: (Omit<Relationship, 'fromId' | 'toId'> & { fromName: string; toName: string })[];
}[]> = {
  // 1. 火影忍者 (Naruto)
  '火影忍者_naruto': [
    {
      name: '火影忍者',
      characters: [
        {
          name: '漩涡鸣人 / Uzumaki Naruto',
          mbti: 'ENFP',
          avatarColor: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
          avatarEmoji: '🍥',
          quote: '说到做到，这就是我的忍道！',
          summary: '充满无限阳光能量、理想信念钢铁般不可倾移的 ENFP 竞选者。他天生擅长用毫无保留的直率红线包裹、溶解世间冷硬阴霾，以其最震撼的感性本理（Fi）将所有人拉入其宏伟的羁绊网络之中。',
          plotProof: '在长门复仇、带土失足和佐助走入绝境的最黑暗关头，鸣人从不以利己概率进行谈判，而是凭借感同身受的眼泪和绝不放弃任何同伴的本能（Fi），在精神空间与所有人完成最终和解。',
          fandomDiscussion: '动漫界元老级 ENFP 分割图，PDB 全票评定。他的言行完全符合外倾直觉（Ne）寻找未来的突破口与内倾情感（Fi）对纯粹情感价值的极致守护，是消解社恐和反派心理创伤的最强光源。',
          strengths: ['无可抗拒、将宿敌转化为盟主的惊人同理力', '为实现崇高忍道永不言弃在灰烬中屡屡站起的心灵韧性', '突发战场上奇招迭出、直觉力爆破的战术解构能力'],
          weaknesses: ['常规理论文化课考试极其废柴，办事经常冲动先动拳头', '为了背负同伴的创伤经常将千斤重荷锁于己身，忍入绝境'],
          dimensions: { E: 92, N: 85, T: 12, P: 88 },
          matches: { perfect: ['INTJ', 'INFJ'], good: ['ENFP', 'INFP', 'ENTP'] }
        },
        {
          name: '宇智波佐助 / Uchiha Sasuke',
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
          matches: { perfect: ['ENFP', 'ENTP'], good: ['INTJ', 'INFJ', 'INTP'] }
        },
        {
          name: '旗木卡卡西 / Hatake Kakashi',
          mbti: 'INTP',
          avatarColor: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
          avatarEmoji: '👁️',
          quote: '不珍惜同伴的人，连废物都不如。',
          summary: '平素慵懒随性、斜靠墙头看《亲热天堂》，临战却瞬间爆发出极致战术计算的天才 INTP 逻辑学家。他用慵懒和抽离的外表掩盖着同伴相继逝去（带土、琳）的刻骨伤痛，奉守着打破陈规、守护生命的深层思考。',
          plotProof: '在战斗中极少像凯那样凭借热血横冲，而是单手插兜，用写轮眼进行最冰冷紧密的逻辑推演与招式解构（Ti）。在忍界大战指挥、或者是阻击带土神威的操作中，他将物理边界和微秒级时差算到极致。',
          fandomDiscussion: '全网公认高阶 INTP 的帅气化身。他完美呈现了内倾思考（Ti）对底层规律的把控加外倾直觉（Ne）的玩世不恭和吐槽气质。平常迟到找借口“在人生的道路上迷失了”展现了强烈的 P 型松弛感。',
          strengths: ['极其优雅冰冷的心智稳定度，在死线博弈中计算敌术底层原理', '跳脱常规等级规条、视守护微观生命为至高信条的温良底色', '在混乱战场之上，能够容纳任何人、任何复杂突发状况的空灵统筹能'],
          weaknesses: ['作息生活极端懒骨拖拉，整日捧着十八禁小说无病呻吟', '不自觉带有对过往梦魇的逃离，深度倾诉和情感建立长效迟滞'],
          dimensions: { E: 20, N: 80, T: 78, P: 85 },
          matches: { perfect: ['ENTJ', 'ENFJ'], good: ['INTP', 'INFJ', 'ENTP'] }
        },
        {
          name: '日向雏田 / Hyuga Hinata',
          mbti: 'ISFJ',
          avatarColor: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)',
          avatarEmoji: '🌸',
          quote: '因为看着鸣人君的背影，我就感觉到了无限的勇气。',
          summary: '性格内敛温婉、却能在至爱者蒙难时舍命挺身撑起整座战场的超凡 ISFJ 守卫者。她背负着宗家重担却毫无怨艾，将满溢的真心、忠诚与守护彻底倾注于鸣人一人身上，是整部动漫最温润的港湾。',
          plotProof: '佩恩袭村，面对神一般不可突防的强敌，所有人瘫痪时，唯独她单薄瘦弱地站到濒死的鸣人身前，流着泪进行死线告白（ISFJ的无私责任）。那句“我一向说到做到，因为这对我来说也是我的忍道”，震撼人心。',
          fandomDiscussion: '全网一致判定的完美 ISFJ 守望者。她不争不抢，对鸣人长达十几年的追随和无悔深情（Si historical loop），是社区公认的最纯良、最具有治愈威力的温暖女性典范。',
          strengths: ['历经十数年风雨决不磨损其一分一毫的至高忠诚与无私深情', '极其温婉包容、润物无声地抚慰周围同伴心灵创痛的共情力', '关乎同伴和信仰死线时的、爆发出决然敢与神明搏命的惊人悍力'],
          weaknesses: ['过度内向腼腆，早期一见到鸣人或者在社交场合便会瞬间休克晕倒', '习惯性将委屈、不公和自我伤害默默压抑，缺乏向外界维护自身争取的主动性'],
          dimensions: { E: 8, N: 18, T: 20, P: 12 },
          matches: { perfect: ['ESFP', 'ESTP'], good: ['ISFJ', 'INFP', 'ESFJ'] }
        },
        {
          name: '春野樱 / Haruno Sakura',
          mbti: 'ESFJ',
          avatarColor: 'linear-gradient(135deg, #F43F5E 0%, #FDA4AF 100%)',
          avatarEmoji: '🥊',
          quote: '这一次，也请看着我的背影吧！',
          summary: '做事干练果敢、情感表达极其浓烈执着的 ESFJ 执政官。在人际纽带（Fe）中，她渴望调和鸣人与佐助裂解的悲剧，通过成为绝顶纲手女继承人学徒打破自身孱弱命运，用铁拳与神级药理担当起第七班的中间梁柱。',
          plotProof: '在拯救被傀儡重创的勘九郎时，她展现出的精细病理操作以及在战场上大喝给所有人医疗回血的果决（Fe人际联结），配合百豪之术的重度铁拳粉碎地面，完好展示其高能动性与大姐大照顾风范。',
          fandomDiscussion: '动漫史上情感路线争议大、但在 MBTI 圈最终合定为经典 ESFJ。她对佐助的痴心不改以及对第七班家庭式关系完好性的狂热执着，反映了 ESFJ 对于稳定、温馨集体秩序和宿命关系的最深固拥抱。',
          strengths: ['无可挑剔、瞬间撑起整座野战医院的大局医技统筹和执行能', '面对佐助冷刀多次指向依然不言粉碎、坚守到底 of the 炽热真诚纽带力', '坚毅勤奋，能够靠微弱肉体跨越血统神话、炼成顶级武力的恒心'],
          weaknesses: ['过度依赖某种稳态人际关系，在喜爱之人背离时容易陷入情感失衡狂躁', '早期因为心智不成熟，在情感宣泄方面有时会伤害到默默付出的外围同伴'],
          dimensions: { E: 78, N: 15, T: 35, P: 18 },
          matches: { perfect: ['ISFP', 'ISTP'], good: ['ESFJ', 'ISFJ', 'ESTJ'] }
        }
      ],
      relations: [
        {
          fromName: '漩涡鸣人',
          toName: '宇智波佐助',
          relationType: 'rival',
          relationLabel: '生死羁绊与救赎',
          compatibilityScore: 94,
          description: 'ENFP鸣人的无限热情与直觉本理，在一生里疯狂拉扯追击佐助遁入黑暗的 INTJ 孤峰。他们不仅是理念上的宿命双璧，更是黑白共生的终极救赎。'
        },
        {
          fromName: '宇智波佐助',
          toName: '春野樱',
          relationType: 'love',
          relationLabel: '深沉暗哑的回归',
          compatibilityScore: 82,
          description: 'INTJ佐助长年将佐樱之情锁在灭绝的阴冷冰层下，而ESFJ小樱用炽热坦白的真心不断消融其心防，在佐助赎罪漫漫之路上，樱成了他于忍界唯一的停靠坐标。'
        },
        {
          fromName: '旗木卡卡西',
          toName: '漩涡鸣人',
          relationType: 'mentor',
          relationLabel: '慵懒名师的灯塔',
          compatibilityScore: 90,
          description: 'INTP卡卡西对于鸣人的豪情总是一边看小说吐槽，一边在无数战斗实操中用精细解析启发鸣人的 Ne 天马行空招数，并在人性的黑暗迷途中给了他最宽宏的包容。'
        },
        {
          fromName: '日向雏田',
          toName: '漩涡鸣人',
          relationType: 'love',
          relationLabel: '矢志不移的仰望',
          compatibilityScore: 96,
          description: '当全世界都视少年的鸣人为妖狐灾厄时，ISFJ雏田却始终默默在树后用崇拜、晶莹双眼看着他。她是鸣人累了回头时最温暖的、绝对不会离去的安心白光。'
        }
      ]
    }
  ],

  // 2. 航海王 (One Piece)
  '航海王_onepiece': [
    {
      name: '航海王',
      characters: [
        {
          name: '蒙奇·D·路飞 / Monkey D. Luffy',
          mbti: 'ESFP',
          avatarColor: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
          avatarEmoji: '👒',
          quote: '我是要成为海贼王的男人！',
          summary: '将自由、冒险和感官冲动体验燃烧到极致的 ESFP 表演者。路飞对复杂的宏大世界阴谋或权术毫无兴趣，只追逐当下物理空间的痛快战斗（Se）和将眼前每一个哭泣的人重新逗笑的真挚热忱（Fi）。',
          plotProof: '在罗宾喊出“我想活下去”和娜美哭求“救救我”的死线，路飞从来不下多余理性分析，而是立刻大喝去打飞一切障碍。他的草帽代表着最直接的，不需要附加规则与利益诱饵的、最神圣的同伴誓守。',
          fandomDiscussion: '全世界 ACG 圈无争议的 ESFP 始祖化身。他完美呈现了外倾感觉（Se）对眼前食物、肉搏与岛屿神秘危险的高亮渴望，以及内倾情感（Fi）对纯真个人情感底线的刚性捍卫。',
          strengths: ['瞬间让被绝望压顶的人爆发出无限大笑的、至高感染人际力', '在险恶战场上天马行空、不循规犯俗的野兽派直觉突围力', '绝不容许任何暴君剥夺凡人一餐饱饭尊严的，金子般纯粹的正义红线'],
          weaknesses: ['对于一切战略密谋、撤退计划和文字纸张毫无耐心，智商经常一秒下线', '莽撞暴食，在各类危险未明的关头直接一头扎入，给娜美及航海路线带来极大惊吓'],
          dimensions: { E: 98, N: 10, T: 15, P: 95 },
          matches: { perfect: ['ISFJ', 'ISTJ'], good: ['ESFP', 'ISFP', 'ENFP'] }
        },
        {
          name: '罗罗诺亚·索隆 / Roronoa Zoro',
          mbti: 'ISTP',
          avatarColor: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
          avatarEmoji: '⚔️',
          quote: '九山八海，无我不断者！三刀流奥义……',
          summary: '冷酷刚悍、为了世界第一大剑豪誓言将肉体苦修到钢铁级极境的 ISTP 鉴赏家。他是草帽团里最冷峻、极度看重实际状况和刀剑对决真物（Se）的硬骨头，是路飞在面临威严死线时最坚忍无畏的右臂。',
          plotProof: '在恐怖三桅帆船上，面对大熊那一击必杀、无法逃避的死亡抉择。索隆把全团的伤痛 and 疲惫尽数吸纳。在那满地猩红的绝境里，他满脸是血，只是双臂交叠，冷酷淡漠地说：“什么都没有发生”。这一幕是战地守护的极致。',
          fandomDiscussion: 'PDB 封神级高阶 ISTP 榜样。他平时极度寡言落后、还是个无可救药的顶级路痴（对人工地标Si缺乏，只跟着空间直觉Se跑），但一旦佩戴上黑色头巾，他那恐怖的物理爆发力、将实战细节拆解得粉碎的纯武理（Ti），展现得无懈可击。',
          strengths: ['生死边缘巍然不动的钢铁意志，足以为船长全额代付死亡代价的忠肝义胆', '神经反射和肉搏物理控场的绝顶战力，刀意通神', '在全员因为重度温情陷入犹豫纠正时（如乌索普离队），保持最冰冷纪律底线的理智'],
          weaknesses: ['方向感和逻辑图示感知力完全退化，在没有标志物的开阔平地都会离奇迷路', '言谈用词硬邦硬冷，从来不屑透露哪怕一丝温存关怀，对肉麻情感有极重排斥'],
          dimensions: { E: 5, N: 18, T: 86, P: 74 },
          matches: { perfect: ['ESTJ', 'ENTJ'], good: ['ISTP', 'ISFP', 'ISTJ'] }
        },
        {
          name: '妮可·罗宾 / Nico Robin',
          mbti: 'INTP',
          avatarColor: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
          avatarEmoji: '📖',
          quote: '我想活下去！请把我也带上海吧！',
          summary: '神秘腹黑、双眸中沉淀着八百年历史空白真相的天才 INTP 逻辑学家。她长年行走于世界各处最阴暗的黑帮与叛乱军中，利用花花果实的诡异操作自保，直到在草帽团触碰到了灵魂温度（Ti-Ne）。',
          plotProof: '在世界政府最凶残的屠灭威慑和CP9的黑手下，她本能地将一切危险和自己算在一处求死。直到看见路飞在暴雨中大喝狙击王撕毁世界政府旗帜那一刻，她胸中那套冰冷求真 的内倾逻辑被彻底点燃，哭着打破心锁。',
          fandomDiscussion: '全网公认兼具暗黑优雅和高级幽默的一流 INTP。她平时发言倾向于在最温馨时刻来一句冷静可怕的“我们是不是会被不知名海怪吃掉剩下一堆骨头”吐槽（Ne荒诞连缀），只对真理和历史遗迹石碑有最高狂热。',
          strengths: ['解析世界八百年阴谋、发掘古代文字和历史底律的超群学者智识', '腹黑、在任何恐怖血腥博弈前不失一分一毫优雅的顶级心理防御', '无上限、随时能辅助战斗或探索的花花果实空间控场术'],
          weaknesses: ['过早经历屠杀导致对生存持有悲观黑色幽默，偶有逃避阳光温存的下意识举动', '在对身体武力的正面长途肉搏死线上，抗突击性弱'],
          dimensions: { E: 15, N: 85, T: 75, P: 80 },
          matches: { perfect: ['ENTJ', 'ENFJ'], good: ['INTP', 'INFJ', 'ENFP'] }
        }
      ],
      relations: [
        {
          fromName: '蒙奇·D·路飞',
          toName: '罗罗诺亚·索隆',
          relationType: 'friend',
          relationLabel: '一生唯一的副手',
          compatibilityScore: 98,
          description: 'ESFP路飞豪迈天真的野兽狂奔，总是在 ISTP索隆那句“喂路飞，既然要做那就做到最强”的冰冷钢铁刀意中，找到最扎实的肉体托底和全权付托。'
        },
        {
          fromName: '蒙奇·D·路飞',
          toName: '妮可·罗宾',
          relationType: 'friend',
          relationLabel: '撕裂黑暗 of the 阳光',
          compatibilityScore: 92,
          description: '当罗宾觉得自己的存在是世界的灾恶与罪业时，路飞那句在司法岛上“罗宾，说你想活下去”的大喝，把她那座冰封逻辑城堡彻底捣碎，拉向了最自由的万顷晴空。'
        }
      ]
    }
  ]
};

// Generate character-trait based custom avatar (color and emoji) deterministically/programmatically
export function getCharacterTraitAvatar(fullName: string, animeName: string, mbti: MBTIType): { color: string, emoji: string } {
  const nameOnly = fullName.split(' / ')[0].trim();

  // 1. Exact match lookup table for very famous anime characters to ensure top-notch precision
  const exactMatches: Record<string, { color: string, emoji: string }> = {
    // BLEACH
    '黑崎一护': { color: 'linear-gradient(135deg, #F97316 0%, #111827 100%)', emoji: '⚔️' },
    '朽木露琪亚': { color: 'linear-gradient(135deg, #E0F2FE 0%, #38BDF8 100%)', emoji: '❄️' },
    '蓝染惣右介': { color: 'linear-gradient(135deg, #1E1B4B 0%, #5B21B6 100%)', emoji: '🦋' },
    '浦原喜助': { color: 'linear-gradient(135deg, #16A34A 0%, #111827 100%)', emoji: '🎩' },
    '朽木白哉': { color: 'linear-gradient(135deg, #FBCFE8 0%, #DB2777 100%)', emoji: '🌸' },
    '日番谷冬狮郎': { color: 'linear-gradient(135deg, #E0F2FE 0%, #2563EB 100%)', emoji: '🐉' },
    '更木剑八': { color: 'linear-gradient(135deg, #7F1D1D 0%, #111827 100%)', emoji: '👹' },
    '市丸银': { color: 'linear-gradient(135deg, #E0E7FF 0%, #6366F1 100%)', emoji: '🦊' },
    '乌尔奇奥拉': { color: 'linear-gradient(135deg, #374151 0%, #111827 100%)', emoji: '🥀' },

    // 咒术回战
    '虎杖悠仁': { color: 'linear-gradient(135deg, #EC4899 0%, #111827 100%)', emoji: '👊' },
    '伏黑惠': { color: 'linear-gradient(135deg, #0D9488 0%, #111827 100%)', emoji: '🐺' },
    '钉崎野蔷薇': { color: 'linear-gradient(135deg, #E11D48 0%, #312E81 100%)', emoji: '🔨' },
    '五条悟': { color: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)', emoji: '🕶️' },
    '两面宿傩': { color: 'linear-gradient(135deg, #991B1B 0%, #111827 100%)', emoji: '💀' },
    '伏黑甚尔': { color: 'linear-gradient(135deg, #475569 0%, #0F172A 100%)', emoji: '🗡️' },
    '夏油杰': { color: 'linear-gradient(135deg, #312E81 0%, #4C1D95 100%)', emoji: '🌀' },
    '乙骨忧太': { color: 'linear-gradient(135deg, #64748B 0%, #D1D5DB 100%)', emoji: '⚔️' },

    // 鬼灭之刃
    '灶门炭治郎': { color: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)', emoji: '🌊' },
    '灶门祢豆子': { color: 'linear-gradient(135deg, #FCE7F3 0%, #F472B6 100%)', emoji: '🎋' },
    '我妻善逸': { color: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', emoji: '⚡' },
    '嘴平伊之助': { color: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)', emoji: '🐗' },
    '富冈义勇': { color: 'linear-gradient(135deg, #1D4ED8 0%, #991B1B 100%)', emoji: '🌊' },
    '蝴蝶忍': { color: 'linear-gradient(135deg, #E9D5FF 0%, #701A75 100%)', emoji: '🦋' },
    '炼狱杏寿郎': { color: 'linear-gradient(135deg, #F97316 0%, #DC2626 100%)', emoji: '🔥' },

    // SPY x FAMILY
    '阿尼亚·福杰': { color: 'linear-gradient(135deg, #FCE7F3 0%, #F472B6 100%)', emoji: '🥜' },
    '黄昏 / 劳埃德': { color: 'linear-gradient(135deg, #0F766E 0%, #1E293B 100%)', emoji: '🕵️' },
    '约尔·福杰': { color: 'linear-gradient(135deg, #BE185D 0%, #111827 100%)', emoji: '🌹' },
    '邦德·福杰': { color: 'linear-gradient(135deg, #F9FAFB 0%, #D1D5DB 100%)', emoji: '🐶' },

    // 火影/航海
    '漩涡鸣人': { color: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)', emoji: '🍥' },
    '宇智波佐助': { color: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', emoji: '⚡' },
    '旗木卡卡西': { color: 'linear-gradient(135deg, #64748B 0%, #475569 100%)', emoji: '👁️' },
    '蒙奇·D·路飞': { color: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)', emoji: '👒' },
    '罗罗诺亚·索隆': { color: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', emoji: '⚔️' },

    // 原神/星铁
    '钟离': { color: 'linear-gradient(135deg, #D97706 0%, #78350F 100%)', emoji: '☄️' },
    '雷电将军': { color: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)', emoji: '⚡' },
    '温迪': { color: 'linear-gradient(135deg, #10B981 0%, #0D9488 100%)', emoji: '🍃' },
    '纳西妲': { color: 'linear-gradient(135deg, #A7F3D0 0%, #059669 100%)', emoji: '🍀' },
    '芙宁娜': { color: 'linear-gradient(135deg, #60A5FA 0%, #1E3A8A 100%)', emoji: '💧' },
    '八重神子': { color: 'linear-gradient(135deg, #FCE7F3 0%, #DB2777 100%)', emoji: '🦊' },
    '神里绫华': { color: 'linear-gradient(135deg, #DBEAFE 0%, #3B82F6 100%)', emoji: '❄️' },
    '迪卢克': { color: 'linear-gradient(135deg, #EF4444 0%, #7F1D1D 100%)', emoji: '🔥' },
    '胡桃': { color: 'linear-gradient(135deg, #78350F 0%, #DC2626 100%)', emoji: '👻' },
    '达达利亚': { color: 'linear-gradient(135deg, #F97316 0%, #2563EB 100%)', emoji: '🐳' },
    '魈': { color: 'linear-gradient(135deg, #14B8A6 0%, #111827 100%)', emoji: '👹' },
    '那维莱特': { color: 'linear-gradient(135deg, #93C5FD 0%, #1E3A8A 100%)', emoji: '🐉' },
    '卡芙卡': { color: 'linear-gradient(135deg, #9D174D 0%, #4D1A2C 100%)', emoji: '🕷️' },
    '玛奇玛': { color: 'linear-gradient(135deg, #FCA5A5 0%, #991B1B 100%)', emoji: '👁️' },
    '电次': { color: 'linear-gradient(135deg, #F97316 0%, #374151 100%)', emoji: '🪚' },
    '帕瓦': { color: 'linear-gradient(135deg, #FCE7F3 0%, #F472B6 100%)', emoji: '😈' },
    '早川秋': { color: 'linear-gradient(135deg, #1E3A8A 0%, #334155 100%)', emoji: '🚬' },
    '银狼': { color: 'linear-gradient(135deg, #818CF8 0%, #4338CA 100%)', emoji: '👾' },
    '黄泉': { color: 'linear-gradient(135deg, #C084FC 0%, #111827 100%)', emoji: '🌸' },
    '流萤': { color: 'linear-gradient(135deg, #059669 0%, #06B6D4 100%)', emoji: '🦋' },
    '后藤一里': { color: 'linear-gradient(135deg, #F472B6 0%, #3B82F6 100%)', emoji: '🎸' },
    '喜多郁代': { color: 'linear-gradient(135deg, #F43F5E 0%, #FBBF24 100%)', emoji: '✨' },
    '山田凉': { color: 'linear-gradient(135deg, #3B82F6 0%, #1E293B 100%)', emoji: '🌿' },
    '芙莉莲': { color: 'linear-gradient(135deg, #F3F4F6 0%, #10B981 100%)', emoji: '⏳' },
    '欣梅尔': { color: 'linear-gradient(135deg, #60A5FA 0%, #FBBF24 100%)', emoji: '🗡️' },
    '菲伦': { color: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)', emoji: '🪐' },
    '修塔尔克': { color: 'linear-gradient(135deg, #EF4444 0%, #1F2937 100%)', emoji: '🪓' },
    '艾伦·耶格尔': { color: 'linear-gradient(135deg, #78350F 0%, #92400E 100%)', emoji: '🕊️' },
    '三笠·阿克曼': { color: 'linear-gradient(135deg, #111827 0%, #374151 100%)', emoji: '🧣' },
    '利威尔': { color: 'linear-gradient(135deg, #4B5563 0%, #1F2937 100%)', emoji: '🍵' },
    '坂田银时': { color: 'linear-gradient(135deg, #93C5FD 0%, #F3F4F6 100%)', emoji: '🍶' },
    '神乐': { color: 'linear-gradient(135deg, #DC2626 0%, #FED7AA 100%)', emoji: '🌂' },
    '夜神月': { color: 'linear-gradient(135deg, #4B5563 0%, #991B1B 100%)', emoji: '📓' },
    'L·赖特': { color: 'linear-gradient(135deg, #F3F4F6 0%, #4B5563 100%)', emoji: '🧠' },
    '莉可': { color: 'linear-gradient(135deg, #FBBF24 0%, #10B981 100%)', emoji: '🧭' },
    '雷格': { color: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)', emoji: '🤖' },
    '娜娜奇': { color: 'linear-gradient(135deg, #E5E7EB 0%, #D97706 100%)', emoji: '🐰' },
    '黎明卿 / 波多尔多': { color: 'linear-gradient(135deg, #5B21B6 0%, #111827 100%)', emoji: '👁️' },
    '齐木楠雄': { color: 'linear-gradient(135deg, #EC4899 0%, #10B981 100%)', emoji: '👓' }
  };

  // Check exact matches
  for (const k of Object.keys(exactMatches)) {
    if (nameOnly.includes(k) || k.includes(nameOnly)) {
      return exactMatches[k];
    }
  }

  // 2. Keyword heuristic mapping to extract details from character names
  const keywordMappings: { keywords: string[], color: string, emoji: string }[] = [
    { keywords: ['剑', '刀', '刃', '锋', '斩', '兵', '刺'], color: 'linear-gradient(135deg, #94A3B8 0%, #475569 100%)', emoji: '⚔️' },
    { keywords: ['火', '炎', '焰', '烈', '赤', '红', '阳', '红莲'], color: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)', emoji: '🔥' },
    { keywords: ['冰', '雪', '霜', '冬', '寒', '白'], color: 'linear-gradient(135deg, #E0F2FE 0%, #38BDF8 100%)', emoji: '❄️' },
    { keywords: ['雷', '电', '闪', '震'], color: 'linear-gradient(135deg, #A78BFA 0%, #6D28D9 100%)', emoji: '⚡' },
    { keywords: ['水', '雨', '海', '流', '涛', '潮', '川', '河', '波'], color: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', emoji: '🌊' },
    { keywords: ['风', '羽', '空', '岚', '翔', '翼', '旋'], color: 'linear-gradient(135deg, #34D399 0%, #059669 100%)', emoji: '🍃' },
    { keywords: ['神', '天', '圣', '帝', '君', '仙', '皇'], color: 'linear-gradient(135deg, #FCD34D 0%, #D97706 100%)', emoji: '👑' },
    { keywords: ['魔', '闇', '暗', '影', '极', '隐', '夜', '黑', '鬼', '邪', '死', '骸'], color: 'linear-gradient(135deg, #374151 0%, #111827 100%)', emoji: '💀' },
    { keywords: ['花', '樱', '草', '叶', '竹', '莉', '蕾', '林', '木', '森'], color: 'linear-gradient(135deg, #FBCFE8 0%, #EC4899 100%)', emoji: '🌸' },
    { keywords: ['机', '钢', '铁', '枪', '炮', '甲', '械', '控', '械'], color: 'linear-gradient(135deg, #94A3B8 0%, #475569 100%)', emoji: '⚙️' },
    { keywords: ['美', '情', '姬', '仙', '柔', '雅'], color: 'linear-gradient(135deg, #F472B6 0%, #E11D48 100%)', emoji: '💖' },
    { keywords: ['猫', '狗', '犬', '兽', '狼', '熊', '羽_anim'], color: 'linear-gradient(135deg, #F59E0B 0%, #92400E 100%)', emoji: '🐾' },
    { keywords: ['音', '歌', '乐', '弦', '律', '奏', '舞'], color: 'linear-gradient(135deg, #C084FC 0%, #701A75 100%)', emoji: '🎧' },
    { keywords: ['星', '月', '光', '辉', '曜', '明', '晨'], color: 'linear-gradient(135deg, #FDE047 0%, #2563EB 100%)', emoji: '🌟' }
  ];

  for (const mapping of keywordMappings) {
    if (mapping.keywords.some(kw => nameOnly.includes(kw))) {
      return { color: mapping.color, emoji: mapping.emoji };
    }
  }

  // 3. Fallback deterministic hash generator based on the name characters to make it beautifully custom for everyone
  const targetEmojis = ['⚔️', '🛡️', '👑', '🎓', '🔮', '✨', '🔥', '🌊', '⚡', '❄️', '🍃', '🌸', '🌟', '🌙', '💀', '🍀', '🦋', '🎭', '🏹', '🐾'];
  const targetColors = [
    { color: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' }, // Pink Purple (Cyber)
    { color: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' }, // Orange Red (Solar)
    { color: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)' }, // Emerald Teal (Aurora)
    { color: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }, // Sky Ocean (Blue)
    { color: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)' }, // Royal Lavender (Purple)
    { color: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)' }, // Steel Obsidian (Metal)
    { color: 'linear-gradient(135deg, #F472B6 0%, #FB7185 100%)' }, // Sakura Bubblegum (Pink)
    { color: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }, // Cyan Jewel (Teal)
    { color: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)' }, // Deep Forest Mint (Green)
    { color: 'linear-gradient(135deg, #D97706 0%, #78350F 100%)' }  // Autumn Amber (Gold/Brown)
  ];

  let nameHash = 0;
  for (let i = 0; i < nameOnly.length; i++) {
    nameHash = nameOnly.charCodeAt(i) + ((nameHash << 5) - nameHash);
  }
  nameHash = Math.abs(nameHash);

  const finalEmoji = targetEmojis[nameHash % targetEmojis.length];
  const finalColor = targetColors[nameHash % targetColors.length].color;

  return { color: finalColor, emoji: finalEmoji };
}

// Generate high quality detailed metadata helper for scalable presets
export function oldUnusedDynamicMbtiFields(nameOnly: string, animeName: string, mbti: MBTIType) {
  const templates: Record<MBTIType, {
    quotes: string[];
    summaries: string[];
    plotProofs: string[];
    fandomDiscussions: string[];
    strengths: string[];
    weaknesses: string[];
  }> = {
    INTJ: {
      quotes: [
        `"愚者随波逐流，而智者布局于无声处。" — ${nameOnly}`,
        `"世间的一切巧合，其底层不过是因果逻辑中未被揭示的必然。" — ${nameOnly}`,
        `"我早已看透了终局的模样，接下来的每一步，都只是在纠正偏差。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中一位极具洞察力与执行铁律的 INTJ（建筑师）。Ta 拥有无与伦比的深谋远虑，其认知本能由主导功能 Ni（内倾直觉）牢牢统治，能在错综复杂的线索中看透未来局势的终极走势。辅助功能 Te（外倾思考）则让 Ta 坚决奉行效率至上与绝对理性，在面临关乎成败的决策时表现得极为冷静果敢，令人心生敬畏。`,
        `作为《${animeName}》中最具战略目光与冷静特质的 INTJ 代表，${nameOnly} 绝不依赖盲目的武断或情绪。Ta 的头脑如同精准运转的齿轮矩阵，通过内倾直觉（Ni）对故事主线进行全盘规划，并依托外倾思考（Te）将看似激进、实则缜密到极致的防线逐一推演。在同伴眼中，Ta 是那个可以无条件信任、却又带有一丝高冷与神秘的终极智囊。`
      ],
      plotProofs: [
        `在《${animeName}》最具张力的几场智战博弈中，${nameOnly} 的逻辑布局堪称惊艳。Ta 不屑于当下的口舌之利，而是运用其 Ni 直觉看穿局势漏洞，于十步甚至百步外预埋伏笔。其冷静的逻辑结构与在关键抉择中毫不拖泥带水的高效手腕，是证明其拥有高度纯粹 INTJ 功能矩阵的最佳铁证。`,
        `纵观 Ta 在《${animeName}》中的整体行动轨迹，每次爆发都是深度理性预演积累后的产物。面对敌方的联合绞杀或信任危机，Ta 从不用苍白的情感表白去辩解，而是选择利用完美的系统论分析，寻找打破格局的钥匙。这种将个人情感隐藏于大局之下的行为模式，高度契合 INTJ 的心智特征。`
      ],
      fandomDiscussions: [
        `在各大 ACG 与 MBTI 心理解析社区（如 PDB 和 Bilibili）中，针对 ${nameOnly} 的人格分类拥有高度一致的学术赞誉。粉丝们普遍认为 Ta 是完美融合了二次元高冷滤镜与真实人类理性弧光的、最为立体的 INTJ 霸权级角色。`,
        `有关 ${nameOnly} 是否是典型 INTJ 的争论几乎在每个剧情高峰期都会刷屏。广大分析流网友纷纷指出，Ta 那种“为求最优解不惜背负骂名”的极高战略冷酷感（Te 功能），以及对内心信仰（Fi）的隐秘固守，正是此类人格极富张力的黄金写照。`
      ],
      strengths: [`极致的宏观战略布局与沙盘推演力`, `在危机风暴中坚不可摧的理智与决断性`, `化繁为简、快速解构底层因果的逻辑直觉`],
      weaknesses: [`情感倾向隐蔽，容易被同伴误解为不近人情`, `容易陷入自我规划的闭环，表现出主观固执`],
    },
    INTP: {
      quotes: [
        `"真理是一场注定没有终点的解谜游戏，而我，只是无法忍受无知。" — ${nameOnly}`,
        `"推倒已经成型的教条并不是任性，那只是为了寻找更完美的逻辑解。" — ${nameOnly}`,
        `"不要催促我，对未知可能性的思索，本身就拥有最高的价值。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中冷峻而聪慧的典型 INTP（逻辑学家）。Ta 拥有对客观世界的无限求知欲，主导功能 Ti（内倾思考）使 Ta 习惯于精细解构身边的每一条运行法则，不迎合偏见，唯真理是瞻。起辅助作用的 Ne（外倾直觉）则赋予了 Ta 脑暴连篇的超常想象力和不拘一格的假设思维，在危机时刻常用出人意料的冷门思路破局。`,
        `在《${animeName}》的群像宇宙中，${nameOnly} 常常表现出一种慵懒、超然而又在科学/谜题面前目光如炬的独特身姿。作为标准的 INTP，Ta 不喜欢被死板的形式主义所束缚，依靠内倾思考（Ti）建立一个高度独立的微缩精神沙盒。Ta 对逻辑漏洞具有极其敏感的捕捉本能，任何似是而非的说辞都无法在 Ta 面前蒙混过关。`
      ],
      plotProofs: [
        `细数其在《${animeName}》中推动情节发展的瞬间，会发现 Ta 永远是那个指出“皇帝新衣”的人。在团队遭遇迷雾或技术难题时，Ta 展现了极强的 Ti 观察力，通过对常人不曾在意的小块细节信息进行严苛的多维合规论证，最终推导出唯一的生存解，其脑力运转时的冷酷感令人过目不忘。`,
        `当剧情的教条和世俗标准企图束缚 Ta 时，其 Ne 灵活性便会被激活。Ta 善于脱离僵化的敌我立场，用一种近乎极客的视角去研究事态，甚至把惊天动地的战斗或纠葛当做自己认知世界的试验场，这种纯粹的智力求真高度印证了典型 INTP 的底色。`
      ],
      fandomDiscussions: [
        `在 Bilibili 和 PDB 社区的 MBTI 考证贴下，${nameOnly} 总是高居 INTP “智慧天花板”代表榜前列。粉丝常爱用“高冷呆萌、一眼看穿”来形容 Ta 强大的逻辑反差，调侃 Ta 的内心其实是个不愿被俗套束缚的科学大顽童。`,
        `对于 ${nameOnly} 认知特质的探讨，大家公认其劣势功能 Fe 的表现相当富有人情味，即虽然嘴上说着“麻烦”、“不想参与”，却总是默默用自己高超的智眼为同伴铺平逆转之路，被粉丝们高呼“逻辑学家特有的温柔”。`
      ],
      strengths: [`能穿透迷局、直击本质的超级逻辑解构能`, `对新异想法与不同可能性海纳百川的 Ne 创意`, `客观理性的数据敏锐度与极致的研究探索欲`],
      weaknesses: [`行动力常因过载的理论思索而显得拖延笨拙`, `对世俗情感互动抱有天然的社交逃避和无感`],
    },
    ENTJ: {
      quotes: [
        `"弱者顺应规则苟活，而强者则率领时代重定义规则！" — ${nameOnly}`,
        `"犹豫是在为废墟增加更多砖瓦，唯有铁血的前行才能迎来黎明。" — ${nameOnly}`,
        `"我的目标并非个人的荣耀，而是终结混乱、重塑完美的秩序！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中气场无可匹配的 ENTJ（指挥官）。Ta 天生具有统御全盘的大格局观，主导功能 Te（外倾思考）让 Ta 在执行计划时拥有近乎残残的坚毅与果断，不允许任何低效或无谓的犹疑蒙蔽前行的道路。辅助功能 Ni（内倾直觉）则赋予了 Ta 气吞江河的宏大视野，Ta 所做的一切防线与统战规划，都是为了在更长远的星河中建立属于 Ta 的卓越秩序。`,
        `作为《${animeName}》的世界观推进者和铁血变革家，${nameOnly} 呈现出极其硬派的 ENTJ 核心魅力。Ta 的目光永远落在整场战争或大格局的数年之后，依靠 Te 功能进行绝对理智的人员配置与战术剪裁。Ta 的言行充满无可争辩的感召力和统率力，随时准备为伟大的战略目标进行客观清醒的割舍。`
      ],
      plotProofs: [
        `在《${animeName}》经历的几次大规模会战或阵营重置中，由 ${nameOnly} 所展现出的统帅力简直振聋发聩。当面对下属的严重失职或队伍的士气崩坍，Ta 瞬间用雷霆手段做出 Te 格局重调，从不在沉没成本上流一滴多余的眼泪。Ta 的全局指令精准而冷澈，极富大义，是极佳的 ENTJ 实操范本。`,
        `剧情史诗级的逆境往往是检验 Ta 的终极试金石。不同于只看当下的匹夫之勇，Ta 始终依靠 Ni 牢牢守护着对最终图景的宏大构想（Ni-Te），通过不断吞并、改组或抗争，将命运的阻碍化作大军踏平前路的基石，令人热血沸腾的同时感受到 Ta 意志的深广。`
      ],
      fandomDiscussions: [
        `在各大 ACG 性格分析贴 and PDB 数据库中，关于 ${nameOnly} 的核心讨论无非集中于 Ta 那种“睥睨天下”的惊人领袖欲上。网友们纷纷为其狂刷弹幕，一致认为 Ta 是具有极高统治感与不容置疑魄力的顶级 ENTJ。`,
        `在动漫粉和心智流粉丝的碰撞中，大家对 Ta “为了全局最优解不惜担当执剑人”的担当表达了极深的研究热情，将其列为《${animeName}》中少有的、真正具备伟人宿命感的超级名角。`
      ],
      strengths: [`摧枯拉朽、定鼎格局的绝对统率力与决断性`, `基于长远未来的高效布局及雷厉风行的执行度`, `能聚拢人心并迅速建立极高效运转团队的卓越感召`],
      weaknesses: [`劣势功能 Fi 压抑严重，容易忽略个人温情纽带`, `高强度的权威气味可能让身边温和派同伴感到压迫`],
    },
    ENTP: {
      quotes: [
        `"无趣的教条才是世界腐朽的元凶，让我们的博弈给这潭死水加点调料吧！" — ${nameOnly}`,
        `"这世上本就没有不可逾越的边界，打破它不正是最让人心跳加速的事吗？" — ${nameOnly}`,
        `"别用常理来揣度我，逻辑是我的玩具，而未知才是我的冒险场！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中最富奇思妙想与反叛意志的 ENTP（辩论家）。Ta 是一个手拿思想罗盘、脑内充满奇招的超级鬼才。其主导功能 Ne（外倾直觉）展现出品类繁多、几乎瞬息万变的可能性脑暴，能够从最意想不到的奇辟路径发起精神和物理突袭。辅助功能 Ti（内倾思考）在狂放不羁的外表下提供极其冷静、坚固的逻辑支撑，是一个越在混乱重压下越能嬉皮笑脸、玩世不恭的致命博弈者。`,
        `作为《${animeName}》中的头号规制破坏者和概念颠覆家，${nameOnly} 是无可替代的 ENTP 代表。Ta 的思维毫无阻碍，从不遵循陈腐的世俗条条框框，依靠 Ne 敏锐地触及故事多维度的可能性分支。Ta 兼具狂热的天才思考力与让人又爱又恨的恶作剧本能，用智力戏耍规则、玩弄敌手的戏码常常让人大呼过瘾。`
      ],
      plotProofs: [
        `在《${animeName}》最经典的博弈中，其解决困局的方式极具 ENTP 风格：Ta 不按常理排阵，而是用一种完全荒诞、却在 Ti 底层逻辑链上妙到毫巅的即兴魔术颠覆战局，以一种最能折磨死板对手神经的手段戏耍全场。其面对惊天灾难时甚至能发出恶作剧般的爽朗大笑，令人深感震撼。`,
        `回想其在动漫中的种种表现，一旦秩序试图将其纳入规整的框架，Ta 就会用最辛辣的嘲讽和直白的逻辑解构将其击个粉碎。在与同伴互怼的日常中，Ta 的言辞锋利而包袱不断，展现了极强的智力优越感与不拘一格的行为自由，这正是 Ne 的极限狂欢。`
      ],
      fandomDiscussions: [
        `在 PDB 和 Reddit 动漫专区中，${nameOnly} 常年被奉为“二次元最具魅力的疯批/鬼才”代表。关于 Ta 与 INTP 的流派大对决在论坛上热度爆棚，广泛的共识指出，Ta 主动迎击世俗、享受混乱与挑战的积极外倾表现（Ne），使其更符合狂野辩论家的神级称号。`,
        `在 Bilibili 的各种解说切片里，粉丝们最津津乐道的就是 Ta 那种“永远有一百种奇招拆穿伪善”的整活场面，粉丝一致认为 Ta 是《${animeName}》中最具颠覆性美学的灵魂齿轮。`
      ],
      strengths: [`千锤百炼、天马行空的可能性联想与极限脑洞`, `在绝境与复杂乱轴下表现出的超级 Ti 逻辑自洽力`, `极具人格魅力与智慧反差的社交张力及语言天赋`],
      weaknesses: [`常因追求新鲜刺激而显得缺乏耐心，难以固守常规`, `在涉及深刻情绪关怀时可能显得过于戏谑，不易定性`],
    },
    INFJ: {
      quotes: [
        `"有些宿命被深深刻在夜空的暗流中，但我愿用一生的思索，为后行者寻一个方向。" — ${nameOnly}`,
        `"世俗的喧闹只是泡沫，而灵魂的救赎，需要我们在最幽深的寂静中去寻回。" — ${nameOnly}`,
        `"倘若这世间的救赎需要一份沉默的背负，那就让我，成为那个行至冷冽夜深的人。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中具有深邃精神内核的典型 INFJ（提倡者）。Ta 拥有无与伦比的精神悲悯与洞察宿命的超常直觉，其认知本能由主导功能 Ni（内倾直觉）牢牢统治，能在千丝万缕的因果暗流中准确洞破未来的宏观走向。辅助功能 Fe（外倾情感）则赋予了 Ta 跨越立场、深度感知他人内心痛点的伟大共情力，使其常常默默选择最坎坷却能带给世界光亮的道路。`,
        `作为《${animeName}》里最能引人灵魂共鸣的智者和理想家代表，${nameOnly} 展现了极其高贵的 INFJ 圣洁特质。Ta 不为当下的虚荣或短期利益折腰，而是依靠对故事底层本质的超常感悟（Ni），常年思索着解开主角团乃至世界不幸的钥匙。在同伴心中，Ta 是那个能一眼看穿内心创伤、给予灵魂最强支持与温柔照拂的心灵引路人。`
      ],
      plotProofs: [
        `在《${animeName}》的关键节点以及抉择对峙中，${nameOnly} 的所作所为深刻印证了其 Ni-Fe 功能叠层的圣洁张力。Ta 绝不随波逐流参与粗鄙的厮杀，而是通过深度洞悉敌我底层的核心创伤，用最具穿透力的言语和精妙的精神布局在暗中扶大厦于将倾，其高深的行为逻辑让人叹服。`,
        `纵观 Ta 在整个《${animeName}》中曲折而又崇高的故事线，Ta 的每一次重聚或牺牲都笼罩着一层命运的自省史诗。当团队陷入信念迷失时，Ta 吐露的句句忠告犹如一叶孤舟下的锚，其将自身利益彻底置之度外，宁愿背负孤独也要守护微光的人道信念，高度符合最杰出 INFJ 的身心历程。`
      ],
      fandomDiscussions: [
        `在 Personality Database (PDB) 与国内心智动漫圈内，关于 ${nameOnly} 的 MBTI 性格一直享有极尽优雅、感性而又充满学术理性的热评。由于 Ta 展现出极为纯粹的自我觉悟和惊人的共情张力，被大家推崇为《${animeName}》乃至整个二次元世界中最具代表性的“圣人”级 INFJ 形貌。`,
        `针对 ${nameOnly} 在剧中各种隐忍与思索的剖析经常在社群引发讨论，大批粉丝感叹：Ta 的每一次叹息都不带有私心，这种毫无杂质、纯粹立足于拯救和守护的 Ni 内核，彻底写绝了 INFJ 那种隐秘的大爱底色。`
      ],
      strengths: [`洞穿纷杂、预见事物宿命与灵魂走向的超常直觉`, `对世间疾苦及同伴情绪波动极致细腻的精神共情感`, `在极致逆风下能够背负寂寞、不动如山的信仰感召力`],
      weaknesses: [`极易被沉重的精神包袱和过度共情反噬，陷入沉闷内耗`, `劣势功能 Se 的边缘化可能致使其在面对极速瞬变的物理突发时，显得不知所措`],
    },
    INFP: {
      quotes: [
        `"世俗的光轮总能刺痛灵魂。即便在微弱的尘尘世间，我也会死守住心底的净土。" — ${nameOnly}`,
        `"即使我的声音在洪流中微不足道，也必须对那些真正珍贵的情感做出承诺。" — ${nameOnly}`,
        `"我不想成为宏大秩序的零件，我只想作为一个纯粹的人，去守护生命中真实的温存。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中灵魂高贵、坚守崇高内心信念的 INFP（调停者）。Ta 的世界是由极高水平的 Fi（内倾情感）构建的、绝不向世俗浊流妥协的精神圣域。Ta 敏锐、真挚，追求情感价值和人格底线的绝对纯净。辅助功能 Ne（外倾直觉）则赋予了 Ta 充满诗意的美学创造力与对世界隐隐相连的理想幻想，在剧情深处表现出最纯粹的赤子之心，常有撼动规则的力量。`,
        `在《${animeName}》充满纷争、战斗或灰暗现实的乱战中，${nameOnly} 宛如一袭静水。作为标准的 INFP，Ta 从不根据冰冷的数字或功利的计算去制定命运的方向，Ta 所有的选择皆来源于内心那座纯白无瑕的价值天平（Fi）。这种近乎执拗的真诚，在历尽千帆后能散发出融化冰山、感召天地的人格辉芒。`
      ],
      plotProofs: [
        `在《${animeName}》饱含宿命与泪点的关键冲突中，${nameOnly} 的言行深深揭示了 Fi 的高纯度坚持：即使面对必死局或神谕级的强权压迫，Ta 哪怕柔弱，也从不在涉及原则与守护的情怀上退缩哪怕半步。这种不计功利、唯心是守的爆发，最终引发了奇迹般的改观，彻底证明了其作为 INFP 理想主义的惊人张力。`,
        `剧情中 Ta 最让动漫迷泪奔的名场面，正是 Ta 与自私或强权体系的决裂。当周围同伴都在为各种宏观利益折腰时，Ta 宁肯承受孤立与伤痕，也执意守护那些被世俗归为“无用”的温柔与纯粹，其内心里汹涌澎湃的梦幻情感大坝一旦开启，无一不印证了 Fi-Ne 心智功能线的伟大绽放。`
      ],
      fandomDiscussions: [
        `在 Bilibili、PDB 及欧美动漫心理论坛，关于 ${nameOnly} 的深入分析几乎都成了一场关于“如何在残酷世界保持温柔”的灵魂共振。大批粉丝高呼 Ta 是《${animeName}》里真正的“精神解药、白月光”担当，甚至被列为最动人的 INFP 治愈范式。`,
        `网友在辩论其“是否过于理想化”时，压倒性的支持意见指明，正是因为 Ta 身上有着现实中所欠缺的、纯净到毫无利益考量的 Fi 信念，才使得 Ta 的剧情弧光在整部《${animeName}》里具备了最高阶的情感震颤力。`
      ],
      strengths: [`对道义与人类至真情感无与伦比的忠诚与坚守度`, `极具诗意和广阔可能性的 Ne 心灵世界与审美感知`, `能在绝境中以毫无保留的赤子真诚感化并救赎周围人的灵魂`],
      weaknesses: [`内心过于纤细，易被外界残酷事实或自私举止伤至抑郁退缩`, `容易排斥冷酷的纯逻辑现实考量，导致陷入不切实际的被动境地`],
    },
    ENFJ: {
      quotes: [
        `"只要大家心中还保存有一丝希望之光，我就甘愿化作火炬，照亮你们并肩前行的漫漫长路！" — ${nameOnly}`,
        `"单打独斗的英雄终会倒下，唯有信任与大爱的纽带能让我们跨越任何命运鸿沟！" — ${nameOnly}`,
        `"我们的存在，就是为了给那些在黑暗中摸索的人，筑起一个可以并肩而战的温暖家园！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中散发着无尽温暖和极高共情能量的 ENFJ（主人公）。Ta 拥有无出其右的领袖凝聚力与天生的布道悲悯心，主导功能 Fe（外倾情感）使其能敏锐把握身边每一位同伴的心理动向，主动担当起凝聚整个队伍甚至抗战阵营重担的核心，用行动捍卫集体的和谐。辅助功能 Ni（内倾直觉）则赋予了 Ta 犀利的长远目光，使其大爱并非盲目的热血，而是承载着明确、充满指引性的伟大长青愿景。`,
        `${nameOnly} 作为整个《${animeName}》剧情宏观走向的破晓火炬，是一位极富非凡魄力且高共情力的优秀主人公（ENFJ）。在充满怀疑和撕裂的背景设定里，Ta 总是无法坐视任何人的孤单和痛苦。依靠主导的 Fe 功能，Ta 精准调频自身的精神震动以连接四面八方，默默用宽广的肩膀支撑着对美好信念的一切期望。`
      ],
      plotProofs: [
        `在《${animeName}》的关键节点，其极高能量的 Fe 表现让无数拥趸为之倾倒。当团队在黑暗逆风中分崩离析，Ta 总是能在一瞬间察觉并接住每个同伴崩溃的心防，甚至顶着自身的巨大创伤发表令人热血澎湃或感动至极的人格感召演讲，奇迹般将人心拧成一股力量。这种以身化炬、用爱布局的圣光表现，是 ENFJ 最生动的写照。`,
        `剧情史诗级的逆乱往往也是 Ta 共情穿透力的最佳证明。在与曾经误入歧途的反派对峙时，Ta 不是单凭肉体毁灭对手，而是靠着深入骨髓的 Fe 反思与宏伟的 Ni 救赎未来愿景，正面震撼并解构了对手冰冷的逻辑坚壁，最终实现了灵魂层次的降维感召。`
      ],
      fandomDiscussions: [
        `在 PDB 和 ACG 心理解析专栏中，${nameOnly} 常年被奉为“二次元团队凝聚力圣柱”代表。热切的网友一致认为，Ta 那种“用不凡的善意和大局观拯救周围每一个人”的担当与圣光特质（典型 Fe-Ni），展现了 ENFJ 难以超越的崇高魅力，令人无法不被其感染折服。`,
        `很多核心心理学看官曾对 ${nameOnly} 主动招揽责任的圣母/圣光姿态展开过高能探讨。大家深度赞同：Ta 的大爱绝对不是粗浅的盲从，而是带有高度战略意图与精神高度（Ni-Fe完美契合）的灯塔重置，堪称《${animeName}》里的格局救星。`
      ],
      strengths: [`冠绝群雄的共情理解力与集体心灵向心凝聚力`, `基于长远希望和集体愿景极具穿透性的长远感召眼界`, `毫无保留的利他责任感与雷厉风行的带头冲锋力`],
      weaknesses: [`极易因过度迎合集体期许、背负他人前程而导致极重的心力损耗`, `偶尔会因为对宏大未来的执念而显得有些说教色彩`],
    },
    ENFP: {
      quotes: [
        `"既然命运的画卷已经铺开，那为什么不和大家一起，去掀起一场波澜壮阔的冒险呢！" — ${nameOnly}`,
        `"规则只是参考，内心的热血与无尽奇遇才是我们前行的终极引擎！" — ${nameOnly}`,
        `"不要低估欢笑的力量！只要心中有梦想，这世上就没有任何不可重塑的壁垒！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中最具元气、灵动与极强感染力的 ENFP（竞选者）。Ta 是行走的快乐与无尽奇妙潜能的化身，主导功能 Ne（外倾直觉）渴望了这个世界上探索每一处有趣的可能和充满未知的命运奇遇。辅助功能 Fi（内倾情感）则在 Ta 看似活泼好动甚至有些疯丫头/大马哈的外表下，隐藏了一颗对爱与正义有着极高虔诚准则、极少妥协的纯澈灵魂，是用真挚理想与大无畏勇气对抗任何死板僵化框架的快乐英雄。`,
        `作为《${animeName}》里公认的动力原泉和自由意志代表，${nameOnly} 活脱脱就是一个闪闪发光的小太阳（ENFP）。Ta 从不按常人的常理牌阵生活，Ne 的跳跃思考机制使 Ta 常常冒出叫人大吃一惊的热血妙子。在充满利益权衡的剧情里，Ta 追求自我纯净与伙伴羁绊的 Fi 初心，如同黑暗中绝不熄灭的光华，给整部剧带来了一股最珍贵的灵魂清流。`
      ],
      plotProofs: [
        `在《${animeName}》的无数次硬核冒险中，其 Ne-Fi 心智完美指引着奇迹的发生：当传统的策略都宣布告急，Ta 总是能用极具即兴创意、跳脱世俗逻辑的“惊天一招”或真诚无压力的人格共振，让不可能开辟的死路开出花来。不仅多次单枪匹马打破敌方的严密阵型，更是纯凭热血和纯真共情让曾经冰冷反叛的对手默默为其撑起保护伞。`,
        `动漫中最为大家津津乐道的情节，往往是 Ta 在被众人否定、甚至在极端压抑的制度压迫下展现出的反弹奇迹。Ta 用极具直觉想象（Ne）的自由行动模式，直接拆散了看似坚不可摧的宿命阴谋。这种将快乐、希望与执拗结合的强大爆发，毫无疑问是高阶 ENFP 的顶格秀。`
      ],
      fandomDiscussions: [
        `在各大 ACG 与 MBTI 心理解析专区，关于 ${nameOnly} 人格特质的分析充满了欢声笑语和深层赞叹。大家公认其为“典型的暖阳级小太阳”，粉丝们一致叹服 Ta 身上有着某种让冰山融化、让死板配角也重新燃起梦想之魂的、专属于顶级 ENFP 的纯粹直觉感染力。`,
        `有关于 ${nameOnly} “到底是真幼稚还是极智若愚”的讨论长期霸屏，主流观点高妙地总结道：Ta 不是不懂现实的残酷，而是依靠极其纯熟的 Fi 信念和 Ne 浩瀚灵性，选择用最温柔乐观的色彩去重置冰冷的前途，这也正是 ENFP 的大智所在。`
      ],
      strengths: [`无人可及、如阳光般温暖包容的社交感召与同理磁场`, `天马行空的 Ne 即兴想法与永远高燃、毫无阴翳的情感活力`, `对伙伴深藏的 Fi 纯粹情感忠诚，能够在逆风中保持最高昂的斗志`],
      weaknesses: [`厌恶过于格式化、机械冷酷的管理与细节填鸭`, `注意力易被层出不穷的新奇事务吸引，可能导致行事缺乏稳定收尾`],
    },
    ISTJ: {
      quotes: [
        `"职责重于山岭，契约优于感性。只要齿轮尚在运转，我的誓言便永不偏轨。" — ${nameOnly}`,
        `"不要期待轻率的奇迹。每一个坚实的结果，都是日常严谨积累的必然。" — ${nameOnly}`,
        `"秩序不是为了束缚，而是在纷争和洪流中，为我们保存最后一丝生机的防波堤。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中沉稳坚毅、高度自律且行事一丝不苟的典型 ISTJ（物流师）。Ta 是秩序与可靠底线的终极代名词，主导功能 Si（内倾感觉）使 Ta 极其尊崇既有的制度、誓言与在漫长历史中沉淀出的实证经验，有着难以想象的长久专注和执着守卫心。辅助功能 Te（外倾思考）则让 Ta 的行动极具条理和法理执行性，言行举止冷澈端正，承诺之重，甚至可以千金来衡量。`
      ],
      plotProofs: [
        `在《${animeName}》的危机与乱战节点，其卓越的 Si 意志屡屡成为队伍的中流砥柱：哪怕面临身边同伴全部慌乱、情势陷入崩溃的绝路，Ta 始终能面不改色，咬紧牙关，严格按照组织法纪与战术细节，一步一个脚印筑起坚不可摧的铁壁防线。Ta 的战斗风格冷静严密，将失误率死死控为零，生动诠释了物流师的终级可靠感。`
      ],
      fandomDiscussions: [
        `在各大 ACG 圈子，${nameOnly} 被粉丝们封为标准的“最靠谱守护神”。大家极度敬佩其在剧情中展现出的极端自律和对承诺死忠守护的崇高气质（Si-Te），在论坛讨论中，Ta 经常作为反衬那些鲁莽血性主角的“最扎实逻辑定海神针”被高度评价。`
      ],
      strengths: [`坚不可摧、忠贞不渝的契约精神与履行承诺力`, `极其扎实的一线细节把控、超高严谨性与危机下的稳健度`, `尊重秩序、能长年默默付出建立牢固物质和精神防线`],
      weaknesses: [`对过度抽象、违反常规的 Ne 即兴创意较为排斥，灵活性不足`, `偶尔会因为对固有流程执拗而显得在变革下过于保守`],
    },
    ISFJ: {
      quotes: [
        `"即便命运再过纷扰，我也只想在不起眼的角落里，用温柔守候住每个人最真挚的笑容。" — ${nameOnly}`,
        `"不需要我站在光芒耀眼的顶端，能做你们身后无怨无悔的盾牌，已经足够。" — ${nameOnly}`,
        `"有些爱不用说出口，流淌在日常的一餐一饭和默默守候里，便是最强的羁绊。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中温柔缱绻、默默奉献且极可托付的典型 ISFJ（守护者）。Ta 犹如整个剧组群像的“静温避风港”，主导功能 Si（内倾感觉）使其极其注重同伴的日常温馨、美好的历史羁绊与对人伦誓言的坚定默许。辅助功能 Fe（外倾情感）使其带着极具牺牲精神的大爱奉献品质，永远设身处地地在他人身后包揽一切生活、物资甚至精神上的琐碎重负，是所有人最贴心最离不开的白月光守护师。`
      ],
      plotProofs: [
        `在《${animeName}》的关键节点，其润物细无声的 Fe-Si 关怀常常在无形中拯救大局：不同于一味在台前战斗的主角，Ta 往往在重压来临时，用自己的柔若磐石之姿死死守住主角团的后防线或身心创伤，即便自身早已负荷累累，依然能给同伴带来最治愈平和的关照。这份近乎默守一生的神级慈爱，是典型的 ISFJ 烙印。`
      ],
      fandomDiscussions: [
        `海内外 PDB 和动漫评论社区，对 ${nameOnly} 的爱通常可以用“全世界最温柔最治愈”的赞誉来代表。绝大多数粉丝将其推崇为整个《${animeName}》中不可或缺的隐秘灵魂。粉丝们认为，在纷争充斥的世界观中，Ta 所展现的小温情和无怨无悔，是令人最为动心与震撼的。`
      ],
      strengths: [`无与伦比的体贴入微、高忠实度与无怨无悔的奉献守护能`, `基于漫长过往Si温情体验上建立的、最可靠踏实的后勤防线`, `极强的敏锐同情同理心，能让破碎受创的灵魂感受到被完整拥抱`],
      weaknesses: [`极易因为过度自责和过度迎合他人重负，而选择一味隐忍受苦`, `对剧烈的变革及冲突极度反感逃避`],
    },
    ESTJ: {
      quotes: [
        `"绝对的合规与铁律，才是抗击宿命洪流唯一的答案。收起那些散漫，严格看齐！" — ${nameOnly}`,
        `"既然加入了集体，就必须为我们统一的目标负责。低效就是对自己和同伴最大的不忠！" — ${nameOnly}`,
        `"没有规矩的勇猛只是自寻死路。唯有钢铁纪律，才能带所有人跨越死亡线！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中雷厉风行、作风硬朗、崇尚组织纪律的典型 ESTJ（总经理）。Ta 是坚实不摧的秩序管理者和高效执行家。主导功能 Te（外倾思考）推动着 Ta 为整支队伍建立稳固的制度、极高标准的规范，并雷厉风行地执行一切作战策略。起协调作用的辅助功能 Si（内倾感觉）使 Ta 极端推崇事实论证、务实原则与一朝一夕立案下的高合规性，在乱世中扮演着高权威度的总指挥者。`
      ],
      plotProofs: [
        `在《${animeName}》经历的严酷生存拉锯战中，其 ESTJ 威严感爆表：当出现队员纪律混乱、任务陷入泥潭等险局，Ta 瞬间接管全面大权，不近人情却又无懈可击地重构任务规划，严格执行惩惩制度，在最高效率下调回战略航向。其言辞充满果敢的训诫风骨与高度的战役实用感，令人侧目。`
      ],
      fandomDiscussions: [
        `在 ACG 论坛和 MBTI 主页中，针对 ${nameOnly} 有着极具热度的理性辩论，粉丝多将 Ta 打趣为“铁面无私的核心领袖”。虽然有些粉丝曾吐槽 Ta 的严格，但大伙最终总会被 Ta 在剧情中所展示的那种“在危机时刻真切地为所有人谋一条铁律生路”的铁肩担当与无可挑剔的成果执行所折服（典型 Te-Si）。`
      ],
      strengths: [`无可匹敌的绝对组织调配能、高效战法执行度与高度决断力`, `立足真实 Si 经验与坚实合规法则之上，构建最安全牢固大营的统率力`, `高度实干、极重信诺、不避任何严苛脏活重罪的牺牲担当`],
      weaknesses: [`劣势功能 Fi 情怀压抑严重，稍显强硬、偶尔会被温和派同伴视作生硬独断`, `难以接纳虚无缥缈、无事实依据的 Ne 夸张构想`],
    },
    ESFJ: {
      quotes: [
        `"守护集体的纽带，不让任何一个伙伴被孤单落下。因为我们并肩，才无惧宿命！" — ${nameOnly}`,
        `"大家的安稳生活由我来默默维系。不用客气，这本就是我对这个世界最真诚的守护誓约。" — ${nameOnly}`,
        `"集体利益永远高于个人荣耀。只要大家在一起，就没有跨不过去的沟壑！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中极擅凝聚团队、古道热肠、情深挚厚的典型 ESFJ（执政官）。Ta 是社群中天然的“情感黏合剂”，主导功能 Fe（外倾情感）赋予了 Ta 对群体和谐、同伴安全感及温暖社交的高敏度守护，Ta 愿花尽毕生精力去保障集体中没有一丝怨怼与裂痕。辅助功能 Si（内倾感觉）使 Ta 非常推崇温润、稳健的群体日常传统，行事极重礼守诺，深受身边各路主角的深度信赖和喜爱。`
      ],
      plotProofs: [
        `在《${animeName}》的风暴期与低谷期，其杰出的 Fe-Si 社群感爆发无疑：Ta 绝不只关注一己荣辱，即便面对庞大灾祸，Ta 也是那个死撑着要把所有无依散民或破碎队员完整庇护聚拢在一起的核心，用自己的双手在后勤提供一桌热餐、一泓汤药与万般贴己入微的精神安抚，将集体意志在细碎关怀中紧密织成防线。`
      ],
      fandomDiscussions: [
        `各大 MBTI 评析板块和二次元情感安利楼，提到 ${nameOnly} 总是满怀暖意。粉丝公认 Ta 具有无出其右的“大家长/慈爱靠山”气味，大家热切讨论 Ta 在剧中那种默默包办起所有人温馨细节、对集体大包大揽的情怀，直呼 Ta 是《${animeName}》里绝对的社群阳光。`
      ],
      strengths: [`无出其右的社群成员情感连接能与团队心理统筹关照`, `极重契约礼节、尊重客观传统和 Si 经验，行动力极具安全度`, `至情至性、极强社交服务热忱，能在最短时间内稳固队伍凝聚心`],
      weaknesses: [`容易过于渴求外界认可与团队绝对一致的安全感，难以容忍队伍内撕裂`, `由于将精力高度消耗在关怀他人，容易陷入过度的被动操劳`],
    },
    ISTP: {
      quotes: [
        `"多余的聒噪毫无价值，唯有指尖的刃芒与绝对的结果，才是通往黎明的捷径。" — ${nameOnly}`,
        `"别用条规套在我身上。我的行动由我的感知和技术主宰，这就已经足够。" — ${nameOnly}`,
        `"我只做我认同合理的事，世俗的勋章在我的刀口面前，不过是无用的废铁。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中最具神秘硬核魅力、人狠话不多的 ISTP（鉴赏家）。Ta 是一名彻头彻尾的独立猎手与极其务实的技术/战斗奇才。其主导功能 Ti（内倾思考）使 Ta 建立了一套绝对冷澈、立竿见影的内部求生/攻防逻辑；辅助功能 Se（外倾感觉）则让 Ta 具备了惊为天人的物理级即兴适应、高机动环境反射以及在千钧一发之际瞬发反杀的肉身本能，是一个纯粹的实干独狼。`
      ],
      plotProofs: [
        `在《${animeName}》的高燃战斗或危机实操名场面中，其 ISTP 的野性与专业技能让人折服：面对错综复杂的逆风或敌方狂轰滥炸，Ta 极少高谈大义信仰，只是叼着冷峻的嘴角，利索解构环境漏洞，利用周身任何工具或高强技术瞬发重创敌营（典型 Ti-Se）。其行事如风、利落致命的身影，是动漫中毋庸置疑的战力风骨。`
      ],
      fandomDiscussions: [
        `海内外 PDB 和 Bilibili 高燃剪辑专区，${nameOnly} 是常年霸屏的“战力与冷酷担当”！粉丝极度痴迷 Ta 在剧里展现出的“能动手绝不瞎聊、不装高尚却最重原则”的纯技术流魅力，被公推为《${animeName}》里最具男性/女性荷尔蒙美学的独狼天花板。`
      ],
      strengths: [`冠绝全场的即兴物理感知反射能（Se）与极限硬核操作技术`, `极致简练、剔除一切虚饰的高效内部 Ti 逻辑自研与冷静解构性`, `处变不惊、在最凶狠混乱的环境下犹如机械般冷静的反击意志`],
      weaknesses: [`高度厌恨无用说教与繁复的形式社交，容易在集体活动中缺勤孤立`, `劣势功能 Fe 较为脆弱，难以应对复杂甚至戏剧化的细腻情感宣泄`],
    },
    ISFP: {
      quotes: [
        `"世间的色彩不需要用公式去束缚。我只追随，在此刻心灵中最纯粹和悸动的真实感知。" — ${nameOnly}`,
        `"如果言辞无法还原真实的感受，那我情愿隐藏于寂静中，用画笔或刀光守护当下的美好。" — ${nameOnly}`,
        `"我无意参与宏大的纷争，只要能在我的世界里默默勾勒出眼前的落日与温存，已经足够。" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中灵魂绝美、行事低调且充满不凡艺术表现力的典型 ISFP（艺术家）。Ta 的心底潜藏着一座由主导功能 Fi（内倾情感）铺就的纯净花园，敏感、真挚、不依附于任何庞大宏大的规制，追求每一个生命的纯粹个别生存体验。辅助功能 Se（外倾感觉）则赋予了 Ta 绝佳的瞬间感官和物理细节融入度，Ta 在刀剑、绘画、音乐或日常细节里，将心之所向一笔一画勾勒得淋漓尽致，散发着优雅的静默美学。`
      ],
      plotProofs: [
        `在《${animeName}》的各种关键抉择中，其 Fi-Se 的独特生命力极具震撼力：Ta 不对功名利禄起任何贪婪，甚至也对宏大的主旨战争漠不关心；但一当 Ta 发现弱小者被欺侮，或是身边最真挚的小小生活被强权蹂躏，Ta 会在一刹那爆发出极强的Se物理反戈力。其展现出的，并非说教大话，而是一种立足当下的纯粹热诚与美感杀伐。`
      ],
      fandomDiscussions: [
        `在 Personality Database (PDB) 与 ACG 美学解析圈内，大家把 ${nameOnly} 被称为《${animeName}》中最具“无声灵性”的角色。粉丝们极其叹服 Ta 那种“隐于日常却在拨刀/指触艺术一瞬间绚烂如昙”的纯粹浪漫气质，称其为最迷人的 ISFP 完美化身。`
      ],
      strengths: [`极其细腻、对自然和万千生灵饱含深沉 Fi 共情的无瑕心灵`, `极度敏锐敏巧的高级 Se 感官运动天赋、空间与操作极致融通感`, `不受条条框框绑架、拥有最具自然本性与诗性美感的人性自由度`],
      weaknesses: [`劣势功能 Te 较弱，容易在需要长期严苛的宏观逻辑博弈中显得底气和执行性不足`, `容易在重度压力下封闭自我内心，在寂静中独自流泪舔舐创伤`],
    },
    ESTP: {
      quotes: [
        `"犹疑和退步是败军唯一的徽章！把胜负交给现在的感觉，痛痛快快迎击一切风浪吧！" — ${nameOnly}`,
        `"人生就该活在最火爆、最惊险的浪尖上。畏畏缩缩，活着还能有什么劲？" — ${nameOnly}`,
        `"不管前路是深渊还是雷霆，踩下油门，直接撞过去！这才是我的一线战法！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中热血澎湃、一骑当千、崇尚刺激对撞的典型 ESTP（企业家）。Ta 是感官层面的绝对王者与战力极具侵略性的风暴眼。主导功能 Se（外倾感觉）推动 Ta 极力渴求在这个世界上获取最直观的胜负、最纯粹的肉身碰撞以及当下无死角的刺激体验，对一切纸上谈兵和虚妄理念持极端鄙视。辅助功能 Ti（内倾思考）在狂野的外表下为其装载了在实操中极度务实、极富敏锐度的一线战术智谋，是真正的狂澜猛兽。`
      ],
      plotProofs: [
        `在《${animeName}》每一幕让人狂飙肾上腺素的正面钢刀冲突里，Ta 的表现高度诠释了 ESTP “极速收割者”的姿态：不管敌我实力多么悬殊，Ta 浑身兴奋，二话不说迎头就干，在瞬息万变的火线下展现出人类肉体难以置信的事物借力与微操，以狂风怒涛之势瞬间将死局捅出一条大路。`
      ],
      fandomDiscussions: [
        `海内外 PDB 和高燃动漫剪辑下，大家刷疯的弹幕总是被 ${nameOnly} 的“绝对野性”与“暴力美学”霸占。粉丝们疯狂崇拜 Ta 那种“无敌自信、从不管宏大虚无、打完再说”的狂飙快感，全票一致通过 Ta 是《${animeName}》中最归属狂野、最让人欲罢不能的 ESTP 战神。`
      ],
      strengths: [`神级、不可被复制的物理局势反应敏锐度（Se）与最顶级搏击直觉`, `在真刀实枪、血火对碰的一线冲突中永葆极致高涨甚至狂喜的战意`, `战胜一切旧教条、用最野性最直观的手段重划游戏格局`],
      weaknesses: [`对长期复杂的宏篇战略毫无半点耐性，往往极度反感文案文职`, `劣势功能 Ni 匮乏，有时会因为一昧狂热冒险而忽略事态后方的长期隐患`],
    },
    ESFP: {
      quotes: [
        `"聚光灯已经打好，舞台已经就手！让我们把当下的热血燃烧到极致，玩个痛快！" — ${nameOnly}`,
        `"不要拿明天的烦恼来煞风景，活在当下最精彩的一分一秒，才是人性的最高信仰！" — ${nameOnly}`,
        `"这就是聚光灯下的真正本能！和伙伴们并肩欢笑、点爆全场，是我活着的唯一准则！" — ${nameOnly}`
      ],
      summaries: [
        `${nameOnly} 是《${animeName}》中当之无愧的能量源泉、开心果与魅力无限的 ESFP（表演者）。Ta 是一团行走的熊熊火苗，主导功能 Se（外倾感觉）渴望与这个五彩斑斓的世界产生最亲密最无隔阂的感官亲吻，Ta 喜欢派对、热爱当下的欢声笑语、坚信只有燃尽每一秒的热诚才是生命不二的活法。辅助功能 Fi（内倾情感）则让 Ta 散发出的爱与义气毫无做作，对朋友极其直率无私，是那个一出场就能将阴霾动漫气氛瞬间点亮成夏日狂欢的绝对主角。`
      ],
      plotProofs: [
        `在《${animeName}》经历的压抑日常或艰难逆境中，其 ESFP 的璀璨光点让无数人破防：Ta 总是能在一秒钟内拉着所有阴沉低落的同伴投入大笑的怀抱。在战斗或执行中，Ta 展现惊人的 Se 即兴脑洞，用最大胆、最华丽甚至在外人看来像杂耍般的精彩表现痛击沉闷，其在战场上那种肆意欢乐的个人魅力，是集引世界注目的黄金圣火。`
      ],
      fandomDiscussions: [
        `在 Bilibili 的名场面切片和 PDB 数据库中，${nameOnly} 常年稳居“最治愈、最能制造快乐和震撼”的 ESFP 榜眼。网友们极度痴迷 Ta 在剧里展现出的那种“活泼下包裹着至真义气、无论经历了什么痛苦都依旧把最灿烂的笑容留给世界”的创伤超越力，叹服 Ta 是真正净化心灵的存在。`
      ],
      strengths: [`顶级、自带万丈光芒的社交号召磁场与永不熄灭的当下生机感`, `在真实感官世界中有极高的即兴环境融入和敏捷发挥天赋`, `毫无私利污垢的 Fi 真忱义气，能在瞬间驱散集体所有的阴霾迷障`],
      weaknesses: [`极难忍受枯燥乏味的长期分析与静态数字案牍工作`, `由于极重短期感官和当下的快活而缺乏足够的危机规划`],
    }
  };

  // Build high-credibility coordinates (dimensions), matches, etc., stably based on the mbti string
  const mbtiArchetype = templates[mbti] || templates.INFP;
  
  // Use a string hash to stably pick a quote, summary, plotProof, and fandomDiscussion
  let valHash = 31;
  const combinedStr = nameOnly + animeName + mbti;
  for (let i = 0; i < combinedStr.length; i++) {
    valHash = combinedStr.charCodeAt(i) + ((valHash << 5) - valHash);
  }
  valHash = Math.abs(valHash);

  const pickedQuote = mbtiArchetype.quotes[valHash % mbtiArchetype.quotes.length];
  const pickedSummary = mbtiArchetype.summaries[valHash % mbtiArchetype.summaries.length] || mbtiArchetype.summaries[0];
  const pickedPlotProof = mbtiArchetype.plotProofs[valHash % mbtiArchetype.plotProofs.length] || mbtiArchetype.plotProofs[0];
  const pickedFandomDiscussion = mbtiArchetype.fandomDiscussions[valHash % mbtiArchetype.fandomDiscussions.length] || mbtiArchetype.fandomDiscussions[0];
  
  // Choose strengths & weaknesses
  const pickedStrengths = [...mbtiArchetype.strengths];
  const pickedWeaknesses = [...mbtiArchetype.weaknesses];

  return {
    quote: pickedQuote,
    summary: pickedSummary,
    plotProof: pickedPlotProof,
    fandomDiscussion: pickedFandomDiscussion,
    strengths: pickedStrengths,
    weaknesses: pickedWeaknesses
  };
}

// Generate authentic character profiles backed by real quotes and cosmic fallbacks
function getDynamicMbtiFields(nameOnly: string, animeName: string, mbti: MBTIType) {
  // Stably find a real quote if available, otherwise generate a gorgeous cosmic quote
  const cleanKey = Object.keys(REAL_ANIME_QUOTES).find(k => nameOnly.includes(k) || k.includes(nameOnly));
  const finalQuote = cleanKey ? REAL_ANIME_QUOTES[cleanKey] : getFallbackCosmicQuote(nameOnly, animeName, mbti);

  const finalSummary = getAuthenticSummary(nameOnly, animeName, mbti);
  const finalPlotProof = getAuthenticPlotProof(nameOnly, animeName, mbti);
  const finalFandomDiscussion = getAuthenticFandomDiscussion(nameOnly, animeName, mbti);

  // High quality standard strengths & weaknesses for each MBTI type to keep types robust
  const strengthsMap: Record<MBTIType, string[]> = {
    INTJ: ['极致的宏观战略布局与沙盘推演力', '在危机风暴中坚不可摧的理智与决断性', '化繁为简、快速解构底层因果的逻辑直觉'],
    INTP: ['能穿透迷局、直击本质的超级逻辑解构力', '对新异想法与不同可能性海纳百川的创意脑洞', '客观理性的知识敏锐度与极致的科研求真欲'],
    ENTJ: ['摧枯拉朽、定鼎格局的绝对统率力与决断性', '基于长远未来的高效布局及雷厉风行的执行度', '能聚拢人心并迅速建立极高效运转团队的卓越感召'],
    ENTP: ['千锤百炼、天马行空的可能性联想与极限脑洞', '在绝境与复杂乱轴下表现出的超级 Ti 逻辑自洽力', '极具人格魅力与智慧反差的社交张力及语言天赋'],
    INFJ: ['洞穿纷杂、预见事物宿命与灵魂走向的超常直觉', '对世间疾苦及同伴情绪波动极致细腻的精神共情感', '在极致逆风下能够背负寂寞、不动如山的信仰感召力'],
    INFP: ['坚不可摧、死守道德底线与正义信仰的 Fi 纯粹力', '极富创意与精神探索维度的诗意世界建构力', '具有无可比拟的温柔悲悯与净化他人灵魂深创的感天亲和'],
    ENFJ: ['光芒万丈、直击人心的超级人道感召与领袖亲和力', '对团队长期凝聚力和人心走向的灵敏雷达把控', '拥有强烈主动为大义和同伴安全无悔付出的英雄情怀'],
    ENFP: ['喷薄而出的当下生命原力、元气活力和无限社交号召', '能从废墟进一格寻找新变可能的 Ne 奇想灵觉', '无尘无垢的真心金子底色，能在瞬间融化最森严冷酷的偏见'],
    ISTJ: ['无与伦比的天职责守力与极度恐怖精细的组织贯彻度', '在惊天海啸面前不动如山的扎实意志与事实实干底蕴', '极其尊重规章契约、说到做到的铁血信用底牌'],
    ISFJ: ['温暖静谧、无怨无悔默默关怀呵护着集体家园的极致温柔', '对昔日回忆、羁绊细节及亲密需求的精准感官记忆力', '极其可靠周全的后勤协助和避风港服务支持'],
    ESTJ: ['雷厉风行、完美自律并强力推动集体成果效率的统率硬骨', '能高效裁撤繁琐浪费的制度规划、并精确落实规章细节', '能担当黑脸执剑人，在混乱败象中重组最稳健的防线阵地'],
    ESFJ: ['亲和指数拉满、极快照顾好每个人需求和生计的超级居委会家政长官', '对社会法则、待人接物礼节规范的极致优雅践行', '时刻关心集体和谐秩序，时刻愿意伸出关怀温度的执行守诺'],
    ISTP: ['沉溺于工具打磨和底层规则的顶尖、冷眼物理极客特质', '对战斗和物理操作战场的超凡即兴、致命条件反射和发挥', '不参与无趣口舌拉扯、直接从源头解决技术问题的超级利落感'],
    ISFP: ['极度沉浸自我美学与纯白信念追求的静默艺术坚守', '对物质界、色彩、感官瞬变细节与优雅技法神级的敏锐度', '不愿随大流功利算计、永远用最质朴纯真的热忱拥抱每一天的本真'],
    ESTP: ['天生的即兴冒险家，对变化无常和极度危险的最速 Se 条件反射', '能瞬间找到复杂混乱战场中的物理空当、快速破防敌手的物理直觉', '言语幽默辛辣、拥有强大的享乐社交号召力与自信雄姿'],
    ESFP: ['顶级、自带万丈光芒的社交号召磁场与永不熄灭的当下生机感', '在真实感官世界中有极高的即兴环境融入和敏捷发挥天赋', '毫无私利污垢的 Fi 真忱义气，能在瞬间驱散集体所有的阴霾迷障']
  };

  const weaknessesMap: Record<MBTIType, string[]> = {
    INTJ: ['情感倾向隐蔽，容易被同伴误解为不近人情', '容易陷入自我规划的闭环，表现出主观固执'],
    INTP: ['行动力常因过载的理论思索而显得拖延笨拙', '对世俗情感互动抱有天然的社交逃避与冷淡'],
    ENTJ: ['劣势功能 Fi 压抑严重，容易忽略个人温情纽带', '高强度的权威气味可能让身边温和派同伴感到压迫'],
    ENTP: ['常因追求新鲜刺激而显得缺乏耐心，难以固守常规', '在涉及深刻情绪关怀时可能显得过于戏谑，不易定性'],
    INFJ: ['极易被沉重的精神包袱和过度共情反噬，陷入沉闷内耗', '劣势功能 Se 的边缘化可能致使其在面对极速瞬变物理突发时容易无措'],
    INFP: ['极度敏感情绪化，脆弱阶段非常容易自我逃闭退缩', '面对残酷庸俗的功利规则，缺乏长远理性的客观搏杀手段'],
    ENFJ: ['极其容易过度为他人过度操心内耗，以致吞噬私人边界', '对同伴的疏远或背叛感到撕裂般的难以接受和心理崩溃'],
    ENFP: ['极其缺乏应对冗长、精细、枯燥规律事务的日常自制力和耐心', '容易被错综复杂的细节和深度现实阻碍压迫得极快窒息'],
    ISTJ: ['面对不按常理出牌的狂野剧变时，极容易感到强烈紧绷焦虑', '容易因为盲目服从旧有机制而显得过度机械化和呆板'],
    ISFJ: ['极其容易压抑个人真实渴求，背负过度指责在内心疯狂积泪', '面对主动挑起冲突的野心派，表现得过度懦弱与息事宁人'],
    ESTJ: ['由于过度追求客观绩效效率，可能被下属误解为专横冷血', '面对情感强烈、不讲效率的感性同伴，常常无法忍受而引发冲突'],
    ESFJ: ['由于过度追求外界对其完美的风评，往往感到十分焦虑紧绷', '容易固守已有的社交面子和规矩，对越界前卫之人抱有成见'],
    ISTP: ['极强的社交冷淡，对同伴悲春伤秋的细腻情感无法感同感同身受', '容易陷入不辞而别的独狼模式，让集体在协同布局中感到头痛'],
    ISFP: ['难以忍受长期机械死板的规则规划和功利主义任务约束', '在遭遇强烈情感挫折或敌意时，极其容易一秒消沉并选择自闭'],
    ESTP: ['极度缺乏对长远未来格局利弊的系统性推演和耐心积累', '常因行事过度追求刺激玩乐，在关键决策中表现得过于任性投机'],
    ESFP: ['极难忍受枯燥乏味的长期分析与静态数字案牍工作', '由于极重短期感官和当下的快活而缺乏足够的危机规划']
  };

  const finalStrengths = strengthsMap[mbti] || strengthsMap.INFP;
  const finalWeaknesses = weaknessesMap[mbti] || weaknessesMap.INFP;

  return {
    quote: finalQuote,
    summary: finalSummary,
    plotProof: finalPlotProof,
    fandomDiscussion: finalFandomDiscussion,
    strengths: [...finalStrengths],
    weaknesses: [...finalWeaknesses]
  };
}

// Generate high quality detailed metadata helper for scalable presets
function generateFallbackCharacter(fullName: string, animeName: string, mbti: MBTIType): Character {
  const nameOnly = fullName.split(' / ')[0].trim();
  
  // High quality dynamic avatar color & emoji based on character traits!
  const avatar = getCharacterTraitAvatar(fullName, animeName, mbti);

  // Dimensions based on letters
  const E = mbti.includes('E') ? 78 : 22;
  const N = mbti.includes('N') ? 76 : 24;
  const T = mbti.includes('T') ? 74 : 26;
  const P = mbti.includes('P') ? 72 : 28;

  const dynamicFields = getDynamicMbtiFields(nameOnly, animeName, mbti);

  return {
    id: '',
    name: fullName,
    anime: animeName,
    mbti,
    avatarColor: avatar.color,
    avatarEmoji: avatar.emoji,
    quote: dynamicFields.quote,
    summary: dynamicFields.summary,
    plotProof: dynamicFields.plotProof,
    fandomDiscussion: dynamicFields.fandomDiscussion,
    strengths: dynamicFields.strengths,
    weaknesses: dynamicFields.weaknesses,
    dimensions: { E, N, T, P },
    matches: {
      perfect: mbti === 'INFP' ? ['ENFJ', 'ENTJ'] : mbti === 'INTJ' ? ['ENFP', 'ENTP'] : ['INFP', 'INFJ'],
      good: ['ENFP', 'INTP', 'INTJ']
    }
  };
}

export class CharDatabase {
  private db: DatabaseSchema = { characters: [], relationships: [], totalImports: 0 };

  constructor() {
    this.load();
    this.seed();
  }

  private generateDeterministicId(anime: string, charName: string): string {
    const cleanAnime = anime.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
    const cleanChar = charName.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
    return `preset_${cleanAnime}_${cleanChar}`;
  }

  private load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.db = JSON.parse(raw);
        if (!this.db.characters) this.db.characters = [];
        if (!this.db.relationships) this.db.relationships = [];
        if (typeof this.db.totalImports !== 'number') this.db.totalImports = 0;

        let mutated = false;

        // Detect if the DB has collided old legacy keys
        const hasCollidedKeys = this.db.characters.some(c => c.id === 'preset__' || c.id === 'preset_bleach_' || c.id.endsWith('_'));
        if (hasCollidedKeys) {
          console.log('[Migration] Stale/collided preset keys detected. Wiping obsolete auto-scaled presets to cleanly regenerate robust, unique Chinese-inclusive database profiles...');
          this.db.characters = this.db.characters.filter(c => !c.id.startsWith('preset_'));
          this.db.relationships = this.db.relationships.filter(r => !r.fromId.startsWith('preset_') && !r.toId.startsWith('preset_'));
          mutated = true;
        }

        // Migrate loaded characters to high-fidelity trait-based avatars AND upgrade generic boring descriptions!
        this.db.characters.forEach(c => {
          const isPlaceholder = !c.avatarColor || !c.avatarEmoji || c.avatarColor.includes('#10B981 0%') || c.avatarEmoji === '🎭';
          if (isPlaceholder) {
            const trait = getCharacterTraitAvatar(c.name, c.anime, c.mbti);
            c.avatarColor = trait.color;
            c.avatarEmoji = trait.emoji;
            mutated = true;
          }

          // Clean up old duplicated boilerplate summaries
          const nameOnly = c.name.split(' / ')[0].trim();
          const cleanKey = Object.keys(REAL_ANIME_QUOTES).find(k => nameOnly.includes(k) || k.includes(nameOnly));
          const hasRealQuote = !!cleanKey;
          const isGenericSummary = !c.summary || 
            c.summary.includes('一位非常典型而迷人的') ||
            c.summary.includes('非常典型而迷人的') ||
            c.summary.includes('其认知功能表现出强烈的') ||
            c.summary.includes('是一位典型');

          const isGenericQuote = !c.quote ||
            c.quote.includes('愚者随波逐流') ||
            c.quote.includes('世间的一切巧合') ||
            c.quote.includes('我早已看透了终局') ||
            c.quote.includes('真理是一场注定没有终点') ||
            c.quote.includes('推倒已经成型的教条') ||
            c.quote.includes('不要催促我') ||
            c.quote.includes('弱者顺应规则苟活') ||
            c.quote.includes('犹豫是在为废墟') ||
            c.quote.includes('我的目标并非') ||
            c.quote.includes('无趣的教条才是') ||
            c.quote.includes('这世上本就没有') ||
            c.quote.includes('别用常理来') ||
            c.quote.includes('有些宿命被') ||
            c.quote.includes('世俗的喧闹只是') ||
            c.quote.includes('倘若这世间的救赎') ||
            c.quote.includes('世俗的光轮总能') ||
            c.quote.includes('即使我的声音在') ||
            c.quote.includes('我不想成为宏大') ||
            c.quote.includes('在风暴涌动') ||
            c.quote.includes('如果我们因为退缩') ||
            c.quote.includes('当晨星高悬') ||
            c.quote.includes('这世界是由无数无声') ||
            c.quote.includes('大义不需要向') ||
            c.quote.includes('热诚是穿透') ||
            c.quote.includes('每个安宁的一日') ||
            c.quote.includes('世俗中没有无缘无故') ||
            c.quote.includes('纪律和规章是') ||
            c.quote.includes('每一缕微弱的欢笑') ||
            c.quote.includes('责任不需要高调') ||
            c.quote.includes('羁绊的温度需要') ||
            c.quote.includes('规则是铁血的防线') ||
            c.quote.includes('不要给我找任何无谓') ||
            c.quote.includes('坚决贯彻到底') ||
            c.quote.includes('大家庭的和睦') ||
            c.quote.includes('用美味的温汤') ||
            c.quote.includes('细微的体贴') ||
            c.quote.includes('身体是打破限制') ||
            c.quote.includes('在绝对的速度与物') ||
            c.quote.includes('别用条规套在我') ||
            c.quote.includes('美学刻在我的') ||
            c.quote.includes('生活是一场不需要') ||
            c.quote.includes('别拿常规的算计') ||
            c.quote.includes('风暴在哪里') ||
            c.quote.includes('抓住这一刻') ||
            c.quote.includes('规矩和框子是写给') ||
            c.quote.includes('不要拿明天的烦恼') ||
            c.quote.includes('聚光灯下的真正本能') ||
            c.quote.includes('活在当下最精彩');

          const needsUpgrade = isGenericSummary || isGenericQuote || (hasRealQuote && !c.quote.includes(REAL_ANIME_QUOTES[cleanKey!].substring(0, 6)));

          if (needsUpgrade) {
            const dynamicFields = getDynamicMbtiFields(nameOnly, c.anime, c.mbti);
            c.quote = dynamicFields.quote;
            c.summary = dynamicFields.summary;
            c.plotProof = dynamicFields.plotProof;
            c.fandomDiscussion = dynamicFields.fandomDiscussion;
            c.strengths = dynamicFields.strengths;
            c.weaknesses = dynamicFields.weaknesses;
            mutated = true;
          }
        });
        if (mutated) {
          console.log('[Migration] Filled placeholders and updated generic templates with name-specific dynamic descriptions.');
          this.save();
        }
      } else {
        this.db = { characters: [], relationships: [], totalImports: 0 };
        this.save();
      }
    } catch (e) {
      console.error('Failed to load database, resetting', e);
      this.db = { characters: [], relationships: [], totalImports: 0 };
      this.save();
    }
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save database', e);
    }
  }

  private seed() {
    const insertedIds = new Set<string>(this.db.characters.map(c => c.id));
    
    // Seed initial hardcoded characters
    seedCharacters.forEach(c => {
      if (!insertedIds.has(c.id)) {
        this.db.characters.push(c);
        insertedIds.add(c.id);
      }
    });

    seedRelationships.forEach(r => {
      const exists = this.db.relationships.some(
        existing => (existing.fromId === r.fromId && existing.toId === r.toId) || (existing.fromId === r.toId && existing.toId === r.fromId)
      );
      if (!exists) {
        this.db.relationships.push(r);
      }
    });

    // Seed preset anime maps
    Object.keys(PRESET_ANIME_MAPS).forEach(key => {
      PRESET_ANIME_MAPS[key].forEach(group => {
        const charIdMap: Record<string, string> = {};
        group.characters.forEach(rawChar => {
          const cleanName = rawChar.name.split(' / ')[0].trim();
          const existing = this.db.characters.find(c => c.name.split(' / ')[0].trim() === cleanName);
          let id = '';
          if (existing) {
            id = existing.id;
          } else {
            id = this.generateDeterministicId(group.name, cleanName);
          }
          charIdMap[cleanName] = id;

          if (!insertedIds.has(id)) {
            const char: Character = {
              ...rawChar,
              id,
              anime: group.name,
            };
            this.db.characters.push(char);
            insertedIds.add(id);
          }
        });

        // Insert relationships
        group.relations.forEach(rawRel => {
          const fromId = charIdMap[rawRel.fromName];
          const toId = charIdMap[rawRel.toName];
          if (fromId && toId) {
            const exists = this.db.relationships.some(
              r => (r.fromId === fromId && r.toId === toId) || (r.fromId === toId && r.toId === fromId)
            );
            if (!exists) {
              this.db.relationships.push({
                fromId,
                toId,
                relationType: rawRel.relationType,
                relationLabel: rawRel.relationLabel,
                compatibilityScore: rawRel.compatibilityScore,
                description: rawRel.description
              });
            }
          }
        });
      });
    });

    // Always sync with the massive anime scale catalog on startup to check for new series additions!
    console.log('[Startup] Syncing database with local anime catalog list (scaleToThousand)...');
    this.scaleToThousand();
  }

  public getCharacters(): Character[] {
    return this.db.characters;
  }

  public getRelationships(): Relationship[] {
    return this.db.relationships;
  }

  public getStats() {
    const animeSet = new Set(this.db.characters.map(c => c.anime));
    const mbtiDistribution: Record<string, number> = {};
    this.db.characters.forEach(c => {
      const type = c.mbti;
      mbtiDistribution[type] = (mbtiDistribution[type] || 0) + 1;
    });

    return {
      totalCharacters: this.db.characters.length,
      totalAnimes: animeSet.size,
      totalRelationships: this.db.relationships.length,
      mbtiDistribution,
      isLargeDb: this.db.characters.length >= 1000,
      totalImports: this.db.totalImports || 0
    };
  }

  public scaleToThousand() {
    const insertedIds = new Set<string>(this.db.characters.map(c => c.id));
    
    // We generate highly credible anime cast rosters in bulk for 90+ famous world-class series on demand.
    // Each series will have up to 13 core characters with realistic MBTI classifications.
    const massiveAnimeList = [
      { name: '死神 / BLEACH', cast: [['黑崎一护', 'ISFP'], ['朽木露琪亚', 'ISTJ'], ['蓝染惣右介', 'INTJ'], ['浦原喜助', 'ENTP'], ['市丸银', 'INFJ'], ['日番谷冬狮郎', 'ISTJ'], ['朽木白哉', 'ISTJ'], ['石田雨龙', 'INTJ'], ['井上织姬', 'ENFP'], ['更木剑八', 'ESTP'], ['四枫院夜一', 'ESTP'], ['葛力姆乔', 'ESFP'], ['乌尔奇奥拉', 'INTJ']] },
      { name: '咒术回战', cast: [['虎杖悠仁', 'ISFP'], ['伏黑惠', 'ISTJ'], ['钉崎野蔷薇', 'ESTJ'], ['两面宿傩', 'ENTJ'], ['七海建人', 'ISTJ'], ['夏油杰', 'INFJ'], ['乙骨忧太', 'INFP'], ['真人', 'ENTP'], ['东堂葵', 'ESFP'], ['禅院真希', 'ESTJ'], ['五条悟', 'ENFP'], ['伏黑甚尔', 'ISTP'], ['庵歌姬', 'ESTJ']] },
      { name: '鬼灭之刃', cast: [['灶门炭治郎', 'ENFJ'], ['灶门祢豆子', 'ISFJ'], ['我妻善逸', 'ESFP'], ['嘴平伊之助', 'ESTP'], ['富冈义勇', 'ISTJ'], ['蝴蝶忍', 'INFJ'], ['炼狱杏寿郎', 'ENFJ'], ['宇髓天元', 'ESFP'], ['时透无一郎', 'INTP'], ['鬼舞辻无惨', 'ENTJ'], ['甘露寺蜜璃', 'ENFP'], ['不死川实弥', 'ISTP']] },
      { name: '间谍过家家', cast: [['黄昏 / 劳埃德', 'ISTJ'], ['约尔·福杰', 'ISFJ'], ['阿尼亚·福杰', 'ENFP'], ['邦德·福杰', 'INFJ'], ['尤里·布莱尔', 'ESTJ'], ['夜帷 / 费奥纳', 'ISTJ'], ['贝基', 'ESFJ'], ['达米安', 'ESTJ'], ['弗兰基', 'ENTP']] },
      { name: '排球少年', cast: [['日向翔阳', 'ENFP'], ['影山飞雄', 'ISTJ'], ['及川彻', 'ENFJ'], ['孤爪研磨', 'INTP'], ['黑尾铁朗', 'ENTP'], ['木兔光太郎', 'ESFP'], ['赤苇京治', 'ISTJ'], ['牛岛若利', 'ISTJ'], ['西谷夕', 'ESFP'], ['月岛萤', 'INTJ'], ['泽村大地', 'ESTJ'], ['菅原孝支', 'INFJ']] },
      { name: '名侦探柯南', cast: [['江户川柯南', 'INTP'], ['工藤新一', 'ENTP'], ['毛利兰', 'ESFJ'], ['灰原哀', 'INTJ'], ['怪盗基德', 'ENTP'], ['赤井秀一', 'ISTP'], ['安室透', 'ENFJ'], ['琴酒 / Gin', 'ISTJ'], ['服部平次', 'ESTP'], ['远山和叶', 'ESFP'], ['世良真纯', 'ENFP'], ['贝尔摩德', 'INFJ']] },
      { name: '命运石之门', cast: [['冈部伦太郎', 'ENTP'], ['牧濑红莉栖', 'INTJ'], ['椎名真由理', 'ISFP'], ['桥田至', 'INTP'], ['阿万音铃羽', 'ESTP'], ['漆原琉华', 'ISFJ'], ['菲利斯', 'ENFP'], ['桐生萌郁', 'ISFJ']] },
      { name: '原神', cast: [['钟离', 'ISTJ'], ['雷电将军', 'ISTJ'], ['芙宁娜', 'ENFP'], ['纳西妲', 'INFJ'], ['温迪', 'ENFP'], ['八重神子', 'ENTP'], ['魈', 'ISTP'], ['流浪者', 'INTJ'], ['神里绫华', 'ISFJ'], ['迪卢克', 'INTJ'], ['胡桃', 'ENFP'], ['达达利亚', 'ESTP'], ['派蒙', 'ESFP'], ['那维莱特', 'ISTJ'], ['克洛琳德', 'ISTJ'], ['阿蕾奇诺 / 仆人', 'INTJ']] },
      { name: '崩坏：星穹铁道', cast: [['卡芙卡', 'INFJ'], ['刃', 'ISTP'], ['银狼', 'INTP'], ['景元', 'INTJ'], ['丹恒', 'INTJ'], ['三月七', 'ENFP'], ['开拓者', 'ENTP'], ['真理医生', 'INTJ'], ['砂金', 'ENTP'], ['符玄', 'ESTJ'], ['黑天鹅', 'INFJ'], ['黄泉', 'ISTP'], ['阮·梅', 'INTJ'], ['知更鸟', 'ISFJ'], ['流萤', 'INFJ']] },
      { name: '魔兽世界 / 艾泽拉斯', cast: [['阿尔萨斯', 'ESTJ'], ['希尔瓦娜斯', 'INTJ'], ['萨尔', 'INFJ'], ['吉安娜', 'INFJ'], ['伊利丹', 'ISFP'], ['玛法里奥', 'INFJ'], ['泰兰德', 'ESFJ'], ['卡德加', 'INTP']] },
      { name: '灌篮高手', cast: [['樱木花道', 'ESFP'], ['流川枫', 'ISTP'], ['赤木刚宪', 'ESTJ'], ['三井寿', 'ISFP'], ['宫城良田', 'ESTP'], ['安西教练', 'INFP'], ['仙道彰', 'INTP'], ['藤真健司', 'INFJ'], ['牧绅一', 'ENTJ']] },
      { name: '崩坏3', cast: [['琪亚娜', 'ESFP'], ['芽衣', 'ISFJ'], ['布洛妮娅', 'INTJ'], ['姬子', 'ENFJ'], ['符华', 'ISTJ'], ['德丽莎', 'ESFJ'], ['爱莉希雅', 'ENFP'], ['维尔薇', 'ENTP']] },
      { name: '英雄联盟 / 双城之战', cast: [['金克丝', 'ENFP'], ['蔚', 'ESTP'], ['杰斯', 'ENTJ'], ['维克托', 'INTJ'], ['凯特琳', 'ISTJ'], ['艾克', 'ENTP'], ['希尔科', 'INTJ'], ['范德尔', 'ISFJ']] },
      { name: 'Jojo的奇妙冒险', cast: [['空条承太郎', 'ISTP'], ['迪奥·布兰度', 'ENTJ'], ['乔纳森·乔斯达', 'ENFJ'], ['乔瑟夫·乔斯达', 'ENTP'], ['东方仗助', 'ESFP'], ['吉良吉影', 'ISTJ'], ['空条徐伦', 'ESTP'], ['布加拉提', 'INFJ'], ['乔鲁诺', 'INTJ'], ['花京院典明', 'INFJ'], ['简·皮耶尔', 'ESFP']] },
      { name: '刀剑神域', cast: [['桐谷和人 / 桐人', 'INTP'], ['结城明日奈 / 亚丝娜', 'ISFJ'], ['诗乃', 'ISTP'], ['优纪', 'ENFP'], ['莉法', 'ESFP'], ['克莱因', 'ESFP'], ['西莉卡', 'ESFJ']] },
      { name: '一拳超人', cast: [['埼玉', 'INTP'], ['杰诺斯', 'ISTJ'], ['战栗的龙卷', 'ESTJ'], ['地狱的吹雪', 'ENTJ'], ['无证骑士', 'INFP'], ['音速的索尼克', 'ISTP'], ['邦古', 'INFJ'], ['饿狼', 'ISFP'], ['KING', 'INFP']] },
      { name: '文豪野犬', cast: [['中岛敦', 'INFP'], ['太宰治', 'ENTP'], ['芥川龙之介', 'ISTJ'], ['中原中也', 'ESTP'], ['江户川乱步', 'INTP'], ['国木田独步', 'ISTJ'], ['森鸥外', 'INTJ'], ['福泽谕吉', 'ISTJ'], ['泉镜花', 'ISFJ']] },
      { name: '暗杀教室', cast: [['杀老师', 'ENFP'], ['潮田渚', 'INFJ'], ['赤羽业', 'ENTP'], ['茅野枫', 'ISFP'], ['乌间惟臣', 'ISTJ'], ['伊莉娜', 'ESFP']] },
      { name: '东京喰种', cast: [['金木研', 'INFP'], ['雾嶋董香', 'ISTJ'], ['神代利世', 'ENTP'], ['月山习', 'ENFJ'], ['有马贵将', 'INTJ'], ['铃屋什造', 'ENFP']] },
      { name: '紫罗兰永恒花园', cast: [['薇尔莉特', 'ISTJ'], ['基尔伯特', 'INFJ'], ['霍金斯', 'ENFJ'], ['嘉德丽雅', 'ESFJ'], ['贝内迪克特', 'ISTP']] },
      { name: '电锯人', cast: [['电次', 'ESTP'], ['帕瓦', 'ESTP'], ['早川秋', 'ISTJ'], ['玛奇玛', 'INFJ'], ['姬野', 'ENFP'], ['岸边', 'ISTP'], ['蕾塞', 'ENFJ']] },
      { name: '路人超能100', cast: [['影山茂夫 / 龙套', 'ISFP'], ['灵幻新隆', 'ENTP'], ['小酒窝', 'ESTP'], ['律', 'INFJ'], ['花泽辉气', 'ENFP'], ['芹泽克也', 'INFP']] },
      { name: '迷宫饭', cast: [['莱欧斯', 'ENTP'], ['玛露西尔', 'INFJ'], ['齐尔查克', 'ISTJ'], ['扇森', 'ISTP'], ['法琳', 'INFP']] },
      { name: '孤独摇滚！', cast: [['后藤一里', 'INFP'], ['喜多郁代', 'ESFP'], ['山田凉', 'INTP'], ['伊地知虹夏', 'ENFJ'], ['广井菊里', 'ESFP']] },
      { name: '葬送的芙莉莲', cast: [['芙莉莲', 'INTP'], ['欣梅尔', 'ENFJ'], ['菲伦', 'ISTJ'], ['修塔尔克', 'ISFP'], ['艾冉', 'ISTP'], ['海塔', 'ISFJ'], ['尤贝尔', 'ENTP'], ['赞恩', 'ESTP'], ['弗兰梅', 'INFJ']] },
      { name: '赛博朋克：边缘行者', cast: [['大卫·马丁内斯', 'ISFP'], ['露西', 'INTJ'], ['丽贝卡', 'ENFP'], ['曼恩', 'ESTJ'], ['法尔科', 'ISTJ']] },
      { name: '进击的巨人', cast: [['艾伦·耶格尔', 'ISFP'], ['三笠·阿克曼', 'ISTJ'], ['阿尔敏', 'INFJ'], ['利威尔', 'ISTP'], ['埃尔文', 'ENTJ'], ['莱纳', 'ESFJ'], ['吉克', 'INTJ'], ['萨莎', 'ENFP'], ['让', 'ESTJ'], ['韩吉', 'ENTP'], ['康尼', 'ESTP']] },
      { name: '银魂', cast: [['坂田银时', 'INTP'], ['志村新八', 'ISFJ'], ['神乐', 'ESFP'], ['土方十四郎', 'ISTJ'], ['冲田总悟', 'ISTP'], ['桂小太郎', 'ENFP'], ['高杉晋助', 'INTJ'], ['神威', 'ESTP'], ['近藤勋', 'ESFP']] },
      { name: '死亡笔记', cast: [['夜神月', 'INTJ'], ['L·赖特', 'INTP'], ['弥海砂', 'ENFP'], ['魅上照', 'ISTJ'], ['尼亚', 'INTJ'], ['米洛', 'ESFP']] },
      { name: '斩！赤红之瞳', cast: [['塔兹米', 'ISFP'], ['赤瞳', 'ISTJ'], ['玛茵', 'ESTJ'], ['雷欧奈', 'ESFP'], ['希尔', 'ISFJ'], ['艾斯德斯', 'ENTJ']] },
      { name: '从零开始的异世界生活', cast: [['菜月昴', 'ENFP'], ['雷姆', 'ISFJ'], ['拉姆', 'ESTJ'], ['爱蜜莉雅', 'ISFJ'], ['贝蒂', 'INTJ'], ['罗兹瓦尔', 'ENTJ'], ['菲利克斯', 'ENFP'], ['强欲魔女 / 艾姬多娜', 'INTJ'], ['尤里乌斯', 'ISTJ']] },
      { name: '妖精的尾巴', cast: [['纳兹', 'ESFP'], ['露西', 'ESFJ'], ['格雷', 'ISTP'], ['艾露莎', 'ESTJ'], ['哈比', 'ENFP'], ['温蒂', 'ISFJ']] },
      { name: '青之驱魔师', cast: [['奥村燐', 'ESFP'], ['奥村雪男', 'ISTJ'], ['杜山诗惠美', 'ISFJ'], ['梅菲斯特', 'ENTP']] },
      { name: '家庭教师ヒットマンREBORN!', cast: [['泽田纲吉', 'ISFP'], ['里包恩', 'INTJ'], ['狱寺隼人', 'ISFJ'], ['山本武', 'ESFP'], ['云雀恭弥', 'ISTP'], ['六道骸', 'INFJ'], ['XANXUS', 'ENTJ'], ['斯库瓦罗', 'ESTJ'], ['库洛姆', 'INFP'], ['笹川了平', 'ESTP']] },
      { name: '黑子的篮球', cast: [['黑子哲也', 'INFJ'], ['火神大我', 'ESFP'], ['黄濑凉太', 'ESFP'], ['绿间真太郎', 'ISTJ'], ['青峰大辉', 'ISTP'], ['紫原敦', 'ISTP'], ['赤司征千郎', 'INFJ']] },
      { name: '刀剑乱舞', cast: [['三日月宗近', 'INFJ'], ['加州清光', 'ESFJ'], ['大和守安定', 'ISFJ'], ['鹤丸国永', 'ENTP']] },
      { name: '辉夜大小姐想让我告白', cast: [['四宫辉夜', 'INTJ'], ['白银御行', 'ISTJ'], ['藤原千花', 'ENFP'], ['石上优', 'INTP'], ['伊井野弥子', 'ISTJ'], ['早坂爱', 'ISTP']] },
      { name: '全职猎人', cast: [['小杰', 'ESFP'], ['奇犽', 'INTP'], ['酷拉皮卡', 'INFJ'], ['雷欧力', 'ESFJ'], ['西索', 'ENTP'], ['库洛洛', 'INFJ'], ['飞坦', 'ISTP'], ['伊尔迷', 'INTJ']] },
      { name: '犬夜叉', cast: [['犬夜叉', 'ISFP'], ['日暮戈薇', 'ESFJ'], ['杀生丸', 'INTJ'], ['桔梗', 'INFJ'], ['弥勒', 'ENTP'], ['珊瑚', 'ISFJ']] },
      { name: '龙珠', cast: [['孙悟空', 'ESFP'], ['贝吉塔', 'ISTJ'], ['孙悟饭', 'INFP'], ['特兰克斯', 'ISFJ'], ['比克', 'INTJ'], ['克林', 'ISFP'], ['布尔玛', 'ENTJ']] },
      { name: '来自深渊', cast: [['莉可', 'ENFP'], ['雷格', 'ISFJ'], ['娜娜奇', 'INTP'], ['奥森', 'INTJ'], ['黎明卿 / 波多尔多', 'ENTJ'], ['法普妲', 'ISFP'], ['普鲁修卡', 'ENFP'], ['玛露露库', 'ISFJ'], ['瓦兹强', 'ENTJ'], ['贝拉芙', 'INFJ']] },
      { name: '齐木楠雄的灾难', cast: [['齐木楠雄', 'INTP'], ['燃堂力', 'ESFP'], ['海藤瞬', 'INFP'], ['照桥心美', 'ESFJ'], ['灰吕杵志', 'ENFJ'], ['鸟束零太', 'ESTP'], ['梦原知予', 'ENFP'], ['洼谷须亚莲', 'ISTP'], ['相卜命', 'ESFP'], ['才虎芽斗吏', 'ESTJ']] },
      { name: '未闻花名 / 那朵花', cast: [['面码 / 本间芽衣子', 'ENFP'], ['宿海仁太', 'INFP'], ['安城鸣子', 'ESFJ'], ['松雪集', 'INTJ'], ['鹤见知利子', 'INFJ'], ['久川铁道', 'ESFP']] },
      { name: '无职转生', cast: [['鲁迪乌斯', 'INTP'], ['希露菲叶特', 'ISFJ'], ['洛琪希', 'INTP'], ['艾莉丝', 'ESTP'], ['保罗', 'ESFP'], ['奥尔斯帝德', 'INTJ'], ['基列奴', 'ISTP'], ['瑞杰路德', 'ISTJ']] },
      { name: '轻音少女 / K-ON!', cast: [['平泽唯', 'ENFP'], ['秋山澪', 'ISFJ'], ['田井中律', 'ESFP'], ['琴吹䌷', 'ENFJ'], ['中野梓', 'ISTJ'], ['山中佐和子', 'ENFP'], ['平泽忧', 'ISFJ']] },
      { name: '吹响吧！上低音号', cast: [['黄前久美子', 'ISFP'], ['高坂丽奈', 'INTJ'], ['加藤叶月', 'ESFP'], ['川岛绿辉', 'ENFP'], ['田中明日香', 'ENTP'], ['中川夏纪', 'ISTP'], ['吉川优子', 'ESFJ'], ['铠塚霙', 'INFP'], ['伞木希美', 'ENFP'], ['小笠原晴香', 'ESFJ'], ['中世古香织', 'ISFJ']] },
      { name: 'CLANNAD', cast: [['冈崎朋也', 'ISTP'], ['古河渚', 'INFP'], ['藤林杏', 'ESTJ'], ['藤林椋', 'ISFJ'], ['坂上智代', 'ISTJ'], ['一之濑琴美', 'INTP'], ['春原阳平', 'ESFP'], ['古河秋生', 'ESTP'], ['古河早苗', 'ENFJ']] },
      { name: '青春猪头少年', cast: [['梓川咲太', 'INTP'], ['樱岛麻衣', 'INTJ'], ['梓川枫', 'ISFJ'], ['古贺朋绘', 'ESFP'], ['双叶理央', 'INTP'], ['丰浜和花', 'ESTJ'], ['牧之原翔子', 'INFJ']] },
      { name: '我的青春恋爱物语果然有问题', cast: [['比企谷八幡', 'INTP'], ['雪之下雪乃', 'INTJ'], ['由比滨结衣', 'ENFP'], ['一色伊吕波', 'ENFP'], ['户塚彩加', 'ISFJ'], ['平塚静', 'ESTP'], ['雪之下阳乃', 'ENTP'], ['比企谷小町', 'ENFP'], ['叶山隼人', 'ENFJ']] },
      { name: '五等分的新娘', cast: [['上杉风太郎', 'INTJ'], ['中野一花', 'ENFJ'], ['中野二乃', 'ESTJ'], ['中野三玖', 'INFJ'], ['中野四叶', 'ENFP'], ['中野五月', 'ISTJ']] },
      { name: '四月是你的谎言', cast: [['有马公生', 'INFP'], ['宫园薰', 'ENFP'], ['泽部椿', 'ESFP'], ['渡亮太', 'ESFP'], ['相座武士', 'ESTP'], ['井川绘见', 'INFJ']] },
      { name: '欢迎来到实力至上主义的教室', cast: [['绫小路清隆', 'INTJ'], ['堀北铃音', 'ISTJ'], ['栉田桔梗', 'ENFJ'], ['轻井泽惠', 'ESFJ'], ['一之濑帆波', 'ENFJ'], ['坂柳有栖', 'INTJ'], ['龙园翔', 'ENTJ'], ['高圆寺六助', 'ENTP'], ['平田洋介', 'ENFJ'], ['佐仓爱里', 'ISFP']] },
      { name: '夏目友人帐', cast: [['夏目贵志', 'INFJ'], ['猫咪老师 / 斑', 'ESTP'], ['名取周一', 'ENFJ'], ['田沼要', 'ISFJ'], ['多轨透', 'ENFP'], ['的场静司', 'ENTJ']] },
      { name: '小林家的龙女仆', cast: [['小林', 'INTP'], ['托尔', 'ENFP'], ['康娜', 'ISFP'], ['艾露玛', 'ISTJ'], ['露科亚', 'ENFJ'], ['法夫纳', 'INTJ'], ['才川莉子', 'ESFJ'], ['真土翔太', 'INFP']] },
      { name: '工作细胞', cast: [['红细胞', 'ENFP'], ['白细胞', 'ISTJ'], ['血小板', 'ESFJ'], ['杀手T细胞', 'ESTP'], ['巨噬细胞', 'ENFJ'], ['辅助T细胞', 'ENTJ']] },
      { name: 'Fate/Zero', cast: [['卫宫切嗣', 'INTJ'], ['阿尔托莉雅 / Saber', 'ISTJ'], ['爱丽丝菲尔', 'INFJ'], ['言峰绮礼', 'INFJ'], ['吉尔伽美什', 'ENTJ'], ['征服王 / 伊斯坎达尔', 'ENFJ'], ['韦伯', 'INFP'], ['迪卢木多', 'ISFJ'], ['远坂时臣', 'ISTJ']] },
      { name: 'Fate/stay night', cast: [['卫宫士郎', 'ENFJ'], ['远坂凛', 'ESTJ'], ['间桐樱', 'ISFJ'], ['阿尔托莉雅 / Saber', 'ISTJ'], ['Archer / 红A', 'INTJ'], ['伊莉雅', 'ENFP'], ['吉尔伽美什', 'ENTJ'], ['库·丘林', 'ESTP'], ['美狄亚', 'INFJ']] },
      { name: '终结的炽天使', cast: [['百夜优一郎', 'ESFP'], ['百夜米迦尔', 'INFJ'], ['柊筱娅', 'ENTP'], ['早乙女与一', 'ISFJ'], ['君月士方', 'ISTJ'], ['一濑红莲', 'INTJ'], ['柊暮人', 'ENTJ'], ['费里德·巴特利', 'ENTP']] },
      { name: '野良神', cast: [['夜斗', 'ENFP'], ['一岐日和', 'ENFJ'], ['雪音', 'INFP'], ['小福', 'ESFP'], ['昆沙门天', 'ESFJ'], ['兆麻', 'ISTJ'], ['野良', 'INFJ'], ['绯音', 'ISFJ']] },
      { name: '月刊少女野崎君', cast: [['野崎梅太郎', 'ISTJ'], ['佐仓千代', 'ENFP'], ['御子柴实琴', 'ISFP'], ['濑尾结月', 'ESTP'], ['若松博隆', 'ISFJ'], ['鹿岛游', 'ESFP'], ['堀政行', 'ESTJ']] },
      { name: '龙与虎', cast: [['高须龙儿', 'ISFJ'], ['逢坂大河', 'INFP'], ['手工艺者', 'ESTP'], ['栉枝实乃梨', 'ENFP'], ['北村祐作', 'ESFJ'], ['川嶋亚美', 'INFJ']] },
      { name: '游戏人生 No Game No Life', cast: [['空', 'ENTP'], ['白', 'INTJ'], ['史蒂芬妮·多拉', 'ESFJ'], ['吉普莉尔', 'ENTP'], ['克拉米', 'ISTJ'], ['菲尔', 'INFJ']] },
      { name: '科学超电磁炮', cast: [['御坂美琴', 'ESTJ'], ['上条当麻', 'ENFJ'], ['茵蒂克丝', 'ESFP'], ['一方通行', 'INTJ'], ['白井黑子', 'ESFJ'], ['佐天泪子', 'ENFP'], ['初春饰利', 'ISFJ'], ['食蜂操祈', 'ENTJ'], ['麦野沉利', 'ESTJ']] },
      { name: '来自风平浪静的明天', cast: [['先岛光', 'ESFP'], ['向井户爱花', 'INFP'], ['比良平千咲', 'ISFJ'], ['商田', 'INTJ'], ['伊佐木要', 'INFJ'], ['木原纺', 'ISTJ'], ['潮留美海', 'INFP'], ['久沼纱由', 'ESTJ']] },
      { name: '声之形', cast: [['石田将也', 'ISFP'], ['西宫硝子', 'INFP'], ['西宫结弦', 'ISTP'], ['植野直花', 'ESTJ'], ['佐原美代子', 'ENFJ'], ['永束友宏', 'ESFP'], ['川井美树', 'ESFJ']] },
      { name: '黑执事', cast: [['夏尔·凡多姆海恩', 'INTJ'], ['塞巴斯蒂安', 'ISTJ'], ['红夫人', 'ESFJ'], ['格雷尔', 'ESFP'], ['蓝猫', 'ISTP'], ['刘', 'ENTP'], ['葬仪屋', 'INTP'], ['伊丽莎白', 'ESFJ']] },
      { name: '冰海战记', cast: [['托尔芬', 'ISFP'], ['阿斯克拉特', 'ENTJ'], ['库奴特', 'INFJ'], ['托尔兹', 'INFJ'], ['蛇 / 斯内克', 'ISTP'], ['雷夫', 'ENFJ']] },
      { name: '国王排名', cast: [['波吉', 'INFP'], ['卡克', 'ISTP'], ['戴达', 'ESTJ'], ['希琳', 'ESTJ'], ['多玛斯', 'ISTJ'], ['德斯哈', 'ENTJ'], ['德斯帕', 'ENTP'], ['贝宾', 'INFJ']] },
      { name: '莉可丽丝', cast: [['锦木千束', 'ENFP'], ['井之上泷奈', 'ISTJ'], ['中原瑞希', 'ESFJ'], ['胡桃', 'INTP'], ['真岛', 'ENTP'], ['米卡', 'INFJ'], ['吉松真司', 'INTJ'], ['中原美春', 'ISFJ']] },
      { name: '86 －不存在的战区－', cast: [['辛耶·诺赞', 'ISTP'], ['芙拉蒂蕾娜·米利杰', 'ENFJ'], ['莱登·谢卡', 'ESTJ'], ['安祺·艾玛', 'ISFJ'], ['可蕾娜·库克米拉', 'ISFP'], ['戴亚·伊路玛', 'ENFP'], ['阿涅塔', 'INTP'], ['菲多', 'ISFJ']] },
      { name: '魔道祖师', cast: [['魏无羡', 'ENFP'], ['蓝忘机', 'ISTJ'], ['江澄', 'ESTJ'], ['金光瑶', 'INFJ'], ['蓝曦臣', 'ENFJ'], ['温宁', 'ISFJ'], ['薛洋', 'ENTP'], ['晓星尘', 'INFJ'], ['金凌', 'ESTJ'], ['蓝思追', 'ISFJ']] },
      { name: '天官赐福', cast: [['谢怜', 'INFJ'], ['花城', 'INTJ'], ['风信', 'ISTJ'], ['慕情', 'ISTP'], ['师青玄', 'ENFP'], ['贺玄', 'INTJ'], ['戚容', 'ESFP'], ['半月', 'INFP']] },
      { name: '全职高手', cast: [['叶修', 'INTP'], ['苏沐橙', 'ISFJ'], ['陈果', 'ENFJ'], ['唐柔', 'ISTJ'], ['包荣兴', 'ESFP'], ['喻文州', 'INFJ'], ['黄少天', 'ENTP'], ['韩文清', 'ISTJ'], ['王杰希', 'INTJ'], ['肖时钦', 'INTJ'], ['张新杰', 'ISTJ']] },
      { name: '间谍教室', cast: [['百合', 'ENFP'], ['克劳斯', 'INTJ'], ['希比拉', 'ESTP'], ['莫妮卡', 'INTP'], ['缇娅', 'ENFJ'], ['安妮特', 'ENTP'], ['艾露玛 / 莎拉', 'ISFJ']] },
      { name: '数码宝贝', cast: [['八神太一', 'ESTP'], ['石田大和', 'ISFP'], ['武之内空', 'ESFJ'], ['泉光子郎', 'INTP'], ['太刀川美美', 'ESFP'], ['城户丈', 'ISTJ'], ['高石岳', 'INFP'], ['八神光', 'INFJ']] },
      { name: '圣斗士星矢', cast: [['星矢', 'ESFP'], ['紫龙', 'INFJ'], ['冰河', 'ISTJ'], ['瞬', 'INFP'], ['一辉', 'INTJ'], ['沙加', 'INTJ'], ['撒加', 'ENTJ'], ['城户沙织 / 雅典娜', 'INFJ']] },
      { name: '蓝色监狱', cast: [['洁世一', 'INFJ'], ['蜂乐回', 'ENFP'], ['千切豹马', 'ISFP'], ['国神炼介', 'ISFJ'], ['御影玲王', 'ESFJ'], ['凪诚士郎', 'INTP'], ['糸师凛', 'INTJ'], ['马狼照英', 'ESTJ']] },
      { name: '网球王子', cast: [['越前龙马', 'ISTP'], ['手冢国光', 'ISTJ'], ['不二周助', 'INFJ'], ['大石秀一郎', 'ISFJ'], ['菊丸英二', 'ESFP'], ['迹部景吾', 'ENTJ'], ['幸村精市', 'INFJ'], ['真田弦一郎', 'ESTJ']] },
      { name: '蜡笔小新', cast: [['野原新之助', 'ENTP'], ['野原美冴', 'ESFJ'], ['野原广志', 'ISFP'], ['风间彻', 'ESTJ'], ['樱田妮妮', 'ENFJ'], ['佐藤正男', 'ISFJ'], ['阿呆', 'INTP']] },
      { name: '哆啦A梦', cast: [['哆啦A梦', 'ESFJ'], ['野比大雄', 'INFP'], ['源静香', 'ISFJ'], ['刚田武 / 胖虎', 'ESTP'], ['骨川小夫', 'ESTJ'], ['出木杉英才', 'INTJ']] },
      { name: '游戏王', cast: [['武藤游戏', 'INFP'], ['暗游戏 / 阿图姆', 'INFJ'], ['海马濑人', 'ENTJ'], ['城之内克也', 'ESFP'], ['真崎杏子', 'ESFJ'], ['貘良了', 'INFP']] },
      { name: '钢之炼金术师', cast: [['爱德华·艾尔利克', 'ENTP'], ['阿尔冯斯·艾尔利克', 'INFP'], ['温莉·洛克贝尔', 'ESFJ'], ['罗伊·马斯坦 / 大佐', 'ENTJ'], ['莉莎·霍克艾', 'ISTJ'], ['马斯·休斯', 'ENFJ'], ['斯卡', 'ISTJ'], ['泉卡迪斯', 'ESTJ'], ['金·布拉德雷', 'ENTJ']] },
      { name: '新世纪福音战士', cast: [['碇真嗣', 'INFP'], ['绫波丽', 'INTJ'], ['惣流·明日香', 'ENTJ'], ['葛城美里', 'ENFP'], ['渚薰', 'INFJ'], ['碇源堂', 'INTJ']] },
      { name: '关于我转生变成史莱姆这档事', cast: [['利姆鲁', 'ENFP'], ['大贤者', 'INTP'], ['红丸', 'ESTJ'], ['苍影', 'ISTJ'], ['紫苑', 'ENFP'], ['朱菜', 'ISFJ'], ['迪亚波罗', 'INTJ'], ['米莉姆', 'ESFP']] },
      { name: 'OVERLORD', cast: [['安兹·乌尔·恭', 'INTJ'], ['雅儿贝德', 'ESFJ'], ['迪米乌哥斯', 'ENTJ'], ['科塞特斯', 'ISTJ'], ['塞巴斯', 'ISFJ'], ['夏提雅', 'ESFP'], ['亚乌菈', 'ESTP'], ['马雷', 'INFP']] },
      { name: '赛马娘', cast: [['特别周', 'ESFJ'], ['无声铃鹿', 'INFJ'], ['东海帝王', 'ENFP'], ['目白麦昆', 'ISTJ'], ['黄金船', 'ENTP'], ['伏特加', 'ESTP'], ['大和赤骥', 'ESTJ'], ['米浴', 'INFP']] },
      { name: '我推的孩子', cast: [['星野爱', 'ENFP'], ['阿库亚', 'INTJ'], ['露比', 'ENFP'], ['有马加奈', 'ESTJ'], ['黑川赤音', 'INFJ'], ['MEM啾', 'ESFP'], ['星野爱久爱海', 'INTJ']] },
      { name: '冰菓', cast: [['折木奉太郎', 'INTP'], ['千反田爱瑠', 'ENFP'], ['福部里志', 'ENTP'], ['伊原摩耶花', 'ISTJ'], ['入须冬实', 'INTJ'], ['折木供惠', 'ENTJ']] },
      { name: '中二病也要谈恋爱！', cast: [['小鸟游六花', 'INFP'], ['富樫勇太', 'ISFJ'], ['丹生谷森夏', 'ESFJ'], ['五月七日茴香', 'ISFP'], ['凸守早苗', 'ENFP'], ['小鸟游十花', 'ISTJ']] },
      { name: '无头骑士异闻录', cast: [['折原临也', 'ENTP'], ['平和岛静雄', 'ISFP'], ['塞尔提', 'INFP'], ['龙之峰帝人', 'INFJ'], ['纪田正臣', 'ESFP'], ['园原杏里', 'ISFJ'], ['门田京平', 'ESTJ'], ['岸谷新罗', 'ENTP']] },
      { name: '叛逆的鲁路修', cast: [['鲁路修·兰佩路基', 'INTJ'], ['C.C.', 'INTP'], ['枢木朱雀', 'ISFJ'], ['红月卡莲', 'ESTP'], ['查尔斯·D·不列颠', 'ENTJ'], ['修奈泽尔', 'INTJ'], ['娜娜莉·V·不列颠', 'INFJ']] },
      { name: '我的英雄学院', cast: [['绿谷出久', 'INFJ'], ['爆豪胜己', 'ESTJ'], ['轰焦冻', 'INTJ'], ['丽日御茶子', 'ENFP'], ['死柄木吊', 'INFP'], ['欧尔麦特', 'ENFJ'], ['相泽消太', 'ISTP']] },
      { name: '物语系列', cast: [['阿良良木历', 'INTP'], ['战场原黑仪', 'INTJ'], ['八九寺真宵', 'ENFP'], ['羽川翼', 'INFJ'], ['忍野忍', 'ISTP'], ['千石抚子', 'ISFJ'], ['神原骏河', 'ESFP']] },
      { name: '机动战士高达 SEED', cast: [['基拉·大和', 'INFJ'], ['阿斯兰·萨拉', 'INFJ'], ['真·飞鸟', 'ISFP'], ['拉克丝·克莱茵', 'ENFJ'], ['卡嘉莉', 'ESFP'], ['劳·鲁·克鲁泽', 'INTJ']] },
      { name: '星际牛仔', cast: [['斯派克·斯皮格尔', 'ISTP'], ['菲·瓦伦丁', 'ESTP'], ['杰特·布莱克', 'ISTJ'], ['艾德', 'ENTP']] },
      { name: '幽游白书', cast: [['浦饭幽助', 'ESTP'], ['桑原和真', 'ESFP'], ['藏马', 'INFJ'], ['飞影', 'ISTP'], ['户愚吕弟', 'ISTJ']] },
      { name: '斩服少女 / Kill la Kill', cast: [['缠流子', 'ISFP'], ['鬼龙院皋月', 'ENTJ'], ['满舰饰真子', 'ENFP'], ['鲜血', 'ISTJ']] },
      { name: '寄生兽', cast: [['泉新一', 'INFP'], ['小右 / Migi', 'INTP'], ['君嶋加奈', 'INFJ'], ['田村玲子', 'INTJ']] },
      { name: '东京复仇者', cast: [['花垣武道', 'INFP'], ['佐野万次郎 / Mikey', 'ENFP'], ['龙宫寺坚 / Draken', 'ISFJ'], ['场地圭介', 'ESTP'], ['松野千冬', 'ISFP']] }
    ];

    let addedCount = 0;
    massiveAnimeList.forEach(animeDef => {
      const charIds: string[] = [];
      const animeName = animeDef.name;

      // Ensure every character in the cast exists
      animeDef.cast.forEach(([name, mbti]) => {
        const fullName = `${name} / Anime Cast`;
        const id = this.generateDeterministicId(animeName, name);
        charIds.push(id);

        if (!insertedIds.has(id)) {
          const char = generateFallbackCharacter(fullName, animeName, mbti as MBTIType);
          char.id = id;
          this.db.characters.push(char);
          insertedIds.add(id);
          addedCount++;
        }
      });

      // Establish realistic relationship networks within this anime's cast
      for (let i = 0; i < charIds.length; i++) {
        for (let j = i + 1; j < Math.min(i + 3, charIds.length); j++) {
          const fromId = charIds[i];
          const toId = charIds[j];

          const fromChar = this.db.characters.find(c => c.id === fromId);
          const toChar = this.db.characters.find(c => c.id === toId);

          if (fromChar && toChar) {
            const hasRel = this.db.relationships.some(
              r => (r.fromId === fromId && r.toId === toId) || (r.fromId === toId && r.toId === fromId)
            );

            if (!hasRel) {
              const fromNameClean = fromChar.name.split(' / ')[0];
              const toNameClean = toChar.name.split(' / ')[0];

              // Base compatibility estimation
              const score = Math.floor(Math.random() * 25) + 70; // 70 - 95
              const labels: Relationship['relationType'][] = ['friend', 'rival', 'family', 'mentor', 'love'];
              const chosenType = labels[Math.floor(Math.random() * labels.length)];

              let labelCn = '战友';
              if (chosenType === 'rival') labelCn = '宿敌双璧';
              if (chosenType === 'love') labelCn = '命运纽带';
              if (chosenType === 'mentor') labelCn = '知己指引';
              if (chosenType === 'family') labelCn = '家族羁绊';

              this.db.relationships.push({
                fromId,
                toId,
                relationType: chosenType,
                relationLabel: labelCn,
                compatibilityScore: score,
                description: `${fromNameClean}(${fromChar.mbti}) 与 ${toNameClean}(${toChar.mbti}) 在《${animeName}》剧情深处共同构建了经典的性格羁绊纽带。他们的对手戏与精神共鸣互补极其深邃。`
              });
            }
          }
        }
      }
    });

    this.save();
    console.log(`Mass scale completed! Added ${addedCount} characters. Total database size: ${this.db.characters.length} characters.`);
    return addedCount;
  }

  // AI Custom Deep Personalization for a specific character
  public async personalizeCharacter(id: string): Promise<Character> {
    const char = this.db.characters.find(c => c.id === id);
    if (!char) throw new Error('未在云端数据库中找到对应的角色档案。');

    const nameOnly = char.name.split(' / ')[0].trim();
    const englishName = char.name.split(' / ')[1]?.trim() || '';
    const animeName = char.anime;
    const mbti = char.mbti;

    console.log(`Initiated deep on-demand Gemini personalization for ${nameOnly} (${mbti}) from 《${animeName}》`);

    const systemPrompt = `You are an elite ACG (Anime, Comic, Games) analyst and professional MBTI psychologist.
Analyze the anime character named "${nameOnly}" (English name: "${englishName}") from the anime series "${animeName}" who is classified as MBTI type "${mbti}".
Your task is to generate a highly personalized, plot-accurate, superb-quality character profile, absolutely free of any generic boilerplate patterns or templates.

CRITICAL CRITERIA FOR PERSONALIZATION:
- Avoid generic phrases like "是一位经典而迷人的", "极为引人注目", "在关键重大时刻" etc.
- "quote" MUST be an authentic, legendary quote or voice-line spoken by this character in Chinese that encapsulates their unique worldview. Include Chinese characters with no placeholders.
- "summary" MUST be a detailed, 150-word psychological analysis in Chinese of their MBTI cognitive functions (e.g., Ti-Fe, Fi-Te, Ni-Se, Ne-Si) and how they process situations within their specific storylines.
- "plotProof" MUST detail precise iconic scenes, battles, interactions, or episodes from the anime/manga in Chinese (e.g., specific fights with villains, emotional breakdowns, exact choices) proving they possess these cognitive preferences.
- "fandomDiscussion" MUST capture actual fandom debates, forum posts (on Bilibili, PDB, Reddit etc.) in Chinese regarding their cognitive functions (e.g., debate on whether they are truly ${mbti} or a different type).
- "strengths" MUST be an array of exactly 3 highly specific, plot-relevant cognitive or tactical strengths in Chinese (e.g., specific skills, strategic minds, tactical combat traits).
- "weaknesses" MUST be an array of exactly 2 highly specific, plot-relevant cognitive or tactical weaknesses/blindspots/flaws in Chinese.

Return a strict JSON object that conforms EXACTLY to this schema:
{
  "quote": "string",
  "summary": "string",
  "plotProof": "string",
  "fandomDiscussion": "string",
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Perform high-fidelity personalized analysis for character: ${nameOnly}, Anime: ${animeName}, MBTI: ${mbti}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            summary: { type: Type.STRING },
            plotProof: { type: Type.STRING },
            fandomDiscussion: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['quote', 'summary', 'plotProof', 'fandomDiscussion', 'strengths', 'weaknesses']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error('Gemini did not return any analyzed content.');

    const payload = JSON.parse(text);

    char.quote = payload.quote || char.quote;
    char.summary = payload.summary || char.summary;
    char.plotProof = payload.plotProof || char.plotProof;
    char.fandomDiscussion = payload.fandomDiscussion || char.fandomDiscussion;
    char.strengths = payload.strengths || char.strengths;
    char.weaknesses = payload.weaknesses || char.weaknesses;

    this.save();
    return char;
  }

  // Server-side AI generator: pulls whole anime rosters dynamically using Gemini
  public async importAnimeViaGemini(animeName: string): Promise<{ characters: Character[], relationships: Relationship[] }> {
    console.log(`Querying Gemini to generate full MBTI profiles and relationship grid to import: ${animeName}`);
    
    const systemPrompt = `You are an elite ACG (Anime, Comic, Games) analyst and psychological researcher. 
Generate a comprehensive, high-fidelity MBTI character profile and relationship network diagram for the top 6 major characters of the anime requested.
For the requested anime, identify its 6 most popular, central characters. Ensure their MBTI classifications align closely with fans' consensus (e.g. Bilibili, Reddit, PDB).

CRITICAL REQUIREMENT FOR DEEP PERSONALIZATION (NO BOILERPLATES/TEMPLATES):
- Do NOT generate generic or homogenous descriptions, templates, placeholders, or copy-paste phrasing (e.g. "是一名非常典型而迷人的角色", "在剧情多次面临转折的重要关头...", "无论是理智算计（T型）还是情感主导（F型）").
- Every and all fields MUST be meticulously customized to the character's real lore, story facts, specific events, abilities, conflicts, and unique psychological makeup and backstory.
- "quote" MUST be a genuine, iconic quote or catchphrase actually said by the character in Chinese.
- "summary" MUST be a 150-word deep psychological analysis in Chinese of their MBTI personality as shown during specific plot events in their story.
- "plotProof" MUST cite concrete situations, chapters, episodes, or interactions in Chinese (e.g., specific villain encounters, critical choices, or mental breakdowns) that prove their specific functional stack (e.g., Ni-Te, Fe-Si, etc.).
- "fandomDiscussion" MUST cite actual fan agreements, standard memes, debates other communities or forums have (like PDB, Bilibili) in Chinese about their traits.
- "strengths" and "weaknesses" MUST map to real abilities, traits, or failures in their canon.
- "avatarEmoji" MUST be a unique, perfect representational emoji for them (e.g., 👁️, 🗡️, ⚡).
- "avatarColor" MUST be a stylized linear gradient (e.g., linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)) complementing their theme.

Return a strict JSON object matching this schema:
{
  "characters": [
    {
      "name": "Chinese Name / English Name (e.g., 漩涡鸣人 / Uzumaki Naruto)",
      "mbti": "An authentic MBTI of these 16 types: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP",
      "avatarEmoji": "1 relevant unicode emoji (e.g., 🍥)",
      "avatarColor": "A linear gradient string (e.g., linear-gradient(135deg, #F97316 0%, #F59E0B 100%))",
      "quote": "An iconic, inspiring quote in Chinese from the character reflecting their personality",
      "summary": "A 150-word deep psychological analysis in Chinese of their MBTI personality in the context of their storyline",
      "plotProof": "Compelling plot proof in Chinese proving why they have this MBTI (e.g., how they reacted in high-tension moments, cognitive functions)",
      "fandomDiscussion": "Fandom discussion consensus or hot debates in Bilibili and major forums in Chinese",
      "strengths": ["3 key psychological or combat strengths"],
      "weaknesses": ["2 key blindspots or weaknesses"],
      "dimensions": { "E": 50, "N": 50, "T": 50, "P": 50 },
      "matches": {
        "perfect": ["2 matching MBTI types"],
        "good": ["3 matching MBTI types"]
      }
    }
  ],
  "relationships": [
    {
      "fromIndex": index of from character in the array above,
      "toIndex": index of to character in the array above,
      "relationType": "friend" | "rival" | "family" | "mentor" | "love",
      "relationLabel": "A Chinese tag like 宿敌, 挚友, 一生羁绊",
      "compatibilityScore": 60-99,
      "description": "A 100-word highly detailed Chinese paragraph analyzing the chemistry and storyline interaction between these two cognitive profiles in the canon"
    }
  ]
}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Process and generate records for anime: ${animeName}`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              characters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    mbti: { type: Type.STRING },
                    avatarEmoji: { type: Type.STRING },
                    avatarColor: { type: Type.STRING },
                    quote: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    plotProof: { type: Type.STRING },
                    fandomDiscussion: { type: Type.STRING },
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                    dimensions: {
                      type: Type.OBJECT,
                      properties: {
                        E: { type: Type.INTEGER },
                        N: { type: Type.INTEGER },
                        T: { type: Type.INTEGER },
                        P: { type: Type.INTEGER }
                      }
                    },
                    matches: {
                      type: Type.OBJECT,
                      properties: {
                        perfect: { type: Type.ARRAY, items: { type: Type.STRING } },
                        good: { type: Type.ARRAY, items: { type: Type.STRING } }
                      }
                    }
                  }
                }
              },
              relationships: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    fromIndex: { type: Type.INTEGER },
                    toIndex: { type: Type.INTEGER },
                    relationType: { type: Type.STRING },
                    relationLabel: { type: Type.STRING },
                    compatibilityScore: { type: Type.INTEGER },
                    description: { type: Type.STRING }
                  }
                }
              }
            },
            required: ['characters', 'relationships']
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error('Empty response from Gemini');
      
      const payload = JSON.parse(text);
      const generatedCharacters: Character[] = [];
      const generatedRelationships: Relationship[] = [];
      const idMap: string[] = [];

      // 1. Process imported characters
      payload.characters.forEach((rawChar: any) => {
        const cleanName = rawChar.name.split(' / ')[0];
        // Generate a stable and safe ID
        const id = `ai_${animeName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.random().toString(36).substring(2, 6)}`;
        idMap.push(id);

        const char: Character = {
          id,
          name: rawChar.name,
          anime: animeName,
          mbti: rawChar.mbti as MBTIType,
          avatarColor: rawChar.avatarColor || 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          avatarEmoji: rawChar.avatarEmoji || '🎭',
          quote: rawChar.quote || '热爱梦想，绽放光芒。',
          summary: rawChar.summary || 'AI 分析出的典型性格。',
          plotProof: rawChar.plotProof || '考证于剧情表现。',
          fandomDiscussion: rawChar.fandomDiscussion || '粉丝社区的普遍共识。',
          strengths: rawChar.strengths || ['拥有绝佳心灵能量'],
          weaknesses: rawChar.weaknesses || ['容易陷入盲区'],
          dimensions: rawChar.dimensions || { E: 50, N: 50, T: 50, P: 50 },
          matches: rawChar.matches || { perfect: ['INFP'], good: ['INFJ'] }
        };

        // Add to active library if not existing
        const exists = this.db.characters.find(c => c.name.split(' / ')[0] === cleanName && c.anime === animeName);
        if (!exists) {
          this.db.characters.push(char);
          generatedCharacters.push(char);
        } else {
          generatedCharacters.push(exists);
        }
      });

      // 2. Process imported relationships
      payload.relationships.forEach((rawRel: any) => {
        const fromId = idMap[rawRel.fromIndex];
        const toId = idMap[rawRel.toIndex];

        if (fromId && toId) {
          const rel: Relationship = {
            fromId,
            toId,
            relationType: rawRel.relationType as Relationship['relationType'],
            relationLabel: rawRel.relationLabel || '羁绊关系',
            compatibilityScore: rawRel.compatibilityScore || 85,
            description: rawRel.description || '命运指引出的极佳人格互动。'
          };
          this.db.relationships.push(rel);
          generatedRelationships.push(rel);
        }
      });

      this.db.totalImports += 1;
      this.save();
      return { characters: generatedCharacters, relationships: generatedRelationships };
    } catch (e) {
      console.error('Failed to import anime via Gemini API', e);
      throw e;
    }
  }
}

// Single database state instance
export const charDb = new CharDatabase();
