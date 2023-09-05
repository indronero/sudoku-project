import React, { useState, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const ClassicSudokuApp = lazy(() => import('./Indro-Classic-Sudoku/App'));
const KillerSudokuApp = lazy(() => import('./Killer-Sudoku/App'));
const GreaterThanSudokuApp = lazy(() => import('./comparison sudoku/App'));


const RootComponent = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const renderApp = () => {
    switch (selectedApp) {
      case 'classic':
        return <ClassicSudokuApp />;
      case 'killer':
        return <KillerSudokuApp />;
      case 'GreaterThan':
        return <GreaterThanSudokuApp />;
      default:
        return null;
    }
  };

  return (
    <React.StrictMode>
      <div>
        <button onClick={() => setSelectedApp('classic')}>Classic Sudoku</button>
        <button onClick={() => setSelectedApp('killer')}>Killer Sudoku</button>
        <button onClick={() => setSelectedApp('GreaterThan')}>Greater/Lesser Sudoku</button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {renderApp()}
      </Suspense>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
