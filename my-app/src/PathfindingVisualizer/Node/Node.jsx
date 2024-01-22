import React, {Component} from 'react';
import { FaArrowRight, FaCircle } from 'react-icons/fa';


import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = (isFinish
      && 'node-finish') ||
      (isStart
      && 'node-start') ||
      ( isWall
      && 'node-wall') ||
       'node-normal';

        const symbol = isStart ? <FaArrowRight className='start-symbol'/> : isFinish ? <FaCircle className='finish-symbol'/> : null;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}>
          {symbol}
        </div>
    );
  }
}