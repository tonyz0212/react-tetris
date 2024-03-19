import React, { useContext } from 'react';
import { TETROMINOS } from '../tetrominoes';
import { StyledStartButton } from './styles/StyledStartButton';
import { Context } from "../components/TetrominoSelectionContext";

const TetrominoSelection = ({onConfirmation}) => {
    const { selectedTetrominos, setSelectedTetrominos } = useContext(Context);
    const handleToggleTetromino = tetromino => {
        
        if (selectedTetrominos.includes(tetromino)) {
            setSelectedTetrominos(prev => prev.filter(item => item !== tetromino));
        } else {
            setSelectedTetrominos(prev => [...prev, tetromino]);
        }
    };

    const confirmSelection = () => {
        onConfirmation(selectedTetrominos);
    }

    

    return (
        <div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: 'white' }}>Select Tetrominos</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Object.keys(TETROMINOS).map(tetromino => (
                    tetromino !== '0' && (
                        <div key={tetromino} style={{ margin: '20px' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTetrominos.includes(tetromino)}
                                    onChange={() => handleToggleTetromino(tetromino)}
                                />
                                <img
                                    src={require(`../imgs/${tetromino}.png`)}
                                    alt={tetromino}
                                    style={{ width: '150px', height: '150px' }}
                                />
                            </label>
                        </div>
                    )
                ))}
            </div>

            <div></div>
            <StyledStartButton onClick={confirmSelection}>Confirm</StyledStartButton>

        </div>
    );
};

export default TetrominoSelection;
