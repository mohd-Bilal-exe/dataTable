// store.ts
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './Reducers';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
  devTools: true, // Enable Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
