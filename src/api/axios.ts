import axios from 'axios';
import { refreshTokenUser } from './auth';
import authTokenStore from './authTokenStore';

export const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }

      try {
        const { accessToken, refreshToken: newRefreshToken } =
          await refreshTokenUser({ refreshToken });

        authTokenStore.setAccessToken(accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

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
