// utils/calculationUtils.js

import calculateCharge from "./calculateCharge";

// Assume calculateCharge is imported and working as expected

export const calculateTotalCharges = (localCharges, chargeableWeight, totalWeight) => {
  // Use calculateCharge for each charge type
  const airfreight = parseFloat(calculateCharge(localCharges.pricePerKg, chargeableWeight, totalWeight));
  const fsc = parseFloat(calculateCharge(localCharges.fsc, chargeableWeight, totalWeight));
  const ssc = parseFloat(calculateCharge(localCharges.ssc, chargeableWeight, totalWeight));
  const airportTerminal = parseFloat(calculateCharge(localCharges.airportTerminal, chargeableWeight, totalWeight));
  const pickUp = parseFloat(calculateCharge(localCharges.pickUp, chargeableWeight, totalWeight));
  const customClearance = parseFloat(calculateCharge(localCharges.customClearance, chargeableWeight, totalWeight));
  
  // Sum up all charges
  const total = airfreight + fsc + ssc + airportTerminal + pickUp + customClearance;
  
  // Make sure total is a number before calling toFixed
  if (isNaN(total)) {
    console.error("Total charges calculation resulted in NaN");
    return "0.00"; // Default to "0.00" or handle as needed
  }

  return total.toFixed(2); // Convert total to a fixed decimal string
};


  