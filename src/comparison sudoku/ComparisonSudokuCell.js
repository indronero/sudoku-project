import React from 'react';
import { IconButton, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ComparisonSudokuCell = ({
  cellData,
  adjacentBorders,
  handleCellClick,
  manualPencilMode,
  manualPencilColors,
  manualPencilMarks,
  handlePencilMarksChange,
  handleCellChange,
  showPencilMarks,
  isOriginalCell,
  isUserCell,
  pencilMarks,
  selectedColor,
}) => {
  const { value, symbol } = cellData;

  const getArrowDirection = (border, symbol) => {
    if (border === 'up' && symbol === '^') {
      return 'up';
    } else if (border === 'down' && symbol === 'v') {
      return 'down';
    } else if (border === 'left' && symbol === '<') {
      return 'left';
    } else if (border === 'right' && symbol === '>') {
      return 'right';
    }
    return 'none';
  };

  const getArrowIconRotation = (symbol, border) => {
    if (border === 'up' && symbol === '^') {
      return 'rotate(0deg)';
    } else if (border === 'down' && symbol === 'v') {
      return 'rotate(180deg)';
    } else if (border === 'left' && symbol === '<') {
      return 'rotate(90deg)';
    } else if (border === 'right' && symbol === '>') {
      return 'rotate(270deg)';
    }
    return 'none';
  };

  const renderArrowIcon = (border) => {
    if (adjacentBorders.includes(border) && symbol) {
      const arrowDirection = getArrowDirection(border, symbol);
      return (
        <span
          className={`arrow-icon ${arrowDirection}`}
          style={{
            transform: getArrowIconRotation(symbol, border),
          }}
        >
          {arrowDirection === 'up' && <KeyboardArrowUpIcon />}
          {arrowDirection === 'down' && <KeyboardArrowDownIcon />}
          {arrowDirection === 'left' && <KeyboardArrowLeftIcon />}
          {arrowDirection === 'right' && <KeyboardArrowRightIcon />}
        </span>
      );
    }
    return null;
  };

  return (
    <div className={`sudoku-cell-container ${isOriginalCell ? 'original-cell' : ''}`} onClick={handleCellClick}>
      <div className="pencil-marks">
        {manualPencilMode &&
          manualPencilMarks.length > 0 &&
          manualPencilMarks.map((marks, index) => (
            <span key={index} className="pencil-mark" style={{ color: manualPencilColors[index] }}>
              {marks.join(' ')}
            </span>
          ))}
      </div>

      <div className="arrow-icons-container">
        {renderArrowIcon('up')}
        {renderArrowIcon('down')}
        {renderArrowIcon('left')}
        {renderArrowIcon('right')}
      </div>

      <Grid container direction="column">
        {/* Rest of your existing code */}
      </Grid>
    </div>
  );
};

export default ComparisonSudokuCell;
