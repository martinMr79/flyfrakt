// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import volumeWeightCalculatorReducer from './slices/volumeWeightCalculator';


export default configureStore({
    reducer: {
      volumeWeightCalculator: volumeWeightCalculatorReducer,
    },
  });
