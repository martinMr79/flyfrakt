// src/store.js
// eslint-disable-next-line no-unused-vars
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import volumeWeightCalculatorReducer from './slices/volumeWeightCalculatorSlice';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1,
};

const rootReducer = combineReducers({
  volumeWeightCalculator: volumeWeightCalculatorReducer,
  // Add other reducers here if any
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types in the serializability check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
      },
    }),
});

export const persistor = persistStore(store);
