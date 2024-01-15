import React, { useState, useEffect, useMemo } from 'react';
import './BubbleSortVisualizer.css';

function BubbleSortVisualizer() {
  const [array, setArray] = useState([]);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [allSteps, setAllSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentArray, setCurrentArray] = useState([]);

  const initialArray = useMemo(() => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    return newArray;
  }, []);

  useEffect(() => {
    setArray(initialArray);
    setCurrentArray(initialArray);
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
    setArray(currentArray);
    setCurrentSteps([]);
    setAllSteps([]);
  };

  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArray);
    setCurrentArray(newArray);
    setCurrentSteps([]);
    setAllSteps([]);
  };

  return (
    <div className="sort-visualizer">
      <h2>Bubble Sort</h2>
<div className='bs_desc'> Bubble Sort algorithm compares each pair of adjacent elements in the list. If the elements are in the wrong order (i.e., the one on the left is greater than the one on the right), they are swapped. The algorithm continues to pass through the list, comparing and swapping adjacent elements, until no more swaps are needed. The process is repeated until the entire list is sorted.
</div>

<div className='bs'>Let's visualize Bubble Sort!</div>

      {/* Display array */}
      <div className="arrays">
        {array.map((num, index) => (
          <div
            key={index}
            className={`arrays-element ${currentSteps.some((step) => step.indices.includes(index)) ? 'considered' : ''}`}
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
      <div className="steps1">
        {allSteps.map((steps, iteration) => (
          <div key={iteration} className="iteration">
            Iteration {iteration + 1}:
            {steps.map((step, index) => (
              <div key={index} className={`${step.action} step1`}>
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
