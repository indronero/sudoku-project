import shuffleArray from './shuffleArray';

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
  const grid = Array.from({ length: 9 }, () => []);

  for (let i = 0; i < 9; i++) {
    const shuffledNumbers = shuffleArray([...numbers]);
    for (let j = 0; j < 9; j++) {
      let num = shuffledNumbers.pop();
      while (!num || !isValidPlacement(grid, i, j, num)) {
        if (!num) {
          console.log(`Cannot place a valid number in [${i}][${j}]`);
          // Handle this case as needed
          break;
        }
        num = shuffledNumbers.pop();
      }
      grid[i][j] = num;
    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Math.random() < 0.5) {
        grid[i][j] = '';
      }
    }
  }

  return grid;
};

export const applyXSudokuRules = (grid) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const diagonalNumbers = shuffleArray([...numbers]);

  for (let i = 0; i < 9; i++) {
    grid[i][i] = diagonalNumbers[i];
  }

  for (let i = 0; i < 9; i++) {
    grid[i][8 - i] = diagonalNumbers[i];
  }

  for (let i = 0; i < 9; i++) {
    if (Math.random() < 0.5) {
      grid[i][i] = '';
    }
    if (Math.random() < 0.5) {
      grid[i][8 - i] = '';
    }
  }

  return grid;
};

export default generateCompletedGrid;
