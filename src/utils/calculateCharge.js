// src/utils/calculateCharge.js

const calculateCharge = (charge, chargeableWeight, totalWeight) => {
    switch (charge.calculationMethod) {
      case 'chargeableWeight':
        return (parseFloat(charge.value) * chargeableWeight || 0).toFixed(2);
      case 'actualWeight':
        return (parseFloat(charge.value) * totalWeight || 0).toFixed(2);
      case 'lumpSum':
        return (parseFloat(charge.value) || 0).toFixed(2);
      default:
        return (0).toFixed(2);
    }
  };
  
  export default calculateCharge;
  