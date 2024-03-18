import React, { useState } from 'react';
import Stage from './Stage';
import { createStage, checkCollision } from '../gameHelper';
import Display from './Display';
import StartButton from './StartButton';
import ModeSelection from './ModelSelection';
// styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';
import { StyledStartButton } from './styles/StyledStartButton';
import TetriminoSelection from './TetriminoSelection';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedTetriminos, setSelectedTetriminos] = useState([]);
    const [isCustomizeMode, setIsCustomizeMode] = useState(false);
    const [finishedSelectingTetriminos, setfinishedSelectingTetriminos] = useState(false);
    
    


    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
        rowsCleared
    );

    // move left to right
    const movePlayerHorizontal = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }

    const startGame = () => {
        console.log("test");
        // Reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setRows(0);
        setScore(0);
        setLevel(0);
        setIsStarted(true);
        document.getElementById("tetris-wrapper").focus();
    }

    const pauseResumeGame = () => {
        setIsPaused(prev => !prev);
        if (!isPaused) {
            setDropTime(null); // Pause the drop
        } else {
            setDropTime(1000); // Resume the drop
        }
    };

    const handleModeSelection = mode => {
        setSelectedMode(mode);
        if (mode === 'customize') {
            setIsCustomizeMode(true);
        }
    };

    const handleTetriminoSelection = tetriminos => {
        setSelectedTetriminos(tetriminos);
        setIsCustomizeMode(false); // Exit customize mode after selecting tetriminos
    };


    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // Also increase speed
            setDropTime(1000 / (level + 1) + 200);
        }


        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log("Game Over");;
                setGameOver(true);
                setDropTime(null);
                setIsStarted(false);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        }
    }
    const hardDrop = () => {
        let pot = 0;
        while (!checkCollision(player, stage, { x: 0, y: pot })) {
        //    setDropTime(5);
           pot += 1;
        }
     
        updatePlayerPos({ x: 0, y: pot-1, collided: true });
     }
     
    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = (e) => {
        if (!gameOver) {
            e.preventDefault(); 
            // left arrow code is 37
            if (e.keyCode === 37) {
                movePlayerHorizontal(-1);
            } else if (e.keyCode === 39) {
                movePlayerHorizontal(1);
            } else if (e.keyCode === 40) {
                dropPlayer()
            } else if (e.keyCode === 38) {
                playerRotate(stage, 1);
            } else if (e.keyCode === 32) {
                hardDrop();
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);
    return (
        <StyledTetrisWrapper id="tetris-wrapper" role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
            {selectedMode === null && <ModeSelection onSelectMode={handleModeSelection} />}
            {selectedMode === 'customize' && <TetriminoSelection/>}
    { (selectedMode === 'regular' || (selectedMode === 'customize' && finishedSelectingTetriminos)) && (
        <>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                )}
                <StartButton
                    callback={startGame}
                    onPauseResume={pauseResumeGame}
                    isPaused={isPaused}
                    isStarted={isStarted}
                />
            </aside>
        </>
    )}
</StyledTetris>

        </StyledTetrisWrapper>
    );
};

export default Tetris