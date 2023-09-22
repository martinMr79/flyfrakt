import React, { useState, useEffect } from 'react';

function CustomGrid() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [volume, setVolume] = useState('');
  const [quantity, setQuantity] = React.useState(1);


  useEffect(() => {
    if (length && width && height) {
      const lengthMeters = parseFloat(length) / 100;
      const widthMeters = parseFloat(width) / 100;
      const heightMeters = parseFloat(height) / 100;

      const calculatedVolume = lengthMeters * widthMeters * heightMeters * parseFloat(quantity);
      setVolume(calculatedVolume.toFixed(3));
    }
}, [length, width, height, quantity]);

const handleQuantityChange = (e) => {
  const inputValue = parseFloat(e.target.value);

  if (inputValue < 1) {
      setQuantity(1);
  } else {
      setQuantity(inputValue);
  }
};

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className='text-center mb-5'>Volume weight</h1>
      <div className="bg-gray-200 w-full px-5 py-10 grid grid-cols-3 gap-5">
        {[...Array(9)].map((_, idx) => {
          switch (idx) {
            case 0:
              return (
                <div key={idx} className="flex flex-col">
                  <label htmlFor={`select-${idx}`} className="mb-2 text-gray-600">Dimensions</label>
                  <select 
                    id={`select-${idx}`}
                    className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
                  >
                    <option value="cm">Centimeter</option>
                    <option value="in">Inch</option>
                  </select>
                </div>
              );
            case 1:
              return (
                <div key={idx} className="flex flex-col">
                  <label htmlFor={`select-${idx}`} className="mb-2 text-gray-600">Weight</label>
                  <select 
                    id={`select-${idx}`}
                    className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
                  >
                    <option value="kg">Kilogram</option>
                    <option value="lb">Pound</option>
                  </select>
                </div>
              );
            case 2:
              return (
                <div key={idx} className="flex flex-col">
                  <label htmlFor={`select-${idx}`} className="mb-2 text-gray-600">Conversion Factor</label>
                  <select 
                    id={`select-${idx}`}
                    className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
                  >
                    <option value="option1">Option1</option>
                    <option value="option2">Option2</option>
                  </select>
                </div>
              );
              case 3:
                return (
                  <div key={idx} className="flex flex-col">
                    <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Length</label>
                    <input
                      id={`input-${idx}`}
                      type="number"
                      placeholder="Enter length"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      min="0"
                    />
                  </div>
              );
              case 4:
                return (
                  <div key={idx} className="flex flex-col">
                    <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Width</label>
                    <input
                      id={`input-${idx}`}
                      type="number"
                      placeholder="Enter width"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      min="0"
                    />
                  </div>
                );
                case 5:
                  return (
                    <div key={idx} className="flex flex-col">
                      <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Height</label>
                      <input
                        id={`input-${idx}`}
                        type="number"
                        placeholder="Enter height"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        min="0"
                      />
                    </div>
                  );
              case 6:
                return (
                  <div key={idx} className="flex flex-col">
                    <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Quantity</label>
                    <input
                      id={`input-6`}
                      type="number"
                      placeholder="Enter quantity"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />

                  </div>
                );
                case 7:
                  return (
                    <div key={idx} className="flex flex-col">
                      <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Gross Weight</label>
                      <input
                        id={`input-${idx}`}
                        type="number"
                        placeholder="Enter weight"
                        className="w-full p-2 border border-gray-300 rounded"
                        min="0"
                      />
                    </div>
                  );
                  case 8:
                    return (
                      <div key={idx} className="flex flex-col">
                        <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Volume m3</label>
                        <input
                          id={`input-${idx}`}
                          type="text"
                          value={volume}
                          className="w-full p-2 border border-gray-300 rounded bg-gray-300"
                          disabled
                        />
                      </div>
                    );
                default:
                  return (
                    <div key={idx} className="flex flex-col">
                      <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Input {idx + 1}</label>
                      <input
                        id={`input-${idx}`}
                        type="text"
                        placeholder={`Input ${idx + 1}`}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  );
              }
            })}

            <hr className="col-span-3 my-5 border-t border-gray-300" />

            
        <button className="col-span-3 lg:col-span-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Add row
        </button>

      </div>
    </div>
  );
}

export default CustomGrid;






