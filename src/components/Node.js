import React from 'react';
import "./Node.css";

const Node = ({isStart, isEnd, row, col, isWall, onMouseDown, onMouseEnter, onMouseUp}) => {
    const classes = isStart ? "node-start" : isWall ? "node-wall" : isEnd ? "node-end" : "";
    return <div className={`node ${classes}`} 
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown({row}, {col})}
        onMouseEnter={() => onMouseEnter({row}, {col})}
        onMouseUp={() => onMouseUp()}></div>;
}

export default Node;