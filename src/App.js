import React from 'react';
import SudokuBoard from './SudokuGrid';

const App = () => {
  return (
    <div className="app">
      <h1>Sudoku Solver</h1>
      <SudokuBoard />
    </div>
  );
};

export default App;
