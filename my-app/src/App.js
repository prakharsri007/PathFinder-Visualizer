  import React from 'react';
  import './App.css';
  import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
  import Homepage from './Homepage';
  import {Routes, Route} from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';

  function App(){
    const navigate = useNavigate();
    const navigateToPathfindingVisualizer = () => {
      navigate('/pathfinding-visualizer');
    };

    return (
      <div className="App">
        <Routes>
      <Route path="/" element={<Homepage navigateToPathfindingVisualizer={navigateToPathfindingVisualizer} />} /> {/* Render the Homepage component as the initial page */}
        <Route path="/pathfinding-visualizer" element={<PathfindingVisualizer  /> } />
        </Routes>
      </div>
    );
  }

  export default App;