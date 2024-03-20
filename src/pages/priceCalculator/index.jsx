import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ChargesCalculator() {
  // State for storing the inputs
  const [charges, setCharges] = useState({
    pricePerKg: '',
    fsc: '', // Fuel Surcharge
    ssc: '', // Security Surcharge
    airportTerminal: '',
    pickUp: '',
    customClearance: '',
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

    // Function to dynamically add a custom charge field
    const addCustomField = () => {
      // Implementation for adding custom field
    };

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className="text-center mb-10 sm:text-2xl md:text-3xl lg:text-4xl text-blue-500 font-bold">
        Airfreight Charges Calculator
      </h1>
      <div className="bg-gray-200 w-full px-5 py-10">
        
      <div className="flex mb-2 space-x-2  mt-4">
          <input
            type="number"
            name="pricePerKg"
            placeholder="Price per Kg"
            value={charges.pricePerKg}
            onChange={handleChange}
            className="py-2 px-4 w-1/3"
          />
          <input
            type="number"
            name="fsc"
            placeholder="Fuel Surcharge (FSC)"
            value={charges.fsc}
            onChange={handleChange}
            className="py-2 px-4 w-1/3"
          />
          <input
            type="number"
            name="ssc"
            placeholder="Security Surcharge (SSC)"
            value={charges.ssc}
            onChange={handleChange}
            className="py-2 px-4 w-1/3"
          />
        </div>

        <div className="flex mb-2 space-x-2  mt-2">
          <input
            type="number"
            name="airportTerminal"
            placeholder="Airport Terminal"
            value={charges.airportTerminal}
            onChange={handleChange}
            className="py-2 px-4 w-1/3"
          />
          <input
            type="number"
            name="pickUp"
            placeholder="Pick-up"
            value={charges.pickUp}
            onChange={handleChange}
            className="py-2 px-4 w-1/3"
          />
          <input
            type="number"
            name="customClearance"
            placeholder="Custom Clearance"
            value={charges.customClearance}
            onChange={handleChange}
            className="py-2 px-4 w-1/3"
          />
        </div>

        {/* Implementation for dynamic custom charges fields */}

        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out mt-4"
          onClick={addCustomField}
        >
          Add Custom Field
        </button>


        <h2 className="text-lg mt-8 font-bold">Total charges</h2>
        <div className="">Airfreight:</div>
        <div className="">FSC:</div>
        <div className="">SSC:</div>
        <div className="">Airport Terminal:</div>
        <div className="">Pick-up:</div>
        <div className="">Customs:</div>
        <h2 className="text-lg mt-8 font-bold">Total Price</h2>
   

      </div>

      <div className='pt-8'>
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 font-bold">Go to Volume Weight Calculator</Link>
      </div>

    </div>
  );
}

export default ChargesCalculator;

