import React, {Component} from 'react';
import Node from './Node/Node';
import Overlay from '../Overlay';
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
      showButtons: true,
      setShowButtons: true,
      showOverlay: true,
    };
  }

  handleCloseOverlay = () => {
    this.setState({ showOverlay: false });
  };
  
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
    const startTime = performance.now(); // Record start time
    this.setState({ dijkstraRunning: true });
  
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.setState({ dijkstraRunning: false, dijkstraVisualized: true });
          this.animateShortestPath(nodesInShortestPathOrder);
  
          const endTime = performance.now(); // Record end time
          const timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds
          this.setState({
            dijkstraTimeTaken: timeTaken.toFixed(2) + ' seconds', // Update state with time taken in seconds
          });
        }, delay * i * 4); // Adjust the delay here
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, delay * i * 4); // Adjust the delay here
    }
    const endTime = performance.now(); // Record end time
    const timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    this.setState({
      dijkstraRunning: false,
      dijkstraVisualized: true,
      dijkstraTimeTaken: timeTaken.toFixed(2) + ' seconds', // Update state with time taken in seconds
    });
    this.animateShortestPath(nodesInShortestPathOrder);
  }
  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    const delay = 30; // Adjust the delay here
    const startTime = performance.now(); // Record start time
    this.setState({ bfsRunning: true });
  
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, delay * i * 4);
    }
  
    setTimeout(() => {
      this.setState({ bfsRunning: false, bfsVisualized: true });
      this.animateShortestPath(nodesInShortestPathOrder);
  
      const endTime = performance.now(); // Record end time
      const timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds
      this.setState({
        bfsRunning: false,
        bfsVisualized: true,
        bfsTimeTaken: timeTaken.toFixed(2) + ' seconds', // Update state with time taken in seconds
      });
      this.animateShortestPath(nodesInShortestPathOrder);
    }, delay * visitedNodesInOrder.length * 4);
  }
  

  

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i * 4);
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
    const { 
      showOverlay,
      grid, 
      mouseIsPressed, 
      selectedAlgorithm, 
      bfsVisualized, 
      bfsRunning, 
      astarVisualized, 
      astarRunning, 
      dijkstraVisualized, 
      dijkstraRunning, 
      bfsTimeTaken, 
      astarTimeTaken, 
      dijkstraTimeTaken,
      showButtons,
      setShowButtons
    } = this.state;

    
  
    let visualization, description;
    if (selectedAlgorithm === 'dijkstra') {
      visualization = <p className='algo_title'>Visualizing the Dijkstra's algorithm</p>;
      description = <div className='desc'>The algorithm starts from the start node and considers the neighboring nodes, calculating the cost of reaching them from the start node. The algorithm selects the neighboring node with the lowest cost and adds it to the list of visited nodes. The process continues until the destination node is reached.</div>
    } else if (selectedAlgorithm === 'astar') {
      visualization = <p className='algo_title'>Visualizing the A* algorithm</p>;
      description = <div className='desc'>A* starts at the starting node. It evaluates the neighboring nodes by
      Calculating the cost to reach each neighbor (g(n)),
      Estimating the cost from each neighbor to the goal (h(n)) using the heuristic function and
      Combining these costs to determine the total estimated cost (f(n) = g(n) + h(n)). Then, it
      picks the neighbor with the lowest f(n) value after which it moves to that neighbor and repeats the steps until the end node is reached.
    </div>
    } else if (selectedAlgorithm === 'bfs') {
      visualization = <p className='algo_title'>Visualizing the BFS algorithm</p>;
      description = <div className='desc'>Starting at the start node, the BFS algorithm
      creates a queue to hold nodes to explore. It
      adds the starting node to the queue.
      While the queue is not empty: it
      removes the first node from the queue,
      marks it as visited.
      If it's the goal node, it stops and returns the path.
    It adds all of its unvisited neighbors to the back of the queue.</div>
    }
  
    return (
      <>
      {showOverlay && <Overlay onClose={this.handleCloseOverlay} />}
        {/* Algorithm selection buttons */}
        {showButtons && setShowButtons && (
        <div className="row">
          <button onClick={() => {
            this.setState({
              showButtons: false,
              setShowButtons: false
            });
            this.handleAlgorithmSelection('bfs');}}>
            Visualize BFS Algorithm
          </button>
          <button onClick={() => {
             this.setState({
              showButtons: false,
              setShowButtons: false
            });
            this.handleAlgorithmSelection('astar');}}>
            Visualize A* Algorithm
          </button>
          <button onClick={() => {
             this.setState({
              showButtons: false,
              setShowButtons: false
            });
            this.handleAlgorithmSelection('dijkstra');}}>
            Visualize Dijkstra's Algorithm
          </button>
        </div>
        )}
  
        {/* Algorithm visualization information */}
        {visualization}
        {description}
  
        {/* Display time taken for each algorithm */}
        {bfsVisualized && !bfsRunning && (
          <div>
            <p style={{ fontFamily:'sans-serif', fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Time taken: {bfsTimeTaken} </p>
            <button className="newtry" onClick={() => window.location.reload()}>Try different algorithm</button>
          </div>
        )}
  
        {astarVisualized && !astarRunning && (
          <div>
            <p style={{ fontFamily:'sans-serif',fontSize: '20px', fontWeight: 'bold', marginTop: '10px'}}>Time taken: {astarTimeTaken}</p>
            <button className="newtry" onClick={() => window.location.reload()}>Try different algorithm</button>
          </div>
        )}
  
        {dijkstraVisualized && !dijkstraRunning && (
          <div>
            <p style={{ fontFamily:'sans-serif',fontSize: '20px', fontWeight: 'bold' , marginTop: '10px'}}>Time taken: {dijkstraTimeTaken}</p>
            <button className="newtry" onClick={() => window.location.reload()}>Try different algorithm</button>
          </div>
        )}

        {/* <div className="blockage">
          <p style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '21px'}}>Place Blockages between Start Node and End Node to visualize the working. Then, press the algorithm you want to visualize.</p>
        </div> */}

        <div className="node-legend">
          <span className="node-legend-item">
            <span className="node-square node-start-square"></span>
              Start Node
            </span>
          <span className="node-legend-item">
            <span className="node-square node-end-square"></span>
              End Node
            </span>
            <span className="node-legend-item">
            <span className="node-square node-block-square"></span>
              Blockages
            </span>
            <span className="node-legend-item">
            <span className="node-square node-path-square"></span>
              Final Path
            </span>
        </div>
  
        {/* Grid for visualization */}
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
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    />
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

