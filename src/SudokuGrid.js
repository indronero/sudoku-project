import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import { generatePencilMarks, updatePencilMarks } from './SudokuUtils';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [pencilMarks, setPencilMarks] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));
  const [showPencilMarks, setShowPencilMarks] = useState(false);

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value;
    setBoard(newBoard);
    console.log('Updated Board:', newBoard);
  };

  const handleGenerateMarksClick = () => {
    setShowPencilMarks((prevShowPencilMarks) => !prevShowPencilMarks); // Toggle the showPencilMarks state
    if (!showPencilMarks) {
      const newPencilMarks = updatePencilMarks(board); // Call updatePencilMarks only if showPencilMarks is true
      setPencilMarks(newPencilMarks);
      console.log('Updated Marks:', newPencilMarks);
    }
  };

  useEffect(() => {
    if (showPencilMarks) {
      const newPencilMarks = updatePencilMarks(board); // Call updatePencilMarks only if showPencilMarks is true
      setPencilMarks(newPencilMarks);
    }
  }, [showPencilMarks, board]);

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cellValue, colIndex) => (
            <div key={colIndex} className="sudoku-cell-container">
              <input
                type="text"
                className="sudoku-cell"
                value={cellValue}
                maxLength={1}
                onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
              />
              {showPencilMarks && cellValue === '' && (
                <div className="pencil-marks">
                  {pencilMarks[rowIndex][colIndex].map((mark) => (
                    <span key={mark} className="pencil-mark">
                      {mark}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleGenerateMarksClick}>Generate Pencil Marks</button>
    </div>
  );
};

export default SudokuBoard;
