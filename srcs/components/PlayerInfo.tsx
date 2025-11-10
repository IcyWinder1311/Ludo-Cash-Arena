import React from 'react';
import { motion } from 'framer-motion';
import { LudoPlayer } from '../types';
import { Clock } from 'lucide-react';

interface PlayerInfoProps {
  player: LudoPlayer;
  isCurrent: boolean;
  timeRemaining: number;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, isCurrent, timeRemaining }) => {
  return (
    <motion.div
      className={`flex items-center space-x-3 p-2 rounded-xl transition-all duration-300
        ${isCurrent ? 'bg-white/20 ring-2 ring-brand-purple' : 'bg-dark-800/50'}`}
      animate={{ scale: isCurrent ? 1.05 : 1 }}
    >
      <img src={player.avatar} alt={player.username} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <p className="text-white font-semibold text-sm truncate">{player.username}</p>
        <div className="flex items-center space-x-1">
          <div className={`w-3 h-3 rounded-full bg-ludo-${player.color}`} />
          <span className="text-subtle-text text-xs capitalize">{player.color}</span>
        </div>
      </div>
      {isCurrent && (
        <div className="flex items-center space-x-1 text-light-text text-sm font-semibold">
          <Clock className="w-4 h-4" />
          <span>{timeRemaining}s</span>
        </div>
      )}
    </motion.div>
  );
};

export default PlayerInfo;
