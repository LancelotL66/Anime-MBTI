import fs from 'fs';
import path from 'path';
import { 
  Character, 
  Relationship, 
  MBTIType, 
  DimensionScore 
} from '../src/types';
import { 
  CHARACTERS as seedCharacters, 
  RELATIONSHIPS as seedRelationships 
} from '../src/data/characters';
import { PRESET_ANIME_MAPS, massiveAnimeList } from './mbtiSeeder';
import { REAL_ANIME_QUOTES } from './authentic_quotes';
import { personalizeCharacterGemini, importAnimeViaGeminiAPI } from './geminiService';

// New decoupled internal interfaces
export interface CharacterBase {
  id: string;
  nameCn: string;
  nameEn?: string;
  anime: string;
  aliases: string[];
  avatarColor?: string;
  avatarEmoji?: string;
}

export interface CharacterTyping {
  characterId: string;
  mbti: MBTIType;
  enneagram?: string;
  confidence: number;
  source: 'pdb' | 'manual' | 'ai_assisted';
  sourceUrl?: string;
  pdbProfileId?: string;
  votes?: string;
  voteBreakdown?: DimensionScore;
  updatedAt: string;
}

export interface CharacterProfile {
  characterId: string;
  quote?: string;
  summary?: string;
  plotProof?: string;
  fandomDiscussion?: string;
  strengths: string[];
  weaknesses: string[];
  generatedFrom?: {
    mbti: MBTIType;
    source: 'pdb';
    sourceUrl?: string;
  };
}

// 1. Programmatic avatar color & icon getter based on MBTI traits & famous character names
export function getCharacterTraitAvatar(fullName: string, animeName: string, mbti: MBTIType): { color: string, emoji: string } {
  const nameOnly = fullName.split(' / ')[0].trim();

  const exactMatches: Record<string, { color: string, emoji: string }> = {
    '黑崎一护': { color: 'linear-gradient(135deg, #F97316 0%, #111827 100%)', emoji: '⚔️' },
    '朽木露琪亚': { color: 'linear-gradient(135deg, #E0F2FE 0%, #38BDF8 100%)', emoji: '❄️' },
    '蓝染惣右介': { color: 'linear-gradient(135deg, #1E1B4B 0%, #5B21B6 100%)', emoji: '🦋' },
    '五条悟': { color: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)', emoji: '🕶️' },
    '漩涡鸣人': { color: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)', emoji: '🍥' },
    '宇智波佐助': { color: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', emoji: '👁️' },
    '蒙奇·D·路飞': { color: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)', emoji: '👒' },
    '罗罗诺亚·索隆': { color: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', emoji: '⚔️' }
  };

  if (exactMatches[nameOnly]) {
    return exactMatches[nameOnly];
  }

  // Fallbacks based on category/archetype
  const categoryColors: Record<string, string> = {
    Analysts: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)', // Purple
    Diplomats: 'linear-gradient(135deg, #059669 0%, #064E3B 100%)', // Emerald
    Sentinels: 'linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)', // Blue
    Explorers: 'linear-gradient(135deg, #D97706 0%, #78350F 100%)'  // Amber
  };

  // Map MBTI to categories
  let cat = 'Explorers';
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(mbti)) cat = 'Analysts';
  else if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(mbti)) cat = 'Diplomats';
  else if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(mbti)) cat = 'Sentinels';

  const defaultEmojis: Record<string, string> = {
    Analysts: '🧠',
    Diplomats: '🌸',
    Sentinels: '🛡️',
    Explorers: '⚡'
  };

  return {
    color: categoryColors[cat] || categoryColors.Explorers,
    emoji: defaultEmojis[cat] || '🎭'
  };
}

