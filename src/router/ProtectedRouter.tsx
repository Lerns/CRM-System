import { useAppSelector } from '../store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

import { Spin } from 'antd';

export default function ProtectedRouter() {
  const { isAuthorized, status } = useAppSelector((state) => state.auth);

  if (status === 'loading') {
    return (
      <Spin
        spinning={true}
        tip="Загрузка... Проверка авторизации"
        style={{
          display: 'block',
          margin: '100px auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }
    if (!isAuthorized) return <Navigate to="/login" replace />;
    
  return <Outlet />;
}
