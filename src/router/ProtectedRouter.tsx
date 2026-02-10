import { useAppDispatch, useAppSelector } from '../store/hooks';
import { JSX, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { login, logout } from '../store/auth/slices/authSlice';
import authTokenStore from '../api/authTokenStore';
import { refreshTokenUser } from '../api/auth';

export default function ProtectedRouter({
  children,
}: {
  children: JSX.Element;
}) {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = authTokenStore.getAccessToken();
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        if (!accessToken) {
          try {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = await refreshTokenUser({ refreshToken });
            authTokenStore.setAccessToken(newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            dispatch(login());
          } catch {
            authTokenStore.clearAccessToken();
            localStorage.removeItem('refreshToken');
            dispatch(logout());
          }
        } else {
          dispatch(login());
        }
      } else {
        authTokenStore.clearAccessToken();
        dispatch(logout());
      }
      setIsChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  if (!isChecked) return null;

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return children;
}
