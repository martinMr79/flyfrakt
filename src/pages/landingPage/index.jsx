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
                <label htmlFor={`input-${idx}`} className="mb-2 text-gray-600">Dimensions</label>
                <div className="flex border border-gray-300 rounded">
                  <input
                    id={`input-${idx}`}
                    type="text"
                    placeholder="CM"
                    className="flex-1 px-3 py-2 rounded-l appearance-none outline-none"
                  />
                  <select className="flex-none px-3 py-2 border-l border-gray-300 bg-white rounded-r outline-none">
                    <option value="cm">CM</option>
                    <option value="in">IN</option>
                  </select>
                </div>
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

