export interface IPlayerScore {
  username: string;
  sudoku: number;
  pacman: number;
  tetris: number;
  bonus: number;
  total?: number;
}