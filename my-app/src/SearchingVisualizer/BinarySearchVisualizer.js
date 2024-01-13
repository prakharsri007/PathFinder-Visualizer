// BinarySearchVisualizer.js
import React, { useState, useEffect, useMemo } from 'react';
import './BinarySearchVisualizer.css';

function BinarySearchVisualizer() {
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [steps, setSteps] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);

  const initialArray = useMemo(() => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    return newArray.sort((a, b) => a - b); // Ensure the array is sorted for binary search
  }, []);

  useEffect(() => {
    setArray(initialArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
  }, [initialArray]);

  const handleRun = async () => {
    const target = parseInt(searchValue, 10);
    const searchSteps = [];
    let found = false;
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      searchSteps.push({ index: mid, action: 'considered' });
      setSteps([...searchSteps]);

      await sleep(500);

      if (array[mid] === target) {
        found = true;
        setFoundIndex(mid);
        searchSteps.push({ index: mid, action: 'found' });
        break;
      } else if (array[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (!found) {
      searchSteps.push({ index: -1, action: 'not-found' });
    }

    setSteps([...searchSteps]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleReset = () => {
    setArray(initialArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
  };

  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
    setArray(newArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
  };

  return (
    <div className="search-visualizer">
      {/* Display array and input field */}
      <div className="search-container">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleRun}>Run</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleGenerateArray}>Generate New Array</button>
      </div>
      <div className="array">
        {array.map((num, index) => (
          <div
            key={index}
            className={`array-element ${foundIndex === index ? 'found' : ''} ${
              steps.findIndex((step) => step.index === index && step.action === 'considered') !== -1
                ? 'considered'
                : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      {/* Display visualization steps */}
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className={`step ${step.action}`}>
            {step.action === 'found' ? 'Found!' : step.action === 'not-found' ? 'Not Found!' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BinarySearchVisualizer;
