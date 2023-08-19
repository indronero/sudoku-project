import shuffleArray from './shuffleArray';
import generateCageConfigurations from'./CageConfigGenerator';



const isValidPlacement = (grid, row, col, num) => {
    const isInRow = grid[row].includes(num);
    const isInCol = grid.some(rowArray => rowArray[col] === num);
    const isInBox = grid.slice(Math.floor(row / 3) * 3, Math.floor(row / 3) * 3 + 3)
      .some(subRowArray =>
        subRowArray.slice(Math.floor(col / 3) * 3, Math.floor(col / 3) * 3 + 3)
        .includes(num)
      );
    
    return !isInRow && !isInCol && !isInBox;
  };
  
  export const generateCompletedGrid = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const grid = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
    
    const solveSudoku = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            const shuffledNumbers = shuffleArray([...numbers]);
            for (const num of shuffledNumbers) {
              if (isValidPlacement(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku()) {
                  return true;
                }
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    solveSudoku();
    return grid;
  };


 

 
export const generateKillerSudokuPuzzle = (numCages) => {
    const cageConfigurations = generateCageConfigurations(numCages);
  const killerSudokuPuzzle = generateCompletedGrid(cageConfigurations);
solveSudokuBacktrack(killerSudokuPuzzle, cageConfigurations);
return { puzzle: killerSudokuPuzzle, cageConfigs: cageConfigurations };
};

  const solveSudokuBacktrack = (board, cageConfigs) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValidPlacement(board, row, col, num, cageConfigs)) {
              board[row][col] = num;
              if (solveSudokuBacktrack(board, cageConfigs)) {
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


