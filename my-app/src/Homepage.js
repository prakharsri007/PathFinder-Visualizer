// Homepage.js
import React from 'react';
import './Homepage.css';

function Homepage({ navigateToPathfindingVisualizer }) {
  return (
    
    <div className="Homepage">
      <div id='wrapper'>
      
      <div class="area" >
            <ul class="circles">

            <h1 class="title">ALGORITHM VISUALIZER</h1>

            <div className='algo_buttons'>
            <button className="pathalgo" onClick={ navigateToPathfindingVisualizer}>Pathfinding Visualizer</button>
            <button className="searchalgo" >Searching Visualizer</button>
            <button className="sortalgo" >Sorting Visualizer</button>
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
            </ul>
    </div >
   
    </div>
      {/* Other buttons you want to add */}
  
</div>
  );
}

export default Homepage;
