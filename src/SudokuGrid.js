import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import { generatePencilMarks, updatePencilMarks, usePencilMarks } from './PencilMarking';
//import { generateRandomSudokuPuzzle } from './PuzzleGeneration';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();

  const [manualPencilMarks, setManualPencilMarks] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));
  const [manualPencilMode, setManualPencilMode] = useState(false);
  const [activeCell, setActiveCell] = useState(null);

  const handleCellClick = (rowIndex, colIndex) => {
    const clickedCellValue = board[rowIndex][colIndex];
  
    if (manualPencilMode) {
      if (clickedCellValue === '') {
        const newPencilMarks = [...manualPencilMarks];
        newPencilMarks[rowIndex][colIndex] = [];
        setManualPencilMarks(newPencilMarks);
      }
      
      setActiveCell(`${rowIndex}-${colIndex}`);
    }
  };
  
  

  const handlePencilMarksChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (activeCell !== null) {
      const newManualPencilMarks = [...manualPencilMarks];
  
      // Parse the input value and filter out non-numeric characters
      const newMarks = value.split('').filter(char => /\d/.test(char)).map(mark => parseInt(mark, 10));
  
      // Update the manual pencil marks for the clicked cell
      newManualPencilMarks[rowIndex][colIndex] = newMarks;
  
      // Update the state with the new manual pencil marks
      setManualPencilMarks(newManualPencilMarks);
  
      // Log the manual pencil marks for the clicked cell
      console.log(`Manual Pencil Marks for Cell [${rowIndex}][${colIndex}]:`, newMarks);
    }
  };
  

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (!manualPencilMode && value === '' || /^[1-9]$/.test(value)) {
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
                {manualPencilMode ? (
                <input
                  id={`cell-${rowIndex}-${colIndex}`}
                  type="text"
                  className={`sudoku-cell subgrid-${subgridIndex}`}
                  value={
                    board[rowIndex][colIndex] !== ''
                      ? board[rowIndex][colIndex]
                      : manualPencilMarks[rowIndex][colIndex].join(' ')
                  }
                  placeholder=""
                  onChange={(e) => handlePencilMarksChange(e, rowIndex, colIndex)}
                />
              ) : (
                <input
                  id={`cell-${rowIndex}-${colIndex}`}
                  type="text"
                  className={`sudoku-cell subgrid-${subgridIndex}`}
                  value={
                    manualPencilMarks[rowIndex][colIndex] !== null
                      ? manualPencilMarks[rowIndex][colIndex].join(' ')
                      : ''
                  }
                  placeholder={cellValue !== '' ? cellValue : ''}
                  maxLength={1}
                  onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                  readOnly={cellValue !== '' && !manualPencilMode}
                  
                />
              )}
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
      <button onClick={() => setManualPencilMode(!manualPencilMode)}>
        {manualPencilMode ? 'Exit Pencil Mode' : 'Enter Pencil Mode'}
      </button>
      <button onClick={handleGenerateMarksClick}>Generate Pencil Marks</button>
      <button onClick={handleAutoGenerateClick}>Auto Generate Puzzle</button>
    </div>
  );
};

export default SudokuBoard;

