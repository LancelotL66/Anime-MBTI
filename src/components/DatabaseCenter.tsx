import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Sparkles, 
  Activity, 
  Zap, 
  Search, 
  AlertTriangle, 
  BookOpen, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Hash,
  Share2
} from 'lucide-react';
import { Character, Relationship } from '../types';

interface DatabaseCenterProps {
  stats: {
    totalCharacters: number;
    totalAnimes: number;
    totalRelationships: number;
    mbtiDistribution: Record<string, number>;
    sourceDistribution?: Record<string, number>;
    isLargeDb: boolean;
    totalImports: number;
  } | null;
  onScaleDb: () => Promise<void>;
  onImportAnime: (animeName: string) => Promise<void>;
  onImportPdbIds?: (
    profileIds: string[],
    options?: { includeRelated?: boolean; relatedDepth?: number; forceRefresh?: boolean }
  ) => Promise<void>;
  onSyncPdb?: (options?: { forceRefresh?: boolean; limit?: number }) => Promise<void>;
  loading: boolean;
  loadingMessage: string;
  error: string | null;
  successMessage: string | null;
}

export const DatabaseCenter: React.FC<DatabaseCenterProps> = ({
  stats,
  onScaleDb,
  onImportAnime,
  onImportPdbIds,
  onSyncPdb,
  loading,
  loadingMessage,
  error,
  successMessage
}) => {
  const [customAnime, setCustomAnime] = useState('');
  const [pdbQuery, setPdbQuery] = useState('');
  const [includeRelated, setIncludeRelated] = useState(true);
  const [forcePdbRefresh, setForcePdbRefresh] = useState(false);

  // Hot preset anime collections that the user can import instantly
  const presetHotImports = [
    { name: '圣斗士星矢', icon: '🌌' },
    { name: '数码宝贝', icon: '🦖' },
    { name: '怪兽8号', icon: '👾' },
    { name: '蓝色监狱', icon: '⚽' },
    { name: 'JOJO的奇妙冒险', icon: '🌟' },
    { name: '进击的巨人', icon: '🧱' },
    { name: '命运石之门', icon: '⏳' },
    { name: '原神', icon: '🗺️' }
  ];

  const handleCustomImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAnime.trim()) return;
    onImportAnime(customAnime.trim());
    setCustomAnime('');
  };

  const handlePdbImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdbQuery.trim() || !onImportPdbIds) return;

    // Split input by non-digits, comma, or space to extract all numbers (profile IDs)
    // Matches urls like: https://www.personality-database.com/profile/220268 or plain ids like 220268
    const parsedIds = pdbQuery
      .split(/[\s,，;；|]+/)
      .map(part => {
        const match = part.match(/profile\/(\d+)/i) || part.match(/pid=(\d+)/i) || part.match(/^(\d+)$/);
        return match ? match[1] : null;
      })
      .filter((id): id is string => id !== null);

    if (parsedIds.length === 0) {
      alert('请检查您的输入并确保包含至少一个 PDB 档案 URL 或纯数字编号（例如 212629）！');
      return;
    }

    onImportPdbIds(parsedIds, {
      includeRelated,
      relatedDepth: includeRelated ? 1 : 0,
      forceRefresh: forcePdbRefresh
    });
    setPdbQuery('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      
      {/* Real-time DB core banner */}
      <div className="bg-[#FFEAA7] border-4 border-[#2D3436] rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#2D3436] relative overflow-hidden">
        <div className="absolute right-4 bottom-0 text-9xl text-amber-400/20 font-black pointer-events-none select-none">
          DB
        </div>
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#2D3436] text-[#FFEAA7] px-3 py-1 text-xs font-black rounded-full shadow-[2px_2px_0px_0px_#FF7675] tracking-widest">
            <Activity size={12} className="animate-pulse text-rose-500" /> LIVE CLOUD LOGIC CENTER
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D3436] tracking-tight">
            ⚡ 智能动漫性格云端数据库 (AI MBTI Database Engine)
          </h2>
          <p className="text-sm text-gray-800 font-bold max-w-3xl leading-relaxed">
            已经突破传统前端静态卡片的条框束缚！当前推荐使用 <strong>Personality Database (PDB)</strong> 作为权威人物人格来源；AI 导入仅作为非权威扩展入口，PDB 导入会保留可追溯来源链接。
          </p>
        </div>
      </div>

      {/* Grid of Stats and Importers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: DB stats and scales (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-4 border-[#2D3436] rounded-[32px] p-6 shadow-[8px_8px_0px_0px_#2D3436] space-y-6">
            
            <div className="flex justify-between items-center border-b-2 border-[#2D3436] pb-3">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Database size={20} className="text-amber-500" /> 实时数据看板 (Database Analytics)
              </h3>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-[#2D3436] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-emerald-700">实时云连接</span>
              </div>
            </div>

            {/* Quick Large Numbers Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#EBF8FF] border-2 border-[#2D3436] rounded-2xl p-3 sm:p-4 text-center shadow-[3px_3px_0px_0px_#2D3436] relative overflow-hidden">
                <div className="absolute top-1 left-2 text-[8px] sm:text-[10px] text-blue-500 font-bold uppercase">角色数量</div>
                <div className="text-lg sm:text-2xl font-black text-blue-900 pt-2 sm:pt-3">
                  {stats ? stats.totalCharacters : '--'}
                </div>
                <div className="text-[9px] text-gray-400 font-medium">Active Cards</div>
              </div>

              <div className="bg-[#E6F4EA] border-2 border-[#2D3436] rounded-2xl p-3 sm:p-4 text-center shadow-[3px_3px_0px_0px_#2D3436] relative overflow-hidden">
                <div className="absolute top-1 left-2 text-[8px] sm:text-[10px] text-emerald-600 font-bold uppercase">覆盖部类</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-900 pt-2 sm:pt-3">
                  {stats ? stats.totalAnimes : '--'}
                </div>
                <div className="text-[9px] text-gray-400 font-medium">Anime Series</div>
              </div>

              <div className="bg-[#FFF5F5] border-2 border-[#2D3436] rounded-2xl p-3 sm:p-4 text-center shadow-[3px_3px_0px_0px_#2D3436] relative overflow-hidden">
                <div className="absolute top-1 left-2 text-[8px] sm:text-[10px] text-rose-500 font-bold uppercase">羁绊纠葛</div>
                <div className="text-lg sm:text-2xl font-black text-rose-900 pt-2 sm:pt-3">
                  {stats ? stats.totalRelationships : '--'}
                </div>
                <div className="text-[9px] text-gray-400 font-medium">Bnd Links</div>
              </div>

              <div className="bg-[#F3E8FF] border-2 border-[#2D3436] rounded-2xl p-3 sm:p-4 text-center shadow-[3px_3px_0px_0px_#2D3436] relative overflow-hidden">
                <div className="absolute top-1 left-2 text-[8px] sm:text-[10px] text-purple-600 font-bold uppercase">导入番剧数</div>
                <div className="text-lg sm:text-2xl font-black text-purple-900 pt-2 sm:pt-3">
                  {stats ? (stats.totalImports ?? 0) : '0'}
                </div>
                <div className="text-[9px] text-gray-400 font-medium">Imported Animes</div>
              </div>
            </div>

            {/* Database status banner */}
            <div className="bg-[#E6F4EA] border-2 border-[#2D3436] rounded-2xl p-4 flex items-center gap-3 shadow-[3px_3px_0px_0px_#2D3436]">
              <CheckCircle className="text-emerald-500 shrink-0" size={24} />
              <div>
                <h4 className="text-emerald-950 font-black text-sm">大型动漫卡组数据库处于就绪状态 (Database Active)</h4>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  系统已预加载并存储了包含 <strong>{stats ? stats.totalCharacters : '数百'}</strong> 个经典动漫人物以及极其密集的宿命羁绊关系网节点。您可以在大厅中随意模糊检索！想看更多角色，也支持直接输入动漫名抓取实时扩容。
                </p>
                {stats?.sourceDistribution && (
                  <p className="text-[10px] text-emerald-900 font-black mt-1">
                    PDB 来源角色：{stats.sourceDistribution.pdb || 0} / {stats.totalCharacters}
                  </p>
                )}
              </div>
            </div>

            {/* Visual MBTI Distribution Chart */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-black text-gray-500 font-sans tracking-wide uppercase flex items-center gap-1">
                <TrendingUp size={12} className="text-purple-500" /> 人格谱系分布剖视图 (MBTI Density Profile)
              </span>

              {stats && stats.mbtiDistribution && (() => {
                const distributionEntries = Object.entries(stats.mbtiDistribution) as [string, number][];
                const distributionValues = Object.values(stats.mbtiDistribution) as number[];
                const maxCount = Math.max(...distributionValues, 1);

                return (
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1 font-mono text-[10px] font-black">
                    {distributionEntries
                      .sort((a, b) => b[1] - a[1]) // Sort descending
                      .slice(0, 16)
                      .map(([mbti, count]) => {
                        const percentage = (count / maxCount) * 100;
                        
                        return (
                          <div key={mbti} className="bg-slate-50 border border-gray-200 p-1.5 rounded-lg text-center flex flex-col justify-between items-center h-16 relative overflow-hidden group hover:border-[#2D3436] transition-all">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-[#A29BFE]/20 transition-all duration-500"
                              style={{ height: `${percentage}%` }}
                            />
                            <span className="text-[11px] relative z-10">{mbti}</span>
                            <span className="text-purple-600 font-sans text-xs relative z-10">{count}张</span>
                          </div>
                        );
                      })}
                  </div>
                );
              })()}
            </div>

          </div>
        </div>

        {/* Right Side: AI Custom Importer & Presets (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-4 border-[#2D3436] rounded-[32px] p-6 shadow-[8px_8px_0px_0px_#2D3436] space-y-6">
            
            <div className="border-b-2 border-[#2D3436] pb-3">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Sparkles size={20} className="text-[#6C5CE7] animate-spin" style={{ animationDuration: '6s' }} /> 
                非权威 AI 扩展导入 (Optional Importer)
              </h3>
            </div>

            {/* Importer Form */}
            <form onSubmit={handleCustomImportSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-500 uppercase">
                  请输入任何想要扩充引入的动漫序列:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled={loading}
                    placeholder="如：命运石之门 / 无职转生 / 迷宫饭"
                    value={customAnime}
                    onChange={(e) => setCustomAnime(e.target.value)}
                    className="w-full bg-[#FAFAFA] text-gray-900 border-2 border-[#2D3436] rounded-xl py-3 pl-3 pr-16 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFEAA7]"
                  />
                  <button 
                    type="submit"
                    disabled={loading || !customAnime.trim()}
                    className="absolute right-2 top-2 bottom-2 bg-[#2D3436] hover:bg-gray-800 disabled:opacity-40 text-white font-bold text-xs px-3 rounded-lg border border-black cursor-pointer"
                  >
                    AI 析出导入
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                ℹ️ 该入口用于快速扩充演示数据，结果会标记为 AI 辅助来源。若要建立权威人物 MBTI 数据，请优先使用下方 PDB 档案导入。
              </p>
            </form>

            {/* PDB Web Scraper Form */}
            <form onSubmit={handlePdbImportSubmit} className="space-y-3 pt-4 border-t border-dashed border-gray-200">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                  <Database size={12} className="text-indigo-500" /> PDB 权威档案导入 (PDB Source Import)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled={loading}
                    placeholder="输入 PDB ID (如 212629) 或 URL链接"
                    value={pdbQuery}
                    onChange={(e) => setPdbQuery(e.target.value)}
                    className="w-full bg-[#FAFAFA] text-gray-900 border-2 border-[#2D3436] rounded-xl py-3 pl-3 pr-24 font-bold text-xs focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={loading || !pdbQuery.trim()}
                    className="absolute right-2 top-2 bottom-2 bg-[#6C5CE7] hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs px-2.5 rounded-lg border border-black cursor-pointer"
                  >
                    PDB导入
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <label className="flex items-center gap-2 bg-slate-50 border border-[#2D3436] rounded-lg px-2.5 py-2 text-[10px] font-black text-gray-700">
                    <input
                      type="checkbox"
                      checked={includeRelated}
                      onChange={(e) => setIncludeRelated(e.target.checked)}
                      disabled={loading}
                    />
                    同步 Related Profiles
                  </label>
                  <label className="flex items-center gap-2 bg-slate-50 border border-[#2D3436] rounded-lg px-2.5 py-2 text-[10px] font-black text-gray-700">
                    <input
                      type="checkbox"
                      checked={forcePdbRefresh}
                      onChange={(e) => setForcePdbRefresh(e.target.checked)}
                      disabled={loading}
                    />
                    强制刷新缓存
                  </label>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                ℹ️ 利用 <strong>Jina Reader</strong> 读取 Personality Database 页面，只把页面中能验证的 MBTI、投票、功能栈、作品和 Related Profiles 写入数据库。PDB 未提供的名言或剧情关系会明确标记为未提供，不再由 AI 补写成权威数据。
              </p>
            </form>

            {onSyncPdb && (
              <div className="space-y-2 pt-4 border-t border-dashed border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-black text-gray-500 uppercase">PDB 同步流程</div>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                      刷新所有已验证 PDB 档案，重新读取投票、功能栈、更新时间和 Related Profiles。
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={loading || !stats?.sourceDistribution?.pdb_verified}
                    onClick={() => onSyncPdb({ forceRefresh: true })}
                    className="shrink-0 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white border-2 border-[#2D3436] px-3 py-2 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_#2D3436] cursor-pointer"
                  >
                    同步PDB
                  </button>
                </div>
              </div>
            )}

            {/* Quick preset hot triggers */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <span className="text-xs font-black text-gray-500 uppercase block">快捷 Preset 性格网络一键导入:</span>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                {presetHotImports.map((preset) => (
                  <button
                    key={preset.name}
                    disabled={loading}
                    onClick={() => onImportAnime(preset.name)}
                    className="bg-slate-50 hover:bg-[#FFEAA7] border-2 border-[#2D3436] py-2 px-2.5 rounded-xl font-bold cursor-pointer transition-colors shadow-[2px_2px_0px_0px_#2D3436] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none inline-flex items-center justify-center gap-1 leading-none text-[#2D3436]"
                  >
                    <span>{preset.icon}</span>
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Live Loading Overlay and API response status bars */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#2D3436]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#2D3436] rounded-[32px] p-8 max-w-md w-full shadow-[12px_12px_0px_0px_#2D3436] text-center space-y-4 animate-bounce" style={{ animationDuration: '4s' }}>
            {/* Spinning neo loader */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-[#2D3436] rounded-full" />
              <div className="absolute inset-0 border-4 border-t-[#FF7675] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
              <div className="absolute inset-2 bg-[#FFEAA7] border-2 border-[#2D3436] rounded-full flex items-center justify-center font-bold text-xl">
                🧠
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="font-sans font-black text-lg text-gray-900">正在与动漫性格云端数据库握手...</h4>
              <p className="text-xs font-mono font-bold text-rose-500 bg-rose-50 border border-rose-200 py-1.5 px-3 rounded-lg leading-relaxed">
                {loadingMessage}
              </p>
            </div>
            
            <div className="text-[10px] text-gray-400 font-mono leading-relaxed pt-2 border-t border-gray-100">
              数据处理、4维模型拟合、跨同盟羁绊契合互生矩阵演算中，大约需要约 5-15 秒，请勿刷新浏览器页面...
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Alert notifications for API interactions */}
      <div className="space-y-3 font-sans">
        {error && (
          <div className="bg-rose-50 border-3 border-[#2D3436] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#2D3436] flex items-start gap-2 text-rose-800">
            <AlertTriangle className="shrink-0 text-red-500 mt-0.5" size={18} />
            <div className="space-y-1">
              <h4 className="text-xs uppercase font-black tracking-wider">数据库通信出错 (DB Sync Error)</h4>
              <p className="text-xs font-bold leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border-3 border-[#2D3436] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#2D3436] flex items-start gap-2 text-emerald-800">
            <CheckCircle className="shrink-0 text-emerald-500 mt-0.5" size={18} />
            <div className="space-y-1">
              <h4 className="text-xs uppercase font-black tracking-wider">数据写入成功 (Data Commit Success)</h4>
              <p className="text-xs font-bold leading-relaxed">{successMessage}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
