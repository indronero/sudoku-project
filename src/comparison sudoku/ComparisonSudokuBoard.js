import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import ComparisonSudokuCell from './ComparisonSudokuCell';
import { updatePencilMarks, usePencilMarks } from './PencilMarking';

const ComparisonSudokuBoard = () => {
  const [generatedPuzzle, setGeneratedPuzzle] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [userAnswers, setUserAnswers] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();
  const [manualPencilMarks, setManualPencilMarks] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));
  const [manualPencilMode, setManualPencilMode] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const [manualPencilColors, setManualPencilColors] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [selectedColor, setSelectedColor] = useState('#000000');

  const calculateAdjacentBorders = (rowIndex, colIndex) => {
    const cell = generatedPuzzle[rowIndex][colIndex];
    const adjacentBorders = [];

    if (rowIndex > 0 && generatedPuzzle[rowIndex - 1][colIndex].symbol) {
      adjacentBorders.push('up');
    }
    if (rowIndex < 8 && generatedPuzzle[rowIndex + 1][colIndex].symbol) {
      adjacentBorders.push('down');
    }
    if (colIndex > 0 && generatedPuzzle[rowIndex][colIndex - 1].symbol) {
      adjacentBorders.push('left');
    }
    if (colIndex < 8 && generatedPuzzle[rowIndex][colIndex + 1].symbol) {
      adjacentBorders.push('right');
    }

    return adjacentBorders;
  };

  // Rest of the functions (applyColorToCell, handleCellClick, handlePencilMarksChange, handleCellChange, etc.)

  const applyColorToCell = (rowIndex, colIndex) => {
    if (manualPencilColors[rowIndex] && manualPencilColors[rowIndex][colIndex]) {
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
  
      const newMarks = value.split('').filter(char => /\d/.test(char)).map(mark => parseInt(mark, 10));
  
      newManualPencilMarks[rowIndex][colIndex] = newMarks;
      newManualPencilColors[rowIndex][colIndex] = selectedColor;
      setManualPencilColors(newManualPencilColors);
      setManualPencilMarks(newManualPencilMarks);
  
      console.log(`Manual Pencil Marks for Cell [${rowIndex}][${colIndex}]:`, newMarks);
    }
  };
  
  const handleCellChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    if (!manualPencilMode && (value === '' || /^[1-9]$/.test(value))) {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[rowIndex][colIndex] = value === '' ? '' : parseInt(value, 10);
      setUserAnswers(newUserAnswers);
  
      const updatedPencilMarks = updatePencilMarks(newUserAnswers);
      setPencilMarks(updatedPencilMarks);
    }
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
          {row.map((cellData, colIndex) => {
            
            
            const isOriginalCell = generatedPuzzle[rowIndex][colIndex].value !== '';
            const isUserCell = userAnswers[rowIndex][colIndex] !== '';

            const adjacentBorders = calculateAdjacentBorders(rowIndex, colIndex);

            return (
              <ComparisonSudokuCell
                key={colIndex}
                cellData={cellData}
                adjacentBorders={adjacentBorders}
                manualPencilMode={manualPencilMode}
                manualPencilColors={manualPencilColors}
                manualPencilMarks={manualPencilMarks}
                handleCellClick={() => handleCellClick(rowIndex, colIndex)}
                handlePencilMarksChange={(e) => handlePencilMarksChange(e, rowIndex, colIndex)}
                handleCellChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                showPencilMarks={showPencilMarks}
                isOriginalCell={isOriginalCell}
                isUserCell={isUserCell}
                pencilMarks={pencilMarks[rowIndex][colIndex]}
                generatedCellValue={generatedPuzzle[rowIndex][colIndex]}
                selectedColor={selectedColor}
                applyColorToCell={() => applyColorToCell(rowIndex, colIndex)}
              />
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
    </div>
  );
};

export default ComparisonSudokuBoard;
