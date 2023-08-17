import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import { updatePencilMarks, usePencilMarks } from './PencilMarking';
//import { generateRandomSudokuPuzzle } from './PuzzleGeneration';

const SudokuBoard = () => {
  const [generatedPuzzle, setGeneratedPuzzle] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [userAnswers, setUserAnswers] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();

  const [manualPencilMarks, setManualPencilMarks] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));
  const [manualPencilMode, setManualPencilMode] = useState(false);
  const [activeCell, setActiveCell] = useState(null);

  const [manualPencilColors, setManualPencilColors] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [selectedColor, setSelectedColor] = useState('#000000'); 

  const applyColorToCell = (rowIndex, colIndex) => {
    if (manualPencilColors[rowIndex] && manualPencilColors[rowIndex][colIndex]) { // Check if the index exists
      const newManualPencilColors = [...manualPencilColors];
      newManualPencilColors[rowIndex][colIndex] = selectedColor;
      setManualPencilColors(newManualPencilColors);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (manualPencilMode) {
      const clickedCellValue = manualPencilMarks[rowIndex][colIndex];
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
    const isUserCell = userAnswers[rowIndex][colIndex] !== '';
    const isGeneratedCell = generatedPuzzle[rowIndex][colIndex] !== '';
  
    if (activeCell !== null && manualPencilMode && !isUserCell && !isGeneratedCell) {
      const newManualPencilMarks = [...manualPencilMarks];
      const newManualPencilColors = [...manualPencilColors]; 
  
      // Parse the input value and filter out non-numeric characters
      const newMarks = value.split('').filter(char => /\d/.test(char)).map(mark => parseInt(mark, 10));
  
      // Update the manual pencil marks for the clicked cell
      newManualPencilMarks[rowIndex][colIndex] = newMarks;
  
      // Set the color for the clicked cell using the selected color
      newManualPencilColors[rowIndex][colIndex] = selectedColor;
      setManualPencilColors(newManualPencilColors);
  
      // Update the state with the new manual pencil marks
      setManualPencilMarks(newManualPencilMarks);
  
      // Log the manual pencil marks for the clicked cell
      console.log(`Manual Pencil Marks for Cell [${rowIndex}][${colIndex}]:`, newMarks);
    }
  };  

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (!manualPencilMode && value === '' || /^[1-9]$/.test(value)) {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[rowIndex][colIndex] = value === '' ? '' : parseInt(value, 10);
      setUserAnswers(newUserAnswers);
      console.log('Updated userAnswers:', newUserAnswers);

      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(newUserAnswers);
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
      // Clear the userAnswers array
      setUserAnswers(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
      // Make an API call to fetch the Sudoku puzzle
      const response = await fetch('https://sudoku-api.vercel.app/api/dosuku'); // Replace 'YOUR_API_URL' with the actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch the Sudoku puzzle. Please check the API endpoint or try again later.');
      }

      // Parse the response and extract the 9x9 grid array
      const data = await response.json();
      const gridArray = data.newboard.grids[0].value;

      // Convert the grid array to the format expected by the board state
      const newGeneratedPuzzle = gridArray.map(row => row.map(value => (value === 0 ? '' : value)));

      // Set the generated puzzle to the state
      setGeneratedPuzzle(newGeneratedPuzzle);

      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(newGeneratedPuzzle);
      setPencilMarks(updatedPencilMarks);

      // Set the state to show pencil marks and hide manual entry mode
      setShowPencilMarks(false);
      console.log('Updated generatedPuzzle:', newGeneratedPuzzle);
      console.log('Cleared userAnswers:', userAnswers);

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
      const updatedPencilMarks = updatePencilMarks(userAnswers);
      setPencilMarks(updatedPencilMarks);
    }
  }, [showPencilMarks, userAnswers, setPencilMarks]);

  return (
    <div className="sudoku-board">
      {generatedPuzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cellValue, colIndex) => {
            const subgridIndex = getSubgridIndex(rowIndex, colIndex);
            const isOriginalCell = generatedPuzzle[rowIndex][colIndex] !== '';
            const isUserCell = userAnswers[rowIndex][colIndex] !== '';

            return (
              <div
                key={colIndex}
                className={`sudoku-cell-container ${isOriginalCell ? 'original-cell' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {manualPencilMode ? (
                  <input
                    id={`cell-${rowIndex}-${colIndex}`}
                    type="text"
                    className={`sudoku-cell subgrid-${subgridIndex} ${generatedPuzzle[rowIndex][colIndex] !== '' ? 'generated-cell' : ''}`}
                    style={{ color: manualPencilColors[rowIndex][colIndex] }}
                    value={
                      userAnswers[rowIndex][colIndex] !== ''
                        ? userAnswers[rowIndex][colIndex]
                        : generatedPuzzle[rowIndex][colIndex] !== ''
                          ? generatedPuzzle[rowIndex][colIndex]
                          : manualPencilMarks[rowIndex][colIndex].map(mark => mark !== null ? mark : '').join(' ')
                    }
                    placeholder=""
                    onChange={(e) => handlePencilMarksChange(e, rowIndex, colIndex)}
                    readOnly={isOriginalCell && isUserCell}
                  />
                ) : (
                  <input
                    id={`cell-${rowIndex}-${colIndex}`}
                    type="text"
                    className={`sudoku-cell subgrid-${subgridIndex} ${generatedPuzzle[rowIndex][colIndex] !== '' ? 'generated-cell' : ''}`}
                    style={{ color: manualPencilColors[rowIndex][colIndex] }}
                    value={
                      userAnswers[rowIndex][colIndex] !== ''
                        ? userAnswers[rowIndex][colIndex]
                        : manualPencilMarks[rowIndex][colIndex].map(mark => mark !== null ? mark : '').join(' ')
                    }
                    placeholder={cellValue !== '' ? cellValue : ''}
                    maxLength={1}
                    onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                    readOnly={isOriginalCell}
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
      <div className="color-picker-container">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          onClick={applyColorToCell}
          className="color-picker-input"
        />
      </div>
      <button onClick={() => setManualPencilMode(!manualPencilMode)}>
        {manualPencilMode ? 'Exit Pencil Mode' : 'Enter Pencil Mode'}
      </button>
      <button onClick={handleGenerateMarksClick}>Generate Pencil Marks</button>
      <button onClick={handleAutoGenerateClick}>Auto Generate Puzzle</button>
    </div>
  );
};

export default SudokuBoard;
