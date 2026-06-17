import React from 'react';
import { motion } from 'motion/react';

interface AnimeAvatarProps {
  emoji: string;
  gradient: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AnimeAvatar: React.FC<AnimeAvatarProps> = ({
  emoji,
  gradient,
  name,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl border-2 shadow-[2px_2px_0px_0px_#2D3436]',
    md: 'w-20 h-20 text-3xl border-3 shadow-[3px_3px_0px_0px_#2D3436]',
    lg: 'w-32 h-32 text-5xl border-4 shadow-[4px_4px_0px_0px_#2D3436]',
    xl: 'w-44 h-44 text-7xl border-4 shadow-[6px_6px_0px_0px_#2D3436]'
  };

  const borderClass = 'border-[#2D3436] border-solid rounded-3xl bg-white overflow-hidden flex items-center justify-center relative transition-transform duration-200';

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: size === 'xl' ? 0 : 2 }}
      className={`${borderClass} ${sizeClasses[size]}`}
      style={{ background: gradient }}
    >
      {/* Anime gloss sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none" />
      
      {/* Character pop emotion/spirit behind */}
      <span className="relative z-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] select-none">
        {emoji}
      </span>
      
      {/* Halftone pop art dots overlay (visual theme) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent bg-[length:4px_4px] pointer-events-none" />
    </motion.div>
  );
};
