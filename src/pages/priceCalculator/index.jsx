import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCharges } from '../../slices/volumeWeightCalculatorSlice';
import { calculateTotalCharges } from '../../utils/calculationUtils';
import useCalculationMethod from '../../hooks/useCalculationMethod';
import { useCustomCharges } from '../../hooks/useCustomCharges';
import ChargeInput from '../../components/ChargeInput';
import calculateCharge from '../../utils/calculateCharge';

function ChargesCalculator() {
  const dispatch = useDispatch();
  const {
    chargeableWeight,
    totalCBM,
    totalWeight,
    charges: chargesRedux,
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

  const { handleCustomChargeChange, addCustomField } = useCustomCharges(
    localCharges,
    setLocalCharges,
    dispatch
  );

  // Update the handleChange function within ChargesCalculator component
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

  const totalCharges = calculateTotalCharges(
    localCharges,
    chargeableWeight,
    totalWeight
  );

  const handleCalculationMethodChange = useCalculationMethod(
    localCharges,
    setLocalCharges
  );

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
        <div className="flex flex-wrap mb-2 mt-4">
          {/* Price per Kg Input and Selector */}
          {/* Implement ChargeInput for each charge type */}
          <ChargeInput
            chargeType="pricePerKg"
            label="Price per Kg"
            chargeDetails={localCharges.pricePerKg}
            onChange={handleChange} // Make sure this function can handle changes appropriately.
            calculationOptions={calculationOptions}
            onCalculationMethodChange={(selectedOption) =>
              handleCalculationMethodChange('pricePerKg', selectedOption)
            }
          />

          {/* Fuel Surcharge (FSC) Input and Selector */}
          <ChargeInput
            chargeType="fsc"
            label="Fuel Surcharge (FSC)"
            chargeDetails={localCharges.fsc}
            onChange={(e) => handleChange(e, 'fsc')}
            calculationOptions={calculationOptions}
            onCalculationMethodChange={(selectedOption) =>
              handleCalculationMethodChange('fsc', selectedOption)
            }
          />

          {/* Security Surcharge (SSC) Input and Selector */}
          <ChargeInput
            chargeType="ssc"
            label="Security Surcharge (SSC)"
            chargeDetails={localCharges.ssc}
            onChange={(e) => handleChange(e, 'ssc')}
            calculationOptions={calculationOptions}
            onCalculationMethodChange={(selectedOption) =>
              handleCalculationMethodChange('ssc', selectedOption)
            }
          />
        </div>

        <div className="flex flex-wrap mb-2 mt-2">
          <ChargeInput
            chargeType="airportTerminal"
            label="Airport Terminal"
            chargeDetails={localCharges.airportTerminal}
            onChange={handleChange}
            calculationOptions={calculationOptions}
            onCalculationMethodChange={(selectedOption) =>
              handleCalculationMethodChange('airportTerminal', selectedOption)
            }
          />

          <ChargeInput
            chargeType="pickUp"
            label="Pick-up"
            chargeDetails={localCharges.pickUp}
            onChange={handleChange}
            calculationOptions={calculationOptions}
            onCalculationMethodChange={(selectedOption) =>
              handleCalculationMethodChange('pickUp', selectedOption)
            }
          />

          <ChargeInput
            chargeType="customClearance"
            label="Custom Clearance"
            chargeDetails={localCharges.customClearance}
            onChange={handleChange}
            calculationOptions={calculationOptions}
            onCalculationMethodChange={(selectedOption) =>
              handleCalculationMethodChange('customClearance', selectedOption)
            }
          />
        </div>

        {getCustomChargeRows().map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-2 space-x-2 mt-2 pr-1">
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

        <h2 className="text-lg mt-8 font-bold">Airline charges</h2>
        <div>
          Airfreight: $
          {calculateCharge(
            localCharges.pricePerKg,
            chargeableWeight,
            totalWeight
          )}
        </div>
        <div>
          FSC: $
          {calculateCharge(localCharges.fsc, chargeableWeight, totalWeight)}
        </div>
        <div>
          SSC: $
          {calculateCharge(localCharges.ssc, chargeableWeight, totalWeight)}
          <h2 className="text-lg mt-1 font-bold">Other Charges</h2>
          <div>
            Airport Terminal: $
            {calculateCharge(
              localCharges.airportTerminal,
              chargeableWeight,
              totalWeight
            )}
          </div>
          <div>
            Pick-up: $
            {calculateCharge(
              localCharges.pickUp,
              chargeableWeight,
              totalWeight
            )}
          </div>
          <div>
            Custom Clearance: $
            {calculateCharge(
              localCharges.customClearance,
              chargeableWeight,
              totalWeight
            )}
          </div>
        </div>
        <h2 className="text-xl mt-8 font-bold">Total Price: ${totalCharges}</h2>
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
