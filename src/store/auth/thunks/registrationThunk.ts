import { Profile, UserRegistration } from '../../../types/typesAuth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../../api/auth';
import { getErrorMessage } from '../../../helpers/errorMessage';

export const registrationThunk = createAsyncThunk<
  Profile,
  UserRegistration,
  { rejectValue: string }
>('auth/register', async (registrationData, { rejectWithValue }) => {
  try {
    const trimmedPhone = registrationData.phoneNumber?.trim();
    if (!trimmedPhone || trimmedPhone === '') {
      delete registrationData.phoneNumber;
    }
    const response = await register(registrationData);
    return response;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});
