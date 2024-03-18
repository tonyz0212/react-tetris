import { useCallback, useState } from 'react';

import { TETROMINOS, randomTetromino} from '../tetrominoes';
import { checkCollision, STAGE_WIDTH } from '../gameHelper';


export const usePlayer = () => {
    // 声明了一个名为 player 的状态变量，它包含了玩家的位置 (pos)、当前控制的俄罗斯方块形状 (tetromino) 和碰撞状态 (collided)
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        // console.log('移动前的x:', player.pos.x); // 输出移动前的x值
        setPlayer(prev => ({
          ...prev,
          pos: { x: (prev.pos.x + x), y: (prev.pos.y + y)},
          collided
        }))
        console.log('移动后的y:', player.pos.y); // 输出移动后的x值
    };

    const rotate = (matrix, dir) => {
        // Make the rows to become cols (transpose)
        const rotatedTetro = matrix.map((_, index) =>
          matrix.map(col => col[index]),
        );
        // Reverse each row to get a rotated matrix
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
      };
    

      const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
          clonedPlayer.pos.x += offset;
          offset = -(offset + (offset > 0 ? 1 : -1));
          if (offset > clonedPlayer.tetromino[0].length) {
            rotate(clonedPlayer.tetromino, -dir);
            clonedPlayer.pos.x = pos;
            return;
          }
        }
        setPlayer(clonedPlayer);
      };

    // 这里使用了useCallback来确保resetPlayer函数只在初始化时创建一次，以避免不必要的重复创建，提高性
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false

        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}