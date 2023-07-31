// Function to generate pencil marks for an empty cell
export function generatePencilMarks(board, row, col) {
    if (board[row][col] !== '') {
      return [];
    }
  
    const marks = new Set(Array.from({ length: 9 }, (_, index) => index + 1));
  
    // Check row
    for (let i = 0; i < 9; i++) {
      marks.delete(parseInt(board[row][i]));
    }
  
    // Check column
    for (let i = 0; i < 9; i++) {
      marks.delete(parseInt(board[i][col]));
    }
  
    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        marks.delete(parseInt(board[i][j]));
      }
    }
  
    return Array.from(marks);
  }
  
  // Function to update pencil marks for all empty cells
  export function updatePencilMarks(board) {
    return board.map((row, rowIndex) =>
      row.map((cellValue, colIndex) => {
        if (cellValue === '') {
          return generatePencilMarks(board, rowIndex, colIndex);
        }
        return [];
      })
    );
  }
  