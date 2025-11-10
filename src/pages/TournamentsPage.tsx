import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Zap } from 'lucide-react';
import { generateTournaments } from '../data/mockData';
import BottomNav from '../components/BottomNav';

const TournamentsPage: React.FC = () => {
  const [tournaments] = useState(generateTournaments());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-success-500';
      case 'upcoming':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 px-4 pt-6 pb-8">
        <h1 className="text-white text-2xl font-bold mb-2">Tournaments</h1>
        <p className="text-white/80">Compete for massive prize pools</p>
      </div>

      <div className="px-4 py-6 space-y-4">
        {tournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{tournament.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-semibold flex items-center ${getStatusColor(tournament.status)}`}>
                    <div className={`w-2 h-2 rounded-full mr-1 ${
                      tournament.status === 'live' ? 'bg-success-500 animate-pulse' : 'bg-yellow-500'
                    }`}></div>
                    {tournament.status.toUpperCase()}
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-400 text-xs">{tournament.type}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-secondary-400 font-bold text-xl">₹{tournament.prizePool.toLocaleString()}</p>
                <p className="text-gray-400 text-xs">Prize Pool</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-dark-700 rounded-xl p-2 text-center">
                <Trophy className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                <p className="text-white text-xs font-semibold">₹{tournament.entryFee}</p>
                <p className="text-gray-500 text-xs">Entry</p>
              </div>
              <div className="bg-dark-700 rounded-xl p-2 text-center">
                <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-white text-xs font-semibold">
                  {tournament.participants}/{tournament.maxParticipants}
                </p>
                <p className="text-gray-500 text-xs">Players</p>
              </div>
              <div className="bg-dark-700 rounded-xl p-2 text-center">
                <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-white text-xs font-semibold">
                  {new Date(tournament.startTime).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-xs">Starts</p>
              </div>
            </div>

            <div className="bg-dark-700 rounded-xl p-3 mb-3">
              <p className="text-gray-400 text-xs mb-2">Prize Distribution</p>
              <div className="space-y-1">
                {tournament.prizes.slice(0, 3).map((prize, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{prize.rank} Place</span>
                    <span className="text-secondary-400 font-bold">₹{prize.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-xl font-bold ${
                tournament.status === 'live'
                  ? 'gradient-success text-white'
                  : 'gradient-primary text-white'
              }`}
            >
              <Zap className="w-4 h-4 inline-block mr-2" />
              {tournament.status === 'live' ? 'Join Now' : 'Register'}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default TournamentsPage;
