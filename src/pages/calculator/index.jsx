import React, { useState } from 'react';

function CustomGrid() {
  const [rows, setRows] = useState([
    {
      length: '',
      width: '',
      height: '',
      weight: '',
      quantity: 1,
      unit: 'cm',
      volume: '',
    },
  ]);
  // eslint-disable-next-line
  const [conversionFactor, setConversionFactor] = useState(166.6);

  // Converts from centimeters to inches
  const convertCmToInches = (cm) => (cm / 2.54).toFixed(2);

  // Converts from inches to centimeters
  const convertInchesToCm = (inches) => (inches * 2.54).toFixed(2);

  // Converts from kilograms to pounds
  const convertKgToLbs = (kg) => (kg * 2.20462).toFixed(2);

  // Converts from pounds to kilograms
  const convertLbsToKg = (lbs) => (lbs / 2.20462).toFixed(2);

  const calculateVolume = (length, width, height, quantity, unit) => {
    let convertedLength = unit === 'in' ? convertInchesToCm(length) : length;
    let convertedWidth = unit === 'in' ? convertInchesToCm(width) : width;
    let convertedHeight = unit === 'in' ? convertInchesToCm(height) : height;

    const volume =
      (convertedLength * convertedWidth * convertedHeight) / 1000000; // Convert to cubic meters
    return (volume * quantity).toFixed(3);
  };

  const handleInputChange = (index, field, value) => {
    const newValue = field !== 'unit' && value < 0 ? 0 : value;

    setRows(
      rows.map((row, idx) => {
        if (idx === index) {
          const updatedRow = { ...row, [field]: newValue };
          // Calculate volume only if the row that changed is the one being updated
          if (
            field === 'length' ||
            field === 'width' ||
            field === 'height' ||
            field === 'quantity' ||
            field === 'unit'
          ) {
            updatedRow.volume = calculateVolume(
              updatedRow.length,
              updatedRow.width,
              updatedRow.height,
              updatedRow.quantity,
              updatedRow.unit
            );
          }
          return updatedRow;
        }
        return row;
      })
    );
  };

  const calculateTotalWeight = () => {
    return rows
      .reduce((total, row) => total + parseFloat(row.weight || 0), 0)
      .toFixed(2);
  };

  const calculateTotalVolume = () => {
    return rows
      .reduce((total, row) => total + parseFloat(row.volume || 0), 0)
      .toFixed(3);
  };

  const calculateChargeableWeight = () => {
    const totalVolume = calculateTotalVolume();
    return (totalVolume * conversionFactor).toFixed(2);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        length: '',
        width: '',
        height: '',
        weight: '',
        quantity: 1,
        unit: 'cm',
        volume: '',
      },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  const convertCubicMetersToCubicFeet = (cubicMeters) =>
    (cubicMeters * 35.3147).toFixed(3);

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className="text-center mb-5 text-lg">
        Airfreight Chargeable weight calculator
      </h1>
      <div className="bg-gray-200 w-full px-5 py-10">
        {rows.map((row, idx) => (
          <div key={idx} className="flex items-center mb-3">
            <div className="flex flex-col flex-grow mr-2">
              <div className="flex mb-2 space-x-2  mt-4">
                <input
                  type="number"
                  placeholder="Length"
                  value={row.length}
                  onChange={(e) =>
                    handleInputChange(idx, 'length', e.target.value)
                  }
                  className="py-2 px-4 w-1/3"
                />

                <input
                  type="number"
                  placeholder="Width"
                  value={row.width}
                  onChange={(e) =>
                    handleInputChange(idx, 'width', e.target.value)
                  }
                  className="py-2 px-4 w-1/3"
                />

                <input
                  type="number"
                  placeholder="Height"
                  value={row.height}
                  onChange={(e) =>
                    handleInputChange(idx, 'height', e.target.value)
                  }
                  className="py-2 px-4 w-1/3"
                />
              </div>

              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Weight"
                  value={row.weight}
                  onChange={(e) =>
                    handleInputChange(idx, 'weight', e.target.value)
                  }
                  className="py-2 px-4 w-1/3"
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  value={row.quantity}
                  onChange={(e) =>
                    handleInputChange(idx, 'quantity', e.target.value)
                  }
                  className="py-2 px-4 w-1/3"
                />
                <select
                  value={row.unit}
                  onChange={(e) =>
                    handleInputChange(idx, 'unit', e.target.value)
                  }
                  className="py-2 px-4 w-1/3"
                >
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  L:{' '}
                  {row.unit === 'cm'
                    ? convertCmToInches(row.length) + ' in'
                    : convertInchesToCm(row.length) + ' cm'}
                </span>
                <span>
                  W:{' '}
                  {row.unit === 'cm'
                    ? convertCmToInches(row.width) + ' in'
                    : convertInchesToCm(row.width) + ' cm'}
                </span>
                <span>
                  H:{' '}
                  {row.unit === 'cm'
                    ? convertCmToInches(row.height) + ' in'
                    : convertInchesToCm(row.height) + ' cm'}
                </span>
                <span>
                  Weight:{' '}
                  {row.unit === 'cm'
                    ? convertKgToLbs(row.weight) + ' lbs'
                    : convertLbsToKg(row.weight) + ' kg'}
                </span>
              </div>
            </div>
            {/* Delete Icon */}
            {rows.length > 1 && (
              <img
                src="/icons/delete_icon.svg"
                alt="Delete"
                className="w-4 h-4 ml-2 cursor-pointer"
                onClick={() => removeRow(idx)}
              />
            )}
          </div>
        ))}

        <button
          onClick={addRow}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out my-4"
        >
          Add Row
        </button>

        <div className="totals">
          <div>
            Total Weight: {calculateTotalWeight()} kg /{' '}
            {convertKgToLbs(calculateTotalWeight())} lbs
          </div>
          <div>
            Total CBM: {calculateTotalVolume()} m³ /{' '}
            {convertCubicMetersToCubicFeet(calculateTotalVolume())} ft³
          </div>
          <div className="font-bold">
            Total Chargeable Weight: {calculateChargeableWeight()} kg /{' '}
            {convertKgToLbs(calculateChargeableWeight())} lbs
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomGrid;
