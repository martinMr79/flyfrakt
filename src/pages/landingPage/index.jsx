import React from 'react';

function CustomGrid() {
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-10 flex flex-col items-center">
      <h1 className='text-center mb-5'>Volume weight</h1>
      <div className="bg-gray-200 w-full px-5 py-10 grid grid-cols-3 gap-5">
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className="flex flex-col">
            {idx === 0 ? (
              <>
                <label htmlFor={`select-${idx}`} className="mb-2 text-gray-600">Dimensions</label>
                <select 
                  id={`select-${idx}`}
                  className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
                >
                  <option value="cm">Centimeter</option>
                  <option value="in">Inch</option>
                </select>
              </>
            ) : idx === 1 ? (
              <>
                <label htmlFor={`select-${idx}`} className="mb-2 text-gray-600">Weight</label>
                <select 
                  id={`select-${idx}`}
                  className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
                >
                  <option value="kg">Kilogram</option>
                  <option value="lb">Pound</option>
                </select>
              </>
            ) : idx === 2 ? (
              <>
                <label htmlFor={`select-${idx}`} className="mb-2 text-gray-600">Conversion Factor</label>
                <select 
                  id={`select-${idx}`}
                  className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </>
            ) : idx === 3 ? (
              <>
                <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Length</label>
                <input
                  id={`input-${idx}`}
                  type="number"
                  placeholder="Enter length"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </>
            ) : idx === 4 ? (
              <>
                <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Width</label>
                <input
                  id={`input-${idx}`}
                  type="number"
                  placeholder="Enter width"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </>
            ) : idx === 5 ? (
              <>
                <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Height</label>
                <input
                  id={`input-${idx}`}
                  type="number"
                  placeholder="Enter height"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </>
            ) : (
              <>
                <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Input {idx + 1}</label>
                <input
                  id={`input-${idx}`}
                  type="text"
                  placeholder={`Input ${idx + 1}`}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomGrid;




