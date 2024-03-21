// src/slices/volumeWeightCalculator.js
import { createSlice } from '@reduxjs/toolkit';

export const volumeWeightCalculatorSlice = createSlice({
  name: 'volumeWeightCalculator',
  initialState: {
    totalChargeableWeight: 0,
  },
  reducers: {
    setTotalChargeableWeight: (state, action) => {
      state.totalChargeableWeight = action.payload;
    },
  },
});

export const { setTotalChargeableWeight } = volumeWeightCalculatorSlice.actions;

export default volumeWeightCalculatorSlice.reducer;
