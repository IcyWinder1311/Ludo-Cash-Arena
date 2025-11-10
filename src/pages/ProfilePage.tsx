import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, LogOut, Share2, Gift, HelpCircle, Shield, Trophy, Star, Users, Copy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BottomNav from '../components/BottomNav';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Gift, label: 'Referral & Rewards', value: user?.referralCode, link: '/profile' },
    { icon: Trophy, label: 'Achievements', value: '12/50', link: '/profile' },
    { icon: Shield, label: 'KYC Status', value: user?.isKycVerified ? 'Verified' : 'Pending', link: '/kyc' },
    { icon: HelpCircle, label: 'Help & Support', link: '/profile' },
    { icon: Settings, label: 'Settings', link: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="bg-gradient-to-br from-brand-purple to-brand-pink px-4 pt-6 pb-12">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-20 h-20 rounded-full border-4 border-white/20"
          />
          <div className="flex-1">
            <h2 className="text-white font-bold text-2xl">{user?.username}</h2>
            <p className="text-white/80 text-sm">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-gold font-semibold text-sm">{user?.skillRating} SR</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
            <p className="text-white font-bold text-xl">{user?.gamesPlayed}</p>
            <p className="text-white/70 text-xs">Games</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
            <p className="text-white font-bold text-xl">{user?.gamesWon}</p>
            <p className="text-white/70 text-xs">Wins</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
            <p className="text-white font-bold text-xl">
              {((user?.gamesWon || 0) / (user?.gamesPlayed || 1) * 100).toFixed(0)}%
            </p>
            <p className="text-white/70 text-xs">Win Rate</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="glass-effect rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-teal rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Refer Friends</p>
                <p className="text-subtle-text text-xs">Earn ₹100 per friend</p>
              </div>
            </div>
            <button aria-label="Share your referral code" className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-teal text-white font-semibold rounded-lg text-sm">
              <Share2 className="w-4 h-4 inline-block mr-1" />
              Share
            </button>
          </div>
          <div className="bg-dark-700 rounded-lg p-3 flex items-center justify-between">
            <code className="text-gold font-bold">{user?.referralCode}</code>
            <button aria-label="Copy referral code" className="text-brand-purple text-sm font-semibold flex items-center">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </button>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4 mb-4">
          <h3 className="text-white font-bold mb-3">Account</h3>
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} to={item.link} aria-label={item.label}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between py-3 px-3 bg-dark-700 rounded-xl hover:bg-dark-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-brand-purple" />
                      <span className="text-white font-medium text-sm">{item.label}</span>
                    </div>
                    {item.value && (
                      <span className={`text-sm font-semibold ${item.label === 'KYC Status' && item.value === 'Verified' ? 'text-green-400' : 'text-subtle-text'}`}>{item.value}</span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="w-full glass-effect py-4 rounded-xl flex items-center justify-center space-x-2 text-red-500 font-bold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
