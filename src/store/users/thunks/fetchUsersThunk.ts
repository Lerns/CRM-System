import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../../api/user';
import { getErrorMessage } from '../../../helpers/errorMessage';
import type { MetaResponse, User } from '../../../types/typesUsers';

type FetchUserParams = {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  search?: string;
};

export const fetchUsersThunk = createAsyncThunk<
  MetaResponse<User>,
  FetchUserParams | undefined,
  { rejectValue: string }
>('users/fetchAll', async (params, { rejectWithValue }) => {
  try {
    return await getUsers(params);
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});
