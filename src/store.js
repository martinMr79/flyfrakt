// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import volumeWeightCalculatorReducer from './slices/volumeWeightCalculator';

const store = configureStore({
  reducer: {
    volumeWeightCalculator: volumeWeightCalculatorReducer,
  },
});

export default store;