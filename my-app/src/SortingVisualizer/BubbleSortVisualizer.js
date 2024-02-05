import React, { useState, useEffect, useMemo, useRef } from 'react';
import './BubbleSortVisualizer.css';
import bubbleSortAudio from 'D:/test/PathFinder-Visualizer/my-app/src/audio/BubbleSort audio.mp3';

function BubbleSortVisualizer() {
  const [array, setArray] = useState([]);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentArray, setCurrentArray] = useState([]);
  const [audioPlayed, setAudioPlayed] = useState(false); 
  const audioRef = useRef(null);

  const initialArray = useMemo(() => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    return newArray;
  }, []);

  useEffect(() => {
    setArray(initialArray);
    setCurrentArray(initialArray);
    setCurrentSteps([]);
    setIsSorting(false);
    setAudioPlayed(false);
  }, [initialArray]);

  useEffect(() => {
    if (isSorting && !audioPlayed) {
      playAudio();
      setAudioPlayed(true);
    }
  }, [isSorting, audioPlayed]);

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
      setIsSorting(false);
    }, steps.length * 1000);
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
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
   setAudioPlayed(false); ;
  };

  const handleGenerateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArray);
    setCurrentArray(newArray);
    setCurrentSteps([]);
    setAudioPlayed(false); 
  };

  return (
    <div className="sort-visualizer">
      <h2>Bubble Sort</h2>
<div className='bs_desc'> Bubble Sort algorithm compares each pair of adjacent elements in the list. If the elements are in the wrong order (i.e., the one on the left is greater than the one on the right), they are swapped. The algorithm continues to pass through the list, comparing and swapping adjacent elements, until no more swaps are needed. The process is repeated until the entire list is sorted.
</div>

<div className='bs'>Let's visualize Bubble Sort!</div>

      {/* Display array */}
      <div className="bs-arrays">
        {array.map((num, index) => (
          <div
            key={index}
            className={`bs-arrays-element ${currentSteps.some((step) => step.indices.includes(index)) ? 'considered' : ''}`}
            style={{ height: `${num * 5}px` }}
          >
            {num}
          </div>
        ))}
      </div>
      <div>
        <button className="bs-button1" onClick={handleRun} disabled={isSorting}>
          Run
        </button>
        <button className="bs-button2" onClick={handleReset} disabled={isSorting}>
          Reset
        </button>
        <button className="bs-button3" onClick={handleGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
      </div>
      {/* Display visualization steps */}
     
      <audio ref={audioRef} src={bubbleSortAudio} loop={false}/>
    </div>
  );
}

export default BubbleSortVisualizer;
