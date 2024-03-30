import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { setCharges } from '../../slices/volumeWeightCalculatorSlice';

const reactSelectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? '1px solid #ccc' : 'none',
    borderRadius: '0',
    minHeight: '40px',
    height: '40px',
    paddingLeft: '0.35rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    paddingLeft: '0rem',
  }),
  option: (provided, state) => ({
    ...provided,
    paddingLeft: '1rem',
  }),
};

function ChargesCalculator() {
  const dispatch = useDispatch();
  const {
    chargeableWeight,
    totalCBM,
    totalWeight,
    charges: chargesRedux,
    calculationMethod: calculationMethodRedux,
  } = useSelector((state) => state.volumeWeightCalculator);

  const [localCharges, setLocalCharges] = useState(
    chargesRedux || {
      pricePerKg: '',
      fsc: '',
      ssc: '',
      airportTerminal: '',
      pickUp: '',
      customClearance: '',
      customCharges: [],
    }
  );

  const handleChange = (e, chargeKey) => {
    const { name, value } = e.target;
    const updatedCharges = {
      ...localCharges,
      [chargeKey]: {
        ...localCharges[chargeKey],
        [name]: value,
      },
    };
    setLocalCharges(updatedCharges);
    dispatch(setCharges(updatedCharges));
  };

  const calculationOptions = [
    { value: 'chargeableWeight', label: 'Chargeable Weight' },
    { value: 'actualWeight', label: 'Actual Weight' },
    { value: 'lumpSum', label: 'Lump Sum' },
  ];

  const handleCalculationMethodChangeForPricePerKg = (selectedOption) => {
    const updatedCharges = {
      ...localCharges,
      pricePerKg: {
        ...localCharges.pricePerKg,
        calculationMethod: selectedOption.value,
      },
    };
    setLocalCharges(updatedCharges);
    dispatch(setCharges(updatedCharges));
  };

  // Handler for FSC calculation method change
  const handleCalculationMethodChangeForFSC = (selectedOption) => {
    const updatedCharges = {
      ...localCharges,
      fsc: { ...localCharges.fsc, calculationMethod: selectedOption.value },
    };
    setLocalCharges(updatedCharges);
    dispatch(setCharges(updatedCharges));
  };

  const handleCalculationMethodChangeForSSC = (selectedOption) => {
    // Directly use the selected option value
    const updatedCharges = {
      ...localCharges,
      ssc: { ...localCharges.ssc, calculationMethod: selectedOption.value },
    };
    setLocalCharges(updatedCharges);
    dispatch(setCharges(updatedCharges)); // Assuming setCharges can handle the entire charges object
  };

  const calculateTotalCharges = () => {
    let airfreight = 0;
    let fsc = 0;
    let ssc = 0;
  
    // Assume airfreight calculation is always based on the selected method for pricePerKg
    switch (localCharges.pricePerKg.calculationMethod) {
      case 'chargeableWeight':
        airfreight = parseFloat(localCharges.pricePerKg.value) * chargeableWeight;
        break;
      case 'actualWeight':
        airfreight = parseFloat(localCharges.pricePerKg.value) * totalWeight;
        break;
      case 'lumpSum':
        // Assuming lump sum means a fixed value regardless of weight
        airfreight = parseFloat(localCharges.pricePerKg.value);
        break;
      // Add other cases as needed
      default:
        airfreight = 0;
        break;
    }
  
    // Assume FSC calculation is based on the selected method for FSC
    switch (localCharges.fsc.calculationMethod) {
      case 'chargeableWeight':
        fsc = parseFloat(localCharges.fsc.value) * chargeableWeight;
        break;
      case 'actualWeight':
        fsc = parseFloat(localCharges.fsc.value) * totalWeight;
        break;
      case 'lumpSum':
        fsc = parseFloat(localCharges.fsc.value);
        break;
      default:
        fsc = 0;
        break;
    }
  
    // Assume SSC calculation is based on the selected method for SSC
    switch (localCharges.ssc.calculationMethod) {
      case 'chargeableWeight':
        ssc = parseFloat(localCharges.ssc.value) * chargeableWeight;
        break;
      case 'actualWeight':
        ssc = parseFloat(localCharges.ssc.value) * totalWeight;
        break;
      case 'lumpSum':
        ssc = parseFloat(localCharges.ssc.value);
        break;
      default:
        ssc = 0;
        break;
    }
  
    // Sum up all charges
    const total = airfreight + fsc + ssc;
  
    return total.toFixed(2);
  };

  const handleCustomChargeChange = (index, value) => {
    const updatedCustomCharges = localCharges.customCharges.map((charge, i) => {
      if (i === index) {
        return { ...charge, value };
      }
      return charge;
    });
    const newCharges = { ...localCharges, customCharges: updatedCustomCharges };
    setLocalCharges(newCharges);
    dispatch(setCharges(newCharges));
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
    for (let i = 0; i < localCharges.customCharges.length; i += 3) {
      rows.push(localCharges.customCharges.slice(i, i + 3));
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
        <div className="flex flex-wrap mb-2 mt-4 ">
          {/* Price per Kg Input and Selector */}
          <div className="w-1/3 pr-1 flex flex-col">
            <input
              type="number"
              name="value"
              placeholder="Price per Kg"
              value={localCharges.pricePerKg.value}
              onChange={(e) => handleChange(e, 'pricePerKg')}
              className="py-2 px-4 w-full"
            />
            <Select
              value={calculationOptions.find(
                (option) =>
                  option.value === localCharges.pricePerKg.calculationMethod
              )}
              onChange={handleCalculationMethodChangeForPricePerKg}
              options={calculationOptions}
              classNamePrefix="react-select"
              styles={reactSelectCustomStyles}
            />
          </div>

          {/* Fuel Surcharge (FSC) Input and Selector */}
          <div className="w-1/3 pr-1 flex flex-col">
            <input
              type="number"
              name="value"
              placeholder="Fuel Surcharge (FSC)"
              value={localCharges.fsc.value}
              onChange={(e) => handleChange(e, 'fsc')}
              className="py-2 px-4 w-full"
            />
            <Select
              value={calculationOptions.find(
                (option) => option.value === localCharges.fsc.calculationMethod
              )}
              onChange={handleCalculationMethodChangeForFSC}
              options={calculationOptions}
              classNamePrefix="react-select"
              styles={reactSelectCustomStyles}
            />
          </div>

          {/* Security Surcharge (SSC) Input and Selector */}

          <div className="w-1/3 pr-1 flex flex-col">
            <input
              type="number"
              name="value"
              placeholder="Security Surcharge (SSC)"
              value={localCharges.ssc.value}
              onChange={(e) => handleChange(e, 'ssc')}
              className="py-2 px-4"
            />
            <Select
              value={calculationOptions.find(
                (option) => option.value === localCharges.ssc.calculationMethod
              )}
              onChange={handleCalculationMethodChangeForSSC}
              options={calculationOptions}
              classNamePrefix="react-select"
              styles={reactSelectCustomStyles}
            />
          </div>

          <div className="flex mb-2 space-x-2  mt-2 w-full">
            <input
              type="number"
              name="value"
              placeholder="Airport Terminal"
              value={localCharges.airportTerminal.value}
              onChange={handleChange}
              className="py-2 px-4 w-1/3"
            />
            <input
              type="number"
              name="value"
              placeholder="Pick-up"
              value={localCharges.pickUp.value}
              onChange={handleChange}
              className="py-2 px-4 w-1/3"
            />
            <input
              type="number"
              name="value"
              placeholder="Custom Clearance"
              value={localCharges.customClearance.value}
              onChange={handleChange}
              className="py-2 px-4 w-1/3"
            />
          </div>
        </div>
        {getCustomChargeRows().map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-2 space-x-2 mt-2">
            {row.map((charge, index) => (
              <input
                key={rowIndex * 3 + index}
                type="number"
                placeholder="Custom charge"
                value={charge.value}
                onChange={(e) =>
                  handleCustomChargeChange(rowIndex * 3 + index, e.target.value)
                }
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
            parseFloat(localCharges.pricePerKg) * chargeableWeight || 0
          ).toFixed(2)}{' '}
        </div>
        <div>
          FSC:{' '}
          {(parseFloat(localCharges.fsc) * chargeableWeight || 0).toFixed(2)}
        </div>
        <div>
          SSC:{' '}
          {(parseFloat(localCharges.ssc) * chargeableWeight || 0).toFixed(2)}
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
