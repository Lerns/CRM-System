import { createAsyncThunk } from '@reduxjs/toolkit';
import { Token, AuthData } from '../../../types/typesAuth';
import { getErrorMessage } from '../../../helpers/errorMessage';
import { loginUser } from '../../../api/auth';

export const loginThunk = createAsyncThunk<
  Token,
  AuthData,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    return response;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});
