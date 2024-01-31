// Overlay.js
import React, {useState, useEffect} from 'react';
import './overlay.css';
import './audio/overlay audio.mp3';

function Overlay({ onClose }) {
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

   

    // Play overlay audio
    const newAudio = new Audio(require('./audio/overlay audio.mp3')); // Adjust the path
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
    <div className="overlay">
      <div className="overlay-content">
        <p className='intro'>Welcome to Pathfinding Visualizer!</p>
        <p className='working1'>A path-finding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!
All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a"cost" of 1.</p>
<p className='working2'>Now, you will see a grid in which you can add obstructions/blockages or walls on any block by clicking or dragging. A choice of three algorithms is given, depending on your selection the algorithm will navigate from start node to end node according to its nature.</p>
        
        <button onClick={onClose}>Start Visualization</button>
        <div className={`robot ${isRobotClicked ? 'robot-clicked' : ''}`}
                    onClick={handleClickRobot}
                    >
                      <div className="bubble-new">Click Me!</div>
              <img
                src="https://cdn4.iconfinder.com/data/icons/toys-childhood-12/60/robot__face__toy__kids__play-512.png" // Replace with the actual URL of your robot image
                alt="Robot Face"
                className="robot-image-new"
              /> 
                    </div>

      </div>
    </div>
  );
}

export default Overlay;
