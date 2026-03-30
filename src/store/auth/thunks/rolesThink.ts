import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from '../../../api/auth';
import { getErrorMessage } from '../../../helpers/errorMessage';
import { Profile } from '../../../types/typesAuth';
import authTokenStore from '../../../api/authTokenStore';

export const fetchProfileThunk = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>('user/profile', async (_, { rejectWithValue }) => {
  try {
    const token = authTokenStore.getAccessToken();
    const response = await getProfile();
    return response;
  } catch (error: unknown) {
    const msg = getErrorMessage(error);
    return rejectWithValue(msg);
  }
});
