import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  unlocked: boolean;
  lastUnlockedAt: number | null;
  reauthAfterMs: number;
}

const initialState: AuthState = {
  unlocked: false,
  lastUnlockedAt: null,
  reauthAfterMs: 60_000,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unlockSucceeded(state, action: PayloadAction<{ at: number }>) {
      state.unlocked = true;
      state.lastUnlockedAt = action.payload.at;
    },
    lock(state) {
      state.unlocked = false;
    },
    appReturnedToForeground(state, action: PayloadAction<{ at: number }>) {
      const last = state.lastUnlockedAt;
      if (
        state.unlocked &&
        last !== null &&
        action.payload.at - last > state.reauthAfterMs
      ) {
        state.unlocked = false;
      }
    },
  },
});

export const { unlockSucceeded, lock, appReturnedToForeground } =
  authSlice.actions;
export default authSlice.reducer;
