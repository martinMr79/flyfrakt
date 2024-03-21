// src/slices/volumeWeightCalculator.js

import { createSlice } from '@reduxjs/toolkit';

export const volumeWeightCalculatorSlice = createSlice({
  name: 'volumeWeightCalculator',
  initialState: {
    totalWeight: 0,
    chargeableWeight: 0,
    totalCBM: 0,
  },
  reducers: {
    setTotalWeight: (state, action) => {
      state.totalWeight = action.payload;
    },
    setChargeableWeight: (state, action) => {
      state.chargeableWeight = action.payload;
    },
    setTotalCBM: (state, action) => {
      state.totalCBM = action.payload;
    },
  },
});

export const {
  setTotalWeight,
  setChargeableWeight,
  setTotalCBM
} = volumeWeightCalculatorSlice.actions;

export default volumeWeightCalculatorSlice.reducer;
