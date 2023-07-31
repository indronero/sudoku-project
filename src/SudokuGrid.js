import React, { useState } from 'react';
import './SudokuGrid.css';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value;
    setBoard(newBoard);
    console.log('Updated Board:', newBoard);
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cellValue, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className="sudoku-cell"
              value={cellValue}
              maxLength={1}
              onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
