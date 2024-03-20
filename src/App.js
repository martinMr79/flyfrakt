import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomGrid from './pages/volumeWeightCalculator/index'; 
import ChargesCalculator from './pages/priceCalculator/index'; 

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