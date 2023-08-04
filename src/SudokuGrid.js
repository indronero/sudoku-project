import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import { generatePencilMarks, updatePencilMarks, usePencilMarks } from './PencilMarking';
import { generateRandomSudokuPuzzle } from './PuzzleGeneration';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();
  const [showManualEntry, setShowManualEntry] = useState(false);

  const handleCellClick = (rowIndex, colIndex) => {
    const cellInput = document.getElementById(`cell-${rowIndex}-${colIndex}`);
    if (cellInput) {
      cellInput.focus();
    }
  };

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (value === '' || /^[1-9]$/.test(value)) {
      // Check if the input is empty or a single digit number from 1 to 9
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = value === '' ? '' : parseInt(value, 10);
      setBoard(newBoard);
      console.log('Updated Board:', newBoard);
  
      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(newBoard);
      setPencilMarks(updatedPencilMarks);
      console.log('Updated Marks:', updatedPencilMarks);
    }
  };
  
  

  /*const handleGenerateMarksClick = () => {
    setShowPencilMarks((prevShowPencilMarks) => !prevShowPencilMarks); // Toggle the showPencilMarks state
  };*/

  const handleAutoGenerateClick = () => {
    const puzzleString = generateRandomSudokuPuzzle();
    const generatedPuzzle = puzzleString
      .match(/.{9}/g)
      .map(row => row.split(''));
    setBoard(generatedPuzzle);
    const updatedPencilMarks = updatePencilMarks(generatedPuzzle);
    setPencilMarks(updatedPencilMarks);
    setShowPencilMarks(true);
    setShowManualEntry(false);
  };

  const handleManualEntryClick = () => {
    setShowPencilMarks(false);
    setShowManualEntry(true);
  };

  const getSubgridIndex = (rowIndex, colIndex) => {
    const subgridRow = Math.floor(rowIndex / 3);
    const subgridCol = Math.floor(colIndex / 3);
    return subgridRow * 3 + subgridCol;
  };

  useEffect(() => {
    if (showPencilMarks) {
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
                key={colIndex}
                className="sudoku-cell-container"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                <input
                  id={`cell-${rowIndex}-${colIndex}`}
                  type="text"
                  className={`sudoku-cell subgrid-${subgridIndex}`}
                  value={cellValue !== '' ? cellValue : ''}
                  placeholder={cellValue !== '' ? cellValue : ''}
                  maxLength={1}
                  onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                  readOnly={!showManualEntry || cellValue !== 10}
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
      <button onClick={handleAutoGenerateClick}>Auto Generate Puzzle</button>
      <button onClick={handleManualEntryClick}>Manual Entry Mode</button>
    </div>
  );
  
};

export default SudokuBoard;
