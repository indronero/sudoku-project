// PuzzleGeneration.js
import { generatePencilMarks, updatePencilMarks, usePencilMarks } from './Pencil-Marking/PencilMarking';

// Function to generate a random Sudoku puzzle
export function generateRandomSudokuPuzzle(difficulty = 0.7) {
  // Helper function to shuffle an array
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Helper function to check if a number can be placed in a cell
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

  // Initialize an empty 9x9 Sudoku board
  const board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

  // Helper function to fill the Sudoku board using backtracking
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

  // Start the backtracking to fill the Sudoku board
  solveSudokuBacktrack();

  // Helper function to remove numbers from the solved Sudoku board based on difficulty
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

      // Check if the board is still solvable with a unique solution
      const clonedBoard = JSON.parse(JSON.stringify(board));
      if (isSolvable(clonedBoard) !== 1) {
        board[row][col] = temp; // Revert the removal if the board becomes unsolvable
      }
    }
  };

  // Helper function to check if the board is solvable with a unique solution
  const isSolvable = (board) => {
    // Implement your logic here to check if the board is solvable
    // You can use the backtracking algorithm from the original solveSudokuBacktrack function to check solvability
    // Return 0 if the board is not solvable
    // Return 1 if the board has a unique solution
    // Return 2 if the board has multiple solutions
    // For now, we'll assume the board always has a unique solution
    return 1;
  };

  // Remove numbers from the solved Sudoku board based on difficulty
  removeNumbersBasedOnDifficulty(board, difficulty);

  // Convert the board to a string representation
  return board.map((row) => row.join('')).join('');
}
