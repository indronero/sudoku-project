import React, { useState, useEffect } from 'react';
import './sudokuX.css';
import { generateCompletedGrid, applyXSudokuRules } from './puzzleGenerator';

function XudokuGame() {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [selectedCell, setSelectedCell] = useState(null);


  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    const newPuzzle = generateXSudokuPuzzle();
    setBoard(newPuzzle);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] === '') {
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
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

  const isDiagonalCell = (rowIndex, colIndex) => {
    return rowIndex === colIndex || rowIndex === 8 - colIndex;
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
                  ${isDiagonalCell(rowIndex, colIndex) ? 'diagonal-cell' : ''}

                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cellValue === '' || (selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) ? (
                  <input
                    id={`cell-${rowIndex}-${colIndex}`}
                    type="text"
                    maxLength="1"
                    value={cellValue}
                    onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                    onFocus={(e) => e.target.select()}
                    readOnly={cellValue !== ''} // Set readOnly attribute

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

const generateXSudokuPuzzle = () => {
  const completedGrid = generateCompletedGrid();
  const xSudokuGrid = applyXSudokuRules(completedGrid);
  const newBoard = xSudokuGrid.map(row => row.map(cellValue => {
    if (cellValue !== undefined) { // Add an undefined check here
      return cellValue.toString();
    }
    return '';
  }));

  return newBoard;

};


export default XudokuGame;
