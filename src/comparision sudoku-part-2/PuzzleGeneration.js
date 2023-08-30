// PuzzleGeneration.js

// Function to generate a random Greater Than Sudoku puzzle
export function generateRandomGreaterThanSudokuPuzzle(difficulty = 0.7) {
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
        board[row][i].number === num ||
        board[i][col].number === num ||
        board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)].number === num
      ) {
        return false;
      }
    }
    return true;
  };

  // Initialize an empty 9x9 Greater Than Sudoku board
  const board = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => ({
      number: 0,
      arrowTop: "<",
      arrowRight: ">",
      arrowBottom: ">",
      arrowLeft: "<",
    }))
  );

  // Helper function to fill the Greater Than Sudoku board using backtracking
  const solveGreaterThanSudokuBacktrack = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].number === 0) {
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValidNumber(board, row, col, num)) {
              board[row][col].number = num;
              if (solveGreaterThanSudokuBacktrack()) {
                return true;
              }
              board[row][col].number = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Start the backtracking to fill the Greater Than Sudoku board
  solveGreaterThanSudokuBacktrack();

  // Logic for assigning arrows based on the numeric relations in Greater Than Sudoku
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col].number > board[row + 1][col].number) {
        board[row][col].arrowBottom = ">";
        board[row + 1][col].arrowTop = "<";
      } else {
        board[row][col].arrowBottom = "<";
        board[row + 1][col].arrowTop = ">";
      }

      if (board[row][col].number > board[row][col + 1].number) {
        board[row][col].arrowRight = ">";
        board[row][col + 1].arrowLeft = "<";
      } else {
        board[row][col].arrowRight = "<";
        board[row][col + 1].arrowLeft = ">";
      }
    }
  }

  // Helper function to remove numbers from the solved Greater Than Sudoku board based on difficulty
  const removeNumbersBasedOnDifficulty = (board, difficulty) => {
    const cellsCount = 81;
    const cellsToRemove = Math.floor(cellsCount * difficulty);
    const cellsIndices = shuffleArray(Array.from({ length: cellsCount }, (_, index) => index));

    for (let i = 0; i < cellsToRemove; i++) {
      const cellIndex = cellsIndices[i];
      const row = Math.floor(cellIndex / 9);
      const col = cellIndex % 9;
      const temp = board[row][col].number;
      board[row][col].number = 0;

      // Check if the board is still solvable with a unique solution
      const clonedBoard = JSON.parse(JSON.stringify(board));
      if (isSolvable(clonedBoard) !== 1) {
        board[row][col].number = temp; // Revert the removal if the board becomes unsolvable
      }
    }
  };

  // Helper function to check if the board is solvable with a unique solution
  const isSolvable = (board) => {
    const solveGreaterThanSudokuBacktrack = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col].number === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValidNumber(board, row, col, num)) {
                board[row][col].number = num;
                if (solveGreaterThanSudokuBacktrack()) {
                  return true;
                }
                board[row][col].number = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const isValidNumber = (board, row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (
          board[row][i].number === num ||
          board[i][col].number === num ||
          board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)].number === num
        ) {
          return false;
        }
      }
      return true;
    };

    // Call the solveGreaterThanSudokuBacktrack function to check solvability
    return solveGreaterThanSudokuBacktrack() ? 1 : 0;
  };

  // Remove numbers from the solved Greater Than Sudoku board based on difficulty
  removeNumbersBasedOnDifficulty(board, difficulty);

  // Convert the board to a string representation
  return board.map((row) =>
    row
      .map(
        (cell) =>
          `${cell.number}${cell.arrowTop}${cell.arrowRight}${cell.arrowBottom}${cell.arrowLeft}`
      )
      .join("")
  ).join("");
}
