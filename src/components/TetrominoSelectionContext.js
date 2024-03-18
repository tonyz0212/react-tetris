import React, { createContext, useContext, useState } from 'react';

// Create context
const TetrominoSelectionContext = createContext();

// Context provider component
export const TetrominoSelectionProvider = ({ children }) => {
  const [selectedTetrominos, setSelectedTetrominos] = useState([]);

  return (
    <TetrominoSelectionContext.Provider value={{ selectedTetrominos, setSelectedTetrominos }}>
      {children}
    </TetrominoSelectionContext.Provider>
  );
};

// Custom hook to access context
export const useTetrominoSelection = () => useContext(TetrominoSelectionContext);
