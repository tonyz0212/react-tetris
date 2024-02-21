import React from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage } from '../gameHelper';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
            {/*  not sure what this doing */}
            <Stage stage={createStage()} />
            <aside>
                <div>
                    <Display text="Score"></Display>
                    <Display text="Row"></Display>
                    <Display text="Score"></Display>
                </div>
                <StartButton></StartButton>
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )

}

export default Tetris;