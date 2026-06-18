import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import toastSlice from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    toast: toastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
