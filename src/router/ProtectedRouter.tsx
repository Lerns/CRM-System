import { useAppDispatch, useAppSelector } from '../store/hook';
import { JSX, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { login, logout } from '../store/slices/authSlice';
import authTokenStore from '../auth/authTokenStore';
import { refreshTokenUser } from '../api/auth';

export default function ProtectedRouter({
  children,
}: {
  children: JSX.Element;
}) {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = authTokenStore.getAccessToken();

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
      setChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  if (!checked) return null;

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return children;
}
