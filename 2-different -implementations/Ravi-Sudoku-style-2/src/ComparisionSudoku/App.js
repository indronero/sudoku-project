import React from 'react';
import './App.css'; // Import your CSS styles
import ComparisonSudokuBoard from './ComparisonSudokuBoard'; // Import ComparisonSudokuBoard

const App = () => {
  return (
    <div className="app">
      <h1>Comparison Sudoku</h1>
      <ComparisonSudokuBoard />
    </div>
  );
};

export default App;