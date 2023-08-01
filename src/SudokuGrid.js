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

    // Generate and update pencil marks for the entire board
    const updatedPencilMarks = updatePencilMarks(newBoard);
    setPencilMarks(updatedPencilMarks);
    console.log('Updated Marks:', updatedPencilMarks);
  };

  const handleGenerateMarksClick = () => {
    setShowPencilMarks((prevShowPencilMarks) => !prevShowPencilMarks); // Toggle the showPencilMarks state
  };

  const getSubgridIndex = (rowIndex, colIndex) => {
    const subgridRow = Math.floor(rowIndex / 3);
    const subgridCol = Math.floor(colIndex / 3);
    return subgridRow * 3 + subgridCol;
  };

  useEffect(() => {
    if (showPencilMarks) {
      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(board);
      setPencilMarks(updatedPencilMarks);
    }
  }, [showPencilMarks, board]);

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cellValue, colIndex) => {
            const subgridIndex = getSubgridIndex(rowIndex, colIndex);
          
            return (
              <div
                key={colIndex} className= "sudoku-cell-container" >
                <input
                  type="text"
                  className= {`sudoku-cell subgrid-${subgridIndex}`}
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
            );
          })}
        </div>
      ))}
      <button onClick={handleGenerateMarksClick}>Generate Pencil Marks</button>
    </div>
  );
};

export default SudokuBoard;
