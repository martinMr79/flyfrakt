// hooks/useCalculationMethod.js

import { useDispatch } from 'react-redux';
import { setCharges } from '../slices/volumeWeightCalculatorSlice';

const useCalculationMethod = (localCharges, setLocalCharges) => {
  const dispatch = useDispatch();

  const handleCalculationMethodChange = (chargeType, selectedOption) => {
    const updatedCharges = {
      ...localCharges,
      [chargeType]: {
        ...localCharges[chargeType],
        calculationMethod: selectedOption.value,
      },
    };
    setLocalCharges(updatedCharges);
    dispatch(setCharges(updatedCharges));
  };

  return handleCalculationMethodChange;
};

export default useCalculationMethod;
