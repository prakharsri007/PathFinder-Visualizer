// Homepage.js
import React , { useState, useEffect } from 'react';
import './Homepage.css';
import './audio/Welcome to Algorithm.mp3';

function Homepage({ navigateToPathfindingVisualizer, navigateToSearchingVisualizer, navigateToSortingVisualizer }) {
  const [isRobotClicked, setRobotClicked] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Clean up function to stop audio when component is unmounted
    return () => {
      if (audio && !audio.paused) {
        audio.pause();
      }
    };
  }, [audio]);
  
  const handleClickRobot = () => {
    if (isRobotClicked) {
      return;
    }
    setRobotClicked(true);

    // Play welcome audio
    const newAudio = new Audio(require('./audio/Welcome to Algorithm.mp3')); // Adjust the path
    newAudio.addEventListener('error', (error) => {
      console.error('Error loading audio:', error);
    });
    newAudio.playbackRate = 1.25;
    if(newAudio.paused){
      newAudio.play();
    }
    newAudio.loop = false;

    if (audio && !audio.paused) {
      audio.pause();
    }

    setAudio(newAudio);
  };

  return (
    
    <div className="Homepage">
      <div id='wrapper'>
      
      <div class="area" >
            <ul class="circles">

            <h1 class="title">ALGORITHM VISUALIZER</h1>
            <p class="choose">Select the category of algorithms you want to visualize</p>
            <div className='algo_buttons'>
            <button className="pathalgo" onClick={ navigateToPathfindingVisualizer}>Pathfinding Visualizer</button>
            <button className="searchalgo" onClick={ navigateToSearchingVisualizer}>Searching Visualizer</button>
            <button className="sortalgo" onClick={ navigateToSortingVisualizer}>Sorting Visualizer</button>
            </div>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>

                    <div className={`robot ${isRobotClicked ? 'robot-clicked' : ''}`}
                    onClick={handleClickRobot}
                    >
                      <div className="bubble">Click Me!</div>
              <img
                src="https://cdn4.iconfinder.com/data/icons/toys-childhood-12/60/robot__face__toy__kids__play-512.png" // Replace with the actual URL of your robot image
                alt="Robot Face"
                className="robot-image"
              /> 
                    </div>
            
            {/* {isRobotClicked ? null : (
            <div className="robot" onClick={handleClickRobot}>
              <div className="bubble">Click Me!</div>
              <img
                src="https://cdn4.iconfinder.com/data/icons/toys-childhood-12/60/robot__face__toy__kids__play-512.png" // Replace with the actual URL of your robot image
                alt="Robot"
                className="robot-image"
              />
            </div>
          )} */}

            </ul>

    </div >
   
    </div>
      {/* Other buttons you want to add */}
  
</div>
  );
}

export default Homepage;
