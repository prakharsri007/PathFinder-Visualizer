// LinearSearchVisualizer.js
import React, { useState, useEffect, useMemo , useRef} from 'react';
import './LinearSearchVisualizer.css';
import LinearchSearchAudio from 'D:/test/PathFinder-Visualizer/my-app/src/audio/Linear Search audio.mp3';

function LinearSearchVisualizer() {
  
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [steps, setSteps] = useState([]);
  const [foundIndex, setFoundIndex] = useState(null);
  const [currentArray, setCurrentArray] = useState([]);
  const audioRef = useRef(null);

const initialArray = useMemo(() => {
  const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  return newArray;
}, []);

  useEffect(() => {
    setArray(initialArray);
    setCurrentArray(initialArray);
    // setSearchValue('');
    // setSteps([]);
    // setFoundIndex(null);
  }, [initialArray]);

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };


  const handleRun = async () => {
    playAudio();
    const target = parseInt(searchValue, 10);
    const searchSteps = [];
    let found = false;
    let ind = 0;
  
    for (let i = 0; i < array.length; i++) {
      searchSteps.push({ index: i, action: 'considered' });
      setSteps([...searchSteps]); // Update the steps to trigger re-render
  
      await sleep(1400); // Adjust the delay time (in milliseconds)
  
      if (array[i] === target) {
        ind = i;
        found=true;
        setFoundIndex(i);
        searchSteps.push({ index: i, action: 'found' });
        break;
      }
    }

    if (!found) {
      searchSteps.push({ index: -1, action: 'not-found' });
    }
    else{
      searchSteps.push({ index: ind, action: 'result', value: target });
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
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
    setArray(newArray);
    setCurrentArray(newArray);
    setSearchValue('');
    setSteps([]);
    setFoundIndex(null);
  };

  return (
    <div className="search-visualizer">
    
      {/* Display array and input field */}
      <div className="search-container">
       
       <div className='ls_desc'>
       Linear search is a simple search algorithm that sequentially checks each element in a list or array until a match is found or the entire list has been searched. In other words, it starts from the beginning and goes through each element one by one until the target element is found or the end of the list is reached. Let's visualize the linear Search Algorithm!
       </div>

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
                steps.findIndex((step) => step.index === index && step.action === 'considered') !== -1 ? 'considered' : ''
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
            {step.action === 'found' ? 'Found!' : step.action === 'not-found' ? 'Not Found!' : step.action === 'result' ? `Element ${step.value} found at index ${step.index}` : ''}
          </div>
        ))}
      </div>
      <audio ref={audioRef} src={LinearchSearchAudio} loop={false}/>
    </div>
  );
}

export default LinearSearchVisualizer;
