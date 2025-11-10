import React from 'react';
import { motion } from 'framer-motion';

interface DiceProps {
  value: number | null;
  isRolling: boolean;
  onClick: () => void;
  isMyTurn: boolean;
}

const DiceFace: React.FC<{ value: number }> = ({ value }) => {
  const dots = Array.from({ length: value });
  return (
    <div className={`grid grid-cols-3 grid-rows-3 w-full h-full p-2 gap-1`}>
      {value === 1 && <div className="col-start-2 row-start-2 bg-white rounded-full" />}
      {value === 2 && <>
        <div className="col-start-1 row-start-1 bg-white rounded-full" />
        <div className="col-start-3 row-start-3 bg-white rounded-full" />
      </>}
      {value === 3 && <>
        <div className="col-start-1 row-start-1 bg-white rounded-full" />
        <div className="col-start-2 row-start-2 bg-white rounded-full" />
        <div className="col-start-3 row-start-3 bg-white rounded-full" />
      </>}
      {value === 4 && <>
        <div className="col-start-1 row-start-1 bg-white rounded-full" />
        <div className="col-start-3 row-start-1 bg-white rounded-full" />
        <div className="col-start-1 row-start-3 bg-white rounded-full" />
        <div className="col-start-3 row-start-3 bg-white rounded-full" />
      </>}
      {value === 5 && <>
        <div className="col-start-1 row-start-1 bg-white rounded-full" />
        <div className="col-start-3 row-start-1 bg-white rounded-full" />
        <div className="col-start-2 row-start-2 bg-white rounded-full" />
        <div className="col-start-1 row-start-3 bg-white rounded-full" />
        <div className="col-start-3 row-start-3 bg-white rounded-full" />
      </>}
      {value === 6 && <>
        <div className="col-start-1 row-start-1 bg-white rounded-full" />
        <div className="col-start-1 row-start-2 bg-white rounded-full" />
        <div className="col-start-1 row-start-3 bg-white rounded-full" />
        <div className="col-start-3 row-start-1 bg-white rounded-full" />
        <div className="col-start-3 row-start-2 bg-white rounded-full" />
        <div className="col-start-3 row-start-3 bg-white rounded-full" />
      </>}
    </div>
  );
};

const Dice: React.FC<DiceProps> = ({ value, isRolling, onClick, isMyTurn }) => {
  return (
    <motion.button
      aria-label="Roll dice"
      onClick={onClick}
      disabled={!isMyTurn || isRolling}
      className={`w-24 h-24 rounded-2xl shadow-2xl transition-all duration-300
        ${isMyTurn && !isRolling ? 'cursor-pointer animate-float' : ''}
        ${isMyTurn ? 'bg-gradient-to-br from-brand-purple to-brand-pink' : 'bg-dark-700'}
      `}
      whileTap={isMyTurn && !isRolling ? { scale: 0.9 } : {}}
    >
      <motion.div
        className="w-full h-full"
        animate={isRolling ? { rotate: [0, 360, 720], scale: [1, 1.2, 1] } : {}}
        transition={isRolling ? { duration: 0.7, ease: 'easeInOut' } : {}}
      >
        <DiceFace value={isRolling ? (Math.floor(Math.random() * 6) + 1) : (value || 1)} />
      </motion.div>
    </motion.button>
  );
};

export default Dice;
