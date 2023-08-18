import React from 'react';
import Cell from './cell';
import './killersudoku.css';

// function Board({ board, handleCellClick, cageConfigs }) {
//   return (
//     <div className="sudoku-grid">
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} className="row">
//           {row.map((cellValue, colIndex) => {
//             const matchingCageConfig = cageConfigs
//               ? cageConfigs.find(config =>
//                   config[0].some(coord => coord[0] === rowIndex && coord[1] === colIndex)
//                 )
//               : null;
//               const groupColor = matchingCageConfig ? matchingCageConfig[2] : null;

         

//             return (
               
//                   <Cell
//                   key={colIndex}
//                   value={cellValue}
//                   cageSum={matchingCageConfig ? matchingCageConfig[1] : null}
//                   groupColor={groupColor} // Pass the group color as a prop
//                   // groupColor={matchingCageConfig ? matchingCageConfig[2] : null}


//                   />
          
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Board;














// function Board({ board, handleCellChange, cageConfigs }) {
//   const handleCellInputChange = (rowIndex, colIndex, e) => {
//     handleCellChange(rowIndex, colIndex, e.target.value);
//   };
//   return (
//     <div className="sudoku-grid">
//       {board.map((row, rowIndex) => (
//         <div key={rowIndex} className="row">
//           {row.map((cellValue, colIndex) => {
//             const matchingCageConfig = cageConfigs
//               ? cageConfigs.find(
//                   (config) =>
//                     config[0].some(
//                       (coord) => coord[0] === rowIndex && coord[1] === colIndex
//                     )
//                 )
//               : null;
//             const groupColor = matchingCageConfig ? matchingCageConfig[2] : null;

//             return (
//               <Cell
//                 key={colIndex}
//                 value={cellValue}
//                 cageSum={matchingCageConfig ? matchingCageConfig[1] : null}
//                 groupColor={groupColor}
//                 onInputChange={(newValue) => handleCellChange(rowIndex, colIndex, newValue)}
              
//               />


//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Board;

function Board({ board, handleCellChange, cageConfigs }) {
  const handleCellInputChange = (rowIndex, colIndex, e) => {
    handleCellChange(rowIndex, colIndex, e.target.value);
  };

  return (
    <div className="sudoku-grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cellValue, colIndex) => {
            const matchingCageConfig = cageConfigs
              ? cageConfigs.find(
                  (config) =>
                    config[0].some(
                      (coord) => coord[0] === rowIndex && coord[1] === colIndex
                    )
                )
              : null;
            const groupColor = matchingCageConfig ? matchingCageConfig[2] : null;
            const cageNumber = matchingCageConfig ? matchingCageConfig[2] : null;

            return (
              <Cell
                key={colIndex}
                value={cellValue}
                cageSum={matchingCageConfig ? matchingCageConfig[1] : null}
                groupColor={groupColor}
                cageNumber={cageNumber} // Pass the cage number to the Cell component
                onInputChange={(newValue) =>
                  handleCellChange(rowIndex, colIndex, newValue)
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;