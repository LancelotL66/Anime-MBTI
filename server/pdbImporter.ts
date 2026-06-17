import fs from 'fs';
import path from 'path';
import { ai } from './geminiService';
import { Type } from '@google/genai';
import { MBTIType } from '../src/types';
import { CharacterBase, CharacterTyping, CharacterProfile } from './db';

const CACHE_FILE = path.join(process.cwd(), 'data', 'pdb', 'characters.jsonl');

// Helper to ensure cache directory exists
function ensureCacheDir() {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Ensure the directory exists
ensureCacheDir();

// Implement delay helper
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface PdbScrapedData {
  pdbProfileId: string;
  nameCn: string;
  nameEn?: string;
  anime: string;
  mbti: MBTIType;
  enneagram?: string;
  votesCount: number;
  voteBreakdown?: {
    E: number;
    N: number;
    T: number;
    P: number;
  };
  socionics?: string;
  bigFive?: string;
  summary?: string;
  quote?: string;
  sourceUrl: string;
  updatedAt: string;
}

/**
 * Read local PDB JSONL cache
 */
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
        } catch(e) {
          return null;
        }
      })
      .filter((item): item is PdbScrapedData => item !== null);
  } catch (e) {
    console.error('Error reading PDB cache', e);
    return [];
  }
}

/**
 * Save / append a single page or roster to the local jsonl cache
 */
export function writePdbCache(items: PdbScrapedData[]) {
  ensureCacheDir();
  
  // Load existing items first to avoid exact duplicates
  const existing = readPdbCache();
  const existingMap = new Map(existing.map(e => [e.pdbProfileId, e]));
  
  items.forEach(item => {
    existingMap.set(item.pdbProfileId, item);
  });

  const lines = Array.from(existingMap.values())
    .map(item => JSON.stringify(item))
    .join('\n') + '\n';
    
  fs.writeFileSync(CACHE_FILE, lines, 'utf8');
}

/**
 * Fetch a profile page from Personality Database via Jina Reader, parse with Gemini
 */
export async function scrapeCharacterWithJina(profileId: string): Promise<PdbScrapedData | null> {
  // Check cache first to avoid redundant Jina requests
  const cached = readPdbCache().find(c => c.pdbProfileId === profileId);
  if (cached) {
    console.log(`[PDB Importer] Using cached record for profile ${profileId}`);
    return cached;
  }

  const sourceUrl = `https://www.personality-database.com/profile/${profileId}`;
  const jinaUrl = `https://r.jina.ai/${sourceUrl}`;
  
  console.log(`[PDB Importer] Fetching profile via Jina Reader: ${jinaUrl}`);
  
  try {
    const res = await fetch(jinaUrl, {
      headers: {
        'Accept': 'text/plain',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!res.ok) {
      throw new Error(`Jina Reader HTTP error: ${res.status}`);
    }

    const markdownText = await res.text();
    if (!markdownText || markdownText.length < 100) {
      throw new Error('Retrieved content is too short or empty.');
    }

    // Call Gemini to parse and extract structured character datums from the Markdown
    console.log(`[PDB Importer] Parsing profile ${profileId} markdown using Gemini...`);
    const systemInstruction = `You are a professional MBTI/PDB data parser. Extract structured entity information from the Personality Database markdown page.
Locate the character name (Chinese preferred, fallback English), their anime or series name, their primary MBTI type (e.g., INFP, ENTJ, etc.), their Enneagram (e.g., 4w5, 8w9), their total vote counts, and four-letter voting percentages if present. Also seek Socionics (e.g., IEI, LII), Big 5 (e.g., RLOEI) if available.
If some values aren't explicit, provide reasonable guesses or defaults.

Return a strict JSON object that conforms EXACTLY to this schema:
{
  "nameCn": "Chinese name",
  "nameEn": "English name (optional)",
  "anime": "Anime series name",
  "mbti": "INTJ/INTP/ENTJ/ENTP/INFJ/INFP/ENFJ/ENFP/ISTJ/ISFJ/ESTJ/ESFJ/ISTP/ISFP/ESTP/ESFP",
  "enneagram": "string (optional, e.g. 5w4 or 8w9)",
  "votesCount": 120,
  "voteBreakdown": {
    "E": 45,
    "N": 80,
    "T": 85,
    "P": 30
  },
  "socionics": "string (optional, e.g. LII)",
  "bigFive": "string (optional, e.g. RCUEN)",
  "summary": "Short 50-word overview of their cognitive nature based on the page text",
  "quote": "A memorable quote from the page if any"
}`;

    const geminiRes = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: markdownText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nameCn: { type: Type.STRING },
            nameEn: { type: Type.STRING },
            anime: { type: Type.STRING },
            mbti: { type: Type.STRING },
            enneagram: { type: Type.STRING },
            votesCount: { type: Type.INTEGER },
            voteBreakdown: {
              type: Type.OBJECT,
              properties: {
                E: { type: Type.INTEGER },
                N: { type: Type.INTEGER },
                T: { type: Type.INTEGER },
                P: { type: Type.INTEGER }
              }
            },
            socionics: { type: Type.STRING },
            bigFive: { type: Type.STRING },
            summary: { type: Type.STRING },
            quote: { type: Type.STRING }
          },
          required: ['nameCn', 'anime', 'mbti', 'votesCount']
        }
      }
    });

    const text = geminiRes.text;
    if (!text) throw new Error('Gemini failed to output structured parsing');
    
    const parsedObj = JSON.parse(text);
    
    const parsedData: PdbScrapedData = {
      pdbProfileId: profileId,
      nameCn: parsedObj.nameCn || '未知角色',
      nameEn: parsedObj.nameEn,
      anime: parsedObj.anime || '未知番剧',
      mbti: (parsedObj.mbti || 'INFP') as MBTIType,
      enneagram: parsedObj.enneagram,
      votesCount: parsedObj.votesCount || 10,
      voteBreakdown: parsedObj.voteBreakdown || { E: 50, N: 50, T: 50, P: 50 },
      socionics: parsedObj.socionics,
      bigFive: parsedObj.bigFive,
      summary: parsedObj.summary,
      quote: parsedObj.quote,
      sourceUrl,
      updatedAt: new Date().toISOString()
    };

    // Save to local cache
    writePdbCache([parsedData]);
    console.log(`[PDB Importer] Successfully imported and cached: ${parsedData.nameCn} from ${parsedData.anime}`);
    return parsedData;

  } catch (error) {
    console.error(`[PDB Importer] Error parsing profile ${profileId} via Jina:`, error);
    return null;
  }
}

/**
 * Scrape multiple profiles with low frequency (3-10 sec delay)
 */
export async function scrapeMultipleProfiles(profileIds: string[]): Promise<PdbScrapedData[]> {
  const results: PdbScrapedData[] = [];
  
  for (let i = 0; i < profileIds.length; i++) {
    const id = profileIds[i];
    
    // Check local cache first before requesting
    const cached = readPdbCache().find(c => c.pdbProfileId === id);
    if (cached) {
      results.push(cached);
      continue;
    }

    const data = await scrapeCharacterWithJina(id);
    if (data) results.push(data);
    
    // 3 to 10 seconds random delay between hits if there are more items to come
    if (i < profileIds.length - 1) {
      const waitTime = Math.floor(Math.random() * 7000) + 3000; // 3000ms - 10000ms
      console.log(`[PDB Importer] Sleeping for ${(waitTime / 1000).toFixed(1)}s to respect server rate-limits...`);
      await delay(waitTime);
    }
  }
  
  return results;
}
