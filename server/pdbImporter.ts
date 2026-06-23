import fs from 'fs';
import path from 'path';
import { MBTIType, DimensionScore } from '../src/types';

const CACHE_FILE = path.join(process.cwd(), 'data', 'pdb', 'characters.jsonl');
const MBTI_TYPES = new Set<MBTIType>([
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
]);

function ensureCacheDir() {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureCacheDir();

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface PdbRelatedProfile {
  pdbProfileId: string;
  name: string;
  anime?: string;
  sourceUrl: string;
}

export interface PdbScrapedData {
  pdbProfileId: string;
  nameCn: string;
  nameEn?: string;
  anime: string;
  mbti: MBTIType;
  enneagram?: string;
  votesCount: number;
  voteBreakdown?: DimensionScore;
  cognitiveFunctions?: string[];
  socionics?: string;
  bigFive?: string;
  summary?: string;
  quote?: string;
  relatedProfiles: PdbRelatedProfile[];
  sourceUrl: string;
  retrievedVia: 'jina_reader';
  updatedAt: string;
}

export function readPdbCache(): PdbScrapedData[] {
  ensureCacheDir();
  if (!fs.existsSync(CACHE_FILE)) return [];

  try {
    const raw = fs.readFileSync(CACHE_FILE, 'utf8');
    return raw
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
        try {
          return JSON.parse(line) as PdbScrapedData;
        } catch {
          return null;
        }
      })
      .filter((item): item is PdbScrapedData => item !== null);
  } catch (e) {
    console.error('Error reading PDB cache', e);
    return [];
  }
}

export function writePdbCache(items: PdbScrapedData[]) {
  ensureCacheDir();

  const existing = readPdbCache();
  const existingMap = new Map(existing.map(e => [e.pdbProfileId, e]));
  items.forEach(item => existingMap.set(item.pdbProfileId, item));

  const lines = Array.from(existingMap.values())
    .map(item => JSON.stringify(item))
    .join('\n') + '\n';

  fs.writeFileSync(CACHE_FILE, lines, 'utf8');
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function parseMbti(value: string | undefined): MBTIType | null {
  if (!value) return null;
  const upper = value.toUpperCase() as MBTIType;
  return MBTI_TYPES.has(upper) ? upper : null;
}

function extractDimension(markdownText: string, positiveLetter: 'E' | 'N' | 'T' | 'P', negativeLetter: 'I' | 'S' | 'F' | 'J'): number | undefined {
  const positive = markdownText.match(new RegExp(`(\\d{1,3})%\\s+${positiveLetter}\\b`, 'i'));
  if (positive) return Math.min(100, Math.max(0, Number(positive[1])));

  const negative = markdownText.match(new RegExp(`(\\d{1,3})%\\s+${negativeLetter}\\b`, 'i'));
  if (negative) return 100 - Math.min(100, Math.max(0, Number(negative[1])));

  return undefined;
}

function parseVoteBreakdown(markdownText: string): DimensionScore | undefined {
  const E = extractDimension(markdownText, 'E', 'I');
  const N = extractDimension(markdownText, 'N', 'S');
  const T = extractDimension(markdownText, 'T', 'F');
  const P = extractDimension(markdownText, 'P', 'J');

  if ([E, N, T, P].some(value => value === undefined)) {
    return undefined;
  }

  return { E: E!, N: N!, T: T!, P: P! };
}

function parseRelatedProfiles(markdownText: string): PdbRelatedProfile[] {
  const relatedSection = markdownText.split('Related Profiles')[1] || '';
  const profiles = new Map<string, PdbRelatedProfile>();
  const relatedRegex = /\[!\[Image\s+\d+:\s+([^\]]+)\]\([^)]+\)\s*([^\]]+?)\]\(https?:\/\/www\.personality-database\.com\/profile\/(\d+)[^)]*\)/g;

  let match: RegExpExecArray | null;
  while ((match = relatedRegex.exec(relatedSection)) !== null) {
    const [, altText, labelText, id] = match;
    const sourceUrl = `https://www.personality-database.com/profile/${id}`;
    const altParts = altText.split(':').map(part => normalizeWhitespace(part)).filter(Boolean);
    const label = normalizeWhitespace(labelText);
    const anime = altParts.length > 1 ? altParts[0] : undefined;
    const name = altParts.length > 1 ? altParts.slice(1).join(': ') : label.replace(/\s+/g, ' ');

    profiles.set(id, {
      pdbProfileId: id,
      name: name || label,
      anime,
      sourceUrl
    });
  }

  return Array.from(profiles.values());
}

