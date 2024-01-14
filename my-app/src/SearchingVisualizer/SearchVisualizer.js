// LinearSearchVisualizer.js
import React, { useState } from 'react';
import LinearSearchVisualizer from './LinearSearchVisualizer';
import BinarySearchVisualizer from './BinarySearchVisualizer';
import './SearchVisualizer.css';

function SearchVisualizer() {
  const [algorithm, setAlgorithm] = useState('linear');

  return (
    <div className="search-visualizer">
      <div className="top-bar">
        <label className='navbar'>
          Choose the algorithm:
          <select className='selection' value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
            <option className='linear' value="linear">Linear Search</option>
            <option className='binary' value="binary">Binary Search</option>
          </select>
        </label>
      </div>
      {algorithm === 'linear' ? <LinearSearchVisualizer /> : <BinarySearchVisualizer />}
    </div>
  );
}

export default SearchVisualizer;
