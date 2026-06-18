import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
}

interface ToastState {
  messages: ToastMessage[];
}

const initialState: ToastState = {
  messages: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastMessage, "id">>) => {
      const id = Date.now().toString();
      state.messages.push({
        id,
        ...action.payload,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((toast) => toast.id !== action.payload);
    },
    clearAllToasts: (state) => {
      state.messages = [];
    },
  },
});

export const { addToast, removeToast, clearAllToasts } = toastSlice.actions;

// Selectors
export const selectToasts = (state: { toast: ToastState }) => state.toast.messages;

export default toastSlice.reducer;
