import React from 'react';
import SudokuBoard from './SudokuGrid';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Indro's Sudoku Pad</h1>
      <SudokuBoard />
    </div>
  );
};

export default App;
