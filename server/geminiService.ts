import { GoogleGenAI, Type } from "@google/genai";
import { MBTIType, Character, Relationship } from "../src/types";

// Server-side initialization of Gemini client
const apiKey = process.env.GEMINI_API_KEY;

export const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * Custom Deep Personalization for a specific character on demand using Gemini API
 */
export async function personalizeCharacterGemini(
  char: { name: string, anime: string, mbti: string, fullName: string },
  englishName: string
): Promise<{
  quote: string;
  summary: string;
  plotProof: string;
  fandomDiscussion: string;
  strengths: string[];
  weaknesses: string[];
}> {
  if (!apiKey) {
    throw new Error('检测到服务器未配置 GEMINI_API_KEY。请在 Settings > Secrets 填入密钥后重试。');
  }

  const nameOnly = char.name.split(' / ')[0].trim();
  const animeName = char.anime;
  const mbti = char.mbti;

  const systemPrompt = `You are an elite ACG (Anime, Comic, Games) analyst and professional MBTI psychologist.
Analyze the anime character named "${nameOnly}" (English name: "${englishName}") from the anime series "${animeName}" who is classified as MBTI type "${mbti}".

Your task is to write a highly detailed, personalized, 360-degree personality analysis tailored to this character.
CRITICAL DESIGN PRINCIPLES (NO BOILERPLATES/TEMPLATES):
- High-Fidelity Deep Customization: Never use empty placeholders, generic templates, or homogenous descriptions (e.g., "这是一个典型的XX型角色", "在面临重要挑战时...", "表现出强烈的内倾情感和理智判断").
- Meticulously analyze the character's unique story nodes, abilities, and trauma, tying them dynamically to cognitive functions (Ni, Ne, Fi, Fe, Ti, Te, Si, Se).
- "quote" MUST be a genuine, highly iconic quote actually said by the character in Chinese.
- "summary" MUST be a 150-word deep psychological analysis in Chinese of their MBTI personality as shown during specific plot events in their story.
- "plotProof" MUST cite concrete situations, chapters, episodes, or interactions in Chinese (e.g., specific battles, critical choices, or mental breakdowns) that prove their specific functional stack (e.g., Ni-Te, Fe-Si, etc.).
- "fandomDiscussion" MUST cite actual fan agreements, standard memes, consensus, and debates other communities or forums have (like PDB, Bilibili) in Chinese about their traits.
- "strengths" MUST be an array of exactly 3 highly specific, plot-relevant cognitive or tactical strengths/streaks in Chinese.
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
  if (!text) {
    throw new Error('Gemini did not return any analyzed content.');
  }

  return JSON.parse(text);
}

/**
 * Server-side AI generator: pulls whole anime rosters dynamically using Gemini
 */
export async function importAnimeViaGeminiAPI(animeName: string): Promise<{
  characters: any[];
  relationships: any[];
}> {
  if (!apiKey) {
    throw new Error('检测到服务器未配置 GEMINI_API_KEY。请在 Settings > Secrets 填入密钥后重试。');
  }

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
      "fromIndex": 0,
      "toIndex": 1,
      "relationType": "friend",
      "relationLabel": "A Chinese tag like 宿敌, 挚友, 一生羁绊",
      "compatibilityScore": 95,
      "description": "A 150-word highly detailed Chinese paragraph analyzing the chemistry and storyline interaction between these two cognitive profiles in the canon"
    }
  ]
}`;

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
  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  const payload = JSON.parse(text);
  return payload;
}
