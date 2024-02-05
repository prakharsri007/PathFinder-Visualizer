  import React from 'react';
  import './App.css';
  import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
  import Homepage from './Homepage';
  import {Routes, Route} from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
// import LinearSearchVisualizer from './SearchingVisualizer/LinearSearchVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import SearchVisualizer from './SearchingVisualizer/SearchVisualizer';
  function App(){
    const navigate = useNavigate();
    const navigateToPathfindingVisualizer = () => {
      navigate('/pathfinding-visualizer');
    };

    const navigateToSearchingVisualizer = () => {
      navigate("/searching-visualizer");
    };

    const navigateToSortingVisualizer = () => {
      navigate("/sorting-visualizer");
    };
    

    return (
      <div className="App">
        <Routes>
      <Route path="/" element={<Homepage navigateToPathfindingVisualizer={navigateToPathfindingVisualizer}
                                        navigateToSearchingVisualizer={navigateToSearchingVisualizer}
                                        navigateToSortingVisualizer={navigateToSortingVisualizer}
      />} /> {/* Render the Homepage component as the initial page */}
        <Route path="/pathfinding-visualizer" element={<PathfindingVisualizer  /> } />
        <Route path="/searching-visualizer" element={<SearchVisualizer />} />
        <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
        </Routes>
      </div>
    );
  }

  export default App;