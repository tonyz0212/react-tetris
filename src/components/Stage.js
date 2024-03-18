import React from 'react';
import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';

const Stage = ({ stage }) => {
    return (
        <StyledStage width={stage[0].length} height={stage.length}>
            {stage.map((row, rowIndex) => (
                row.map((cell, cellIndex) => {
                    // cell original state is [0, clear] which is an empty cell.                 
                    return <Cell type={cell[0]} />;
                })
            ))}
        </StyledStage>
    );    
};

export default Stage;