// 2. High quality localized semantic fallback text generator for MBTI classes
export function getDynamicMbtiFields(nameOnly: string, animeName: string, mbti: MBTIType) {
  const cleanKey = Object.keys(REAL_ANIME_QUOTES).find(k => nameOnly.includes(k) || k.includes(nameOnly));
  const finalQuote = cleanKey ? REAL_ANIME_QUOTES[cleanKey] : `“即便处于最深的黑暗中，我的心智（${mbti}）也会指引我们找到光明的出口。”`;

  const finalSummary = `在《${animeName}》的世界中，${nameOnly} 展现了极富个性的 ${mbti} 人格。其心智表现：始终通过清晰的认知工具结构事物，避免陷入随波逐流（homogenous）的思维盲区，致力于贯彻自身信仰。`;
  const finalPlotProof = `面对重重的逆境抉择与精神磨砺，${nameOnly} 展现了极具代表性的认知极值操作。无论在重大转折时刻还是日常抉择，皆高度吻合其 ${mbti} 四维功能栈的最佳表现。`;
  const finalFandomDiscussion = `粉丝社群对 ${nameOnly} 的人格认知深度打卡。在二次元 PDB 及各大论坛中，关于该角色属于 ${mbti} 最纯粹的表现形式有着极高的共识和丰富的研讨。`;

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
    ISFP: ['极度沉浸自我美学与纯白信念追求的静默艺术坚守', '对物质界、色彩、感官瞬变细节与优雅技法神级的敏锐度', '不愿随大流功利算计、永远用最质朴纯真热忱拥抱每一天的本真'],
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
    ISTP: ['极强的社交冷淡，对同伴悲春伤秋的细腻情感无法感同身受', '容易陷入不辞而别的独狼模式，让集体在协同布局中感到头痛'],
    ISFP: ['难以忍受长期机械死板的规则规划和功利主义任务约束', '在遭遇强烈情感挫折或敌意时，极其容易一秒消沉并选择自闭'],
    ESTP: ['极度缺乏对长远未来格局利弊的系统性推演和耐心积累', '常因行事过度追求刺激玩乐，在关键决策中表现得过于任性投机'],
    ESFP: ['极难忍受枯燥乏味的长期分析与静态数字案牍工作', '由于极重短期感官和当下的快活而缺乏足够的危机规划']
  };

  return {
    quote: finalQuote,
    summary: finalSummary,
    plotProof: finalPlotProof,
    fandomDiscussion: finalFandomDiscussion,
    strengths: strengthsMap[mbti] || strengthsMap.INFP,
    weaknesses: weaknessesMap[mbti] || weaknessesMap.INFP
  };
}

// 3. Helper to generate deterministic fallback characters for scalable presets
function generateFallbackCharacter(fullName: string, animeName: string, mbti: MBTIType): Character {
  const nameOnly = fullName.split(' / ')[0].trim();
  const avatar = getCharacterTraitAvatar(fullName, animeName, mbti);
  const fields = getDynamicMbtiFields(nameOnly, animeName, mbti);

  const E = mbti.includes('E') ? 75 : 25;
  const N = mbti.includes('N') ? 75 : 25;
  const T = mbti.includes('T') ? 75 : 25;
  const P = mbti.includes('P') ? 75 : 25;

  return {
    id: '',
    name: fullName,
    anime: animeName,
    mbti,
    avatarColor: avatar.color,
    avatarEmoji: avatar.emoji,
    quote: fields.quote,
    summary: fields.summary,
    plotProof: fields.plotProof,
    fandomDiscussion: fields.fandomDiscussion,
    strengths: fields.strengths,
    weaknesses: fields.weaknesses,
    dimensions: { E, N, T, P },
    matches: {
      perfect: mbti === 'INFP' ? ['ENFJ', 'ENTJ'] : mbti === 'INTJ' ? ['ENFP', 'ENTP'] : ['INFP', 'INFJ'],
      good: ['ENFP', 'INTP', 'INTJ']
    }
  };
}

