import axios from 'axios';
import authTokenStore from './authTokenStore';
import type { Token } from '../types/typesAuth';
export const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const refreshAPI = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

api.interceptors.request.use((config) => {
  const token = authTokenStore.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        authTokenStore.clearAccessToken();
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
      try {
        const response = await refreshAPI.post<Token>('/auth/refresh', {
          refreshToken,
        });

        authTokenStore.setAccessToken(response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        return api.request(originalRequest);
      } catch (err) {
        authTokenStore.clearAccessToken();
        localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
