import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthorized: boolean;
}

const initialState: AuthState = {
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthorized = true;
    },
    logout(state) {
      state.isAuthorized = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
