import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';
import { updatePencilMarks, usePencilMarks } from './Pencil-Marking/PencilMarking';
import { generateRandomSudokuPuzzle } from './PuzzleGeneration';
import useManualPencilMarking from './Pencil-Marking/ManualPencilMarking';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
//import arrowHtml from './Arrow.html';

const SudokuGrid = () => {
  const [generatedPuzzle, setGeneratedPuzzle] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ({ value: 0, arrows: [] }))));
  const [userAnswers, setUserAnswers] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const { pencilMarks, setPencilMarks, showPencilMarks, setShowPencilMarks, handleGenerateMarksClick } = usePencilMarks();
  const { manualPencilMarks, setManualPencilMarks, manualPencilMode, setManualPencilMode, setActiveCell, handlePencilMarksChange, applyColorToCell, selectedColor, setSelectedColor, manualPencilColors } = useManualPencilMarking(userAnswers, generatedPuzzle);

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

      const updatedPencilMarks = updatePencilMarks(newUserAnswers);
      setPencilMarks(updatedPencilMarks);
    }
  };

  const handleAutoGenerateClick = () => {
    const puzzleString = generateRandomSudokuPuzzle();

    setUserAnswers(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
    setManualPencilMarks(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => [])));
    setGeneratedPuzzle(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ({ value: 0, arrows: [] }))));

    const generatedPuzzle = puzzleString
      .match(/.{9}/g)
      .map(row => row.split('').map(cell => (cell === '0' ? { value: 0, arrows: [] } : { value: parseInt(cell, 10), arrows: [] })));

    setGeneratedPuzzle(generatedPuzzle);

    const updatedPencilMarks = updatePencilMarks(generatedPuzzle);
    setPencilMarks(updatedPencilMarks);
    setShowPencilMarks(false);
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
          {row.map((cellData, colIndex) => {
            const subgridIndex = getSubgridIndex(rowIndex, colIndex);
            const isOriginalCell = generatedPuzzle[rowIndex][colIndex].value !== 0;
            const isUserCell = userAnswers[rowIndex][colIndex] !== '';

            return (
              <div
                key={colIndex}
                className={`sudoku-cell-container ${isOriginalCell ? 'original-cell' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
               
                <div className={`manual-pencil-container ${manualPencilMarks[rowIndex][colIndex].length > 0 ? 'manual-pencil-mark' : ''}`}>
                  <input
                    id={`cell-${rowIndex}-${colIndex}`}
                    type="text"
                    className={`sudoku-cell subgrid-${subgridIndex} ${generatedPuzzle[rowIndex][colIndex].value !== 0 ? 'generated-cell' : ''} ${
                      manualPencilMarks[rowIndex][colIndex].length > 0 ? 'manual-pencil-mark' : ''
                    }`}
                    value={!manualPencilMode ? userAnswers[rowIndex][colIndex] : ''}
                    placeholder={cellData.value !== 0 ? cellData.value : ''}
                    maxLength={1}
                    onInput={(e) => handleCellChange(e, rowIndex, colIndex)}
                    readOnly={isOriginalCell}
                  />
                  {manualPencilMarks[rowIndex][colIndex].length > 0 && (
                    <div className="manual-pencil-mark-text" style={{ color: manualPencilColors[rowIndex][colIndex] }}>
                      {manualPencilMarks[rowIndex][colIndex].map((mark, index) => (
                        <span key={index} className="manual-pencil-mark">
                          {mark !== null ? mark : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  {cellData.arrows.map((arrow, arrowIndex) => (
                    <div
                      key={arrowIndex}
                      className={`arrow-container arrow-${arrow.direction}`}
                      style={{
                        transform: `rotate(${arrow.value === '<' ? '180deg' : '0'})`,
                        border: `1px solid ${manualPencilColors[rowIndex][colIndex]}`,
                      }}
                    >
                      {arrow.direction === 'up' && <KeyboardArrowUpIcon className="arrow-icon" />}
                      {arrow.direction === 'down' && <KeyboardArrowDownIcon className="arrow-icon" />}
                      {arrow.direction === 'right' && <KeyboardArrowRightIcon className="arrow-icon" />}
                      {arrow.direction === 'left' && <KeyboardArrowLeftIcon className="arrow-icon" />}
                    </div>
                  ))}
                </div>
                {showPencilMarks && cellData.value === 0 && (
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

export default SudokuGrid;
