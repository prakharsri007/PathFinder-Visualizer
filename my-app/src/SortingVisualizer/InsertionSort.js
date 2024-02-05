import React, { useState, useEffect, useMemo } from 'react';
import './InsertionSort.css';

function InsertionSortVisualizer() {
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
            [newArray[step.indices[0]], newArray[step.indices[1]]] = [
              newArray[step.indices[1]],
              newArray[step.indices[0]],
            ];
            return newArray;
          });
        }
      }, index * 2000);

      setTimeout(() => {
        setCurrentSteps([]);
      }, (index + 1) * 2000);
    });

    setTimeout(() => {
      setAllSteps((prevAllSteps) => [...prevAllSteps, steps]);
      setIsSorting(false);
    }, steps.length * 2000);
  };

  const visualizeSort = () => {
    const arrayCopy = [...array];
    const sortSteps = [];

    for (let i = 1; i < arrayCopy.length; i++) {
      let key = arrayCopy[i];
      let j = i - 1;
      sortSteps.push({ indices: [i, j], action: 'considered' });

      while (j >= 0 && arrayCopy[j] > key) {
        sortSteps.push({ indices: [j + 1, j], action: 'swap' });
        arrayCopy[j + 1] = arrayCopy[j];
        j = j - 1;
      }
      arrayCopy[j + 1] = key;
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
      <h2>Insertion Sort</h2>
      <div className='is_desc'>
        Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less
        efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
      </div>

      <div className='is'>Let's visualize Insertion Sort!</div>

      {/* Display array */}
      <div className="is-arrays">
        {array.map((num, index) => (
          <div
            key={index}
            className={`is-arrays-element ${currentSteps.some((step) => step.indices.includes(index)) ? 'considered' : ''}`}
            style={{ height: `${num * 5}px` }}
          >
            {num}
          </div>
        ))}
      </div>
      <div>
        <button className='isb1' onClick={handleRun} disabled={isSorting}>
          Run
        </button>
        <button className='isb2' onClick={handleReset} disabled={isSorting}>
          Reset
        </button>
        <button className='isb3' onClick={handleGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
      </div>
      {/* Display visualization steps */}
      <div className="is-steps1">
        {allSteps.map((steps, iteration) => (
          <div key={iteration} className="is-iteration">
            Iteration {iteration + 1}:
            {steps.map((step, index) => (
              <div key={index} className={`${step.action} is-step1`}>
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

export default InsertionSortVisualizer;
