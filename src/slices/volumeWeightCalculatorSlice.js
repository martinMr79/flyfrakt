// src/slices/volumeWeightCalculatorSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const volumeWeightCalculatorSlice = createSlice({
  name: 'volumeWeightCalculator',
  initialState: {
    totalWeight: 0,
    chargeableWeight: 0,
    totalCBM: 0,
    rows: [],
    charges: {
      pricePerKg: '',
      fsc: '',
      ssc: '',
      airportTerminal: '',
      pickUp: '',
      customClearance: '',
      customCharges: [],
    },
  },
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setTotalWeight: (state, action) => {
      state.totalWeight = action.payload;
    },
    setChargeableWeight: (state, action) => {
      state.chargeableWeight = action.payload;
    },
    setTotalCBM: (state, action) => {
      state.totalCBM = action.payload;
    },
    setCharges: (state, action) => {
      state.charges = { ...state.charges, ...action.payload };
    },
    addCustomCharge: (state, action) => {
      state.charges.customCharges.push(action.payload);
    },
    updateCustomCharge: (state, action) => {
      const { index, value } = action.payload;
      if (index >= 0 && index < state.charges.customCharges.length) {
        state.charges.customCharges[index] = { ...state.charges.customCharges[index], ...value };
      }
    },
    // Example additional reducer for removing a custom charge if needed
    removeCustomCharge: (state, action) => {
      state.charges.customCharges = state.charges.customCharges.filter((_, index) => index !== action.payload);
    },
  },
});

// Actions and reducers export
export const {
  setRows,
  setTotalWeight,
  setChargeableWeight,
  setTotalCBM,
  setCharges,
  addCustomCharge,
  updateCustomCharge,
  removeCustomCharge, // If you implemented it
} = volumeWeightCalculatorSlice.actions;

export default volumeWeightCalculatorSlice.reducer;
