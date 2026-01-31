import { api } from './axios';

import type {
  UserRegistration,
  AuthData,
  RefreshToken,
  Profile,
  ProfileRequest,
  Token,
} from '../types/typesAuth';

export async function loginUser(data: AuthData): Promise<Token> {
  const response = await api.post<Token>('/auth/signin', data);
  return response.data;
}

export async function registrationUser(
  data: UserRegistration,
): Promise<Profile> {
  const response = await api.post<Profile>('/auth/signup', data);
  return response.data;
}

export async function profileUser(): Promise<Profile> {
  const response = await api.get<Profile>('/user/profile');
  return response.data;
}

export async function updateProfileUser(
  data: ProfileRequest,
): Promise<Profile> {
  const response = await api.put<Profile>('/auth/profile', data);
  return response.data;
}

export async function refreshTokenUser(data: RefreshToken): Promise<Token> {
  const response = await api.post<Token>('/auth/refresh', data);
  return response.data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/user/logout');
}
