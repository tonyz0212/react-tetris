import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominoes';

const Cell = ({ type }) => (

    <StyledCell type={'L'} color={TETROMINOS['L'].color}/>
);

export default Cell;