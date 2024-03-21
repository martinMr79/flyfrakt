import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomGrid from './pages/volumeWeightCalculator/index';
import ChargesCalculator from './pages/priceCalculator/index';

// Define the App component outside of the ReactDOM.render call
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomGrid />} />
        <Route path="/charges" element={<ChargesCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;