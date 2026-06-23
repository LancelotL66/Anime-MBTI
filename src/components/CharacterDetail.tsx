import React from 'react';
import { motion } from 'motion/react';
import { Character, Relationship, MBTIType } from '../types';
import { MBTI_INFOS, CHARACTERS, RELATIONSHIPS } from '../data/characters';
import { AnimeAvatar } from './AnimeAvatar';
import { 
  Heart, 
  ArrowLeft, 
  Flame, 
  Award, 
  Info, 
  Compass, 
  AlertTriangle, 
  ThumbsUp, 
  Star, 
  Sparkles,
  Layers,
  BookOpen,
  Users,
  ExternalLink
} from 'lucide-react';

interface CharacterDetailProps {
  character: Character;
  onBack: () => void;
  onSelectCharacter: (charId: string) => void;
  favorites: string[];
  toggleFavorite: (charId: string) => void;
  characters?: Character[];
  relationships?: Relationship[];
  onPersonalize?: (charId: string) => Promise<void>;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  onBack,
  onSelectCharacter,
  favorites,
  toggleFavorite,
  characters,
  relationships,
  onPersonalize
}) => {
  const [personalizing, setPersonalizing] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState<string | null>(null);

  const handlePersonalizeClick = async () => {
    if (!onPersonalize) return;
    setPersonalizing(true);
    setErrorStatus(null);
    try {
      await onPersonalize(character.id);
    } catch (e: any) {
      setErrorStatus(e.message || '个性化生成失败，请重试');
    } finally {
      setPersonalizing(false);
    }
  };

  const mbtiDetails = MBTI_INFOS[character.mbti];
  const isFav = favorites.includes(character.id);

  const activeCharacters = characters || CHARACTERS;
  const activeRelationships = relationships || RELATIONSHIPS;

  // Find relationships for this character
  const charRelationships = activeRelationships.filter(
    (rel) => rel.fromId === character.id || rel.toId === character.id
  ).map((rel) => {
    const isFrom = rel.fromId === character.id;
    const targetId = isFrom ? rel.toId : rel.fromId;
    const targetChar = activeCharacters.find((c) => c.id === targetId);
    return {
      relationship: rel,
      targetChar
    };
  }).filter((item) => item.targetChar !== undefined) as {
    relationship: Relationship;
    targetChar: Character;
  }[];

  // Helper to render dynamic progress bar for MBTI traits
  const renderDimensionBar = (
    leftLabel: string, 
    leftLetter: string, 
    rightLabel: string, 
    rightLetter: string, 
    score: number, // score represents the percentage towards the FIRST/second letter
    leftColor: string,
    rightColor: string
  ) => {
    // left indicator gets the value 'score', right gets '100 - score'
    const leftVal = score;
    const rightVal = 100 - score;
    const isLeftDominant = leftVal >= rightVal;

    return (
      <div className="space-y-1 bg-white border-2 border-[#2D3436] p-3 rounded-2xl shadow-[3px_3px_0px_0px_#2D3436] hover:-translate-y-0.5 transition-transform duration-200">
        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
          <span className={isLeftDominant ? 'text-black font-black' : 'text-gray-400'}>
            {leftLabel} ({leftLetter})
          </span>
          <span className={!isLeftDominant ? 'text-black font-black' : 'text-gray-400'}>
            ({rightLetter}) {rightLabel}
          </span>
        </div>
        
        <div className="relative h-6 bg-slate-100 border-2 border-[#2D3436] rounded-lg overflow-hidden flex items-center">
          {/* Middle dividing guideline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 z-10" />
          
          <div 
            className="h-full border-r border-[#2D3436]/10 transition-all duration-500"
            style={{ 
              width: `${score}%`, 
              backgroundColor: leftColor
            }}
          />
          <div 
            className="h-full transition-all duration-500 flex-1"
            style={{ 
              backgroundColor: rightColor
            }}
          />

          {/* Floated percentages */}
          <span className="absolute left-2 text-xs font-mono font-black text-black z-20 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
            {leftVal}%
          </span>
          <span className="absolute right-2 text-xs font-mono font-black text-black z-20 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
            {rightVal}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-2 sm:px-4">
      
      {/* Navigation bar inside card for consistent layout */}
      <div className="bg-white border-4 border-[#2D3436] rounded-[40px] p-4 sm:p-8 shadow-[12px_12px_0px_0px_#2D3436] relative overflow-hidden space-y-6">
        
        {/* Loading overlay for personalization */}
        {personalizing && (
          <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 rounded-[36px] text-center space-y-6 animate-pulse" style={{ animationDuration: '3s' }}>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-[#2D3436] rounded-full" />
              <div className="absolute inset-0 border-4 border-t-[#6C5CE7] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '0.8s' }} />
              <div className="absolute inset-2 bg-[#FFEAA7] border-2 border-[#2D3436] rounded-full flex items-center justify-center text-3xl">
                🧠
              </div>
            </div>
            
            <div className="space-y-2 max-w-md">
              <h3 className="font-sans font-black text-xl text-gray-950">AI 二次元心智刻录中...</h3>
              <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                正在通过智能大语言模型，调取《{character.anime}》中关于【{character.name.split(' / ')[0]}】的真实剧情事实、名场面及名句对话，并进行 MBTI 四维比率推演拟合...
              </p>
              <div className="inline-flex items-center gap-1.5 bg-[#FFEAA7] border-2 border-[#2D3436] px-3.5 py-1.5 rounded-full text-xs font-black select-none shadow-[2px_2px_0px_0px_#2D3436]">
                🛸 预计耗时 3 - 6 秒，请稍后...
              </div>
            </div>
          </div>
        )}

        {/* Top Banner Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#2D3436] pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-[#FFEAA7] border-2 border-[#2D3436] px-4 py-1.5 rounded-xl font-bold text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_#2D3436] active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} /> 返回列表
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {onPersonalize && (
              <button
                onClick={handlePersonalizeClick}
                disabled={personalizing}
                className={`flex items-center gap-1.5 border-2 border-[#2D3436] px-4 py-1.5 rounded-xl font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_#2D3436] active:scale-95 text-[#2D3436] cursor-pointer disabled:opacity-75 ${
                  personalizing ? 'bg-purple-100' : 'bg-[#E0DEFF] hover:bg-[#D4D1FF]'
                }`}
              >
                <Sparkles size={16} className={personalizing ? 'animate-spin text-[#6C5CE7]' : 'text-[#6C5CE7]'} />
                {personalizing ? '正在 AI 专属定制中...' : '✨ AI 专属定制特征'}
              </button>
            )}

            <button
              onClick={() => toggleFavorite(character.id)}
              className={`flex items-center gap-1.5 border-2 border-[#2D3436] px-4 py-1.5 rounded-xl font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_#2D3436] active:scale-95 cursor-pointer ${
                isFav ? 'bg-[#FF7675] text-[#2D3436]' : 'bg-white text-gray-700'
              }`}
            >
              <Heart size={16} className={isFav ? 'fill-current text-[#2D3436]' : ''} />
              {isFav ? '已加入收藏' : '添加收藏'}
            </button>
          </div>
        </div>

        {errorStatus && (
          <div className="bg-rose-50 border-3 border-[#2D3436] text-rose-800 text-xs font-black p-3.5 rounded-xl flex items-center gap-2">
            <AlertTriangle className="text-red-500 shrink-0" size={16} />
            AI 定制解析时遇到一点异常：{errorStatus}。若未配置API秘钥或网络延迟，请在后台配置 Secrets 或重试。
          </div>
        )}

        {/* Hero Banner Section (Bento style grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Avatar & Fast Stats Profile Card */}
          <div className="md:col-span-4 bg-white border-4 border-[#2D3436] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#2D3436] flex flex-col items-center text-center justify-between min-h-[340px] relative">
            <div className="absolute top-3 right-3 bg-[#FFEAA7] border-2 border-[#2D3436] text-xs font-bold px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_#2D3436] font-mono">
              ROLE DECK
            </div>

            <div className="pt-2">
              <AnimeAvatar
                emoji={character.avatarEmoji}
                gradient={character.avatarColor}
                name={character.name}
                size="xl"
              />
            </div>

            <div className="space-y-1 w-full mt-4">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                {character.name.split(' / ')[0]}
              </h2>
              <p className="text-sm font-mono text-gray-500 font-bold">
                {character.name.split(' / ')[1] || ''}
              </p>
              <div className="inline-block bg-rose-100 text-rose-700 border-2 border-[#2D3436] px-3 py-0.5 text-xs font-bold rounded-full mt-1">
                🎬 《{character.anime}》
              </div>
            </div>

            {/* Huge MBTI Badge */}
            <div className="w-full pt-4 border-t-2 border-[#2D3436]/10 mt-4 flex items-center justify-center gap-3">
              <div className="text-3xl font-sans font-black tracking-wider bg-[#2D3436] text-white px-5 py-2 rounded-xl border-2 border-[#2D3436] shadow-[3px_3px_0px_0px_#FFEAA7]">
                {character.mbti}
              </div>
              <div className="text-left">
                <p className="text-xs font-mono font-bold text-gray-400">MBTI 性格原型</p>
                <p className="text-sm font-bold text-[#FF7675] line-clamp-1">{mbtiDetails?.title || '神秘冒险家'}</p>
              </div>
            </div>
          </div>

          {/* core Character summary and golden quote card */}
          <div className="md:col-span-8 flex flex-col justify-between space-y-4">
            
            {/* Quote Card */}
            <div className="bg-[#FFEAA7] border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#2D3436] relative overflow-hidden flex flex-col justify-center min-h-[100px]">
              <div className="absolute -right-4 -bottom-6 text-9xl text-yellow-300/40 font-serif select-none pointer-events-none">
                “
              </div>
              <p className="text-sm font-mono text-gray-700 font-black tracking-wide mb-1 flex items-center gap-1.5">
                <Flame className="text-red-500 fill-red-400" size={14} />
                {character.quoteSource === 'not_provided' ? 'PDB 未提供名言:' : '名句考证 GOLDEN QUOTE:'}
              </p>
              <h3 className="text-lg sm:text-xl font-bold font-sans text-[#2D3436] leading-relaxed relative z-10">
                「 {character.quote} ]
              </h3>
              {character.sourceUrl && (
                <a
                  href={character.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[10px] font-black text-[#2D3436] underline decoration-2 underline-offset-2 relative z-10"
                >
                  <ExternalLink size={12} />
                  来源：Personality Database {character.pdbProfileId ? `#${character.pdbProfileId}` : ''}
                </a>
              )}
            </div>

            {/* Quick Summary Description */}
            <div className="bg-white border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#2D3436] flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-md font-sans font-black text-gray-900 border-b-2 border-[#2D3436] pb-2 flex items-center gap-1.5">
                  <Info className="text-emerald-500" size={18} /> 性格分析概述 (Character Profile)
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                  {character.summary}
                </p>
              </div>

              {/* Tag categories */}
              <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-[#2D3436]/5 mt-4">
                <span className="bg-[#55EFC4] text-[#2D3436] border-2 border-[#2D3436] text-xs px-2.5 py-1 rounded-lg font-bold">
                  🎭 {mbtiDetails?.categoryCn || '自由探索者'}
                </span>
                <span className="bg-[#81ECEC] text-[#2D3436] border-2 border-[#2D3436] text-xs px-2.5 py-1 rounded-lg font-bold">
                  💡 {character.mbti[0] === 'E' ? '外向导向' : '内向思考'}
                </span>
                <span className="bg-[#A29BFE] text-[#2D3436] border-2 border-[#2D3436] text-xs px-2.5 py-1 rounded-lg font-bold">
                  ⚡ {character.mbti[1] === 'N' ? '直觉联想' : '实感本能'}
                </span>
                <span className="bg-[#FF7675] text-[#2D3436] border-2 border-[#2D3436] text-xs px-2.5 py-1 rounded-lg font-bold">
                  🔥 {character.mbti[2] === 'T' ? '逻辑剖析' : '情感抉择'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* MBTI Dimensions Slider bars & Plot Evidences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Dimension score gauges */}
          <div className="bg-white border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0px_0px_#2D3436] space-y-4">
            <h4 className="text-md sm:text-lg font-black text-gray-900 font-sans border-b-2 border-[#2D3436] pb-2 flex items-center gap-1.5">
              <Layers className="text-[#6C5CE7] animate-pulse" size={18} /> 四维人格倾向百分比 (Dimension Ratios)
            </h4>
            
            <div className="space-y-3">
              {renderDimensionBar('外向 Extraversion', 'E', '内向 Introversion', 'I', character.dimensions.E, '#FED7AA', '#DDD6FE')}
              {renderDimensionBar('直觉 Intuition', 'N', '实感 Sensing', 'S', character.dimensions.N, '#FDE047', '#A7F3D0')}
              {renderDimensionBar('理性 Thinking', 'T', '感性 Feeling', 'F', character.dimensions.T, '#93C5FD', '#FBCFE8')}
              {renderDimensionBar('独立自主 Perceiving', 'P', '条理自律 Judging', 'J', character.dimensions.P, '#C4B5FD', '#FCA5A5')}
            </div>

            <div className="text-[11px] text-gray-500 font-mono leading-relaxed pt-2">
              ℹ️ 以上百分比是根据该角色在动漫中的实际言行倾向与粉丝社区的主流研讨概率加权计算得出的推演比率。
            </div>
          </div>

          {/* Plot evidence text block */}
          <div className="flex flex-col space-y-4">
            
            {/* Plot proof card */}
            <div className="bg-[#E6F4EA] border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0px_0px_#2D3436] flex-1">
              <h4 className="text-md sm:text-lg font-black text-emerald-800 font-sans border-b-2 border-[#2D3436] pb-2 flex items-center gap-1.5">
                <BookOpen size={18} /> 剧情表现考证 (Anime Evidence)
              </h4>
              <p className="text-sm font-sans text-gray-800 leading-relaxed pt-3">
                {character.plotProof}
              </p>
            </div>

            {/* Fandom Discussion Card */}
            <div className="bg-[#E8F0FE] border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0px_0px_#2D3436] flex-1">
              <h4 className="text-md sm:text-lg font-black text-blue-800 font-sans border-b-2 border-[#2D3436] pb-2 flex items-center gap-1.5">
                <Users size={18} /> 粉丝社区研讨 (Fandom Consensus)
              </h4>
              <p className="text-sm font-sans text-gray-800 leading-relaxed pt-3">
                {character.fandomDiscussion}
              </p>
            </div>

          </div>
        </div>

        {/* Strengths Counterparts & Weakness Warning bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          <div className="bg-[#E6F4EA] border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#2D3436]">
            <h4 className="font-sans font-black text-emerald-900 text-md sm:text-lg border-b-2 border-[#2D3436] pb-2 flex items-center gap-1.5">
              <ThumbsUp size={18} className="fill-emerald-200" /> 性格高光与长处 (Highpoints)
            </h4>
            <ul className="space-y-3 pt-4">
              {character.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-sans font-bold text-gray-800 bg-white/75 p-2 rounded-xl border border-[#2D3436]">
                  <span className="bg-[#55EFC4] text-black border border-[#2D3436] text-xs font-mono font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                    {i+1}
                  </span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50 border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#2D3436]">
            <h4 className="font-sans font-black text-rose-900 text-md sm:text-lg border-b-2 border-[#2D3436] pb-2 flex items-center gap-1.5">
              <AlertTriangle size={18} className="fill-rose-200" /> 潜在盲区与短板 (Blindspots)
            </h4>
            <ul className="space-y-3 pt-4">
              {character.weaknesses.map((weak, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-sans font-semibold text-gray-800 bg-white/75 p-2 rounded-xl border border-[#2D3436]">
                  <span className="bg-[#FF7675] text-black border border-[#2D3436] text-xs font-mono font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                    {i+1}
                  </span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Dynamic Character Relationship Deck */}
        <div className="bg-white border-4 border-[#2D3436] rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_#2D3436] space-y-4 pt-4">
          <h4 className="text-md sm:text-xl font-black text-gray-950 font-sans border-b-2 border-[#2D3436] pb-3 flex items-center gap-1.5">
            <Users className="text-amber-500 fill-amber-200" size={22} /> 核心人际关系羁绊 (Character Interconnections)
          </h4>

          {charRelationships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {charRelationships.map(({ relationship, targetChar }) => (
                <div 
                  key={targetChar.id} 
                  className="bg-slate-50 border-3 border-[#2D3436] rounded-2xl p-4 shadow-[6px_6px_0px_0px_#2D3436] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="cursor-pointer" onClick={() => onSelectCharacter(targetChar.id)}>
                      <AnimeAvatar
                        emoji={targetChar.avatarEmoji}
                        gradient={targetChar.avatarColor}
                        name={targetChar.name}
                        size="md"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span 
                          onClick={() => onSelectCharacter(targetChar.id)} 
                          className="font-black text-gray-950 text-base hover:underline cursor-pointer truncate"
                        >
                          {targetChar.name.split(' / ')[0]}
                        </span>
                        <span className="bg-[#2D3436] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                          {targetChar.mbti}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-[#FF7675] text-black border border-[#2D3436] text-[10px] px-2 py-0.5 rounded font-black">
                          {relationship.relationLabel}
                        </span>
                        <span className="bg-[#FFEAA7] text-black border border-[#2D3436] text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                          契合度: {relationship.compatibilityScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-3 border-2 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_0px_#2D3436]">
                    {relationship.description}
                  </p>
                  {relationship.sourceUrl && (
                    <a
                      href={relationship.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-black text-indigo-600 underline underline-offset-2 inline-flex items-center gap-1"
                    >
                      <ExternalLink size={11} />
                      PDB Related Profile source
                    </a>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => onSelectCharacter(targetChar.id)}
                      className="text-xs font-mono font-semibold text-rose-500 hover:underline flex items-center gap-0.5"
                    >
                      查看她/他的 MBTI 分册 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 font-medium border-2 border-[#2D3436] border-dashed rounded-2xl bg-slate-50">
              💔 目前该角色尚未录入与其他核心角色的官方分析关系。可以点击大厅中其他角色查看！
            </div>
          )}
        </div>

        {/*性格匹配建议 */}
        <div className="bg-gradient-to-r from-violet-100 to-indigo-100 border-4 border-[#2D3436] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#2D3436] space-y-3">
          <h4 className="text-md sm:text-lg font-black text-indigo-950 font-sans border-b-2 border-indigo-950 pb-2 flex items-center gap-2">
            <Compass className="text-purple-600 animate-spin" style={{ animationDuration: '8s' }} /> 
            {character.name.split(' / ')[0]} 的性格契合配对指南 (Matching Companions)
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
            
            <div className="bg-white p-4 border-2 border-[#2D3436] rounded-xl shadow-[4px_4px_0px_0px_#2D3436] space-y-2">
              <span className="bg-[#FFEAA7] text-[#2D3436] border-2 border-[#2D3436] px-2.5 py-0.5 text-xs font-black rounded-lg inline-block">
                🏆 灵魂契合最佳人格 (Perfect Match)
              </span>
              <p className="text-gray-700 font-semibold flex items-center gap-1">
                适配 MBTI: <span className="font-mono font-black text-[#FF7675] underline">{character.matches.perfect.join(', ')}</span>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                这些性格在直觉理解或功能互补上达到完美巅峰。他们能相互启发、容纳彼此盲区并催生出绝佳共鸣。
              </p>
            </div>

            <div className="bg-white p-4 border-2 border-[#2D3436] rounded-xl shadow-[4px_4px_0px_0px_#2D3436] space-y-2">
              <span className="bg-[#81ECEC] text-[#2D3436] border-2 border-[#2D3436] px-2.5 py-0.5 text-xs font-black rounded-lg inline-block">
                🤝 友善共鸣互补人格 (Good Match)
              </span>
              <p className="text-gray-700 font-semibold flex items-center gap-1">
                适配 MBTI: <span className="font-mono font-black text-[#6C5CE7]">{character.matches.good.join(', ')}</span>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                他们拥有部分相同的倾向，沟通几乎没有隔阂，相处氛围轻松自在，是最扎实靠谱的战友和生活拍档。
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
