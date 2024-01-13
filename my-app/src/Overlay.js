// Overlay.js
import React from 'react';
import './overlay.css';

function Overlay({ onClose }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <p className='intro'>Welcome to Pathfinding Visualizer!</p>
        <p className='working1'>A path-finding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!
All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a"cost" of 1.</p>
<p className='working2'>Now, you will see a grid in which you can add obstructions/blockages or walls on any block by clicking or dragging. A choice of three algorithms is given, depending on your selection the algorithm will navigate from start node to end node according to its nature.</p>
        <button onClick={onClose}>Start Visualization</button>
      </div>
    </div>
  );
}

export default Overlay;
