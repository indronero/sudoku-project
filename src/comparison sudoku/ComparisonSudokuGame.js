import React, { useState, useEffect } from 'react';
import './SudokuGrid.css'; // Make sure to include your CSS file
import { updatePencilMarks, usePencilMarks } from './PencilMarking';
import ComparisonSudokuCell from './ComparisonSudokuCell'; // Import the ComparisonSudokuCell component

const ComparisonSudokuGame = () => {
  const [gridData, setGridData] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomSymbol = () => {
    const symbols = ['<', '>'];
    return symbols[generateRandomNumber(0, 1)];
  };

  const generateInitialGrid = () => {
    const initialGrid = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => ({
        value: '',
        symbol: '',
      }))
    );

    // Generate initial puzzle grid values
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const randomValue = generateRandomNumber(1, 9);
        initialGrid[rowIndex][colIndex].value = randomValue;
      }
    }

    // Generate inequalities for each 3x3 region
    for (let regionIndex = 0; regionIndex < 9; regionIndex++) {
      const symbol = generateRandomSymbol();
      const rowStart = Math.floor(regionIndex / 3) * 3;
      const colStart = (regionIndex % 3) * 3;
      initialGrid[rowStart][colStart].symbol = symbol;
    }

    return initialGrid;
  };

  useEffect(() => {
    const initialGridData = generateInitialGrid();
    setGridData(initialGridData);
  }, []);

  const handleCellClick = (rowIndex, colIndex) => {
    const newGridData = [...gridData];
    const cell = newGridData[rowIndex][colIndex];

    // Placeholder logic to update the cell value
    const newValue = cell.value === '' ? generateRandomNumber(1, 9) : '';
    cell.value = newValue;

    // Placeholder logic to update the symbol
    const newSymbol = generateRandomSymbol();
    cell.symbol = newSymbol;

    setGridData(newGridData);
  };

  const isPuzzleSolved = (grid) => {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const cell = grid[rowIndex][colIndex];

        // Check if the cell has a value
        if (!cell.value) {
          return false; // If any cell is empty, the puzzle is not solved
        }

        // Check inequalities with neighboring cells
        if (cell.symbol) {
          const neighborRowIndex = rowIndex + (cell.symbol === '<' ? 1 : -1);
          const neighborColIndex = colIndex + (cell.symbol === '>' ? 1 : -1);

          if (
            neighborRowIndex >= 0 &&
            neighborRowIndex < 9 &&
            neighborColIndex >= 0 &&
            neighborColIndex < 9
          ) {
            const neighborCell = grid[neighborRowIndex][neighborColIndex];
            const value = parseInt(cell.value, 10);
            const neighborValue = parseInt(neighborCell.value, 10);

            if (cell.symbol === '<' && value >= neighborValue) {
              return false; // Inequality constraint not satisfied
            } else if (cell.symbol === '>' && value <= neighborValue) {
              return false; // Inequality constraint not satisfied
            }
          }
        }
      }
    }

    return true; // All cells are filled and inequalities are satisfied
  };

  const handleCheckSolution = () => {
    const puzzleSolved = isPuzzleSolved(gridData);
    setIsGameComplete(puzzleSolved);
  };

  return (
    <div className="comparison-sudoku-game">
      <h1>Comparison Sudoku</h1>
      <ComparisonSudokuBoard gridData={gridData} handleCellClick={handleCellClick} />

      <button onClick={handleCheckSolution}>Check Solution</button>

      {isGameComplete && <p>Congratulations! Puzzle solved!</p>}
    </div>
  );
};

export default ComparisonSudokuGame;
