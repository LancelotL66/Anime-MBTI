import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MBTI_INFOS } from './data/characters';
import { Character, Relationship, MBTIType } from './types';
import { AnimeAvatar } from './components/AnimeAvatar';
import { CharacterDetail } from './components/CharacterDetail';
import { MBTITest } from './components/MBTITest';
import { DatabaseCenter } from './components/DatabaseCenter';
import { 
  Search, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  Filter, 
  Smile, 
  Trash2, 
  HelpCircle,
  TrendingUp,
  Database,
  Activity,
  Award
} from 'lucide-react';

interface DbStats {
  totalCharacters: number;
  totalAnimes: number;
  totalRelationships: number;
  mbtiDistribution: Record<string, number>;
  isLargeDb: boolean;
  totalImports: number;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'favorites' | 'database'>('explore');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mbtiFilter, setMbtiFilter] = useState<string>('all');

  // Backend integration states
  const [characters, setCharacters] = useState<Character[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [dbStats, setDbStats] = useState<DbStats | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  // Load backend data of characters, relationships and stats
  const fetchBackendData = async () => {
    try {
      const [charRes, relRes, statsRes] = await Promise.all([
        fetch('/api/characters').then(r => r.json()),
        fetch('/api/relationships').then(r => r.json()),
        fetch('/api/database/stats').then(r => r.json())
      ]);

      if (charRes.success) setCharacters(charRes.characters || []);
      if (relRes.success) setRelationships(relRes.relationships || []);
      if (statsRes.success) setDbStats(statsRes.stats || null);
    } catch (e: any) {
      console.error('Failed to load data from backend server', e);
      setApiError('与二次元性格云端服务器连接失败，请确认后端进程正常。正在启用本地离线高速缓存模组。');
    }
  };

  // Mount logic
  useEffect(() => {
    // Load favorites
    try {
      const stored = localStorage.getItem('anime_mbti_favs');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }

    // Load initial server-side DB entries
    fetchBackendData();
  }, []);

  // Save favorites to storage
  const toggleFavorite = (charId: string) => {
    const next = favorites.includes(charId)
      ? favorites.filter((id) => id !== charId)
      : [...favorites, charId];
    setFavorites(next);
    try {
      localStorage.setItem('anime_mbti_favs', JSON.stringify(next));
    } catch (e) {
      console.error('Failed to store favorites', e);
    }
  };

  // Handle DB Scaling to 1000+ characters
  const handleScaleDatabase = async () => {
    setLoading(true);
    setLoadingMessage('正在调拨服务器缓存、整合 40+ 热门动漫作品及 1000+ 人物关系互对冲谱系谱线...');
    setApiError(null);
    setApiSuccess(null);

    try {
      const res = await fetch('/api/database/scale-to-thousand', {
        method: 'POST'
      }).then(r => r.json());

      if (res.success) {
        setApiSuccess(res.message || '1000+ 热门动漫人物性格关系网注入成功！');
        await fetchBackendData();
      } else {
        throw new Error(res.error || 'Server error during scaling process.');
      }
    } catch (e: any) {
      setApiError(`一键注能失败: ${e.message || '网络连接瞬时超时'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Anime Importer using Gemini
  const handleImportAnime = async (animeName: string) => {
    setLoading(true);
    setLoadingMessage(`正在召集 Gemini 剖析二次元互联网关于《${animeName}》的 MBTI 论战和角色灵魂连线...`);
    setApiError(null);
    setApiSuccess(null);

    try {
      const res = await fetch('/api/database/import-anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animeName })
      }).then(r => r.json());

      if (res.success) {
        setApiSuccess(res.message);
        await fetchBackendData();
      } else {
        throw new Error(res.error || 'Generative process failed.');
      }
    } catch (e: any) {
      setApiError(`导入失败: ${e.message || '应答解码出错'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle PDB Live Importer using Jina Reader API
  const handleImportPdbIds = async (profileIds: string[]) => {
    setLoading(true);
    setLoadingMessage(`正在通过 Jina Reader 向 PDB 验证并索取 [ID: ${profileIds.join(', ')}] 的四维度投票比、Enneagram 与宿命关系谱...`);
    setApiError(null);
    setApiSuccess(null);

    try {
      const res = await fetch('/api/database/import-pdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileIds })
      }).then(r => r.json());

      if (res.success) {
        setApiSuccess(res.message);
        await fetchBackendData();
      } else {
        throw new Error(res.error || 'PDB Jina Scraper request failed.');
      }
    } catch (e: any) {
      setApiError(`PDB 导入出错: ${e.message || '网络瞬时失稳，请稍候重试'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Character Personalization on-the-fly dynamically
  const handlePersonalizeCharacter = async (charId: string) => {
    // We handle the loading state inside or globally, let's use the local visual state inside CharacterDetail for premium overlay feel, and keep App's error/success states aligned!
    try {
      const res = await fetch(`/api/characters/${charId}/personalize`, {
        method: 'POST'
      }).then(r => r.json());

      if (res.success && res.character) {
        setCharacters(prev => prev.map(c => c.id === charId ? res.character : c));
        setApiSuccess(`成功定制！已为【${res.character.name.split(' / ')[0]}】刻录注入并展示专属剧情比论与官方名句！`);
        setTimeout(() => setApiSuccess(null), 6000);
      } else {
        throw new Error(res.error || '定制化分析失败，可能发生了网络应答超时，请确认配置后再次尝试录入。');
      }
    } catch (e: any) {
      console.error('Failed to personalize character', e);
      throw e; // throw error so the inner handler in CharacterDetail can display the specific error status message locally!
    }
  };

  // Pre-configured tags click action
  const handleTagClick = (tag: string) => {
    // Check if tag matches any active character name
    const matchingChar = characters.find(
      (c) => c.name.toLowerCase().includes(tag.toLowerCase())
    );
    if (matchingChar) {
      setSelectedCharacterId(matchingChar.id);
      return;
    }

    // Check if it's an MBTI filter
    const isMBTI = Object.keys(MBTI_INFOS).includes(tag.toUpperCase());
    if (isMBTI) {
      setSearchQuery(tag.toUpperCase());
      setMbtiFilter('all'); // Clear dropdown
      return;
    }

    // Otherwise standard search fill
    setSearchQuery(tag);
  };

  const handleSelectCharacter = (charId: string) => {
    setSelectedCharacterId(charId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setMbtiFilter('all');
  };

  // Responsive filtering
  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      // 1. MBTI Dropdown Filter
      if (mbtiFilter !== 'all' && char.mbti !== mbtiFilter) {
        return false;
      }

      // 2. Search query fuzzy match
      if (!searchQuery.trim()) return true;
      const term = searchQuery.toLowerCase().trim();

      const nameMatch = char.name.toLowerCase().includes(term);
      const animeMatch = char.anime.toLowerCase().includes(term);
      const mbtiMatch = char.mbti.toLowerCase().includes(term);
      const summaryMatch = char.summary?.toLowerCase().includes(term) || false;

      return nameMatch || animeMatch || mbtiMatch || summaryMatch;
    });
  }, [characters, searchQuery, mbtiFilter]);

  // Favorite characters list
  const favoriteCharacters = useMemo(() => {
    return characters.filter((c) => favorites.includes(c.id));
  }, [characters, favorites]);

  const selectedCharacter = useMemo(() => {
    return characters.find((c) => c.id === selectedCharacterId) || null;
  }, [characters, selectedCharacterId]);

  // Unique list of MBTI types present in the loaded database
  const mbtiCategories = useMemo(() => {
    const types = characters.map((c) => c.mbti);
    return Array.from(new Set(types)).sort();
  }, [characters]);

  return (
    <div className="min-h-screen bg-[#F1F2F6] text-[#2D3436] pb-16 font-sans relative">
      {/* Pop/Halftone visual grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#dcdde1_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      {/* Hero Banner Header with Vibrant theme */}
      <header className="relative z-10 bg-[#FFEAA7] border-b-4 border-[#2D3436] p-6 md:p-8 shadow-[0_6px_0_0_#2D3436]">
        <div className="max-w-6xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center xl:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#2D3436] text-[#FFEAA7] border-2 border-[#2D3436] px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full shadow-[3px_3px_0px_0px_#FF7675]">
              <Sparkles size={14} className="animate-bounce text-yellow-300" /> CLOUD POWERED ANIME PSYCHOLOGY 大厅
            </div>
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#2D3436] drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]">
              动漫专属 MBTI 性格大厅
            </h1>
            <p className="text-sm font-sans font-bold text-gray-800 max-w-xl">
              深度考证热门动漫主角在剧情中的言行轨迹，融合粉丝社区深度研讨，通过<strong>云底数据库扩展与 AI 瞬时生成</strong>搭建完美的宿命羁绊！
            </p>
          </div>

          {/* Quick tab switcher block - Neo-brutalist buttons */}
          <div className="flex flex-wrap gap-2.5 bg-white border-3 border-[#2D3436] p-2.5 rounded-2xl shadow-[6px_6px_0px_0px_#2D3436] shrink-0">
            <button
              onClick={() => {
                setActiveTab('explore');
                setSelectedCharacterId(null);
                setApiSuccess(null);
              }}
              className={`px-3.5 py-2 font-black text-xs sm:text-sm rounded-xl border-2 transition-all cursor-pointer ${
                activeTab === 'explore' && !selectedCharacterId
                  ? 'bg-[#2D3436] text-white border-[#2D3436] shadow-none'
                  : 'bg-white border-[#2D3436] text-gray-700 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0px_0px_#2D3436]'
              }`}
            >
              🔮 角色大厅
            </button>

            <button
              onClick={() => {
                setActiveTab('quiz');
                setSelectedCharacterId(null);
                setApiSuccess(null);
              }}
              className={`px-3.5 py-2 font-black text-xs sm:text-sm rounded-xl border-2 transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#6C5CE7] text-white border-[#2D3436] shadow-none'
                  : 'bg-white border-[#2D3436] text-gray-700 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0px_0px_#2D3436]'
              }`}
            >
              📝 契合测试
            </button>

            <button
              onClick={() => {
                setActiveTab('favorites');
                setSelectedCharacterId(null);
                setApiSuccess(null);
              }}
              className={`px-3.5 py-2 font-black text-xs sm:text-sm rounded-xl border-2 transition-all cursor-pointer relative ${
                activeTab === 'favorites' && !selectedCharacterId
                  ? 'bg-[#FF7675] text-[#2D3436] border-[#2D3436] shadow-none'
                  : 'bg-white border-[#2D3436] text-gray-700 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0px_0px_#2D3436]'
              }`}
            >
              💖 个人收藏夹
              {favorites.length > 0 && (
                <span className="absolute -top-2.5 -right-2 bg-[#FF7675] text-white border-2 border-[#2D3436] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('database');
                setSelectedCharacterId(null);
                setApiSuccess(null);
              }}
              className={`px-3.5 py-2 font-black text-xs sm:text-sm rounded-xl border-2 transition-all cursor-pointer inline-flex items-center gap-1 ${
                activeTab === 'database'
                  ? 'bg-amber-400 text-[#2D3436] border-[#2D3436] shadow-none'
                  : 'bg-white border-[#2D3436] text-gray-700 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0px_0px_#2D3436]'
              }`}
            >
              <Database size={13} />
              🗄️ AI 云数据库
              {dbStats && dbStats.totalCharacters >= 1000 && (
                <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse border border-black/10">1000+</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">

        {/* Dynamic Alerts Banner */}
        {apiError && (
          <div className="mb-6 bg-rose-50 border-3 border-[#2D3436] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#222] text-xs font-bold text-rose-800">
            🚨 {apiError}
          </div>
        )}

        {apiSuccess && activeTab !== 'database' && (
          <div className="mb-6 bg-emerald-50 border-3 border-[#2D3436] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#222] text-xs font-bold text-emerald-800">
            🎉 {apiSuccess}
          </div>
        )}
        
        {/* Render selected character detail overlay if active */}
        {selectedCharacterId && selectedCharacter ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <CharacterDetail
              character={selectedCharacter}
              characters={characters}
              relationships={relationships}
              onBack={() => setSelectedCharacterId(null)}
              onSelectCharacter={handleSelectCharacter}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onPersonalize={handlePersonalizeCharacter}
            />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Character List & Filters */}
            {activeTab === 'explore' && (
              <motion.div
                key="explore-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Homepage expansion reminder banner */}
                <div className="bg-[#FFEAA7] border-4 border-[#2D3436] rounded-[24px] p-5 shadow-[6px_6px_0px_0px_#2D3436] flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="text-4xl shrink-0">🚀</span>
                    <div>
                      <h4 className="font-extrabold text-[#2D3436] text-sm md:text-base">觉得千级角色库还不够看？您拥有自由追加扩容的特权！</h4>
                      <p className="text-xs text-gray-800 font-bold leading-relaxed mt-1">
                        系统已经默认搭载并初始分配了 <strong>1,000+</strong> 精选动漫名角。若想查找更多未收录人物，欢迎点按上方导航的 <strong>🗄️ AI 云数据库</strong> 页面输入任何二次元番剧名，一键即可实时析出并自动追加全套新角色。
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('database')}
                    className="shrink-0 bg-white hover:bg-slate-50 text-[#2D3436] border-2 border-[#2D3436] px-4.5 py-2.5 rounded-xl text-xs font-black shadow-[3px_3px_0px_0px_#2D3436] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>去云数据库自定义扩容</span>
                    <span className="text-xs font-bold">➜</span>
                  </button>
                </div>

                {/* Search Panel Section - Interactive & Compact */}
                <div className="bg-white border-4 border-[#2D3436] rounded-[32px] p-6 shadow-[8px_8px_0px_0px_#2D3436] space-y-4">
                  
                  {/* Search input and filters layout */}
                  <div className="flex flex-col md:flex-row gap-4 items-stretch">
                    
                    {/* Compact Input */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black">
                        <Search size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="模糊检索角色名 / 动漫名 (如：火影, 索隆, 崩坏, 芙宁娜, INTJ...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#FAFAFA] text-gray-900 border-3 border-[#2D3436] rounded-2xl py-3.5 pl-12 pr-4 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-[#FFEAA7] placeholder:text-gray-400"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-4 inset-y-0 flex items-center font-bold text-gray-400 hover:text-black text-xs"
                        >
                          清除
                        </button>
                      )}
                    </div>

                    {/* MBTI categories dropdown filter */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-sans font-black text-sm hidden sm:inline-block text-[#2D3436]">
                        <Filter size={16} className="inline mr-1" /> 性格筛选:
                      </span>
                      <select
                        value={mbtiFilter}
                        onChange={(e) => setMbtiFilter(e.target.value)}
                        className="bg-white text-gray-900 border-3 border-[#2D3436] py-3.5 px-4 rounded-2xl font-bold text-sm focus:outline-none cursor-pointer"
                      >
                        <option value="all">🌐 全部 MBTI 类型</option>
                        {mbtiCategories.map((type) => (
                          <option key={type} value={type}>
                            {type} - {MBTI_INFOS[type as MBTIType]?.title.split(' (')[0] || ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Button */}
                    {(searchQuery || mbtiFilter !== 'all') && (
                      <button
                        onClick={clearFilters}
                        className="bg-[#FF7675] hover:bg-red-400 border-3 border-[#2D3436] px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shrink-0 text-white"
                      >
                        <RotateCcw size={16} /> 重置
                      </button>
                    )}
                  </div>

                  {/* Popular tags selection underneath */}
                  <div className="flex flex-wrap gap-2 items-center text-xs">
                    <span className="font-black text-gray-500 font-sans tracking-wide uppercase flex items-center gap-1 mr-1">
                      <TrendingUp size={12} className="text-red-500 animate-pulse" /> 热门检索标签:
                    </span>
                    
                    {['火影', '索隆', '景元', '芙宁娜', '柯南', 'INTJ', 'ENFP', '罗宾', '喜多郁代'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="bg-slate-50 hover:bg-[#FFEAA7] border-2 border-[#2D3436] px-3 py-1 rounded-xl font-bold text-[11px] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#2D3436]"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Listing Title */}
                <div className="flex justify-between items-center px-1 flex-wrap gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950 font-sans flex items-center gap-2">
                    <Smile className="text-yellow-400 fill-black" /> 
                    动漫角色性格大厅 ({filteredCharacters.length} / {characters.length} 张可用)
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>云端数据库已就绪</span>
                  </div>
                </div>

                {/* Character Cards list */}
                {filteredCharacters.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCharacters.map((char) => {
                      const details = MBTI_INFOS[char.mbti];
                      const isFavorite = favorites.includes(char.id);

                      // Calculate relationships count
                      const relationsCount = relationships.filter(
                        r => r.fromId === char.id || r.toId === char.id
                      ).length;

                      return (
                        <div
                          key={char.id}
                          className="bg-white border-4 border-[#2D3436] rounded-[32px] p-5 shadow-[6px_6px_0px_0px_#2D3436] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#2D3436] transition-all flex flex-col justify-between relative group"
                        >
                          {/* Favorite button toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(char.id);
                            }}
                            className="absolute top-4 right-4 z-10 w-9 h-9 border-2 border-[#2D3436] rounded-full bg-white hover:bg-rose-50 flex items-center justify-center shadow-[2px_2px_0px_0px_#2D3436] active:scale-95 transition-all text-gray-600 hover:text-rose-500 cursor-pointer"
                          >
                            <Heart
                              size={18}
                              className={isFavorite ? 'fill-rose-500 text-rose-500 stroke-rose-600' : 'stroke-black'}
                            />
                          </button>

                          <div
                            onClick={() => setSelectedCharacterId(char.id)}
                            className="cursor-pointer space-y-4"
                          >
                            <div className="flex items-center gap-4">
                              <AnimeAvatar
                                emoji={char.avatarEmoji}
                                gradient={char.avatarColor}
                                name={char.name}
                                size="md"
                              />

                              <div className="space-y-1 pr-6">
                                <h4 className="font-extrabold text-[#2D3436] text-base sm:text-lg group-hover:text-violet-600 transition-colors line-clamp-1">
                                  {char.name.split(' / ')[0]}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-mono font-bold line-clamp-1">
                                  {char.name.split(' / ')[1] || ''}
                                </p>
                                <span className="inline-flex bg-violet-50 text-violet-700 border border-violet-200 text-[10px] px-2 py-0.5 rounded-md font-extrabold">
                                  🎬 《{char.anime}》
                                </span>
                              </div>
                            </div>

                            {/* MBTI Description highlights */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-[#2D3436] text-white text-[11px] sm:text-xs font-sans font-black tracking-wider px-2.5 py-0.5 rounded-lg border-2 border-[#2D3436] shadow-[2px_2px_0px_0px_#FFEAA7]">
                                  {char.mbti}
                                </span>
                                <span className="text-[11px] font-black text-amber-500 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                                  {details?.title || '分析学者'}
                                </span>
                              </div>

                              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-sans">
                                {char.summary}
                              </p>
                            </div>

                            {/* Compact traits visual summary */}
                            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-gray-100 text-[10px] font-sans text-gray-400">
                              <div className="flex justify-between font-bold bg-slate-50 p-1 rounded-md border border-[#2D3436]/10">
                                <span>心智: {char.dimensions.E >= 50 ? 'E 外向' : 'I 内向'}</span>
                                <span className="font-mono text-black">{char.dimensions.E >= 50 ? char.dimensions.E : 100 - char.dimensions.E}%</span>
                              </div>
                              <div className="flex justify-between font-bold bg-slate-50 p-1 rounded-md border border-[#2D3436]/10">
                                <span>认知: {char.dimensions.N >= 50 ? 'N 直觉' : 'S 实感'}</span>
                                <span className="font-mono text-black">{char.dimensions.N >= 50 ? char.dimensions.N : 100 - char.dimensions.N}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer links with relations stats */}
                          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-mono font-bold flex items-center gap-1">
                              <Activity size={10} className="text-[#FF7675]" /> 包含 {relationsCount} 组关系纽带
                            </span>
                            <button
                              onClick={() => setSelectedCharacterId(char.id)}
                              className="text-xs font-black text-black hover:underline cursor-pointer flex items-center"
                            >
                              性格解剖详情 →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white border-4 border-[#2D3436] p-12 rounded-3xl text-center space-y-4 shadow-[6px_6px_0px_0px_#2D3436]">
                    <div className="text-5xl">🕵️‍♂️</div>
                    <h4 className="text-lg font-black text-gray-900">未检索到任何符合条件的动漫角色</h4>
                    <p className="text-xs text-gray-400 max-w-md mx-auto">
                      您可以尝试更加简短的模糊词检索，返回大数据库中心一键激活千级数据库，或者调动服务器 Gemini 导入相应动漫。
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-[#FFEAA7] hover:bg-[#FFEAA7]/80 text-black border-2 border-[#2D3436] px-4 py-2 rounded-xl font-bold text-xs shadow-[2px_2px_0px_0px_#2D3436] cursor-pointer"
                    >
                      返回展示全部列表
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 2: Personality Quiz */}
            {activeTab === 'quiz' && (
              <motion.div
                key="quiz-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MBTITest
                  characters={characters}
                  onBack={() => setActiveTab('explore')}
                  onSelectCharacter={handleSelectCharacter}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </motion.div>
            )}

            {/* Tab 3: Favorites List */}
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#FFEAA7]/10 border-4 border-[#2D3436] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#2D3436] space-y-4">
                  <div className="flex justify-between items-center border-b-2 border-[#2D3436] pb-4 flex-wrap gap-2">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-black text-[#FF7675] flex items-center gap-2">
                        <Heart className="fill-[#FF7675] text-[#2D3436]" /> 我的宿宿命运收藏夹
                      </h3>
                      <p className="text-xs text-rose-400 font-bold">
                        您喜欢的二次元角色都完美持久保存在浏览器的本地内存空间。
                      </p>
                    </div>

                    {favorites.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm('确定要清空您的所有收藏吗？')) {
                            setFavorites([]);
                            localStorage.removeItem('anime_mbti_favs');
                          }
                        }}
                        className="bg-white hover:bg-rose-50 text-red-600 border-2 border-[#2D3436] text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-[2.5px_2.5px_0px_0px_#2D3436] cursor-pointer"
                      >
                        <Trash2 size={13} /> 清空收藏
                      </button>
                    )}
                  </div>

                  {favoriteCharacters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      {favoriteCharacters.map((char) => (
                        <div
                          key={char.id}
                          className="bg-white border-3 border-[#2D3436] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#2D3436] flex items-center gap-4 hover:-translate-y-0.5 transition-all relative"
                        >
                          <AnimeAvatar
                            emoji={char.avatarEmoji}
                            gradient={char.avatarColor}
                            name={char.name}
                            size="md"
                          />
                          <div className="flex-1 space-y-1 pr-6">
                            <h4 className="font-extrabold text-base text-gray-900 truncate">
                              {char.name.split(' / ')[0]}
                            </h4>
                            <p className="text-[10px] text-[#FF7675] font-black">🎬 《{char.anime}》</p>
                            <div className="flex items-center gap-1.5 pt-1.5">
                              <button
                                onClick={() => setSelectedCharacterId(char.id)}
                                className="bg-[#FFEAA7] hover:bg-yellow-400 text-black border border-[#2D3436] text-[10px] px-2.5 py-0.5 rounded font-black shadow-[1.5px_1.5px_0px_0px_#2D3436] cursor-pointer"
                              >
                                深入查阅
                              </button>
                              <button
                                onClick={() => toggleFavorite(char.id)}
                                className="bg-slate-100 hover:bg-slate-200 text-gray-600 border border-[#2D3436] text-[10px] px-2.5 py-0.5 rounded font-bold cursor-pointer"
                              >
                                取消收藏
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white border-2 border-[#2D3436] border-dashed rounded-2xl space-y-3">
                      <div className="text-4xl text-gray-300">🧸</div>
                      <h4 className="font-black text-gray-700">收藏夹空空如也</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">
                        去角色广场浏览，点亮右上角的小红心，喜欢的搭配都会立刻记录回来哦！
                      </p>
                      <button
                        onClick={() => setActiveTab('explore')}
                        className="bg-[#FFEAA7] text-black font-black border-2 border-[#2D3436] text-xs px-4 py-2 rounded-xl shadow-[2.5px_2.5px_0px_0px_#2D3436] cursor-pointer"
                      >
                        去大厅淘金
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab 4: AI Database Sync Configuration Console */}
            {activeTab === 'database' && (
              <motion.div
                key="database-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DatabaseCenter
                  stats={dbStats}
                  onScaleDb={handleScaleDatabase}
                  onImportAnime={handleImportAnime}
                  onImportPdbIds={handleImportPdbIds}
                  loading={loading}
                  loadingMessage={loadingMessage}
                  error={apiError}
                  successMessage={apiSuccess}
                />
              </motion.div>
            )}

          </AnimatePresence>
        )}

        {/* Infographic MBTI Explainer card */}
        <section className="mt-12 bg-white border-4 border-[#2D3436] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#2D3436] space-y-4">
          <h4 className="text-lg font-black text-gray-950 font-sans border-b border-[#2D3436]/10 pb-2 flex items-center gap-2">
            <HelpCircle size={20} className="text-[#6C5CE7]" /> 动漫性格投射对照科普 (Anime Cognitive Logic)
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans leading-relaxed text-gray-600">
            <div className="space-y-1 bg-[#FAFAFA] p-3 border-2 border-[#2D3436] rounded-xl">
              <span className="font-brand text-[#FF7675] font-extrabold flex items-center gap-0.5">💡 E (外向) / I (内向)</span>
              <p>
                <strong>E 外向型</strong>：通过不断与外部世界互动、参与冒险及社交汇合来恢复精气神（如鸣人、路飞）；而 <strong>I 内向型</strong> 习惯专注自我内心洞察，通过独处获得滋养（如佐助、索隆）。
              </p>
            </div>
            
            <div className="space-y-1 bg-[#FAFAFA] p-3 border-2 border-[#2D3436] rounded-xl">
              <span className="font-brand text-[#6C5CE7] font-extrabold flex items-center gap-0.5">🔮 N (直觉) / S (实感)</span>
              <p>
                <strong>N 直觉型</strong>：超脱现实，更钟情于远期宏伟构想、未知的可能和对宿命因缘的推开探求（如夜神月、哈尔）；而 <strong>S 实感型</strong> 脚踏实地，完全扎根于当前身体感官细节和硬朗的战场对决（如炭治郎、三笠）。
              </p>
            </div>

            <div className="space-y-1 bg-[#FAFAFA] p-3 border-2 border-[#2D3436] rounded-xl">
              <span className="font-brand text-emerald-600 font-extrabold flex items-center gap-0.5">🥊 T (理性) / F (感性)</span>
              <p>
                <strong>T 理性型</strong>：以完美的因果逻辑、客观概率、政治博弈来进行冰冷决策（如蓝染、L）；作为对比的 <strong>F 感性型</strong> 遵从内心崇高道德律、深厚共情以及毫无保留的爱去拥抱世界（如千寻、炭治郎）。
              </p>
            </div>

            <div className="space-y-1 bg-[#FAFAFA] p-3 border-2 border-[#2D3436] rounded-xl">
              <span className="font-brand text-amber-600 font-extrabold flex items-center gap-0.5">⏳ J (计划) / P (即兴)</span>
              <p>
                <strong>J 规则型</strong>：偏好井井有条、计划和对确定秩序的恪守规范（如白哉、劳埃德）；相反，<strong>P 随性型</strong> 渴望彻底的松弛自由，习惯在即兴变化与乱局中爆发惊人奇点（如五条悟、路飞）。
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
