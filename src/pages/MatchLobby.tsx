import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Trophy, Zap, Plus, Search } from 'lucide-react';
import { generateMatches } from '../data/mockData';
import BottomNav from '../components/BottomNav';

const MatchLobby: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'1v1' | '4-player'>('1v1');
  const [matches] = useState(generateMatches());
  const navigate = useNavigate();

  const filteredMatches = matches.filter(m => m.type === activeTab);

  const handleJoinMatch = (matchId: string) => {
    navigate(`/game/${matchId}`);
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
          <h1 className="text-white text-xl font-bold">Match Lobby</h1>
          <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('1v1')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === '1v1'
                ? 'bg-white text-primary-600'
                : 'bg-white/20 text-white'
            }`}
          >
            <Users className="w-5 h-5 inline-block mr-2" />
            1v1 Battles
          </button>
          <button
            onClick={() => setActiveTab('4-player')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === '4-player'
                ? 'bg-white text-primary-600'
                : 'bg-white/20 text-white'
            }`}
          >
            <Trophy className="w-5 h-5 inline-block mr-2" />
            4 Players
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full gradient-secondary text-dark-900 font-bold py-4 rounded-xl mb-6 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Match</span>
        </motion.button>

        <div className="space-y-4">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    match.type === '1v1' ? 'bg-primary-500/20' : 'bg-secondary-500/20'
                  }`}>
                    {match.type === '1v1' ? (
                      <Users className="w-5 h-5 text-primary-500" />
                    ) : (
                      <Trophy className="w-5 h-5 text-secondary-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold">₹{match.entryFee} Entry</p>
                    <p className="text-gray-400 text-xs">Win ₹{match.prizePool.toFixed(0)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{match.players.length}/{match.maxPlayers}</p>
                  <p className="text-gray-400 text-xs">Players</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                {match.players.map((player, i) => (
                  <img
                    key={i}
                    src={player.avatar}
                    alt={player.username}
                    className="w-8 h-8 rounded-full border-2 border-dark-700"
                  />
                ))}
                {Array.from({ length: match.maxPlayers - match.players.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-8 h-8 rounded-full border-2 border-dashed border-gray-600"
                  />
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleJoinMatch(match.id)}
                className={`w-full py-3 rounded-xl font-semibold ${
                  match.status === 'waiting'
                    ? 'gradient-success text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                disabled={match.status !== 'waiting'}
              >
                {match.status === 'waiting' ? (
                  <>
                    <Zap className="w-4 h-4 inline-block mr-2" />
                    Join Match
                  </>
                ) : (
                  'In Progress'
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MatchLobby;
