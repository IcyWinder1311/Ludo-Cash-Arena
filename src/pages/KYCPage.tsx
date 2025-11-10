import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const KYCPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    panNumber: '',
    aadhaarNumber: '',
    bankAccount: '',
    ifscCode: '',
  });

  const handleSubmit = () => {
    updateUser({ kycStatus: 'pending' });
    setTimeout(() => {
      updateUser({ isKycVerified: true, kycStatus: 'verified', walletBalance: (user?.walletBalance || 0) + 50 });
      navigate('/wallet');
    }, 2000);
  };

  if (user?.isKycVerified) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="glass-effect rounded-3xl p-8 text-center max-w-md"
        >
          <CheckCircle className="w-20 h-20 text-success-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">KYC Verified</h2>
          <p className="text-gray-400 mb-6">Your account is fully verified</p>
          <Link to="/wallet">
            <button className="w-full gradient-success text-white font-bold py-3 rounded-xl">
              Back to Wallet
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
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
          <h1 className="text-white text-xl font-bold">KYC Verification</h1>
          <div className="w-10" />
        </div>

        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-white text-primary-600' : 'bg-white/20 text-white'
              } font-bold`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-white' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="glass-effect rounded-2xl p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Personal Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">PAN Number</label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    placeholder="ABCDE1234F"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Aadhaar Number</label>
                  <input
                    type="text"
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    placeholder="1234 5678 9012"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Bank Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Bank Account Number</label>
                  <input
                    type="text"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    placeholder="123456789012"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">IFSC Code</label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    placeholder="ABCD0123456"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Upload Documents</h3>
              <div className="space-y-4">
                <div className="bg-dark-700 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-white font-semibold mb-1">Upload PAN Card</p>
                  <p className="text-gray-400 text-xs">JPG, PNG (Max 5MB)</p>
                  <button className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold">
                    Choose File
                  </button>
                </div>
                <div className="bg-dark-700 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-white font-semibold mb-1">Upload Aadhaar</p>
                  <p className="text-gray-400 text-xs">JPG, PNG (Max 5MB)</p>
                  <button className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold">
                    Choose File
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-6 flex space-x-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-dark-700 text-white font-bold py-3 rounded-xl"
              >
                Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              className="flex-1 gradient-primary text-white font-bold py-3 rounded-xl"
            >
              {step < 3 ? 'Continue' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-400 font-semibold text-sm mb-1">Why KYC?</p>
            <p className="text-gray-300 text-xs">
              KYC verification is mandatory for withdrawals and ensures secure transactions. Get ₹50 bonus upon completion!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