// Deterministic relationship compatibility score and label calculator (No Math.random!)
export function calculateMbtiCompatibility(mbtiA: MBTIType, mbtiB: MBTIType): { score: number, label: string } {
  if (mbtiA === mbtiB) {
    return { score: 90, label: '同质知己' };
  }
  
  const perfectMap: Record<MBTIType, MBTIType[]> = {
    INTJ: ['ENFP', 'ENTP'],
    INTP: ['ENTJ', 'ENFJ'],
    ENTJ: ['INTP', 'INFJ'],
    ENTP: ['INTJ', 'INFJ'],
    INFJ: ['ENFP', 'ENTP'],
    INFP: ['ENFJ', 'ENTJ'],
    ENFJ: ['INTP', 'INFP'],
    ENFP: ['INTJ', 'INFJ'],
    ISTJ: ['ESFP', 'ESTP'],
    ISFJ: ['ESTP', 'ESFP'],
    ESTJ: ['ISFP', 'ISTP'],
    ESFJ: ['ISTP', 'ISFP'],
    ISTP: ['ESFJ', 'ESTJ'],
    ISFP: ['ESTJ', 'ESFJ'],
    ESTP: ['ISFJ', 'ISTJ'],
    ESFP: ['ISTJ', 'ISFJ'],
  };
  
  if (perfectMap[mbtiA]?.includes(mbtiB)) {
    return { score: 98, label: '完美绝配' };
  }
  
  // Rule based: share both intuition/sensing and thinking/feeling
  const sharedN = mbtiA[1] === mbtiB[1];
  const sharedT = mbtiA[2] === mbtiB[2];
  if (sharedN && sharedT) {
    return { score: 85, label: '志同道合' };
  }
  
  let matchCount = 0;
  for (let i = 0; i < 4; i++) {
    if (mbtiA[i] === mbtiB[i]) matchCount++;
  }
  
  if (matchCount >= 2) {
    return { score: 75, label: '求同存异' };
  }
  
  return { score: 62, label: '磨合重重' };
}

