import React, { useState, useEffect } from 'react';
import './killersudoku.css'; // Update this to your CSS file
import Board from './board';
import GenerateCageConfigurations from'./CageConfigGenerator'
import { generateKillerSudokuPuzzle } from './puzzleGenerator';

function KillerSudokuGame() {
  const [board, setBoard] = useState(generateInitialBoard());
  const [cageConfigs, setCageConfigs] = useState([]);
  
  function generateInitialBoard() {
    const size = 9;
    const emptyBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => '')
    );
    return emptyBoard;
  }
 
  
const generateNewGame = () => {
    const killerSudokuData = generateKillerSudokuPuzzle(5); 
    setBoard(killerSudokuData.puzzle);
    setCageConfigs(killerSudokuData.cageConfigs);
  };

  
const handleCellChange = (rowIndex, colIndex, newValue) => {
    const updatedBoard = board.map((row, r) =>
      row.map((cell, c) =>
        r === rowIndex && c === colIndex ? (newValue === '' ? '' : parseInt(newValue, 10)) : cell
      )
    );
    setBoard(updatedBoard);
  };


  useEffect(() => {
    const initialCageConfigs = GenerateCageConfigurations();
    console.log('Initial Cage Configs:', initialCageConfigs);
    setCageConfigs(initialCageConfigs); // Set the initial cageConfigs
  }, []);

  return (
    <div className="killer-sudoku-game">
  



<Board
        board={board}
        handleCellChange={handleCellChange} // Pass the handleCellChange function
        cageConfigs={cageConfigs}
      /> 


      <button className="generate-button" onClick={generateNewGame}>Generate New Game</button>
     
    </div>
  );
}

export default KillerSudokuGame;




     