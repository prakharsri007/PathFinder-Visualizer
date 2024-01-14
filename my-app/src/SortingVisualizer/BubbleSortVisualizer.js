import React, { useState, useEffect, useMemo } from 'react';
import './BubbleSortVisualizer.css';

function BubbleSortVisualizer() {
  const [array, setArray] = useState([]);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [allSteps, setAllSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const initialArray = useMemo(() => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    return newArray;
  }, []);

  useEffect(() => {
    setArray(initialArray);
    setCurrentSteps([]);
    setAllSteps([]);
    setIsSorting(false);
  }, [initialArray]);

  const visualizeSteps = (steps) => {
    setIsSorting(true);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentSteps([step]);

        if (step.action === 'swap') {
          // Update the array state after a swap
          setArray((prevArray) => {
            const newArray = [...prevArray];
            [newArray[step.indices[0]], newArray[step.indices[1]]] = [newArray[step.indices[1]], newArray[step.indices[0]]];
            return newArray;
          });
        }
      }, index * 1000);

      setTimeout(() => {
        setCurrentSteps([]);
      }, (index + 1) * 1000);
    });

    setTimeout(() => {
      setAllSteps((prevAllSteps) => [...prevAllSteps, steps]);
      setIsSorting(false);
    }, steps.length * 1000);
  };

  const visualizeSort = () => {
    const arrayCopy = [...array];
    const sortSteps = [];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - i - 1; j++) {
        sortSteps.push({ indices: [j, j + 1], action: 'considered' });

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          sortSteps.push({ indices: [j, j + 1], action: 'swap' });
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
        }
      }
    }

    visualizeSteps(sortSteps);
  };

  const handleRun = () => {
    if (!isSorting) {
      visualizeSort();
    }
  };

  const handleReset = () => {
    setArray(initialArray);
    setCurrentSteps([]);
    setAllSteps([]);
  };

  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArray);
    setCurrentSteps([]);
    setAllSteps([]);
  };

  return (
    <div className="sort-visualizer">
      <h2>Bubble Sort</h2>
      {/* Display array */}
      <div className="array">
        {array.map((num, index) => (
          <div
            key={index}
            className={`array-element ${currentSteps.some((step) => step.indices.includes(index)) ? 'considered' : ''}`}
            style={{ height: `${num * 5}px` }}
          >
            {num}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleRun} disabled={isSorting}>
          Run
        </button>
        <button onClick={handleReset} disabled={isSorting}>
          Reset
        </button>
        <button onClick={handleGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
      </div>
      {/* Display visualization steps */}
      <div className="steps">
        {allSteps.map((steps, iteration) => (
          <div key={iteration}>
            {steps.map((step, index) => (
              <div key={index} className={`${step.action} step`}>
                {step.indices.map((idx) => (
                  <span key={idx}>{array[idx]}</span>
                ))}
                {step.action === 'swap' && '-swap'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BubbleSortVisualizer;
