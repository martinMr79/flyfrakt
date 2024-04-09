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
}) => {
  return (
    <div className="w-1/3 pr-1 flex flex-col">
      <input
        type="number"
        name="value" 
        placeholder={label}
        value={chargeDetails.value}
        onChange={(e) => onChange(e, chargeType)}
        className="py-2 px-4 w-full mb-0.5"
      />
      <Select
        value={calculationOptions.find(
          (option) => option.value === chargeDetails.calculationMethod
        )}
        onChange={onCalculationMethodChange}
        options={calculationOptions}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default ChargeInput;
