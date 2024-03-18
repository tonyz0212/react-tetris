import React, { useState } from 'react';
import { TETROMINOS } from '../tetrominoes';
import { StyledStartButton } from './styles/StyledStartButton';

const TetrominoSelection = () => {
    const [selectedTetrominos, setSelectedTetrominos] = useState([]);
    const handleToggleTetromino = tetromino => {
        console.log(tetromino);
        if (selectedTetrominos.includes(tetromino)) {
            setSelectedTetrominos(prev => prev.filter(item => item !== tetromino));
        } else {
            setSelectedTetrominos(prev => [...prev, tetromino]);
        }
    };

    

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
            <StyledStartButton>Confirm</StyledStartButton>

        </div>
    );
};

export default TetrominoSelection;
