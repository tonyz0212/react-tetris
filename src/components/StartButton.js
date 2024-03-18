import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';


const StartButton = ({callback, onPauseResume, isPaused, isStarted}) =>(

    <>
        {!isStarted && (
            <StyledStartButton onClick={callback}>
                Start Game
            </StyledStartButton>
        )}
        {isStarted && (
            <StyledStartButton onClick={onPauseResume}>
                {isPaused ? 'Resume Game' : 'Pause Game'}
            </StyledStartButton>
        )}
    </>
    
);

export default StartButton;