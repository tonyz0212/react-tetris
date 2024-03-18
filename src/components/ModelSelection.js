import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const ModeSelection = ({ onSelectMode }) => {
    return (
            <div>
            <StyledStartButton onClick={() => onSelectMode('regular')} >Regular Mode </StyledStartButton>
            <StyledStartButton onClick={() => onSelectMode('customize')}>Customize Mode </StyledStartButton>
            </div>
                );
};

export default ModeSelection;