import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ChargesCalculator() {
  // Access the total chargeable weight from the Redux store
  const chargeableWeight = useSelector((state) => state.volumeWeightCalculator.chargeableWeight);
  const totalWeight = useSelector(state => state.volumeWeightCalculator.totalWeight);
  const totalCBM = useSelector(state => state.volumeWeightCalculator.totalCBM);


  const [charges, setCharges] = useState({
    pricePerKg: '',
    fsc: '',
    ssc: '',
    airportTerminal: '',
    pickUp: '',
    customClearance: '',
    customCharges: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharges((prevCharges) => ({
      ...prevCharges,
      [name]: value,
    }));
  };

  const handleCustomChargeChange = (index, value) => {
    const updatedCustomCharges = charges.customCharges.map((charge, i) => {
      if (i === index) {
        return { ...charge, value };
      }
      return charge;
    });
    setCharges((prevCharges) => ({
      ...prevCharges,
      customCharges: updatedCustomCharges,
    }));
  };

  const calculateTotalCharges = () => {
    const airfreight = Number(charges.pricePerKg) * chargeableWeight || 0;
    const fuelSurcharge = Number(charges.fsc) * chargeableWeight || 0;
    const securitySurcharge = Number(charges.ssc) * chargeableWeight || 0;
    const airportTerminal = Number(charges.airportTerminal) || 0;
    const pickUp = Number(charges.pickUp) || 0;
    const customClearance = Number(charges.customClearance) || 0;

  const totalCustomCharges = charges.customCharges.reduce(
    (total, charge) => total + Number(charge.value) || 0,
    0
    );


    const total =
      airfreight +
      fuelSurcharge +
      securitySurcharge +
      airportTerminal +
      pickUp +
      customClearance +
      totalCustomCharges;
    return total.toFixed(2);
  };

  const addCustomField = () => {
    setCharges((prevCharges) => {
      const newCustomCharge = { name: '', value: '' }; // Define the structure of your custom charge
      return {
        ...prevCharges,
        customCharges: [...prevCharges.customCharges, newCustomCharge],
      };
    });
  };

  const getCustomChargeRows = () => {
    const rows = [];
    for (let i = 0; i < charges.customCharges.length; i += 3) {
      rows.push(charges.customCharges.slice(i, i + 3));
    }
    return rows;
  };

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className="text-center mb-10 sm:text-2xl md:text-3xl lg:text-4xl text-blue-500 font-bold">
        Airfreight Charges Calculator
      </h1>
      <div className="totals-display mb-4">
      <p>CBM: {totalCBM} m³</p>
      <p>Weight: {totalWeight} kg</p>
      <p>Chargeable Weight: {chargeableWeight} kg</p>
    </div>
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
        {getCustomChargeRows().map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-2 space-x-2 mt-2">
            {row.map((charge, index) => (
              <input
                key={rowIndex * 3 + index}
                type="number"
                placeholder="Custom charge"
                value={charge.value}
                onChange={(e) => handleCustomChargeChange(rowIndex * 3 + index, e.target.value)}
                className="py-2 px-4 w-1/3"
              />
            ))}
          </div>
        ))}
        
        <button
          onClick={addCustomField}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out mt-4"
        >
          Add Custom Field
        </button>

        <h2 className="text-lg mt-8 font-bold">Total charges</h2>
        <div>
          Airfreight:{' '}
          {(
            parseFloat(charges.pricePerKg) * chargeableWeight || 0
          ).toFixed(2)}{' '}
        </div>
        <div>
          FSC:{' '}
          {(parseFloat(charges.fsc) * chargeableWeight || 0).toFixed(2)}
        </div>
        <div>
          SSC:{' '}
          {(parseFloat(charges.ssc) * chargeableWeight || 0).toFixed(2)}
        </div>
        <h2 className="text-lg mt-8 font-bold">
          Total Price: {calculateTotalCharges()}
        </h2>
      </div>

      <div className="pt-8">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 font-bold"
        >
          Go to Volume Weight Calculator
        </Link>
      </div>
    </div>
  );
}

export default ChargesCalculator;
