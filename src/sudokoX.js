import React, { useState, useEffect } from 'react';
import './sudokuX.css'; // Make sure you have a styles.css file for styling


function XudokuGame() {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    // Implement the logic to generate a new X Sudoku puzzle
    // Set the generated puzzle to the board state
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  const handleNumberInput = (number) => {
    if (selectedCell !== null) {
      const updatedBoard = [...board];
      updatedBoard[selectedCell.row][selectedCell.col] = number;
      setBoard(updatedBoard);
    }
  };

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = board.map((row, r) =>
        row.map((cell, c) => (r === rowIndex && c === colIndex ? (value === '' ? '' : parseInt(value, 10)) : cell))
      );
      setBoard(newBoard);
    }
  };
  

  return (
    <div className="xudoku-game">
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellValue, colIndex) => (
          <div
          key={colIndex}
          className={`
            cell
            ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}
            ${cellValue === '' ? 'empty' : 'filled'}
          `}
          onClick={() => handleCellClick(rowIndex, colIndex)}
        >
          {cellValue === '' || (selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) ? (
            <input
              id={`cell-${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cellValue}
              onChange={(e) => handleCellChange(e, rowIndex, colIndex)} // Use handleCellChange here
              onFocus={(e) => e.target.select()} // Select input text when focused
            />
          ) : (
            cellValue
          )}
        </div>
        
         
            ))}
          </div>
        ))}
      </div>
      <div className="number-input">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button key={number} onClick={() => handleNumberInput(number)}>
            {number}
          </button>
        ))}
      </div>
      <button className="new-game-button" onClick={generateNewGame}>New Game</button>
    </div>
  );
}

export default XudokuGame;





