import React from 'react';



function CustomGrid() {
    return (
      <div className="mx-auto max-w-screen-xl px-5 py-10">
        <div className="bg-gray-200 p-5 grid grid-cols-3 gap-5">
          {[...Array(9)].map((_, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Input ${idx + 1}`}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ))}
        </div>
      </div>
    );
  }
  
  export default CustomGrid;