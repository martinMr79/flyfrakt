import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function ChargesCalculator() {
  // State for storing the inputs
  const [charges, setCharges] = useState({
    pricePerKg: 0,
    fsc: 0, // Fuel Surcharge
    ssc: 0, // Security Surcharge
    customCharges: {},
  });

  // Handle change in the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharges((prevCharges) => ({
      ...prevCharges,
      [name]: value,
    }));
  };

  // Example of adding a custom charge
  const addCustomCharge = (name, value) => {
    setCharges((prevCharges) => ({
      ...prevCharges,
      customCharges: {
        ...prevCharges.customCharges,
        [name]: value,
      },
    }));
  };

  return (
    <div className="charges-calculator">
      <h1>Airfreight Charges Calculator</h1>
      <div>
        <label>Price per Kg:</label>
        <input
          type="number"
          name="pricePerKg"
          value={charges.pricePerKg}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fuel Surcharge (FSC):</label>
        <input
          type="number"
          name="fsc"
          value={charges.fsc}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Security Surcharge (SSC):</label>
        <input
          type="number"
          name="ssc"
          value={charges.ssc}
          onChange={handleChange}
        />
      </div>
      <Link to="/" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">Go to Volume Weight Calculator</Link>

      {/* Placeholders for custom charges */}
      {/* UI for adding custom charges will go here */}
    </div>
  );
}

export default ChargesCalculator;
