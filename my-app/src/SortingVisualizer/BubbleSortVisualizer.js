import React, { useState, useEffect, useCallback } from 'react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  const resetArray = useCallback(() => {
    const newArray = generateRandomArray(20);
    setArray(newArray);
  }, []);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const generateRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const n = array.length;
    const tempArray = [...array];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the bars being compared
        const updatedArray = tempArray.map((value, index) => (index === j || index === j + 1 ? value + 50 : value));
        setArray([...updatedArray]);
        await sleep(100);

        if (tempArray[j] > tempArray[j + 1]) {
          // Swap elements
          const temp = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = temp;

          // Redraw after swapping
          setArray([...tempArray]);
          await sleep(100);
        }
      }
    }

    // Highlight the sorted bars
    setArray(tempArray.map(value => value + 50));
  };

  return (
    <div>
      <div>
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>
      <div style={{ display: 'flex' }}>
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`,
              backgroundColor: '#3498db',
              border: '1px solid #000',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BubbleSortVisualizer;
