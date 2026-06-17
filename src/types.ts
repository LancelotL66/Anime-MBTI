export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface MBTIDetails {
  type: MBTIType;
  title: string; // e.g. 建筑师 Architect, 竞选者 Campaigner
  category: 'Analysts' | 'Diplomats' | 'Sentinels' | 'Explorers'; // 分析家, 外交家, 守护者, 探险家
  categoryCn: string;
  colorClass: string; // Tailwind color theme for tabs/borders
  bgClass: string;
  accentColor: string;
  strengths: string[];
  weaknesses: string[];
  mbtiDescription: string;
}

export interface DimensionScore {
  E: number; // vs I (100 - E)
  N: number; // vs S (100 - N)
  T: number; // vs F (100 - T)
  P: number; // vs J (100 - P)
}

export interface Character {
  id: string;
  name: string;
  anime: string;
  mbti: MBTIType;
  avatarColor: string; // Gradient settings or hexes
  avatarEmoji: string;
  quote: string;
  summary: string; // 性格概述
  plotProof: string; // 剧情考证: anime instances proving their MBTI
  fandomDiscussion: string; // 社区探讨: what fans say
  strengths: string[];
  weaknesses: string[];
  dimensions: DimensionScore;
  matches: {
    perfect: MBTIType[];
    good: MBTIType[];
  };
}

export interface Relationship {
  fromId: string;
  toId: string;
  relationType: 'friend' | 'rival' | 'family' | 'mentor' | 'love';
  relationLabel: string; // e.g. 宿命死敌, 挚友, 妹妹
  compatibilityScore: number; // 0-100
  description: string;
}

export interface TestQuestion {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  phase: number; // 1: 觉醒与起程, 2: 磨砺与冒险, 3: 宿命与抉择
  optionA: {
    text: string;
    score: number; // e.g. +1 for first letter (E, N, T, J)
  };
  optionB: {
    text: string;
    score: number; // e.g. +1 for second letter (I, S, F, P)
  };
}

export interface UserFavorite {
  characterId: string;
  addedAt: string;
}
