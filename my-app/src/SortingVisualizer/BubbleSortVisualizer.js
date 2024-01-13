// BubbleSortVisualizer.js
import React, { useState, useEffect } from 'react';
import './BubbleSortVisualizer.css';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps([]);
  };

  const visualizeBubbleSort = async () => {
    setIsSorting(true);
    const newArray = [...array];
    const stepsArray = [];

    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        stepsArray.push({ index1: j, index2: j + 1, swap: true });
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          stepsArray.push({ array: [...newArray], swap: true });
        } else {
          stepsArray.push({ array: [...newArray], swap: false });
        }
      }
    }

    setIsSorting(false);
    setSteps(stepsArray);
  };

  const handleRun = () => {
    visualizeBubbleSort();
  };

  const handleReset = () => {
    generateNewArray();
  };

  return (
    <div className="sort-visualizer">
      <div className="array">
        {array.map((num, index) => (
          <div
            key={index}
            className={`array-element ${isSorting ? 'sorting' : ''}`}
            style={{ height: `${num}px` }}
          >
            {num}
          </div>
        ))}
      </div>
      <button onClick={handleRun} disabled={isSorting}>
        Run Bubble Sort
      </button>
      <button onClick={handleReset} disabled={isSorting}>
        Reset
      </button>
      <button onClick={generateNewArray} disabled={isSorting}>
        Generate New Array
      </button>
      <div className="steps">
        {Array.isArray(steps) && steps.length > 0 && steps.map((step, index) => (
          <div key={index} className="step">
            {Array.isArray(step.array) && step.array.map((num, i) => (
              <div
                key={i}
                className={`array-element ${step.swap && isSorting ? 'swapping' : ''}`}
                style={{ height: `${num}px` }}
              >
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
