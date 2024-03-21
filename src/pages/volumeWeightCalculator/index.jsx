import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTotalChargeableWeight } from '../../slices/volumeWeightCalculator';

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

  const dispatch = useDispatch();




  const reactSelectCustomStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #ccc' : 'none',
      borderRadius: '0',
      minHeight: '40px',
      height: '40px',
      paddingLeft: '0.35rem',
      // Optional: if you want to add a border on focus, adjust the borderColor above
      // and add boxShadow here if needed for focus state:
      // boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
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

  const unitOptions = [
    { value: 'cm', label: 'cm' },
    { value: 'in', label: 'in' },
  ];

  const conversionFactor = 166.6;

  // centimeters to inches
  const convertCmToInches = (cm) => (cm / 2.54).toFixed(2);

  // inches to centimeters
  const convertInchesToCm = (inches) => (inches * 2.54).toFixed(2);

  // kilograms to pounds
  const convertKgToLbs = (kg) => (kg * 2.20462).toFixed(2);

  // pounds to kilograms
  const convertLbsToKg = (lbs) => (lbs / 2.20462).toFixed(2);

  const generateConversionSummary = () => {
    return rows.map((row, index) => ({
      lengthConversion:
        row.unit === 'cm'
          ? convertCmToInches(row.length) + ' in'
          : convertInchesToCm(row.length) + ' cm',
      widthConversion:
        row.unit === 'cm'
          ? convertCmToInches(row.width) + ' in'
          : convertInchesToCm(row.width) + ' cm',
      heightConversion:
        row.unit === 'cm'
          ? convertCmToInches(row.height) + ' in'
          : convertInchesToCm(row.height) + ' cm',
      weightConversion:
        row.unit === 'cm'
          ? convertKgToLbs(row.weight) + ' lbs'
          : convertLbsToKg(row.weight) + ' kg',
    }));
  };

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
      }),
      // Once state is updated, call this to update Redux store
      () => calculateChargeableWeightAndUpdateRedux()
    );
  };

  const calculateTotalWeight = () => {
    return rows
      .reduce(
        (total, row) => total + parseFloat(row.weight || 0) * row.quantity,
        0
      )
      .toFixed(2);
  };

  const calculateTotalVolume = useCallback(() => {
    return rows.reduce((total, row) => total + parseFloat(row.volume || 0), 0).toFixed(3);
  }, [rows]);
  

  const calculateChargeableWeight = useCallback(() => {
    const totalVolume = calculateTotalVolume();
    return (totalVolume * conversionFactor).toFixed(2);
  }, [calculateTotalVolume, conversionFactor]);
  

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

  const calculateChargeableWeightAndUpdateRedux = () => {
    const totalVolume = calculateTotalVolume();
    const chargeableWeight = (totalVolume * conversionFactor).toFixed(2);

    // Dispatch the action to update the total chargeable weight in the Redux store
    dispatch(setTotalChargeableWeight(parseFloat(chargeableWeight)));
  };

  useEffect(() => {
    const totalChargeableWeight = calculateChargeableWeight();
    dispatch(setTotalChargeableWeight(totalChargeableWeight));
  }, [calculateChargeableWeight, dispatch]);

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className="text-center mb-10 sm:text-2xl md:text-3xl lg:text-4xl text-blue-500 font-bold">
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
                <div className="w-1/3 relative">
                  <Select
                    className="custom-select"
                    value={unitOptions.find(
                      (option) => option.value === row.unit
                    )}
                    onChange={(selectedOption) =>
                      handleInputChange(idx, 'unit', selectedOption.value)
                    }
                    options={unitOptions}
                    styles={reactSelectCustomStyles}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600"></div>
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

        <div className="conversion-summary mb-4">
          <h2 className="text-lg mb-2">Conversion Summary</h2>
          {generateConversionSummary().map((conversion, idx) => (
            <div key={idx} className="text-sm mb-1">
              <p>
                Row {idx + 1} - Length: {conversion.lengthConversion}, Width:{' '}
                {conversion.widthConversion}, Height:{' '}
                {conversion.heightConversion}, Weight:{' '}
                {conversion.weightConversion}
              </p>
            </div>
          ))}
        </div>

        <div className="totals">
          <h2 className="text-lg mb-2">Totals</h2>
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
      <div className="navigation pt-8">
        <Link
          to="/charges"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 font-bold"
        >
          Go to Charges Calculator
        </Link>
      </div>

      {/*  <footer className="w-full bg-gray-800 text-white text-center py-4 my-6">
       <p>© 2024 Martin Mroz. All rights reserved.</p>
      </footer>*/}
    </div>
  );
}

export default CustomGrid;
