// BinarySearchVisualizer.js
import React, { useState, useEffect, useMemo } from 'react';
import './BinarySearchVisualizer.css';

function BinarySearchVisualizer() {
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [steps, setSteps] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);
  const [foundValue, setFoundValue] = useState(null);
  const [currentArray, setCurrentArray] = useState([]);

  const initialArray = useMemo(() => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    return newArray.sort((a, b) => a - b); // Ensure the array is sorted for binary search
  }, []);

  useEffect(() => {
    setArray(initialArray);
    setCurrentArray(initialArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
    setFoundValue(null);
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

      await sleep(1600);

      if (array[mid] === target) {
        found = true;
        setFoundIndex(mid);
        setFoundValue(array[mid]); 
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
    setArray(currentArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
  };

  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
    setArray(newArray);
    setCurrentArray(newArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
  };

  return (
    <div className="search-visualizer">
      {/* Display array and input field */}
      <div className='des1'>
      Binary search is a searching algorithm that efficiently finds the position of a target value within a sorted array. It works by repeatedly dividing the search range in half.
      We always start with a sorted array. Two pointers are taken low(points at start index of the range) and high(points at last index of the range). 
      </div>
       <div className='des3'>
        The middle index, 'mid', is calculated as '(low+high)/2'. If the middle element is equal to the target value, the search is successful, and the index is returned. If the middle element is less than the target value, the target (if present) must be in the right half. Move the low pointer to mid + 1. If the middle element is greater than the target value, the target (if present) must be in the left half. Move the high pointer to mid - 1.
       We repeat the steps until the low pointer is greater than the high pointer, indicating that the target is not in the array.
       </div>

       <div className='des5'>
        Let's visualize the array! The elements highlighted in 'yellow' denote the middle element (mid) of every search range.
       </div>

      <div className="search-container">
        <div className='inputs'>
        <p className='enter'>Enter the number you want to search: </p>
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        </div>
        <p className='given_array'>The Array (Starting Index 0): </p>
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
      
      <button onClick={handleRun}>Run</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleGenerateArray}>Generate New Array</button>
       
      </div>
      

      
      {/* Display visualization steps */}
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className={`step ${step.action}`}>
            {step.action === 'found' ? `Found! Element ${foundValue} found at index ${step.index}!` : step.action === 'not-found' ? 'Not Found!' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BinarySearchVisualizer;
