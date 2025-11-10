import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  username: 'ProGamer2025',
  email: 'user@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer2025',
  walletBalance: 2500.50,
  depositBalance: 1500.00,
  winningsBalance: 1000.50,
  skillRating: 1850,
  gamesPlayed: 234,
  gamesWon: 156,
  isKycVerified: true,
  kycStatus: 'verified',
  referralCode: 'PROG2025',
  createdAt: '2024-01-15T10:30:00Z',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
  };

  const signup = async (username: string, email: string, password: string, phone: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      ...mockUser,
      username,
      email,
      phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      walletBalance: 0,
      depositBalance: 0,
      winningsBalance: 0,
      skillRating: 1000,
      gamesPlayed: 0,
      gamesWon: 0,
      isKycVerified: false,
      kycStatus: 'not_started',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
