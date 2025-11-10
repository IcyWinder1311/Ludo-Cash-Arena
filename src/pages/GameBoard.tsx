import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, Trophy, Crown } from 'lucide-react';
import { GameState, LudoToken, PlayerColor, LudoPlayer } from '../types';
import { MAIN_PATH, BASE_POSITIONS, HOME_RUN_PATHS, START_POSITIONS, SAFE_SPOTS } from '../data/ludoConstants';
import Board from '../components/ludo/Board';
import Token from '../components/ludo/Token';
import Dice from '../components/ludo/Dice';
import PlayerInfo from '../components/PlayerInfo';

const initialPlayers: LudoPlayer[] = [
  { id: '1', username: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer2025', color: 'green', tokens: Array.from({ length: 4 }, (_, i) => ({ id: i, color: 'green', state: 'home', position: -1 })) },
  { id: '2', username: 'Opponent 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent1', color: 'red', tokens: Array.from({ length: 4 }, (_, i) => ({ id: i, color: 'red', state: 'home', position: -1 })) },
  { id: '3', username: 'Opponent 2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent2', color: 'yellow', tokens: Array.from({ length: 4 }, (_, i) => ({ id: i, color: 'yellow', state: 'home', position: -1 })) },
  { id: '4', username: 'Opponent 3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Opponent3', color: 'blue', tokens: Array.from({ length: 4 }, (_, i) => ({ id: i, color: 'blue', state: 'home', position: -1 })) },
];

const GameBoard: React.FC = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    players: initialPlayers.slice(0, 2), // Default to 1v1
    currentPlayerIndex: 0,
    diceValue: null,
    turnState: 'waiting_roll',
    winner: null,
    turnTimeRemaining: 30,
    message: "Your turn to roll the dice!",
  });
  const [playableTokens, setPlayableTokens] = useState<number[]>([]);

  const changePlayer = useCallback(() => {
    setGameState(prev => {
      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      return {
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
        turnState: 'waiting_roll',
        diceValue: null,
        turnTimeRemaining: 30,
        message: `${prev.players[nextPlayerIndex].username}'s turn to roll.`
      };
    });
    setPlayableTokens([]);
  }, []);

  const handleDiceRoll = () => {
    if (gameState.turnState !== 'waiting_roll') return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setGameState(prev => ({ ...prev, diceValue: roll, turnState: 'rolled', message: `You rolled a ${roll}!` }));
  };

  const handleTokenMove = (tokenToMove: LudoToken) => {
    if (!playableTokens.includes(tokenToMove.id) || !gameState.diceValue) return;

    setGameState(prev => {
      let newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayerIndex];
      const token = player.tokens.find(t => t.id === tokenToMove.id)!;

      if (token.state === 'home' && gameState.diceValue === 6) {
        token.state = 'active';
        token.position = START_POSITIONS[player.color];
      } else if (token.state === 'active' || token.state === 'safe') {
        const currentPathPos = token.position;
        const endOfPath = (START_POSITIONS[player.color] + 50) % 52;
        
        let newPathPos = currentPathPos + gameState.diceValue!;

        if (
            (player.color === 'green' && currentPathPos <= 50 && newPathPos > 50) ||
            (player.color === 'red' && currentPathPos <= 11 && newPathPos > 11) ||
            (player.color === 'yellow' && currentPathPos <= 24 && newPathPos > 24) ||
            (player.color === 'blue' && currentPathPos <= 37 && newPathPos > 37)
        ) {
            const stepsIntoHome = newPathPos - endOfPath -1;
            if(stepsIntoHome < 6) {
                token.position = 101 + stepsIntoHome;
                token.state = 'safe';
                if(stepsIntoHome === 5) token.state = 'finished';
            }
        } else {
            token.position = newPathPos % 52;
            token.state = SAFE_SPOTS.includes(token.position) || START_POSITIONS[player.color] === token.position ? 'safe' : 'active';
        }
      } else if (token.state === 'safe' && token.position >= 101) {
          const newHomePos = token.position + gameState.diceValue!;
          if(newHomePos <= 106) {
              token.position = newHomePos;
              if(newHomePos === 106) token.state = 'finished';
          }
      }

      // Capture logic
      if (token.state === 'active') {
        newPlayers.forEach((p, pIndex) => {
          if (pIndex !== prev.currentPlayerIndex) {
            p.tokens.forEach(t => {
              if (t.position === token.position && t.state === 'active') {
                t.state = 'home';
                t.position = -1;
              }
            });
          }
        });
      }
      
      const allFinished = player.tokens.every(t => t.state === 'finished');
      if (allFinished) {
        return { ...prev, players: newPlayers, winner: player.color, turnState: 'game_over', message: `${player.username} wins!` };
      }

      return { ...prev, players: newPlayers };
    });

    if (gameState.diceValue !== 6) {
      changePlayer();
    } else {
      setGameState(prev => ({ ...prev, turnState: 'waiting_roll', diceValue: null, message: "Rolled a 6! Roll again." }));
      setPlayableTokens([]);
    }
  };

  useEffect(() => {
    if (gameState.turnState === 'rolled' && gameState.diceValue) {
      const player = gameState.players[gameState.currentPlayerIndex];
      const dice = gameState.diceValue;

      const movableTokens = player.tokens.filter(token => {
        if (token.state === 'finished') return false;
        if (token.state === 'home') return dice === 6;
        if (token.position >= 101) { // in home run
          return token.position + dice <= 106;
        }
        return true;
      }).map(t => t.id);

      if (movableTokens.length > 0) {
        setPlayableTokens(movableTokens);
        setGameState(prev => ({ ...prev, message: "Select a token to move." }));
      } else {
        setGameState(prev => ({ ...prev, message: "No possible moves. Next player." }));
        setTimeout(changePlayer, 1500);
      }
    }
  }, [gameState.turnState, gameState.diceValue, gameState.players, gameState.currentPlayerIndex, changePlayer]);

  const getTokenPositionStyle = (token: LudoToken): React.CSSProperties => {
    const boardSize = 100; // Assuming board is 100% of its container
    const cellSize = boardSize / 15;

    if (token.state === 'home') {
      const basePositions = BASE_POSITIONS[token.color];
      const tokenIndex = token.id;
      const [gridRow, gridCol] = basePositions[tokenIndex];
      return {
        top: `${gridRow * cellSize}%`,
        left: `${gridCol * cellSize}%`,
      };
    }

    let coords: [number, number];
    if (token.position >= 101) { // Home run
      coords = HOME_RUN_PATHS[token.color][token.position - 101];
    } else { // Main path
      coords = MAIN_PATH[token.position];
    }

    return {
      top: `${coords[0] * cellSize}%`,
      left: `${coords[1] * cellSize}%`,
    };
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col p-4 justify-center items-center">
      <div className="w-full max-w-lg mx-auto mb-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/lobby')} className="p-2 text-light-text"><ArrowLeft /></button>
          <h2 className="text-xl font-bold text-white">Ludo Match</h2>
          <button className="p-2 text-light-text"><MessageCircle /></button>
        </div>
      </div>
      
      <div className="w-full max-w-lg mx-auto grid grid-cols-2 gap-2 mb-4">
        {gameState.players.map((p, i) => (
            <PlayerInfo key={p.id} player={p} isCurrent={i === gameState.currentPlayerIndex} timeRemaining={gameState.turnTimeRemaining} />
        ))}
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        <Board />
        <AnimatePresence>
          {gameState.players.flatMap(p => p.tokens).map(token => (
            <motion.div
              key={`${token.color}-${token.id}`}
              className="absolute"
              style={getTokenPositionStyle(token)}
              initial={false}
              animate={{
                top: getTokenPositionStyle(token).top,
                left: getTokenPositionStyle(token).left,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Token
                token={token}
                isPlayable={playableTokens.includes(token.id) && gameState.currentPlayerIndex === gameState.players.findIndex(p => p.color === token.color)}
                onClick={() => handleTokenMove(token)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-lg mx-auto mt-4 text-center">
        <p className="text-light-text h-6 mb-2">{gameState.message}</p>
        <Dice
          value={gameState.diceValue}
          isRolling={gameState.turnState === 'waiting_roll' && gameState.currentPlayerIndex === 0}
          onClick={handleDiceRoll}
          isMyTurn={gameState.turnState === 'waiting_roll' && gameState.currentPlayerIndex === 0}
        />
      </div>

      <AnimatePresence>
        {gameState.winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="glass-effect rounded-3xl p-8 text-center max-w-sm mx-4"
            >
              <Crown className="w-20 h-20 text-gold mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2 capitalize">{gameState.winner} Wins!</h2>
              <p className="text-gold text-2xl font-bold mb-6">+₹180</p>
              <button
                onClick={() => navigate('/lobby')}
                className="w-full gradient-purple-pink text-white font-bold py-4 rounded-xl"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameBoard;
