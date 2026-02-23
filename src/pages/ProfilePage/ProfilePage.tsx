import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError } from '../../store/auth/slices/authSlice';
import Error from '../../components/Error';
import { Button, Card, Space, Typography } from 'antd';
import { logoutThunk } from '../../store/auth/thunks/logoutThunk';
import { fetchProfileThunk } from '../../store/auth/thunks/profileThunk';
import { getErrorMessage } from '../../helpers/errorMessage';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && status !== 'loading') {
      dispatch(fetchProfileThunk());
    }
  }, [user, status, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate('/login', { replace: true });
    } catch (err: unknown) {
      getErrorMessage(err);
    }
  };

  return (
    <Card title="Профиль" style={{ width: 500 }}>
      {status === 'loading' ? (
        <Typography.Text>Загрузка профиля...</Typography.Text>
      ) : error ? (
        <Error message={error} onClose={() => dispatch(clearError())} />
      ) : !user ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography.Text>Профиль не загружен</Typography.Text>
          <Button type="primary" onClick={() => navigate('/login')}>
            Войдите заного
          </Button>
        </div>
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>Имя пользователя:</Typography.Text>
          <Typography.Text>{user.username}</Typography.Text>

          <Typography.Text strong>Email:</Typography.Text>
          <Typography.Text>{user.email}</Typography.Text>

          <Typography.Text strong>Телефон:</Typography.Text>
          <Typography.Text>{user.phoneNumber || 'Не указан'}</Typography.Text>

          <Button
            type="primary"
            onClick={handleLogout}
            style={{ marginTop: 16 }}
          >
            Выйти
          </Button>
        </Space>
      )}
    </Card>
  );
}
