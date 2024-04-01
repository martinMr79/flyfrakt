// hooks/useCustomCharges.js

import { setCharges } from '../slices/volumeWeightCalculatorSlice';

export const useCustomCharges = (localCharges, setLocalCharges, dispatch) => {
    const handleCustomChargeChange = (index, value) => {
      const updatedCustomCharges = localCharges.customCharges.map((charge, i) => {
        if (i === index) {
          return { ...charge, value };
        }
        return charge;
      });
      const newCharges = { ...localCharges, customCharges: updatedCustomCharges };
      setLocalCharges(newCharges);
      dispatch(setCharges(newCharges));
    };
  
    const addCustomField = () => {
      const newCustomCharge = { name: '', value: '' };
      const newCharges = {
        ...localCharges,
        customCharges: [...localCharges.customCharges, newCustomCharge],
      };
      setLocalCharges(newCharges);
      dispatch(setCharges(newCharges));
    };
  
    return { handleCustomChargeChange, addCustomField };
  };
  