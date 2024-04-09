// utils/calculationUtils.js

export const calculateTotalCharges = (localCharges, chargeableWeight, totalWeight) => {
  let airfreight = 0;
  let fsc = 0;
  let ssc = 0;
  let airportTerminal = 0;
  let pickUp = 0;
  let customClearance = 0;

  // Helper function to calculate charge based on method
  const calculateCharge = (value, method) => {
    switch (method) {
      case 'chargeableWeight':
        return parseFloat(value) * chargeableWeight;
      case 'actualWeight':
        return parseFloat(value) * totalWeight;
      case 'lumpSum':
        return parseFloat(value);
      default:
        return 0;
    }
  };

  airfreight += calculateCharge(localCharges.pricePerKg.value, localCharges.pricePerKg.calculationMethod);
  fsc += calculateCharge(localCharges.fsc.value, localCharges.fsc.calculationMethod);
  ssc += calculateCharge(localCharges.ssc.value, localCharges.ssc.calculationMethod);
  airportTerminal += calculateCharge(localCharges.airportTerminal.value, localCharges.airportTerminal.calculationMethod);
  pickUp += calculateCharge(localCharges.pickUp.value, localCharges.pickUp.calculationMethod);
  customClearance += calculateCharge(localCharges.customClearance.value, localCharges.customClearance.calculationMethod);

  // Calculate custom charges if any
  let customChargesTotal = 0;
  if (localCharges.customCharges && localCharges.customCharges.length > 0) {
    localCharges.customCharges.forEach(charge => {
      customChargesTotal += parseFloat(charge.value) || 0;
    });
  }

  const total = airfreight + fsc + ssc + airportTerminal + pickUp + customClearance + customChargesTotal;
  return total.toFixed(2); // Adjusting to 2 decimal places for currency formatting
};

  