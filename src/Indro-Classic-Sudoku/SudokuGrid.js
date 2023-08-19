import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import './Pencil-Marking/Pencil-Marking.css';
import './ScoreSystem.css';

import { updatePencilMarks, usePencilMarks } from './Pencil-Marking/PencilMarking';
import { generateRandomSudokuPuzzle } from './PuzzleGeneration';
import useManualPencilMarking from './Pencil-Marking/ManualPencilMarking';
import useScoreSystem from './ScoreSystem';


const SudokuBoard = () => {
  const [generatedPuzzle, setGeneratedPuzzle] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [copyPuzzle, setCopyPuzzle] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [userAnswers, setUserAnswers] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [difficulty, setDifficulty] = useState(0.5); // Default difficulty level

  
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();
  const {manualPencilMarks, setManualPencilMarks, manualPencilMode, setManualPencilMode, setActiveCell, handlePencilMarksChange, applyColorToCell, selectedColor, setSelectedColor,manualPencilColors } = useManualPencilMarking(userAnswers, generatedPuzzle);
  const { rightAnswers, wrongAnswers, increaseRightAnswers, increaseWrongAnswers } = useScoreSystem(); // Initialize the score system hook

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

  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (value === '' || /^[1-9]$/.test(value)) {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[rowIndex][colIndex] = value === '' ? '' : parseInt(value, 10);
      setUserAnswers(newUserAnswers);
      
      if (value !== '') {
      // Check correctness of the answer
      const correctAnswer = parseInt(copyPuzzle[rowIndex][colIndex], 10);
      if (parseInt(value, 10) === correctAnswer) {
        console.log('Correct answer');
        increaseRightAnswers(); // Increment right answers
      } else {
        console.log('Wrong answer');
        increaseWrongAnswers(); // Increment wrong answers
      }
    }
      // Generate and update pencil marks for the entire board
      const updatedPencilMarks = updatePencilMarks(newUserAnswers);
      setPencilMarks(updatedPencilMarks);
    }
  };
  

  const handleAutoGenerateClick = () => {
    const { initialBoard, puzzle } = generateRandomSudokuPuzzle(difficulty); // Get initialBoard and puzzle from generateRandomSudokuPuzzle()
 
    // Clear the userAnswers and manualPencilMarks array and generatedPuzzle
    setUserAnswers(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
    setManualPencilMarks(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));

    setGeneratedPuzzle(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
    setCopyPuzzle(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));

    const generatedPuzzle = puzzle
      .match(/.{9}/g)
      .map(row => row.split('').map(cell => (cell === '0' ? '' : cell))); // Convert '0' to empty string
  
    setGeneratedPuzzle(generatedPuzzle);

    const copyBoard = initialBoard
    .match(/.{9}/g)
    .map(row => row.split('').map(cell => (cell))); // Convert '0' to empty string
  
    setCopyPuzzle(copyBoard);

    console.log('Generated Puzzle:', generatedPuzzle);
    console.log('Initial Board:', copyBoard);

    const updatedPencilMarks = updatePencilMarks(generatedPuzzle);
    setPencilMarks(updatedPencilMarks);
    setShowPencilMarks(false);
  };  

  /*const handleAutoGenerateClick = async () => {
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
  };*/

  const getSubgridIndex = (rowIndex, colIndex) => {
    const subgridRow = Math.floor(rowIndex / 3);
    const subgridCol = Math.floor(colIndex / 3);
    return subgridRow * 3 + subgridCol;
  };

  useEffect(() => {
    if (generatedPuzzle[0][0] !== '') {
      handleAutoGenerateClick();
    }
  }, [difficulty]);

  useEffect(() => {
    if (showPencilMarks) {
      const updatedPencilMarks = updatePencilMarks(userAnswers);
      setPencilMarks(updatedPencilMarks);
    }
  }, [showPencilMarks, userAnswers, setPencilMarks]);

  return (
    <div className="sudoku-board">
      <div className="score-container">
      <div className="score">
       <span className="score-label">Right Answers:</span> {rightAnswers}
      </div>
      <div className="score">
        <span className="score-label">Wrong Answers:</span> {wrongAnswers}
      </div>
    </div>
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
                    <div className={`manual-pencil-container ${manualPencilMarks[rowIndex][colIndex].length > 0 ? 'manual-pencil-mark' : ''}`}>
                      <input
                        id={`cell-${rowIndex}-${colIndex}`}
                        type="text"
                        className={`sudoku-cell subgrid-${subgridIndex} ${generatedPuzzle[rowIndex][colIndex] !== '' ? 'generated-cell' : ''} ${
                          manualPencilMarks[rowIndex][colIndex].length > 0 ? 'manual-pencil-mark' : ''
                        }`}                        
                        //style={{color: '#33A7FF'}}
                        value={
                          userAnswers[rowIndex][colIndex] !== ''
                            ? userAnswers[rowIndex][colIndex]
                            : generatedPuzzle[rowIndex][colIndex] !== ''
                              ? generatedPuzzle[rowIndex][colIndex]
                              : manualPencilMarks[rowIndex][colIndex].map(mark => (mark !== null ? mark : '')).join(' ')
                        }
                        placeholder=""
                        onChange={(e) => handlePencilMarksChange(e, rowIndex, colIndex)}
                        readOnly={isOriginalCell && isUserCell}
                      />
                      {manualPencilMarks[rowIndex][colIndex].length > 0 && (
                              <div 
                              className="manual-pencil-mark-text" 
                              style={{
                                color: manualPencilColors[rowIndex][colIndex]
                              }}
                              >
                                {manualPencilMarks[rowIndex][colIndex].map((mark, index) => (
                                  <span key={index} className="manual-pencil-mark">
                                    {mark !== null ? mark : ''}
                                  </span>
                                ))}
                              </div>
                        )}
                    </div>
                  ) : (
                        <div className={`manual-pencil-container ${manualPencilMarks[rowIndex][colIndex].length > 0 ? 'manual-pencil-mark' : ''}`}>
                          <input
                            id={`cell-${rowIndex}-${colIndex}`}
                            type="text"
                            className={`sudoku-cell subgrid-${subgridIndex} ${generatedPuzzle[rowIndex][colIndex] !== '' ? 'generated-cell' : ''} ${
                              manualPencilMarks[rowIndex][colIndex].length > 0 ? 'manual-pencil-mark' : ''
                            }`}                  
                            //style={{ color: manualPencilColors[rowIndex][colIndex] }}
                            value={
                              !manualPencilMode
                                ? userAnswers[rowIndex][colIndex]
                                : ''
                            }
                            placeholder={cellValue !== '' ? cellValue : ''}
                            maxLength={1}
                            onInput={(e) => handleCellChange(e, rowIndex, colIndex)}
                            readOnly={isOriginalCell}
                          />
                            {manualPencilMarks[rowIndex][colIndex].length > 0 && (
                              <div 
                              className="manual-pencil-mark-text" 
                              style={{
                                color: manualPencilColors[rowIndex][colIndex]
                              }}
                              >
                                {manualPencilMarks[rowIndex][colIndex].map((mark, index) => (
                                  <span key={index} className="manual-pencil-mark">
                                    {mark !== null ? mark : ''}
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>
                      )
              }
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
      <div className="difficulty-slider">
      <div>Difficulty</div>
      <input
        type="range"
        min="0.1"
        max="0.9"
        step="0.1"
        value={difficulty}
        id="difficultySlider"
        onChange={(e) => setDifficulty(parseFloat(e.target.value))}
      />
      <span>{difficulty}</span>
    </div>
      <div className="color-picker-container">
        <div>Pencil Color</div>
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
