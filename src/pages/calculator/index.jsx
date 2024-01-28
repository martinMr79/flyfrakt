import React, { useState, useEffect } from 'react';

function CustomGrid() {
  const [rows, setRows] = useState([{ length: '', width: '', height: '', weight: '', quantity: 1, unit: 'cm', volume: '' }]);
  const [conversionFactor, setConversionFactor] = useState(166.6); 

  useEffect(() => {
    const updatedRows = rows.map(row => {
      if (row.length && row.width && row.height && row.quantity) {
        const volume = calculateVolume(row.length, row.width, row.height, row.quantity);
        return { ...row, volume };
      }
      return row;
    });
    setRows(updatedRows);
  }, [rows]);

  const calculateVolume = (length, width, height, quantity, unit) => {
    let convertedLength = unit === 'in' ? length * 2.54 : length; // Convert inches to cm
    let convertedWidth = unit === 'in' ? width * 2.54 : width;
    let convertedHeight = unit === 'in' ? height * 2.54 : height;

    const volume = (convertedLength * convertedWidth * convertedHeight) / 1000000; // cm to m3
    return (volume * quantity).toFixed(3);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = rows.map((row, idx) => (
      idx === index ? { ...row, [field]: value } : row
    ));
    setRows(newRows);
  };

  const calculateTotalVolume = () => {
    return rows.reduce((total, row) => total + parseFloat(row.volume || 0), 0).toFixed(3);
  };

  const calculateChargeableWeight = () => {
    const totalVolume = calculateTotalVolume();
    return (totalVolume * conversionFactor).toFixed(2);
  };

  const addRow = () => {
    setRows([...rows, { length: '', width: '', height: '', weight: '', quantity: 1, volume: '' }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className='text-center mb-5'>Volume weight</h1>
      <div className="bg-gray-200 w-full px-5 py-10">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-5">
            {/* Length Input */}
            <input
              type="number"
              placeholder="Length"
              value={row.length}
              onChange={(e) => handleInputChange(idx, 'length', e.target.value)}
            />
            {/* Width Input */}
            <input
              type="number"
              placeholder="Width"
              value={row.width}
              onChange={(e) => handleInputChange(idx, 'width', e.target.value)}
            />
            {/* Height Input */}
            <input
              type="number"
              placeholder="Height"
              value={row.height}
              onChange={(e) => handleInputChange(idx, 'height', e.target.value)}
            />
            {/* Weight Input */}
            <input
              type="number"
              placeholder="Weight"
              value={row.weight}
              onChange={(e) => handleInputChange(idx, 'weight', e.target.value)}
            />
            {/* Quantity Input */}
            <input
              type="number"
              placeholder="Quantity"
              value={row.quantity}
              onChange={(e) => handleInputChange(idx, 'quantity', e.target.value)}
            />
                        <select
              value={row.unit}
              onChange={(e) => handleInputChange(idx, 'unit', e.target.value)}
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>

            {/* Button to remove a row */}
            {rows.length > 1 && (
              <button onClick={() => removeRow(idx)}>
                Remove
              </button>
            )}
            {/* Display Calculated Volume */}
            <div>Volume: {row.volume} m³</div>
          </div>
        ))}
        <button onClick={addRow} className='mt-12'>Add Row</button>
        <div className="totals">
          <div>Total CBM: {calculateTotalVolume()} m³</div>
          <div>Total Chargeable Weight: {calculateChargeableWeight()} kg</div>
        </div>      

      </div>
    </div>
  );
}

export default CustomGrid;