function parsePdbMarkdown(profileId: string, sourceUrl: string, markdownText: string): PdbScrapedData {
  const nameMatch = markdownText.match(/^#\s+(.+?)\s+Personality\s*$/m);
  const name = normalizeWhitespace(nameMatch?.[1] || `PDB ${profileId}`);

  const mbtiMatch = markdownText.match(/\bis\s+an?\s+([A-Z]{4})\b/i)
    || markdownText.match(/Most people think\s+.+?\s+is\s+\*\*([A-Z]{4})\*\*/i)
    || markdownText.match(/Four Letter\s+\d+\s+Votes\s+[\s\S]{0,80}\b([A-Z]{4})\(\d+\)/i);
  const mbti = parseMbti(mbtiMatch?.[1]);
  if (!mbti) {
    throw new Error('PDB 页面中没有可验证的 MBTI 类型。');
  }

  const animeLinkMatch = markdownText.match(/\n\[([^\]]+)\]\(https?:\/\/www\.personality-database\.com\/profile\?pid=2[^)]*\)/)
    || markdownText.match(/🎬 Works[\s\S]*?\]\([^)]+\)\s*([^\]\n]+)\]/);
  const anime = normalizeWhitespace(animeLinkMatch?.[1] || '未知作品');

  const voteCountMatch = markdownText.match(/Four Letter\s+(\d+)\s+Votes/i)
    || markdownText.match(/(\d+)\s+Votes\s+Vote\s*\/\s*Comment/i);
  const votesCount = voteCountMatch ? Number(voteCountMatch[1]) : 0;

  const summaryMatch = markdownText.match(new RegExp(`##\\s+${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+MBTI\\s+([\\s\\S]*?)(?:Added by|Report Last Update|Four Letter|🎬 Works)`, 'i'));
  const rawSummary = summaryMatch?.[1] || '';
  const summary = rawSummary
    ? normalizeWhitespace(rawSummary.replace(/\[[^\]]+\]\([^)]+\)/g, ''))
    : undefined;

  const updatedAtMatch = markdownText.match(/Report Last Update:\s*([0-9-]+)/i);
  const enneagramMatch = markdownText.match(/\bEnneagram\s+([0-9]w[0-9])\b/i);
  const socionicsMatch = markdownText.match(/\bSocionics\s+([A-Z]{3})\b/i);
  const bigFiveMatch = markdownText.match(/\bBig\s*5\s+([A-Z]{5})\b/i);
  const functions = Array.from(markdownText.matchAll(/\b(Dom|Aux|Tert|Inf)\s+([A-Z][a-z])\b/g)).map(match => `${match[1]} ${match[2]}`);

  return {
    pdbProfileId: profileId,
    nameCn: name,
    anime,
    mbti,
    enneagram: enneagramMatch?.[1],
    votesCount,
    voteBreakdown: parseVoteBreakdown(markdownText),
    cognitiveFunctions: functions,
    socionics: socionicsMatch?.[1],
    bigFive: bigFiveMatch?.[1],
    summary,
    relatedProfiles: parseRelatedProfiles(markdownText),
    sourceUrl,
    retrievedVia: 'jina_reader',
    updatedAt: updatedAtMatch?.[1] ? new Date(updatedAtMatch[1]).toISOString() : new Date().toISOString()
  };
}

export interface PdbScrapeOptions {
  forceRefresh?: boolean;
  delayMs?: number;
}

export async function scrapeCharacterWithJina(profileId: string, forceRefresh = false): Promise<PdbScrapedData | null> {
  const cached = readPdbCache().find(c => c.pdbProfileId === profileId);
  if (cached && !forceRefresh) {
    console.log(`[PDB Importer] Using cached record for profile ${profileId}`);
    return cached;
  }

  const sourceUrl = `https://www.personality-database.com/profile/${profileId}`;
  const jinaUrl = `https://r.jina.ai/http://https://www.personality-database.com/profile/${profileId}`;

  console.log(`[PDB Importer] Fetching profile via Jina Reader: ${jinaUrl}`);

  try {
    const res = await fetch(jinaUrl, {
      headers: {
        'Accept': 'text/plain',
        'User-Agent': 'Anime-MBTI-PDB-Importer/1.0'
      }
    });

    if (!res.ok) {
      throw new Error(`Jina Reader HTTP error: ${res.status}`);
    }

    const markdownText = await res.text();
    if (!markdownText || markdownText.length < 100) {
      throw new Error('Retrieved content is too short or empty.');
    }

    const parsedData = parsePdbMarkdown(profileId, sourceUrl, markdownText);
    writePdbCache([parsedData]);
    console.log(`[PDB Importer] Imported verified PDB fields for ${parsedData.nameCn} (${parsedData.mbti})`);
    return parsedData;
  } catch (error) {
    console.error(`[PDB Importer] Error parsing profile ${profileId} via Jina:`, error);
    return null;
  }
}

export async function scrapeMultipleProfiles(profileIds: string[], options: PdbScrapeOptions = {}): Promise<PdbScrapedData[]> {
  const results: PdbScrapedData[] = [];
  const uniqueIds = Array.from(new Set(profileIds.map(id => String(id).trim()).filter(Boolean)));
  const delayMs = options.delayMs ?? 3000;

  for (let i = 0; i < uniqueIds.length; i++) {
    const id = uniqueIds[i];
    const data = await scrapeCharacterWithJina(id, Boolean(options.forceRefresh));
    if (data) results.push(data);

    if (i < uniqueIds.length - 1 && delayMs > 0) {
      console.log(`[PDB Importer] Sleeping for ${(delayMs / 1000).toFixed(1)}s to respect PDB/Jina rate limits...`);
      await delay(delayMs);
    }
  }

  return results;
}
