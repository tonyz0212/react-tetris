import React, { useState } from 'react';

// Create context
export const Context = React.createContext();

// Context provider component
export const ContextProvider  = ({ children }) => {
  const [selectedTetrominos, setSelectedTetrominos] = useState([]);

  return (
    <Context.Provider value={{ selectedTetrominos, setSelectedTetrominos }}>
      {children}
    </Context.Provider>
  );
};

// Custom hook to access context
// export const useTetrominoSelection = () => useContext(TetrominoSelectionContext);
