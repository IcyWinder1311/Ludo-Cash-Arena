import React from 'react';
import { motion } from 'framer-motion';
import { LudoToken } from '../../types';

interface TokenProps {
  token: LudoToken;
  isPlayable: boolean;
  onClick: () => void;
}

const Token: React.FC<TokenProps> = ({ token, isPlayable, onClick }) => {
  const colorClass = `bg-ludo-${token.color}`;
  const ringColorClass = `ring-ludo-${token.color}-dark`;

  return (
    <motion.button
      aria-label={`Player ${token.color} token ${token.id}`}
      onClick={onClick}
      disabled={!isPlayable}
      className={`absolute w-[6.66%] h-[6.66%] rounded-full flex items-center justify-center transition-all duration-300 transform-gpu
        ${isPlayable ? 'cursor-pointer animate-pulse-slow' : ''}`}
      style={{
        // Position is calculated in GameBoard.tsx
      }}
      whileHover={isPlayable ? { scale: 1.2 } : {}}
      whileTap={isPlayable ? { scale: 0.9 } : {}}
    >
      <div className={`w-full h-full rounded-full ${colorClass} p-0.5 shadow-lg`}>
        <div className={`w-full h-full bg-white/30 rounded-full ring-2 ${ringColorClass} flex items-center justify-center`}>
           <div className={`w-1/2 h-1/2 ${colorClass} rounded-full`}/>
        </div>
      </div>
    </motion.button>
  );
};

export default Token;
