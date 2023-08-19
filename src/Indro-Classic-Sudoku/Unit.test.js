import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SudokuBoard from './Indro-Classic-Sudoku/SudokuGrid'; // Update the import path accordingly

describe('SudokuBoard Unit Tests', () => {
  it('renders without errors', () => {
    render(<SudokuBoard />);
  });

  it('displays the correct difficulty value', () => {
    const { getByLabelText } = render(<SudokuBoard />);
    const difficultySlider = getByLabelText('Difficulty:');
    expect(difficultySlider).toHaveValue('0.5'); // Assuming the default difficulty is 0.5
  });

  it('toggles manual pencil mode when button is clicked', () => {
    const { getByText } = render(<SudokuBoard />);
    const toggleButton = getByText('Enter Pencil Mode');
    fireEvent.click(toggleButton);
    const exitButton = getByText('Exit Pencil Mode');
    expect(exitButton).toBeInTheDocument();
  });

  // Add more test cases to cover different interactions and scenarios
});
