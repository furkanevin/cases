import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import feedReducer from './slices/feedSlice';
import savedReducer from './slices/savedSlice';
import authReducer from './slices/authSlice';

export const rootReducer = {
  feed: feedReducer,
  saved: savedReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
