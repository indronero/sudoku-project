import React from 'react';
import './killersudoku.css'


function Cell({ value, cageSum, groupColor, onClick, onInputChange }) {
  const cellClasses = `cell ${groupColor !== null ? 'cage-cell ' + groupColor : ''}`;
  const cageNumberClasses = `cage-number ${groupColor}`;

  const handleChange = (e) => {
    onInputChange(e.target.value); // Pass the new input value to the parent component
  };

  return (
    <div className={cellClasses} onClick={onClick}>
      {cageSum !== null && (
        <span className={cageNumberClasses}>{cageSum}</span>
      )}   
        <input
          className={cageSum !== null ? 'cell-input ' + groupColor : 'cell-input'}
          type="text"
          maxLength="1"
          value={value}
          onChange={handleChange}
        />
    </div>
  );
}

export default Cell;








