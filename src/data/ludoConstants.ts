import { PlayerColor } from '../types';

export const BOARD_SIZE = 15;
export const PLAYER_COLORS: PlayerColor[] = ['green', 'red', 'yellow', 'blue'];

// Grid coordinates for home bases
export const BASE_POSITIONS = {
  green: [[1, 1], [1, 4], [4, 1], [4, 4]],
  red: [[1, 10], [1, 13], [4, 10], [4, 13]],
  yellow: [[10, 10], [10, 13], [13, 10], [13, 13]],
  blue: [[10, 1], [10, 4], [13, 1], [13, 4]],
};

// Start position for each color
export const START_POSITIONS: Record<PlayerColor, number> = {
  green: 0,
  red: 13,
  yellow: 26,
  blue: 39,
};

// Safe spots on the board (excluding start positions)
export const SAFE_SPOTS = [8, 21, 34, 47];

// The main path coordinates (52 steps)
export const MAIN_PATH: [number, number][] = [
  // Green side
  [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [5, 6], [4, 6], [3, 6], [2, 6], [1, 6],
  [0, 7], [1, 8],
  // Red side
  [2, 8], [3, 8], [4, 8], [5, 8], [6, 9],
  [6, 10], [6, 11], [6, 12], [6, 13], [7, 14],
  [8, 13], [8, 12],
  // Yellow side
  [8, 11], [8, 10], [8, 9], [9, 8], [10, 8],
  [11, 8], [12, 8], [13, 8], [14, 7], [13, 6],
  // Blue side
  [12, 6], [11, 6], [10, 6], [9, 6], [8, 5],
  [8, 4], [8, 3], [8, 2], [8, 1], [7, 0],
];

// Home run paths for each color
export const HOME_RUN_PATHS: Record<PlayerColor, [number, number][]> = {
  green: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  red: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  yellow: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
  blue: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
};
