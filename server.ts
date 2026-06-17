import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { charDb } from './server/db';
import { scrapeCharacterWithJina, scrapeMultipleProfiles } from './server/pdbImporter';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Endpoints

  // 1. Get all characters
  app.get('/api/characters', (req, res) => {
    try {
      const list = charDb.getCharacters();
      res.json({ success: true, count: list.length, characters: list });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message || 'Failed to fetch characters' });
    }
  });

  // 2. Get all relationships
  app.get('/api/relationships', (req, res) => {
    try {
      const list = charDb.getRelationships();
      res.json({ success: true, count: list.length, relationships: list });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message || 'Failed to fetch relationships' });
    }
  });

  // 3. Get database stats
  app.get('/api/database/stats', (req, res) => {
    try {
      const stats = charDb.getStats();
      res.json({ success: true, stats });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message || 'Failed to fetch stats' });
    }
  });

  // 4. One-click unlock/activate 1000+ characters seed
  app.post('/api/database/scale-to-thousand', (req, res) => {
    try {
      const added = charDb.scaleToThousand();
      const stats = charDb.getStats();
      res.json({ 
        success: true, 
        message: `成功激活千数量级扩展数据库！新增录入了 ${added} 名热门角色与人际羁绊。`, 
        stats 
      });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message || 'Failed to scale database' });
    }
  });

  // 5. Dual dynamic importer using Gemini API
  app.post('/api/database/import-anime', async (req, res) => {
    const { animeName } = req.body;
    
    if (!animeName || !animeName.trim()) {
      return res.status(400).json({ success: false, error: '请输入有效的动漫名称！' });
    }

    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ 
          success: false, 
          error: '检测到服务器未配置 GEMINI_API_KEY。请在 AI Studio 主面板的选择 “Settings > Secrets” 配套填入密钥后重试。' 
        });
      }

      const result = await charDb.importAnimeViaGemini(animeName.trim());
      const stats = charDb.getStats();

      res.json({
        success: true,
        message: `成功通过 AI 导入了《${animeName}》的 6 名热门主角及深度契合匹配网！`,
        characters: result.characters,
        relationships: result.relationships,
        stats
      });
    } catch (e: any) {
      console.error(`Gemini Import Error for anime: ${animeName}`, e);
      res.status(500).json({ 
        success: false, 
        error: `AI 数据库在处理《${animeName}》时遇到瓶颈：${e.message || '网络或API应答超时'}。请确保网络流畅并重试，或者尝试一键激活内置千级性格数据库！` 
      });
    }
  });

  // 6. Deep personalization endpoint for on-demand character analysis
  app.post('/api/characters/:id/personalize', async (req, res) => {
    const { id } = req.params;
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ 
          success: false, 
          error: '检测到服务器未配置 GEMINI_API_KEY。请在 AI Studio 主面板选择 “Settings > Secrets” 配套填入密钥后重试。' 
        });
      }
      
      const updatedChar = await charDb.personalizeCharacter(id);
      res.json({ success: true, character: updatedChar });
    } catch (e: any) {
      console.error(`Personalize Error for character ID: ${id}`, e);
      res.status(500).json({ success: false, error: e.message || 'AI 个性化定制生成失败，请稍后重试' });
    }
  });

  // 7. PDB Jina Scraper endpoint
  app.post('/api/database/import-pdb', async (req, res) => {
    const { profileIds } = req.body;
    if (!profileIds || !Array.isArray(profileIds) || profileIds.length === 0) {
      return res.status(400).json({ success: false, error: '请输入有效的 PDB profile ID 数组！' });
    }

    try {
      console.log(`[Server] API requested Jina-scraping of PDB profiles:`, profileIds);
      const scrapedData = await scrapeMultipleProfiles(profileIds);
      if (scrapedData.length === 0) {
        throw new Error('未成功抓取到任何有效的 PDB 数据档案（可能是网络限流或页面不存在）。');
      }

      // Merge and save to memory database
      const imported = charDb.importPdbData(scrapedData);
      const stats = charDb.getStats();

      res.json({
        success: true,
        message: `成功通过 Jina Reader 从 PDB 导入并同步了 ${imported.length} 个高拟真动漫角色档案！`,
        characters: imported,
        stats
      });

    } catch (e: any) {
      console.error('[Server] PDB import endpoint error:', e);
      res.status(500).json({ success: false, error: e.message || '抓取或解析 PDB 数据出差错，请稍后重试。' });
    }
  });

  // Vite Integration for Assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Database Server] Anime Character MBTI Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer();
