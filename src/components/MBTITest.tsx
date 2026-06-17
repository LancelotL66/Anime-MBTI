import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEST_QUESTIONS } from '../data/testQuestions';
import { CHARACTERS, MBTI_INFOS } from '../data/characters';
import { AnimeAvatar } from './AnimeAvatar';
import { MBTIType, Character, TestQuestion } from '../types';
import { Sparkles, ArrowLeft, RefreshCw, Heart, Check, Compass, Smile } from 'lucide-react';

interface MBTITestProps {
  onBack: () => void;
  onSelectCharacter: (charId: string) => void;
  favorites: string[];
  toggleFavorite: (charId: string) => void;
  characters?: Character[];
}

export const MBTITest: React.FC<MBTITestProps> = ({
  onBack,
  onSelectCharacter,
  favorites,
  toggleFavorite,
  characters
}) => {
  // Helper to generate a balanced randomized set of 12 questions:
  // Exactly 4 from Phase 1, 4 from Phase 2, 4 from Phase 3.
  // Each phase contains exactly 1 of each of 'EI', 'SN', 'TF', 'JP' to keep scoring perfectly balanced.
  const generateRandomQuestions = (): TestQuestion[] => {
    const phase1 = TEST_QUESTIONS.filter(q => q.phase === 1);
    const phase2 = TEST_QUESTIONS.filter(q => q.phase === 2);
    const phase3 = TEST_QUESTIONS.filter(q => q.phase === 3);

    const selectOnePerDimension = (pool: TestQuestion[]): TestQuestion[] => {
      const dimensions: ('EI' | 'SN' | 'TF' | 'JP')[] = ['EI', 'SN', 'TF', 'JP'];
      const selected: TestQuestion[] = [];
      dimensions.forEach(dim => {
        const dimQuestions = pool.filter(q => q.dimension === dim);
        if (dimQuestions.length > 0) {
          const randomQ = dimQuestions[Math.floor(Math.random() * dimQuestions.length)];
          selected.push(randomQ);
        }
      });
      // Shuffle the 4 selected questions within this phase to make next question randomized
      return selected.sort(() => Math.random() - 0.5);
    };

    const s1 = selectOnePerDimension(phase1);
    const s2 = selectOnePerDimension(phase2);
    const s3 = selectOnePerDimension(phase3);

    return [...s1, ...s2, ...s3];
  };

  const [activeQuestions, setActiveQuestions] = useState<TestQuestion[]>(() => generateRandomQuestions());
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [testFinished, setTestFinished] = useState(false);
  const [userMBTI, setUserMBTI] = useState<MBTIType>('INFP');

  const handleSelectOption = (option: 'A' | 'B') => {
    if (activeQuestions.length === 0) return;
    const currentQ = activeQuestions[currentQuestionIdx];
    const updatedAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate final MBTI
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, 'A' | 'B'>) => {
    let eCount = 0; let iCount = 0;
    let sCount = 0; let nCount = 0;
    let tCount = 0; let fCount = 0;
    let jCount = 0; let pCount = 0;

    activeQuestions.forEach((q) => {
      const selected = finalAnswers[q.id];
      if (q.dimension === 'EI') {
        if (selected === 'A') eCount++; else iCount++;
      } else if (q.dimension === 'SN') {
        if (selected === 'A') sCount++; else nCount++;
      } else if (q.dimension === 'TF') {
        if (selected === 'A') tCount++; else fCount++;
      } else if (q.dimension === 'JP') {
        if (selected === 'A') jCount++; else pCount++;
      }
    });

    const E_I = eCount >= iCount ? 'E' : 'I';
    const S_N = sCount >= nCount ? 'S' : 'N';
    const T_F = tCount >= fCount ? 'T' : 'F';
    const J_P = jCount >= pCount ? 'J' : 'P';

    const calculatedResult = `${E_I}${S_N}${T_F}${J_P}` as MBTIType;
    setUserMBTI(calculatedResult);
    setTestFinished(true);
  };

  const handleRestart = () => {
    setActiveQuestions(generateRandomQuestions());
    setCurrentQuestionIdx(0);
    setAnswers({});
    setTestFinished(false);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const activeCharacters = characters || CHARACTERS;

  // Find characters with same MBTI or closest MBTI
  const matchedCharacters = activeCharacters.filter((char) => char.mbti === userMBTI);
  const alternateMatches = activeCharacters.filter((char) => {
    // Shared at least 3 letters
    let shared = 0;
    for (let j = 0; j < 4; j++) {
      if (char.mbti[j] === userMBTI[j]) shared++;
    }
    return shared === 3 && char.mbti !== userMBTI;
  });

  const mbtiDetails = MBTI_INFOS[userMBTI];
  const progressPercent = activeQuestions.length > 0 
    ? Math.round(((currentQuestionIdx) / activeQuestions.length) * 100)
    : 0;

  const displayDescription = mbtiDetails?.mbtiDescription || '追求生活本真，内心世界细腻。';

  const currentQuestionObj = activeQuestions[currentQuestionIdx];
  const getPhaseHeader = (phase?: number) => {
    switch (phase) {
      case 1: return '🌱 阶段壹：初遇奇境 · 觉醒启程 (Behavior & Beginnings)';
      case 2: return '⚔️ 阶段贰：风霜历练 · 羁绊同修 (Adventure & Interpersonal)';
      case 3: return '🌌 阶段叁：宿命交叠 · 终焉抉择 (Fate & Ultimate Call)';
      default: return '🔮 契合度性格测试';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2 sm:px-4">
      {/* Neo-brutalist pop card */}
      <div className="bg-white border-4 border-[#2D3436] rounded-[40px] p-4 sm:p-8 shadow-[12px_12px_0px_0px_#2D3436] relative overflow-hidden">
        
        {/* Playful background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFEAA7] opacity-25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#FF7675] opacity-25 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b-2 border-[#2D3436] pb-4 z-10 relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-[#FFEAA7] border-2 border-[#2D3436] px-4 py-1.5 rounded-xl font-bold font-sans text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_#2D3436] active:scale-95 text-[#2D3436]"
          >
            <ArrowLeft size={16} /> 返回大厅
          </button>
          
          <div className="flex items-center gap-2">
            <span className="bg-[#FF7675] text-[#2D3436] border-2 border-[#2D3436] px-3 py-1 text-xs font-mono rounded-full font-bold uppercase tracking-wider">
              {testFinished ? 'TEST COMPLETED' : `QUESTION ${currentQuestionIdx + 1}/${activeQuestions.length}`}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!testFinished ? (
            <motion.div
              key="quiz-phase"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 animate-fade-in"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold">
                  {/* Dynamic Phase Indicator */}
                  <span className="text-[#FF7675] bg-[#FFF0F0] border border-[#FF7675] px-2.5 py-1 rounded-md">
                    {getPhaseHeader(currentQuestionObj?.phase)}
                  </span>
                  <span>完成度 {progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 border-2 border-[#2D3436] h-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#FFEAA7] h-full border-r-2 border-[#2D3436] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question statement */}
              <div className="bg-white border-4 border-[#2D3436] p-6 rounded-2xl shadow-[6px_6px_0px_0px_#2D3436] min-h-[120px] flex items-center relative">
                <div className="absolute -top-3 left-6 bg-[#81ECEC] text-black border-2 border-[#2D3436] px-3 py-0.5 text-[10px] font-sans font-black rounded-md uppercase">
                  Scenario {currentQuestionIdx + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed font-sans pt-2">
                  {currentQuestionObj?.text}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4 pt-2">
                <button
                  onClick={() => handleSelectOption('A')}
                  className="w-full text-left bg-emerald-100 hover:bg-emerald-200 border-3 border-[#2D3436] p-5 rounded-2xl font-bold text-sm sm:text-base cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_#2D3436] transition-all active:scale-[0.98] group text-[#2D3436]"
                >
                  <div className="flex gap-3 items-start">
                    <span className="bg-[#55EFC4] text-black border-2 border-[#2D3436] px-2.5 py-0.5 rounded-lg text-xs font-mono font-black group-hover:bg-[#FFEAA7] transition-colors">
                      A
                    </span>
                    <span className="text-gray-800 leading-relaxed flex-1">
                      {currentQuestionObj?.optionA.text}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectOption('B')}
                  className="w-full text-left bg-sky-100 hover:bg-sky-200 border-3 border-[#2D3436] p-5 rounded-2xl font-bold text-sm sm:text-base cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_#2D3436] transition-all active:scale-[0.98] group text-[#2D3436]"
                >
                  <div className="flex gap-3 items-start">
                    <span className="bg-[#74B9FF] text-black border-2 border-[#2D3436] px-2.5 py-0.5 rounded-lg text-xs font-mono font-black group-hover:bg-[#FFEAA7] transition-colors">
                      B
                    </span>
                    <span className="text-gray-800 leading-relaxed flex-1">
                      {currentQuestionObj?.optionB.text}
                    </span>
                  </div>
                </button>
              </div>

              {/* Prev / Undo */}
              {currentQuestionIdx > 0 && (
                <div className="flex justify-start">
                  <button
                    onClick={handlePrevQuestion}
                    className="text-xs font-mono font-bold hover:underline flex items-center gap-1 text-gray-600"
                  >
                    ← 重新作答上一题
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result-phase"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Massive Result Card */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center bg-[#FFEAA7] border-3 border-[#2D3436] rounded-full p-3 shadow-[4px_4px_0px_0px_#2D3436]">
                  <Sparkles className="w-8 h-8 text-black animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#2D3436] font-sans">
                  测试完成！你的动漫专属契合人格是：
                </h2>

                <div className="inline-block relative">
                  {/* Neobrutalist MBTI Label */}
                  <div className="text-5xl sm:text-7xl font-sans font-black tracking-wider text-white bg-[#2D3436] rounded-3xl border-4 border-[#FFEAA7] p-6 shadow-[8px_8px_0px_0px_#FF7675]">
                    {userMBTI}
                  </div>
                </div>

                <div className="max-w-xl mx-auto space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#FF7675] font-sans">
                    {mbtiDetails?.title || '独行冒险家'}
                  </h3>
                  <span className="inline-block bg-[#81ECEC] text-black border-2 border-[#2D3436] px-4 py-1 text-sm font-sans font-black rounded-full">
                    🏷️ {mbtiDetails?.categoryCn || '自由探索家'}
                  </span>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-2 bg-white p-4 border-2 border-[#2D3436] rounded-2xl shadow-[4px_4px_0px_0px_#2D3436] text-left">
                    {displayDescription}
                  </p>
                </div>
              </div>

              {/* Dynamic Anime Character Matches */}
              <div className="space-y-6 border-t-4 border-[#2D3436] pt-6">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-sans flex items-center gap-2">
                  <Smile className="text-amber-500 fill-amber-300" /> 100% 相同性格的经典动漫角色
                </h3>

                {matchedCharacters.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {matchedCharacters.map((char) => (
                      <div
                        key={char.id}
                        className="bg-white border-4 border-[#2D3436] p-4 rounded-3xl shadow-[6px_6px_0px_0px_#2D3436] flex items-center gap-4 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                      >
                        <AnimeAvatar
                          emoji={char.avatarEmoji}
                          gradient={char.avatarColor}
                          name={char.name}
                          size="md"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-base font-black text-gray-900">{char.name}</h4>
                          <p className="text-xs text-[#FF7675] font-bold">《{char.anime}》</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              onClick={() => onSelectCharacter(char.id)}
                              className="bg-[#FFEAA7] hover:bg-yellow-400 text-black border-2 border-[#2D3436] text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#2D3436]"
                            >
                              <Compass size={12} /> 查看分析
                            </button>
                            <button
                              onClick={() => toggleFavorite(char.id)}
                              className={`border-2 border-[#2D3436] text-xs px-2 py-1 rounded-lg font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#2D3436] ${
                                favorites.includes(char.id)
                                  ? 'bg-[#FF7675] text-black'
                                  : 'bg-white hover:bg-red-50 text-gray-700'
                              }`}
                            >
                              <Heart size={12} className={favorites.includes(char.id) ? 'fill-black text-black' : ''} />
                              {favorites.includes(char.id) ? '已收藏' : '收藏'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border-2 border-[#2D3436] border-dashed p-6 rounded-2xl text-center text-gray-500 font-medium">
                    🔍 本手册中暂时未录入完全相同性格的学生/主角。来看看高契合度同伙吧！
                  </div>
                )}
              </div>

              {/* Extremely High Compatibility Alternate Matches */}
              <div className="space-y-4">
                <h4 className="text-lg sm:text-xl font-bold text-[#2D3436] font-sans flex items-center gap-2">
                  ✨ 极其合拍的“灵魂伴侣”或相似性格
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {alternateMatches.slice(0, 3).map((char) => (
                    <div
                      key={char.id}
                      onClick={() => onSelectCharacter(char.id)}
                      className="bg-white border-3 border-[#2D3436] p-3 rounded-2xl shadow-[4px_4px_0px_0px_#2D3436] flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <AnimeAvatar
                        emoji={char.avatarEmoji}
                        gradient={char.avatarColor}
                        name={char.name}
                        size="sm"
                      />
                      <span className="font-bold text-sm text-gray-900 mt-2 block line-clamp-1">{char.name.split(' / ')[0]}</span>
                      <span className="text-xs text-rose-500 font-bold">《{char.anime}》</span>
                      <span className="mt-1 bg-purple-100 text-purple-700 border-2 border-[#2D3436] text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                        {char.mbti}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Traits & Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border-3 border-[#2D3436] p-6 rounded-3xl shadow-[6px_6px_0px_0px_#2D3436]">
                <div className="space-y-2">
                  <h4 className="font-black text-[#FF7675] font-sans flex items-center gap-1.5">
                    💪 您的动漫型人格优势
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700 font-bold">
                    {mbtiDetails?.strengths.map((str, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="text-emerald-500 shrink-0" size={16} /> {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black text-[#6C5CE7] font-sans flex items-center gap-1.5">
                    ⚠️ 需要注意的潜藏阴影
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700 font-semibold">
                    {mbtiDetails?.weaknesses.map((weak, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-red-500 font-black shrink-0">•</span> {weak}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-wrap gap-4 items-center justify-center pt-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 bg-[#FFEAA7] hover:bg-yellow-500 text-black border-3 border-[#2D3436] px-6 py-2.5 rounded-2xl font-bold shadow-[6px_6px_0px_0px_#2D3436] active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
                >
                  <RefreshCw size={18} /> 重新测试
                </button>

                <button
                  onClick={onBack}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-gray-800 border-3 border-[#2D3436] px-6 py-2.5 rounded-2xl font-bold shadow-[6px_6px_0px_0px_#2D3436] active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
                >
                  返回主页检索
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
