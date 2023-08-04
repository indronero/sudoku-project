import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import { /*generatePencilMarks,*/ updatePencilMarks, usePencilMarks } from './PencilMarking';
//import { generateRandomSudokuPuzzle } from './PuzzleGeneration';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();

  const handleCellClick = (rowIndex, colIndex) => {
    const cellInput = document.getElementById(`cell-${rowIndex}-${colIndex}`);
    if (cellInput) {
      cellInput.focus();
    }
  };

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = value === '' ? '' : parseInt(value, 10);
      setBoard(newBoard);
  
      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(newBoard);
      setPencilMarks(updatedPencilMarks);
    }
  };
  
  /*const handleGenerateMarksClick = () => {
      setShowPencilMarks((prevShowPencilMarks) => !prevShowPencilMarks); // Toggle the showPencilMarks state
  };

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
  };*/

  const handleAutoGenerateClick = async () => {
    try {
      // Make an API call to fetch the Sudoku puzzle
      const response = await fetch('https://sudoku-api.vercel.app/api/dosuku'); // Replace 'YOUR_API_URL' with the actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch the Sudoku puzzle. Please check the API endpoint or try again later.');
      }
  
      // Parse the response and extract the 9x9 grid array
      const data = await response.json();
      const gridArray = data.newboard.grids[0].value;
  
      // Convert the grid array to the format expected by the board state
      const generatedPuzzle = gridArray.map(row => row.map(value => (value === 0 ? '' : value)));
  
      // Set the generated puzzle to the board state
      setBoard(generatedPuzzle);
  
      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(generatedPuzzle);
      setPencilMarks(updatedPencilMarks);
  
      // Set the state to show pencil marks and hide manual entry mode
      setShowPencilMarks(false);
      
    } catch (error) {
      console.error('Error fetching the Sudoku puzzle:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
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
  }, [showPencilMarks, board, setPencilMarks]);
  

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
                  readOnly={cellValue !== ''}
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
    </div>
  );
};

export default SudokuBoard;

