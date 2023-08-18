import React, { useState } from 'react';

const useManualPencilMarking = (userAnswers, generatedPuzzle) => {  
const [manualPencilMarks, setManualPencilMarks] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => []))
  );
  const [manualPencilMode, setManualPencilMode] = useState(false);
  const [activeCell, setActiveCell] = useState(null);

  const [manualPencilColors, setManualPencilColors] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '')));
  const [selectedColor, setSelectedColor] = useState('#11C2F2'); 

  const handlePencilMarksChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    const isUserCell = userAnswers[rowIndex][colIndex] !== '';
    const isGeneratedCell = generatedPuzzle[rowIndex][colIndex] !== '';
  
    if (activeCell !== null && manualPencilMode && !isUserCell && !isGeneratedCell) {
      const newManualPencilMarks = [...manualPencilMarks];
      const newManualPencilColors = [...manualPencilColors]; 
  
      // Parse the input value and filter out non-numeric characters
      const newMarks = value.split('').filter(char => /\d/.test(char)).map(mark => parseInt(mark, 10));
  
      // Update the manual pencil marks for the clicked cell
      newManualPencilMarks[rowIndex][colIndex] = newMarks;
  
      // Set the color for the clicked cell using the selected color
      newManualPencilColors[rowIndex][colIndex] = selectedColor;
      setManualPencilColors(newManualPencilColors);
  
      // Update the state with the new manual pencil marks
      setManualPencilMarks(newManualPencilMarks);
  
      // Log the manual pencil marks for the clicked cell
      console.log(`Manual Pencil Marks for Cell [${rowIndex}][${colIndex}]:`, newMarks);
    }
  };  

  const applyColorToCell = (rowIndex, colIndex) => {
    if (manualPencilColors[rowIndex] && manualPencilColors[rowIndex][colIndex]) { // Check if the index exists
      const newManualPencilColors = [...manualPencilColors];
      newManualPencilColors[rowIndex][colIndex] = selectedColor;
      setManualPencilColors(newManualPencilColors);
    }
  };

  return {
    manualPencilMarks,
    setManualPencilMarks,
    manualPencilMode,
    setManualPencilMode,
    activeCell,
    setActiveCell,
    handlePencilMarksChange,
    applyColorToCell,
    selectedColor,
    setSelectedColor,
    manualPencilColors 
  };
};

export default useManualPencilMarking;
