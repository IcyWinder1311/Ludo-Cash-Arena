import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GameModeCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  backgroundImage: string;
  gradientClass: string;
  shadowClass: string;
  animationDelay?: number;
}

const GameModeCard: React.FC<GameModeCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  backgroundImage,
  gradientClass,
  shadowClass,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationDelay }}
      whileHover={{ y: -5 }}
      className={`gradient-border ${gradientClass} rounded-2xl ${shadowClass} cursor-pointer h-full`}
    >
      <div className="relative bg-dark-900 rounded-[15px] p-4 h-36 flex flex-col justify-between overflow-hidden">
        <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 flex justify-between items-start">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="relative z-10 text-subtle-text text-sm">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default GameModeCard;
