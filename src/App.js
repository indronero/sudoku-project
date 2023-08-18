import React from 'react';
import SudokuBoard from './SudokuGrid';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className='header'>
      <h1>Classic Sudoku</h1>
      </div>
      <SudokuBoard />
    </div>
  );
};

export default App;
