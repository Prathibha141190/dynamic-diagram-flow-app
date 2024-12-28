import { configureStore } from '@reduxjs/toolkit';
import diagramReducer from './diagramSlice';

const store = configureStore({
  reducer: {
    diagram: diagramReducer,
  },
});

export default store;