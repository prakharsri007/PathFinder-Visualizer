import React, { useState } from 'react';
import BubbleSort from './BubbleSortVisualizer.js'; // Import BubbleSort component
import InsertionSort from './InsertionSort.js'; // Import InsertionSort component
import MergeSort from './MergeSort.js'; // Import MergeSort component
import QuickSort from './QuickSort.js'; // Import QuickSort component
import './SortingVisualizer.css';

function SortingVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble'); // Default to Bubble Sort
  // const [isSorting, setIsSorting] = useState(false);

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const renderSortingComponent = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return <BubbleSort />;
      case 'insertion':
        return <InsertionSort />;
      case 'merge':
        return <MergeSort />;
      case 'quick':
        return <QuickSort />;
      default:
        return null;
    }
  };

  return (
    <div className="sorting-visualizer">
      <div className="algorithm-dropdown">
        <label htmlFor="algorithmSelect">Select Sorting Algorithm:</label>
        <select id="algorithmSelect" value={selectedAlgorithm} onChange={handleAlgorithmChange}>
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
      </div>

      {renderSortingComponent()}

      <div className="footer">
        {/* Add additional content or controls if needed */}
      </div>
    </div>
  );
}

export default SortingVisualizer;
