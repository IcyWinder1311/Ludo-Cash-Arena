import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, Search } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const FriendsPage: React.FC = () => {
  const friends = [
    { name: 'GamerX', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerX', status: 'Online' },
    { name: 'LudoQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LudoQueen', status: 'In Game' },
    { name: 'DiceMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DiceMaster', status: 'Offline' },
    { name: 'RajaLudo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RajaLudo', status: 'Online' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
          <h1 className="text-white text-xl font-bold">Friends</h1>
          <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle-text" />
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full bg-dark-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-subtle-text focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      <div className="px-4 py-6 space-y-3">
        <h2 className="text-light-text font-semibold mb-2">Your Friends ({friends.length})</h2>
        {friends.map((friend, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-effect rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
                {friend.status === 'Online' && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-dark-900" />
                )}
              </div>
              <div>
                <p className="text-white font-semibold">{friend.name}</p>
                <p className={`text-xs ${
                  friend.status === 'Online' ? 'text-green-400' : 
                  friend.status === 'In Game' ? 'text-yellow-400' : 'text-subtle-text'
                }`}>
                  {friend.status}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-brand-purple/20 text-brand-purple font-semibold rounded-lg text-sm hover:bg-brand-purple/30 transition-colors">
              Challenge
            </button>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default FriendsPage;
