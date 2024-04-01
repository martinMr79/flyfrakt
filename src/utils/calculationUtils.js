// utils/calculationUtils.js

export const calculateTotalCharges = (localCharges, chargeableWeight, totalWeight) => {
    let airfreight = 0;
    let fsc = 0;
    let ssc = 0;
  
    switch (localCharges.pricePerKg.calculationMethod) {
      case 'chargeableWeight':
        airfreight = parseFloat(localCharges.pricePerKg.value) * chargeableWeight;
        break;
      case 'actualWeight':
        airfreight = parseFloat(localCharges.pricePerKg.value) * totalWeight;
        break;
      case 'lumpSum':
        airfreight = parseFloat(localCharges.pricePerKg.value);
        break;
      default:
        airfreight = 0;
        break;
    }
  
    switch (localCharges.fsc.calculationMethod) {
      case 'chargeableWeight':
        fsc = parseFloat(localCharges.fsc.value) * chargeableWeight;
        break;
      case 'actualWeight':
        fsc = parseFloat(localCharges.fsc.value) * totalWeight;
        break;
      case 'lumpSum':
        fsc = parseFloat(localCharges.fsc.value);
        break;
      default:
        fsc = 0;
        break;
    }
  
    switch (localCharges.ssc.calculationMethod) {
      case 'chargeableWeight':
        ssc = parseFloat(localCharges.ssc.value) * chargeableWeight;
        break;
      case 'actualWeight':
        ssc = parseFloat(localCharges.ssc.value) * totalWeight;
        break;
      case 'lumpSum':
        ssc = parseFloat(localCharges.ssc.value);
        break;
      default:
        ssc = 0;
        break;
    }
  
    const total = airfreight + fsc + ssc;
    return total.toFixed(2);
  };
  