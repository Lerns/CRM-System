import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk } from '../thunks/loginThunk';
import { ProfileRequest } from '../../../types/typesAuth';
import { fetchProfileThunk } from '../thunks/profileThunk';
import { logoutThunk } from '../thunks/logoutThunk';
import { initAppThunk } from '../thunks/initAppThunk';

interface AuthState {
  isAuthorized: boolean;
  user: ProfileRequest | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthorized: false,
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthorized = false;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthorized = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Ошибка авторизации';
        state.isAuthorized = false;
        state.user = null;
      })

      .addCase(fetchProfileThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Ошибка получения профиля';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthorized = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Ошибка при выходе из аккаунта';
      })

      .addCase(initAppThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(initAppThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthorized = action.payload;
      })
      .addCase(initAppThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Ошибка инициализации';
        state.isAuthorized = false;
        state.user = null;
      });
  },
});
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
