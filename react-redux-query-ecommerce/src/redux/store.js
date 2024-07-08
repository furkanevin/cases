import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/productSlice';
import { productsApi } from './query/productsApi';

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});
