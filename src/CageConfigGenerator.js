import React from 'react';
import { generateCompletedGrid } from './puzzleGenerator'; // Update the path

function CageConfigGenerator({ numCages, onUpdateCageConfigs }) {
  const handleGenerateCages = () => {
    const newCageConfigs = GenerateCageConfigurations(numCages);
    onUpdateCageConfigs(newCageConfigs);
  };

  return (
    <div>
      <button onClick={handleGenerateCages}>Generate Cages</button>
    </div>
  );
}
 const cageGroupColors = [
    '#FF5733', '#33FFA8', '#3386FF', '#FF33A5', '#33FF33',
    '#FFC233', '#33C6FF', '#AA33FF', '#FF3389', '#33FF89'
  ];

 function GenerateCageConfigurations() {
    const size = 9; // Size of the Sudoku grid
  const minCageSize = 1; // Minimum size of a cage
  const maxCageSize = 4; // Maximum size of a cage

    const cageConfigurations = [];
    const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => 0)); // Initialize the grid with zeros
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cageSize = Math.floor(Math.random() * (maxCageSize - minCageSize + 1)) + minCageSize;
        const cageCells = [];
        
        // Generate cage cells in a connected manner
        for (let i = row; i < row + cageSize; i++) {
          for (let j = col; j < col + cageSize; j++) {
            cageCells.push([i, j]);
            console.log(i,j)
            // console.log('grid :',grid)

          }
        }

 
        const cageSum = cageCells.reduce((sum, cell) => sum + cell[0] * size + cell[1], 0) + cageSize;
        const groupColor = cageGroupColors[Math.floor(Math.random() * cageGroupColors.length)];
        const cageNumber = cageSum;
       

        
        cageConfigurations.push([cageCells, cageSum,groupColor,cageNumber]);
        col += cageSize - 1;
      }
    }
  
    return cageConfigurations;
  }

  export default GenerateCageConfigurations;
  
  

 
  