import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Swords, Flame, Trophy, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BottomNav from '../components/BottomNav';
import PromoBanner from '../components/PromoBanner';
import GameModeCard from '../components/GameModeCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const gameModes = [
    {
      title: 'Classic Ludo',
      subtitle: 'The original fun',
      icon: Swords,
      backgroundImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x200/110e1a/a855f7/png?text=Classic',
      gradientClass: 'gradient-purple-pink',
      shadowClass: 'shadow-glow-purple',
      link: '/lobby',
    },
    {
      title: 'Quick Match',
      subtitle: 'Fast-paced games',
      icon: Flame,
      backgroundImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x200/110e1a/3b82f6/png?text=Popular',
      gradientClass: 'gradient-blue-teal',
      shadowClass: 'shadow-glow-pink',
      link: '/lobby',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 pb-28">
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="w-12 h-12 rounded-full border-2 border-dark-700"
            />
            <div>
              <p className="text-subtle-text text-sm">Welcome back,</p>
              <h2 className="text-white font-bold text-lg">{user?.username}</h2>
            </div>
          </div>
          <Link to="/wallet" aria-label="Open wallet">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="glass-effect rounded-full flex items-center p-1 pr-3"
            >
              <span className="text-gold font-bold text-lg ml-2">₹{user?.walletBalance.toFixed(2)}</span>
              <div className="w-8 h-8 ml-2 bg-gold/20 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-gold" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Promo Banner */}
        <PromoBanner />

        {/* Game Modes */}
        <div className="grid grid-cols-2 gap-4">
          {gameModes.map((mode, index) => (
            <Link to={mode.link} key={mode.title} aria-label={`Play ${mode.title}`}>
              <GameModeCard
                {...mode}
                animationDelay={0.3 + index * 0.1}
              />
            </Link>
          ))}
        </div>

        {/* Tournaments Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-brand-pink/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-7 h-7 text-brand-pink" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Tournaments</h3>
              <p className="text-subtle-text text-sm">Bigger stakes, bigger wins</p>
            </div>
          </div>
          <Link to="/tournaments" className="text-brand-pink font-bold" aria-label="View tournaments">
            View
          </Link>
        </motion.div>

        {/* Play with Friends */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-brand-blue to-brand-teal p-4 rounded-2xl flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Play with Friends</h3>
              <p className="text-white/80 text-sm">Create or join a private room</p>
            </div>
          </div>
          <Link to="/friends" className="text-white font-bold" aria-label="Play with friends">
            Go
          </Link>
        </motion.div>

      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
