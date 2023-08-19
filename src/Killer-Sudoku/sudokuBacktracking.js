import { applyXSudokuRules, isValidPlacement, shuffleArray } from './puzzleGenerator';

export const generateCompletedGridBacktrack = () => {
  const grid = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

  // Fill the main diagonal using applyXSudokuRules
  applyXSudokuRules(grid);

  // Generate the rest of the grid using backtracking
  if (!fillRemainingCells(grid, 0, 3)) {
    // Handle the case where no valid solution is found
    console.log('No valid solution found');
    return null;
  }

  return grid;
};

const fillRemainingCells = (grid, row, col) => {
  if (row === 9) {
    return true; // All cells are filled
  }

  if (col === 9) {
    return fillRemainingCells(grid, row + 1, 0); // Move to the next row
  }

  if (grid[row][col] !== 0) {
    return fillRemainingCells(grid, row, col + 1); // Move to the next column
  }

  // Try placing numbers 1-9 in the current cell
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of numbers) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;

      if (fillRemainingCells(grid, row, col + 1)) {
        return true; // Continue to the next cell
      }

      // Backtrack
      grid[row][col] = 0;
    }
  }

  return false; // No valid number found, backtrack
};
