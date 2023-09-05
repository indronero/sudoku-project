import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const RootComponent = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const renderApp = () => {
    switch (selectedApp) {
      case 'classic':
        return import('./Indro-Classic-Sudoku/App').then((module) => <module.default />);
      case 'killer':
        return import('./Killer-Sudoku/App').then((module) => <module.default />);
      case 'comparison':
        return import('./comparison sudoku/App').then((module) => <module.default />);
      default:
        return null;
    }
  };

  return (
    <React.StrictMode>
      <div>
        <button onClick={() => setSelectedApp('classic')}>Classic Sudoku</button>
        <button onClick={() => setSelectedApp('killer')}>Killer Sudoku</button>
        <button onClick={() => setSelectedApp('comparison')}>Comparison Sudoku</button>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        {renderApp()}
      </React.Suspense>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
