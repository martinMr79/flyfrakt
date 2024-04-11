// components/ChargeInput.js

import React from 'react';
import Select from 'react-select';

const ChargeInput = ({
  chargeType,
  label,
  chargeDetails,
  onChange,
  calculationOptions,
  onCalculationMethodChange,
  isCustomField = false,  // Determines if this is a custom field
  onDelete  // Optional delete function
}) => {
  // Apply different classes based on whether it's a custom field
  const containerClass = isCustomField ? "flex-grow" : "w-1/3 pr-1";
  const flexClass = "flex flex-col";

  return (
    <div className={`${containerClass} ${flexClass}`}>
      <input
        type="number"
        name="value"
        placeholder={label}
        value={chargeDetails.value}
        onChange={(e) => onChange(e, chargeType)}
        className="py-2 px-4 w-full mb-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <Select
        value={calculationOptions.find(option => option.value === chargeDetails.calculationMethod)}
        onChange={onCalculationMethodChange}
        options={calculationOptions}
        classNamePrefix="react-select"
      />
      {onDelete && (
        <button
          onClick={() => onDelete(chargeType)}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center justify-center"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ChargeInput;