export class CharDatabase {
  private baseStore: CharacterBase[] = [];
  private typingStore: CharacterTyping[] = [];
  private profileStore: CharacterProfile[] = [];
  private relationshipStore: Relationship[] = [];
  private totalImports: number = 0;

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
    const STORE_DIR = path.join(process.cwd(), 'server', 'db_store');
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }

    const baseFile = path.join(STORE_DIR, 'characters_base.json');
    const typingFile = path.join(STORE_DIR, 'characters_typing.json');
    const profileFile = path.join(STORE_DIR, 'characters_profile.json');
    const relFile = path.join(STORE_DIR, 'relationships.json');

    const oldDbFile = path.join(process.cwd(), 'characters_db.json');

    // 1. If decoupled split files exist, read them
    if (fs.existsSync(baseFile) && fs.existsSync(typingFile) && fs.existsSync(profileFile)) {
      try {
        this.baseStore = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
        this.typingStore = JSON.parse(fs.readFileSync(typingFile, 'utf8'));
        this.profileStore = JSON.parse(fs.readFileSync(profileFile, 'utf8'));
        this.relationshipStore = fs.existsSync(relFile) ? JSON.parse(fs.readFileSync(relFile, 'utf8')) : [];
        
        this.totalImports = this.typingStore.filter(t => t.source === 'ai_assisted').length;
        console.log(`[Database] Loaded split store successfully. Total: ${this.baseStore.length} characters.`);
        
        // Clean up old giant legacy DB if it still exists to keep workspace tidy
        if (fs.existsSync(oldDbFile)) {
          fs.unlinkSync(oldDbFile);
        }
        return;
      } catch (err) {
        console.error('[Database] Split store parsing error. Performing self-heal...', err);
      }
    }

    // 2. Fallback Migration: Parse and migrate characters_db.json if it exists
    if (fs.existsSync(oldDbFile)) {
      try {
        console.log('[Database] Migrating monolithic characters_db.json into split normalized store...');
        const oldContent = fs.readFileSync(oldDbFile, 'utf8');
        const oldDb = JSON.parse(oldContent);
        
        const charsList = oldDb.characters || [];
        const relsList = oldDb.relationships || [];
        this.totalImports = oldDb.totalImports || 0;

        charsList.forEach((c: any) => {
          const nameParts = c.name.split(' / ');
          const nameCn = nameParts[0].trim();
          const nameEn = nameParts[1]?.trim() || '';

          const base: CharacterBase = {
            id: c.id,
            nameCn,
            nameEn: nameEn || undefined,
            anime: c.anime,
            aliases: [],
            avatarColor: c.avatarColor,
            avatarEmoji: c.avatarEmoji
          };

          const typing: CharacterTyping = {
            characterId: c.id,
            mbti: c.mbti,
            enneagram: undefined,
            confidence: 0.9,
            source: c.id.startsWith('preset_') ? 'pdb' : (c.id.startsWith('ai_') ? 'ai_assisted' : 'manual'),
            updatedAt: new Date().toISOString(),
            voteBreakdown: c.dimensions || { E: 50, N: 50, T: 50, P: 50 }
          };

          const profile: CharacterProfile = {
            characterId: c.id,
            quote: c.quote,
            summary: c.summary,
            plotProof: c.plotProof,
            fandomDiscussion: c.fandomDiscussion,
            strengths: c.strengths || [],
            weaknesses: c.weaknesses || []
          };

          this.baseStore.push(base);
          this.typingStore.push(typing);
          this.profileStore.push(profile);
        });

        this.relationshipStore = relsList;
        this.save();
        
        fs.unlinkSync(oldDbFile);
        console.log('[Database] Successfully migrated legacy characters_db.json and purged the old file.');
      } catch (e: any) {
        console.error('[Database] Old database migration failed:', e.message);
      }
    }
  }

  public save() {
    const STORE_DIR = path.join(process.cwd(), 'server', 'db_store');
    const baseFile = path.join(STORE_DIR, 'characters_base.json');
    const typingFile = path.join(STORE_DIR, 'characters_typing.json');
    const profileFile = path.join(STORE_DIR, 'characters_profile.json');
    const relFile = path.join(STORE_DIR, 'relationships.json');

    try {
      fs.writeFileSync(baseFile, JSON.stringify(this.baseStore, null, 2), 'utf8');
      fs.writeFileSync(typingFile, JSON.stringify(this.typingStore, null, 2), 'utf8');
      fs.writeFileSync(profileFile, JSON.stringify(this.profileStore, null, 2), 'utf8');
      fs.writeFileSync(relFile, JSON.stringify(this.relationshipStore, null, 2), 'utf8');
      console.log('[Database] Split database tables flushed.');
    } catch (e) {
      console.error('[Database] Failed to save split tables:', e);
    }
  }

  private seed() {
    const insertedIds = new Set<string>(this.baseStore.map(b => b.id));

    // A. Seed initial static characters
    seedCharacters.forEach(c => {
      if (!insertedIds.has(c.id)) {
        const nameParts = c.name.split(' / ');
        const nameCn = nameParts[0].trim();
        const nameEn = nameParts[1]?.trim() || '';

        const base: CharacterBase = {
          id: c.id,
          nameCn,
          nameEn: nameEn || undefined,
          anime: c.anime,
          aliases: [],
          avatarColor: c.avatarColor,
          avatarEmoji: c.avatarEmoji
        };

        const typing: CharacterTyping = {
          characterId: c.id,
          mbti: c.mbti,
          confidence: 1.0,
          source: 'manual',
          updatedAt: new Date().toISOString(),
          voteBreakdown: c.dimensions
        };

        const profile: CharacterProfile = {
          characterId: c.id,
          quote: c.quote,
          summary: c.summary,
          plotProof: c.plotProof,
          fandomDiscussion: c.fandomDiscussion,
          strengths: c.strengths,
          weaknesses: c.weaknesses
        };

        this.baseStore.push(base);
        this.typingStore.push(typing);
        this.profileStore.push(profile);
        insertedIds.add(c.id);
      }
    });

    seedRelationships.forEach(r => {
      const exists = this.relationshipStore.some(
        existing => (existing.fromId === r.fromId && existing.toId === r.toId) || (existing.fromId === r.toId && existing.toId === r.fromId)
      );
      if (!exists) {
        this.relationshipStore.push(r);
      }
    });

    // B. Seed preset anime maps from helper seeder
    Object.keys(PRESET_ANIME_MAPS).forEach(key => {
      PRESET_ANIME_MAPS[key].forEach(group => {
        const charIdMap: Record<string, string> = {};
        
        group.characters.forEach(rawChar => {
          const cleanName = rawChar.name.split(' / ')[0].trim();
          const existing = this.baseStore.find(b => b.nameCn === cleanName);
          let id = '';
          if (existing) {
            id = existing.id;
          } else {
            id = this.generateDeterministicId(group.name, cleanName);
          }
          charIdMap[cleanName] = id;

          if (!insertedIds.has(id)) {
            const nameParts = rawChar.name.split(' / ');
            const nameCn = nameParts[0].trim();
            const nameEn = nameParts[1]?.trim() || '';

            const base: CharacterBase = {
              id,
              nameCn,
              nameEn: nameEn || undefined,
              anime: group.name,
              aliases: [],
              avatarColor: rawChar.avatarColor,
              avatarEmoji: rawChar.avatarEmoji
            };

            const typing: CharacterTyping = {
              characterId: id,
              mbti: rawChar.mbti,
              confidence: 0.95,
              source: 'pdb',
              updatedAt: new Date().toISOString(),
              voteBreakdown: rawChar.dimensions
            };

            const profile: CharacterProfile = {
              characterId: id,
              quote: rawChar.quote,
              summary: rawChar.summary,
              plotProof: rawChar.plotProof,
              fandomDiscussion: rawChar.fandomDiscussion,
              strengths: rawChar.strengths,
              weaknesses: rawChar.weaknesses
            };

            this.baseStore.push(base);
            this.typingStore.push(typing);
            this.profileStore.push(profile);
            insertedIds.add(id);
          }
        });

        // Seed preset relationships
        group.relations.forEach(rawRel => {
          const fromId = charIdMap[rawRel.fromName];
          const toId = charIdMap[rawRel.toName];
          if (fromId && toId) {
            const exists = this.relationshipStore.some(
              r => (r.fromId === fromId && r.toId === toId) || (r.fromId === toId && r.toId === fromId)
            );
            if (!exists) {
              this.relationshipStore.push({
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

    this.save();
  }

  // Frontend API: Gathers split stores back to fully assembled elements
  public getCharacters(): Character[] {
    return this.baseStore.map(base => {
      const typing = this.typingStore.find(t => t.characterId === base.id);
      const profile = this.profileStore.find(p => p.characterId === base.id);
      
      const mbti = typing ? typing.mbti : 'INFP';
      const fallbackFields = getDynamicMbtiFields(base.nameCn, base.anime, mbti);

      // Matches calculation
      const perfectMatches = mbti === 'INFP' ? ['ENFJ', 'ENTJ'] : mbti === 'INTJ' ? ['ENFP', 'ENTP'] : ['INFP', 'INFJ'];
      const goodMatches = ['ENFP', 'INTP', 'INTJ'];

      return {
        id: base.id,
        name: base.nameEn ? `${base.nameCn} / ${base.nameEn}` : base.nameCn,
        anime: base.anime,
        mbti,
        avatarColor: base.avatarColor || 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        avatarEmoji: base.avatarEmoji || '🎭',
        quote: profile?.quote || fallbackFields.quote,
        summary: profile?.summary || fallbackFields.summary,
        plotProof: profile?.plotProof || fallbackFields.plotProof,
        fandomDiscussion: profile?.fandomDiscussion || fallbackFields.fandomDiscussion,
        strengths: profile?.strengths && profile.strengths.length > 0 ? profile.strengths : fallbackFields.strengths,
        weaknesses: profile?.weaknesses && profile.weaknesses.length > 0 ? profile.weaknesses : fallbackFields.weaknesses,
        dimensions: typing?.voteBreakdown || { E: 50, N: 50, T: 50, P: 50 },
        matches: {
          perfect: perfectMatches as MBTIType[],
          good: goodMatches as MBTIType[]
        }
      };
    });
  }

  public getRelationships(): Relationship[] {
    return this.relationshipStore;
  }

  public getStats() {
    const characters = this.getCharacters();
    const uniqueAnimes = new Set(this.baseStore.map(b => b.anime));
    
    // Calculate real MBTI densities
    const dist: Record<string, number> = {};
    this.typingStore.forEach(t => {
      dist[t.mbti] = (dist[t.mbti] || 0) + 1;
    });

    return {
      totalCharacters: this.baseStore.length,
      totalAnimes: uniqueAnimes.size,
      totalRelationships: this.relationshipStore.length,
      mbtiDistribution: dist,
      isLargeDb: this.baseStore.length >= 800,
      totalImports: this.totalImports
    };
  }

  // Seeding the giant listing of 90+ anime rosters deterministically
  public scaleToThousand() {
    const insertedIds = new Set<string>(this.baseStore.map(b => b.id));
    let addedCount = 0;

    massiveAnimeList.forEach(animeDef => {
      const charIds: string[] = [];
      const animeName = animeDef.name;

      animeDef.cast.forEach(([name, mbti]) => {
        const cleanName = name.trim();
        const existing = this.baseStore.find(b => b.nameCn === cleanName && b.anime === animeName);
        const id = existing ? existing.id : this.generateDeterministicId(animeName, cleanName);
        charIds.push(id);

        if (!insertedIds.has(id)) {
          const base: CharacterBase = {
            id,
            nameCn: cleanName,
            anime: animeName,
            aliases: [],
            avatarColor: getCharacterTraitAvatar(cleanName, animeName, mbti as MBTIType).color,
            avatarEmoji: getCharacterTraitAvatar(cleanName, animeName, mbti as MBTIType).emoji
          };

          const typing: CharacterTyping = {
            characterId: id,
            mbti: mbti as MBTIType,
            confidence: 0.9,
            source: 'pdb',
            updatedAt: new Date().toISOString(),
            voteBreakdown: {
              E: mbti.includes('E') ? 75 : 25,
              N: mbti.includes('N') ? 75 : 25,
              T: mbti.includes('T') ? 75 : 25,
              P: mbti.includes('P') ? 75 : 25
            }
          };

          const fallbacks = getDynamicMbtiFields(cleanName, animeName, mbti as MBTIType);
          const profile: CharacterProfile = {
            characterId: id,
            quote: fallbacks.quote,
            summary: fallbacks.summary,
            plotProof: fallbacks.plotProof,
            fandomDiscussion: fallbacks.fandomDiscussion,
            strengths: fallbacks.strengths,
            weaknesses: fallbacks.weaknesses
          };

          this.baseStore.push(base);
          this.typingStore.push(typing);
          this.profileStore.push(profile);
          insertedIds.add(id);
          addedCount++;
        }
      });

      // Insert relationships based on deterministic compatibility rules (no Math.random!)
      for (let i = 0; i < charIds.length; i++) {
        for (let j = i + 1; j < Math.min(i + 3, charIds.length); j++) {
          const fromId = charIds[i];
          const toId = charIds[j];

          const fromTyping = this.typingStore.find(t => t.characterId === fromId);
          const toTyping = this.typingStore.find(t => t.characterId === toId);

          if (fromTyping && toTyping) {
            const hasRel = this.relationshipStore.some(
              r => (r.fromId === fromId && r.toId === toId) || (r.fromId === toId && r.toId === fromId)
            );

            if (!hasRel) {
              const comp = calculateMbtiCompatibility(fromTyping.mbti, toTyping.mbti);
              const fromChar = this.baseStore.find(b => b.id === fromId);
              const toChar = this.baseStore.find(b => b.id === toId);

              this.relationshipStore.push({
                fromId,
                toId,
                relationType: comp.score >= 90 ? 'friend' : (comp.score <= 65 ? 'rival' : 'friend'),
                relationLabel: comp.label,
                compatibilityScore: comp.score,
                description: `${fromChar?.nameCn}(${fromTyping.mbti}) 与 ${toChar?.nameCn}(${toTyping.mbti}) 在《${animeName}》交天纽带中体现了契合度为 ${comp.score}% 的典型人际特征。`
              });
            }
          }
        }
      }
    });

    this.save();
    return addedCount;
  }

  // AI custom personalized analysis handler on-demand
  public async personalizeCharacter(id: string): Promise<Character> {
    const base = this.baseStore.find(b => b.id === id);
    const typing = this.typingStore.find(t => t.characterId === id);
    const profile = this.profileStore.find(p => p.characterId === id);

    if (!base || !typing || !profile) {
      throw new Error('未在云端数据库中找到对应的完整角色档案。');
    }

    const payload = await personalizeCharacterGemini(
      {
        name: base.nameCn,
        anime: base.anime,
        mbti: typing.mbti,
        fullName: base.nameEn ? `${base.nameCn} / ${base.nameEn}` : base.nameCn
      },
      base.nameEn || ''
    );

    profile.quote = payload.quote || profile.quote;
    profile.summary = payload.summary || profile.summary;
    profile.plotProof = payload.plotProof || profile.plotProof;
    profile.fandomDiscussion = payload.fandomDiscussion || profile.fandomDiscussion;
    profile.strengths = payload.strengths || profile.strengths;
    profile.weaknesses = payload.weaknesses || profile.weaknesses;

    this.save();
    return this.getCharacters().find(c => c.id === id)!;
  }

  // Dynamic anime roster dynamic importer via Gemini API
  public async importAnimeViaGemini(animeName: string): Promise<{ characters: Character[], relationships: Relationship[] }> {
    const payload = await importAnimeViaGeminiAPI(animeName);
    
    const generatedCharacters: Character[] = [];
    const generatedRelationships: Relationship[] = [];
    const idMap: string[] = [];

    // Process imported characters
    payload.characters.forEach((rawChar: any) => {
      const cleanName = rawChar.name.split(' / ')[0].trim();
      const id = `ai_${animeName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.random().toString(36).substring(2, 6)}`;
      idMap.push(id);

      const parts = rawChar.name.split(' / ');
      const nameCn = parts[0].trim();
      const nameEn = parts[1]?.trim() || '';

      const base: CharacterBase = {
        id,
        nameCn,
        nameEn: nameEn || undefined,
        anime: animeName,
        aliases: [],
        avatarColor: rawChar.avatarColor || 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        avatarEmoji: rawChar.avatarEmoji || '🎭'
      };

      const typing: CharacterTyping = {
        characterId: id,
        mbti: rawChar.mbti as MBTIType,
        confidence: 0.9,
        source: 'ai_assisted',
        updatedAt: new Date().toISOString(),
        voteBreakdown: rawChar.dimensions || { E: 50, N: 50, T: 50, P: 50 }
      };

      const profile: CharacterProfile = {
        characterId: id,
        quote: rawChar.quote,
        summary: rawChar.summary,
        plotProof: rawChar.plotProof,
        fandomDiscussion: rawChar.fandomDiscussion,
        strengths: rawChar.strengths || [],
        weaknesses: rawChar.weaknesses || []
      };

      const exists = this.baseStore.find(b => b.nameCn === nameCn && b.anime === animeName);
      if (!exists) {
        this.baseStore.push(base);
        this.typingStore.push(typing);
        this.profileStore.push(profile);
      }
    });

    // Process imported relationships
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
        this.relationshipStore.push(rel);
        generatedRelationships.push(rel);
      }
    });

    this.totalImports += 1;
    this.save();

    // Map back to front-end schema
    return {
      characters: this.getCharacters().filter(c => c.anime === animeName),
      relationships: generatedRelationships
    };
  }

  // Import raw PDB-scraped data structures and convert them to the split normalized storage
  public importPdbData(scrapedList: any[]): Character[] {
    scrapedList.forEach(item => {
      const id = `pdb_${item.pdbProfileId}`;
      const nameCn = item.nameCn;
      const nameEn = item.nameEn || '';

      const avatar = getCharacterTraitAvatar(nameCn, item.anime, item.mbti);

      const base: CharacterBase = {
        id,
        nameCn,
        nameEn: nameEn || undefined,
        anime: item.anime,
        aliases: [],
        avatarColor: avatar.color,
        avatarEmoji: avatar.emoji
      };

      const typing: CharacterTyping = {
        characterId: id,
        mbti: item.mbti,
        enneagram: item.enneagram,
        confidence: 0.95,
        source: 'pdb',
        pdbProfileId: item.pdbProfileId,
        voteBreakdown: item.voteBreakdown || { E: 50, N: 50, T: 50, P: 50 },
        updatedAt: item.updatedAt || new Date().toISOString()
      };

      const fields = getDynamicMbtiFields(nameCn, item.anime, item.mbti);

      const profile: CharacterProfile = {
        characterId: id,
        quote: item.quote || fields.quote,
        summary: item.summary || fields.summary,
        plotProof: fields.plotProof,
        fandomDiscussion: `该角色在 Personality Database 拥有真实记录，共收获了 ${item.votesCount} 张投票。评级详情：Enneagram ${item.enneagram || '未知'}，Socionics ${item.socionics || '未知'}，Big Five ${item.bigFive || '未知'}。`,
        strengths: fields.strengths,
        weaknesses: fields.weaknesses
      };

      // Upsert
      const existingBaseIdx = this.baseStore.findIndex(b => b.id === id);
      if (existingBaseIdx !== -1) {
        this.baseStore[existingBaseIdx] = base;
        
        const typingIdx = this.typingStore.findIndex(t => t.characterId === id);
        if (typingIdx !== -1) this.typingStore[typingIdx] = typing;
        else this.typingStore.push(typing);

        const profileIdx = this.profileStore.findIndex(p => p.characterId === id);
        if (profileIdx !== -1) this.profileStore[profileIdx] = profile;
        else this.profileStore.push(profile);
      } else {
        this.baseStore.push(base);
        this.typingStore.push(typing);
        this.profileStore.push(profile);
      }
    });

    this.save();
    return this.getCharacters().filter(c => scrapedList.some(s => `pdb_${s.pdbProfileId}` === c.id));
  }
}

export const charDb = new CharDatabase();
