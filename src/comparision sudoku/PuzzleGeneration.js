import { generatePencilMarks, updatePencilMarks, usePencilMarks } from './PencilMarking';

// Function to generate a random Sudoku puzzle
export function generateRandomSudokuPuzzle(difficulty = 0.5) {
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const isValidNumber = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (
        board[row][i] === num ||
        board[i][col] === num ||
        board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] === num
      ) {
        return false;
      }
    }
    return true;
  };

  const board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

  const solveSudokuBacktrack = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValidNumber(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudokuBacktrack()) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solveSudokuBacktrack();

  const removeNumbersBasedOnDifficulty = (board, difficulty) => {
    const cellsCount = 81;
    const cellsToRemove = Math.floor(cellsCount * difficulty);
    const cellsIndices = shuffleArray(Array.from({ length: cellsCount }, (_, index) => index));

    for (let i = 0; i < cellsToRemove; i++) {
      const cellIndex = cellsIndices[i];
      const row = Math.floor(cellIndex / 9);
      const col = cellIndex % 9;
      const temp = board[row][col];
      board[row][col] = 0;

      const clonedBoard = JSON.parse(JSON.stringify(board));
      if (isSolvable(clonedBoard) !== 1) {
        board[row][col] = temp;
      }
    }
  };

  const isSolvable = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidNumber(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudokuBacktrack()) {
                return 2; // Multiple solutions
              }
              board[row][col] = 0;
            }
          }
          return 0; // No solution found
        }
      }
    }
    return 1; // Unique solution found
  };

  removeNumbersBasedOnDifficulty(board, difficulty);

  return board;
}
