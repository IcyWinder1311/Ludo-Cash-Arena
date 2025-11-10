import { faker } from '@faker-js/faker';
import { Match, Tournament, LeaderboardEntry, Transaction } from '../types';

export const generateMatches = (): Match[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `match-${i + 1}`,
    type: i % 3 === 0 ? '1v1' : '4-player',
    entryFee: [50, 100, 250, 500, 1000][Math.floor(Math.random() * 5)],
    prizePool: 0,
    status: ['waiting', 'in-progress'][Math.floor(Math.random() * 2)] as 'waiting' | 'in-progress',
    players: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
      id: faker.string.uuid(),
      username: faker.internet.username(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${faker.internet.username()}`,
      skillRating: faker.number.int({ min: 1000, max: 2500 }),
      isReady: Math.random() > 0.3,
    })),
    maxPlayers: i % 3 === 0 ? 2 : 4,
    createdAt: faker.date.recent().toISOString(),
    skillRatingRange: [1000, 2000],
  })).map(match => ({
    ...match,
    prizePool: match.entryFee * match.maxPlayers * 0.9,
  }));
};

export const generateTournaments = (): Tournament[] => {
  return [
    {
      id: 'tournament-1',
      name: 'Mega Jackpot Weekend',
      entryFee: 100,
      prizePool: 100000,
      totalPrizes: 50000,
      type: 'jackpot',
      startTime: new Date(Date.now() + 3600000).toISOString(),
      endTime: new Date(Date.now() + 86400000).toISOString(),
      participants: 847,
      maxParticipants: 1000,
      status: 'upcoming',
      prizes: [
        { rank: '1st', amount: 25000 },
        { rank: '2nd', amount: 15000 },
        { rank: '3rd', amount: 10000 },
      ],
    },
    {
      id: 'tournament-2',
      name: 'Pro League Championship',
      entryFee: 500,
      prizePool: 250000,
      totalPrizes: 150000,
      type: 'league',
      startTime: new Date(Date.now() - 3600000).toISOString(),
      endTime: new Date(Date.now() + 172800000).toISOString(),
      participants: 456,
      maxParticipants: 500,
      status: 'live',
      prizes: [
        { rank: '1st', amount: 75000 },
        { rank: '2nd', amount: 45000 },
        { rank: '3rd', amount: 30000 },
      ],
    },
    {
      id: 'tournament-3',
      name: 'Knockout Battle Royale',
      entryFee: 250,
      prizePool: 50000,
      totalPrizes: 30000,
      type: 'knockout',
      startTime: new Date(Date.now() + 7200000).toISOString(),
      endTime: new Date(Date.now() + 93600000).toISOString(),
      participants: 178,
      maxParticipants: 200,
      status: 'upcoming',
      prizes: [
        { rank: '1st', amount: 15000 },
        { rank: '2nd', amount: 9000 },
        { rank: '3rd', amount: 6000 },
      ],
    },
  ];
};

export const generateLeaderboard = (): LeaderboardEntry[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    rank: i + 1,
    user: {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${faker.internet.username()}`,
    },
    gamesPlayed: faker.number.int({ min: 100, max: 1000 }),
    gamesWon: faker.number.int({ min: 50, max: 700 }),
    winRate: parseFloat(faker.number.float({ min: 40, max: 85, fractionDigits: 1 }).toFixed(1)),
    totalEarnings: parseFloat(faker.number.float({ min: 5000, max: 500000, fractionDigits: 2 }).toFixed(2)),
    skillRating: 2500 - (i * 30) + faker.number.int({ min: -20, max: 20 }),
  }));
};

export const generateTransactions = (): Transaction[] => {
  const types: Transaction['type'][] = ['deposit', 'withdrawal', 'win', 'loss', 'bonus'];
  const methods = ['UPI', 'Card', 'Wallet'];
  
  return Array.from({ length: 20 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const isDeposit = type === 'deposit';
    const isWithdrawal = type === 'withdrawal';
    
    return {
      id: `txn-${i + 1}`,
      type,
      amount: parseFloat(faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }).toFixed(2)),
      status: Math.random() > 0.1 ? 'completed' : 'pending',
      method: isDeposit || isWithdrawal ? methods[Math.floor(Math.random() * methods.length)] : undefined,
      timestamp: faker.date.recent({ days: 30 }).toISOString(),
      description: type === 'deposit' ? 'Wallet Deposit' :
                   type === 'withdrawal' ? 'Withdrawal to Bank' :
                   type === 'win' ? 'Match Win' :
                   type === 'loss' ? 'Match Entry' :
                   'Daily Bonus',
    };
  });
};
