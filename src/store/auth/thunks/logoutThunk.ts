import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../../../api/auth';
import authTokenStore from '../../../api/authTokenStore';

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('user/logout', async () => {
  try {
    await logoutUser();
  } catch (error: unknown) {}
  authTokenStore.clearAccessToken();
  localStorage.removeItem('refreshToken');
  return;
});
