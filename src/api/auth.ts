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

export async function register(data: UserRegistration): Promise<Profile> {
  const response = await api.post<Profile>('/auth/signup', data);
  return response.data;
}

export async function getProfile(): Promise<Profile> {
  const response = await api.get<Profile>('/user/profile');
  return response.data;
}

export async function updateProfile(data: ProfileRequest): Promise<Profile> {
  const response = await api.put<Profile>('/user/profile', data);
  return response.data;
}

export async function refreshToken(data: RefreshToken): Promise<Token> {
  const response = await api.post<Token>('/auth/refresh', data);
  return response.data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/user/logout');
}

export async function refreshTokenRequest(data: RefreshToken): Promise<Token> {
  const response = await api.post<Token>('/auth/refresh', data);
  return response.data;
}
