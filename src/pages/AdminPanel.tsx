import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, DollarSign, AlertTriangle, Activity, TrendingUp, Ban } from 'lucide-react';
import { generateTransactions } from '../data/mockData';

const AdminPanel: React.FC = () => {
  const [transactions] = useState(generateTransactions());

  const stats = [
    { label: 'Active Users', value: '12,345', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Revenue', value: '₹5.2M', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Active Matches', value: '234', icon: Activity, color: 'from-purple-500 to-purple-600' },
    { label: 'Pending Disputes', value: '12', icon: AlertTriangle, color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="bg-gradient-to-br from-dark-800 to-dark-700 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
          <h1 className="text-white text-xl font-bold">Admin Panel</h1>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-4`}
              >
                <Icon className="w-8 h-8 text-white mb-2" />
                <p className="text-white/80 text-xs mb-1">{stat.label}</p>
                <p className="text-white font-bold text-xl">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="glass-effect rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary-500" />
            Live Monitoring
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-700 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold text-sm">Match #{1000 + i}</span>
                  <span className="text-success-500 text-xs font-semibold flex items-center">
                    <div className="w-2 h-2 bg-success-500 rounded-full mr-1 animate-pulse"></div>
                    Live
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">4 Players • ₹{i * 100} Entry</span>
                  <button className="text-primary-500 font-semibold">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            Dispute Management
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-700 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-semibold text-sm">Dispute #{2000 + i}</p>
                    <p className="text-gray-400 text-xs">Match #1234 • Reported by User{i}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-success-500 text-white text-xs rounded-lg font-semibold">
                      Resolve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg font-semibold">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            User Management
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-dark-700 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                      alt={`User ${i}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">User{i}_{1000 + i}</p>
                      <p className="text-gray-400 text-xs">₹{i * 5000} Total Deposits</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-primary-500/20 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                    </button>
                    <button className="p-2 bg-red-500/20 rounded-lg">
                      <Ban className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-500" />
            Recent Transactions
          </h3>
          <div className="space-y-2">
            {transactions.slice(0, 5).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white text-sm font-semibold">{txn.description}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(txn.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${
                    txn.type === 'deposit' ? 'text-success-500' : 'text-primary-500'
                  }`}>
                    {txn.type === 'deposit' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                  </p>
                  <p className={`text-xs ${
                    txn.status === 'completed' ? 'text-success-500' : 'text-yellow-500'
                  }`}>
                    {txn.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
