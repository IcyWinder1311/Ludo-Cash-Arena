export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  walletBalance: number;
  depositBalance: number;
  winningsBalance: number;
  skillRating: number;
  gamesPlayed: number;
  gamesWon: number;
  isKycVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started';
  referralCode: string;
  createdAt: string;
}

export interface Match {
  id: string;
  type: '1v1' | '4-player';
  entryFee: number;
  prizePool: number;
  status: 'waiting' | 'in-progress' | 'completed';
  players: Player[];
  maxPlayers: number;
  createdAt: string;
  startedAt?: string;
  skillRatingRange?: [number, number];
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  skillRating: number;
  position?: number;
  tokenPositions?: number[];
  isReady?: boolean;
}

export interface Tournament {
  id:string;
  name: string;
  entryFee: number;
  prizePool: number;
  totalPrizes: number;
  type: 'knockout' | 'league' | 'jackpot';
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'live' | 'completed';
  prizes: Prize[];
}

export interface Prize {
  rank: string;
  amount: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'win' | 'loss' | 'refund' | 'bonus';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method?: string;
  timestamp: string;
  description: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  totalEarnings: number;
  skillRating: number;
}

// Ludo Game Specific Types
export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';
export type TokenState = 'home' | 'active' | 'safe' | 'finished';
export type TurnState = 'waiting_roll' | 'rolled' | 'moving' | 'game_over';

export interface LudoToken {
  id: number;
  color: PlayerColor;
  state: TokenState;
  position: number; // -1 for home base, 0-51 for main path, 101-106 for home run, 999 for finished
}

export interface LudoPlayer {
  id: string;
  username: string;
  avatar: string;
  color: PlayerColor;
  tokens: LudoToken[];
}

export interface GameState {
  players: LudoPlayer[];
  currentPlayerIndex: number;
  diceValue: number | null;
  turnState: TurnState;
  winner: PlayerColor | null;
  turnTimeRemaining: number;
  message: string;
}
