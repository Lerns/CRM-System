import authTokenStore from '../../../api/authTokenStore';
import { refreshTokenRequest } from '../../../api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../../helpers/errorMessage';
import { fetchProfileThunk } from './rolesThink';

export const initAppThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/initApp', async (_, { dispatch, rejectWithValue }) => {
  try {
    const accessToken = authTokenStore.getAccessToken();
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      authTokenStore.clearAccessToken();
      return;
    }

    if (!accessToken) {
      const refreshResponse = await refreshTokenRequest({ refreshToken });
      authTokenStore.setAccessToken(refreshResponse.accessToken);
      localStorage.setItem('refreshToken', refreshResponse.refreshToken);
    }

    await dispatch(fetchProfileThunk()).unwrap();
  } catch (error: unknown) {
    authTokenStore.clearAccessToken();

    localStorage.removeItem('refreshToken');

    return rejectWithValue(getErrorMessage(error));
  }
});
