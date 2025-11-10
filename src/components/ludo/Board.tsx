import React from 'react';
import { MAIN_PATH, BASE_POSITIONS, HOME_RUN_PATHS, SAFE_SPOTS, START_POSITIONS } from '../../data/ludoConstants';
import { PlayerColor } from '../../types';
import { Star } from 'lucide-react';

const Board: React.FC = () => {
  const renderCell = (row: number, col: number) => {
    const isBasePath = (row < 6 || row > 8) && (col < 6 || col > 8);
    let bgColor = 'bg-dark-800';
    let content: React.ReactNode = null;

    // Colored Bases
    if (row < 6 && col < 6) bgColor = 'bg-ludo-green-dark';
    if (row < 6 && col > 8) bgColor = 'bg-ludo-red-dark';
    if (row > 8 && col < 6) bgColor = 'bg-ludo-blue-dark';
    if (row > 8 && col > 8) bgColor = 'bg-ludo-yellow-dark';

    // Center Home
    if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
      const isCenter = row === 7 && col === 7;
      if (isCenter) {
        return (
          <div key={`${row}-${col}`} className="relative">
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[50%] border-l-transparent border-b-[50%] border-b-ludo-green border-r-[50%] border-r-transparent" style={{width: '100%', height: '100%'}}/>
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[50%] border-t-transparent border-r-[50%] border-r-ludo-red border-b-[50%] border-b-transparent" style={{width: '100%', height: '100%'}}/>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[50%] border-r-transparent border-b-[50%] border-b-ludo-yellow border-l-[50%] border-l-transparent" style={{width: '100%', height: '100%'}}/>
            <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[50%] border-b-transparent border-l-[50%] border-l-ludo-blue border-t-[50%] border-t-transparent" style={{width: '100%', height: '100%'}}/>
          </div>
        );
      }
    }

    // Path cells
    const pathIndex = MAIN_PATH.findIndex(([r, c]) => r === row && c === col);
    if (pathIndex !== -1) {
      bgColor = 'bg-ludo-path';
      if (Object.values(START_POSITIONS).includes(pathIndex)) {
        const color = (Object.keys(START_POSITIONS) as PlayerColor[]).find(c => START_POSITIONS[c] === pathIndex);
        bgColor = `bg-ludo-${color}`;
      }
      if (SAFE_SPOTS.includes(pathIndex)) {
        content = <Star className="w-4 h-4 text-dark-800 fill-current" />;
      }
    }

    // Home run paths
    Object.entries(HOME_RUN_PATHS).forEach(([color, path]) => {
      if (path.some(([r, c]) => r === row && c === col)) {
        bgColor = `bg-ludo-${color}`;
      }
    });

    return (
      <div key={`${row}-${col}`} className={`w-full h-full ${bgColor} flex items-center justify-center`}>
        {content}
      </div>
    );
  };

  const renderBase = (color: PlayerColor) => {
    const positions = BASE_POSITIONS[color];
    const bgColor = `bg-ludo-${color}`;
    
    return (
      <div className={`col-span-6 row-span-6 ${bgColor} p-2 grid grid-cols-6 grid-rows-6`}>
        <div className="col-span-4 row-span-4 col-start-2 row-start-2 bg-white/50 rounded-lg grid grid-cols-2 grid-rows-2 gap-2 p-2">
          {positions.map(([r, c], i) => (
            <div key={i} id={`base-${color}-${i}`} className="bg-white rounded-full shadow-inner-strong" />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="aspect-square w-full max-w-lg mx-auto bg-dark-900 p-2 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-15 grid-rows-15 gap-px bg-dark-700">
        {renderBase('green')}
        <div className="col-span-3 row-span-6" />
        {renderBase('red')}

        <div className="col-span-6 row-span-3" />
        <div className="col-span-3 row-span-3 bg-dark-800" />
        <div className="col-span-6 row-span-3" />

        {renderBase('blue')}
        <div className="col-span-3 row-span-6" />
        {renderBase('yellow')}
        
        {/* Render path cells over the top */}
        {Array.from({ length: 15*15 }).map((_, i) => {
          const row = Math.floor(i / 15);
          const col = i % 15;
          const isPath = MAIN_PATH.some(([r,c]) => r === row && c === col) || 
                         Object.values(HOME_RUN_PATHS).flat().some(([r,c]) => r === row && c === col);
          const isCenter = row >= 6 && row <= 8 && col >= 6 && col <= 8;

          if (isPath || isCenter) {
            return (
              <div key={`cell-overlay-${i}`} style={{ gridColumn: col + 1, gridRow: row + 1 }}>
                {renderCell(row, col)}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Board;
