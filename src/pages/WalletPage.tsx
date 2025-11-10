import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, ArrowDownToLine, Wallet, CreditCard, Smartphone, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateTransactions } from '../data/mockData';
import BottomNav from '../components/BottomNav';

const WalletPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [transactions] = useState(generateTransactions());

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone },
    { id: 'card', name: 'Card', icon: CreditCard },
    { id: 'wallet', name: 'Wallet', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <div className="bg-gradient-to-br from-brand-purple to-brand-pink px-4 pt-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" aria-label="Go back to dashboard">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
          </Link>
          <h1 className="text-white text-xl font-bold">My Wallet</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-6">
          <p className="text-white/80 text-sm mb-2">Total Balance</p>
          <h2 className="text-5xl font-bold text-white mb-4">₹{user?.walletBalance.toFixed(2)}</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-white/70 text-xs mb-1">Deposit</p>
              <p className="text-white font-bold text-lg">₹{user?.depositBalance.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-white/70 text-xs mb-1">Winnings</p>
              <p className="text-gold font-bold text-lg">₹{user?.winningsBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="glass-effect rounded-2xl p-4 mb-6">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'deposit'
                  ? 'bg-gradient-to-r from-brand-teal to-brand-blue text-white'
                  : 'bg-dark-700 text-subtle-text'
              }`}
            >
              <Plus className="w-4 h-4 inline-block mr-1" />
              Deposit
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'withdraw'
                  ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white'
                  : 'bg-dark-700 text-subtle-text'
              }`}
            >
              <ArrowDownToLine className="w-4 h-4 inline-block mr-1" />
              Withdraw
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="amount-input" className="block text-light-text text-sm mb-2">Amount</label>
              <input
                id="amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-subtle-text focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>

            <div className="flex gap-2">
              {[100, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  aria-label={`Set amount to ${amt}`}
                  className="flex-1 bg-dark-700 hover:bg-dark-800 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-light-text text-sm mb-2">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      aria-label={`Pay with ${method.name}`}
                      className="bg-dark-700 hover:bg-brand-purple/20 border border-white/10 hover:border-brand-purple rounded-xl p-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                    >
                      <Icon className="w-6 h-6 text-brand-purple mx-auto mb-1" />
                      <p className="text-white text-xs font-semibold">{method.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 rounded-xl font-bold text-white ${
                activeTab === 'deposit' ? 'bg-gradient-to-r from-brand-teal to-brand-blue' : 'bg-gradient-to-r from-brand-purple to-brand-pink'
              }`}
            >
              {activeTab === 'deposit' ? 'Add Money' : 'Withdraw'}
            </motion.button>

            {activeTab === 'withdraw' && !user?.isKycVerified && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
                <p className="text-yellow-400 text-sm text-center">
                  Complete KYC to withdraw money. <Link to="/kyc" className="font-bold underline">Verify Now</Link>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    ['deposit', 'win', 'bonus'].includes(txn.type)
                      ? 'bg-brand-teal/20'
                      : 'bg-brand-pink/20'
                  }`}>
                    {['deposit', 'win', 'bonus'].includes(txn.type) ? (
                      <TrendingUp className="w-5 h-5 text-brand-teal" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-brand-pink" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{txn.description}</p>
                    <p className="text-subtle-text text-xs">
                      {new Date(txn.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    ['deposit', 'win', 'bonus'].includes(txn.type)
                      ? 'text-brand-teal'
                      : 'text-brand-pink'
                  }`}>
                    {['deposit', 'win', 'bonus'].includes(txn.type) ? '+' : '-'}
                    ₹{txn.amount.toFixed(2)}
                  </p>
                  <p className={`text-xs capitalize ${
                    txn.status === 'completed' ? 'text-green-400' :
                    txn.status === 'pending' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {txn.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default WalletPage;
