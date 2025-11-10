import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Users, User, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tournaments', icon: Trophy, label: 'Leagues' },
    { path: '/lobby', icon: LayoutGrid, label: 'Play' },
    { path: '/friends', icon: Users, label: 'Friends' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-24 bg-transparent">
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-dark-900/80 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-screen-lg mx-auto px-2 h-full">
          <div className="flex justify-around items-center h-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isPlayButton = item.label === 'Play';

              if (isPlayButton) {
                return (
                  <div key={item.path} className="relative -top-6">
                    <Link to={item.path} aria-label={item.label}>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-full gradient-border gradient-purple-pink shadow-glow-purple"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-brand-purple to-brand-pink rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-label={item.label}
                  className="flex flex-col items-center justify-center flex-1 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-lg"
                >
                  <div className="relative">
                    <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-subtle-text'}`} />
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink"
                      />
                    )}
                  </div>
                  <span className={`mt-1 text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-subtle-text'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
