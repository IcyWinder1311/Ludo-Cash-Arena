import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Medal } from 'lucide-react';
import { generateLeaderboard } from '../data/mockData';
import BottomNav from '../components/BottomNav';

const LeaderboardPage: React.FC = () => {
  const [leaderboard] = useState(generateLeaderboard());
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 px-4 pt-6 pb-8">
        <h1 className="text-dark-900 text-2xl font-bold mb-4">Leaderboard</h1>
        
        <div className="flex space-x-2">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-dark-900 text-white'
                  : 'bg-white/20 text-dark-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {leaderboard.slice(0, 3).map((entry, index) => {
            const positions = [1, 0, 2];
            const position = positions[index];
            const actualEntry = leaderboard[position];
            
            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-effect rounded-2xl p-3 ${index === 1 ? 'col-span-1' : ''}`}
                style={{ marginTop: index === 1 ? '0' : '1rem' }}
              >
                <div className="text-center">
                  <Medal className={`w-8 h-8 mx-auto mb-2 ${getMedalColor(actualEntry.rank)}`} />
                  <img
                    src={actualEntry.user.avatar}
                    alt={actualEntry.user.username}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white/20"
                  />
                  <p className="text-white font-bold text-sm truncate">{actualEntry.user.username}</p>
                  <p className="text-secondary-400 font-bold text-lg">₹{actualEntry.totalEarnings.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">{actualEntry.gamesWon} wins</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="glass-effect rounded-2xl p-4">
          <div className="space-y-3">
            {leaderboard.slice(3, 50).map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 text-center">
                    <span className="text-gray-400 font-bold">{entry.rank}</span>
                  </div>
                  <img
                    src={entry.user.avatar}
                    alt={entry.user.username}
                    className="w-10 h-10 rounded-full border-2 border-dark-700"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{entry.user.username}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-gray-400">{entry.gamesWon}W</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-success-500">{entry.winRate}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-secondary-400 font-bold">₹{entry.totalEarnings.toLocaleString()}</p>
                  <div className="flex items-center justify-end space-x-1">
                    <TrendingUp className="w-3 h-3 text-success-500" />
                    <span className="text-gray-400 text-xs">{entry.skillRating} SR</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default LeaderboardPage;
