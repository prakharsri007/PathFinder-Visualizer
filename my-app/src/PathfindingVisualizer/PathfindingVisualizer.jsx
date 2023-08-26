import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';//dijkstra import
import { astar } from '../algorithms/astar';                                 //astar import  
import { bfs } from '../algorithms/bfs';                                     //bfs import


import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      selectedAlgorithm: null,
      bfsVisualized: false,
      bfsRunning: false, 
      astarVisualized: false,
      astarRunning: false,
      dijkstraVisualized: false,
      dijkstraRunning: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  handleAlgorithmSelection(algorithm) {
    this.setState({ selectedAlgorithm: algorithm }, () => {
      const { selectedAlgorithm } = this.state;
      if (selectedAlgorithm === 'bfs') {
        this.visualizeBFS();
      } else if (selectedAlgorithm === 'astar') {
        this.visualizeAStar();
      } else if (selectedAlgorithm === 'dijkstra') {
        this.visualizeDijkstra();
      }
    });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const delay = 30; // Adjust the delay here
    this.setState({ dijkstraRunning: true });
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.setState({ dijkstraRunning: false, dijkstraVisualized: true });
          this.animateShortestPath(nodesInShortestPathOrder);
        }, delay * i); // Adjust the delay here
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, delay * i); // Adjust the delay here
    }
  }
  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    const delay = 30; // Adjust the delay here
    this.setState({ bfsRunning: true });
  
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, delay * i);
    }
  
    setTimeout(() => {
      this.setState({ bfsRunning: false, bfsVisualized: true });
      this.animateShortestPath(nodesInShortestPathOrder);
    }, delay * visitedNodesInOrder.length);
  }
  

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }
  //Dijkstra function
  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  //A*  function
  visualizeAStar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode); // Call A* algorithm
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  //BFS function
  visualizeBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode); // Call BFS algorithm
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  

  render() {
    const {grid, mouseIsPressed, selectedAlgorithm, bfsVisualized, bfsRunning, astarVisualized, astarRunning, dijkstraVisualized, dijkstraRunning} = this.state;

    let visualization;
    if (selectedAlgorithm === 'dijkstra') {
      visualization = <p class='algo_title'>Visualizing the Dijkstra's algorithm</p>;
    } else if (selectedAlgorithm === 'astar') {
      visualization = <p class='algo_title'>Visualizing the A* algorithm</p>;
    } else if (selectedAlgorithm === 'bfs') {
      visualization = <p class='algo_title'>Visualizing the BFS algorithm</p>;
    }

    return (
      <>
       <div className="row">
       <button onClick={() => this.handleAlgorithmSelection('bfs')}>
          Visualize BFS Algorithm
        </button>
      
        <button onClick={() => this.handleAlgorithmSelection('astar')}>
          Visualize A* Algorithm
        </button>

        <button onClick={() => this.handleAlgorithmSelection('dijkstra')}>
          Visualize Dijkstra's Algorithm
        </button>
      </div>

      {visualization}

      {bfsVisualized && !bfsRunning && (
        <div>
          <button class="newtry" onClick={() => window.location.reload()}>Try different algorithm</button>
        </div>
      )}

      {astarVisualized && !astarRunning && (
        <div>
          <button class="newtry" onClick={() => window.location.reload()}>Try different algorithm</button>
        </div>
      )}

      {dijkstraVisualized && !dijkstraRunning && (
        <div>
          <button class="newtry" onClick={() => window.location.reload()}>Try different algorithm</button>
        </div>
      )}
     
        
      {/* <div className="hidden1">
        <p>Visualizing the Dijkstra's algorithm</p>
      </div>
      <div className="hidden2">
        <p>Visualizing the A* algorithm</p>
      </div>
      <div className="hidden3">
        <p>Visualizing the BFS algorithm</p>
      </div> */}

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}