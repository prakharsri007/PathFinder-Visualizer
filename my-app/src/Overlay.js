// Overlay.js
import React from 'react';
import './Overlay.css';

function Overlay({ onClose }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <p>Welcome to Pathfinding Visualizer!</p>
        <button onClick={onClose}>Start Visualization</button>
      </div>
    </div>
  );
}

export default Overlay;
