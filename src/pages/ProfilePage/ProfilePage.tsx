import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import authTokenStore from '../../api/authTokenStore';
import { logout } from '../../store/auth/slices/authSlice';
import { logoutUser, profileUser } from '../../api/auth';
import { getErrorMessage } from '../../helpers/errorMessage';
import { Profile } from '../../types/typesAuth';

import { Alert, Button, Card, Space, Typography } from 'antd';

export default function ProfilePage() {
  const [error, setError] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      authTokenStore.clearAccessToken();
      localStorage.removeItem('refreshToken');
      dispatch(logout());
      navigate('/login');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await profileUser();
        setProfile(profileData);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      }
    }
    fetchProfile();
  }, []);

  if (!profile) {
    return null;
  }
  if (error) {
    return (
      <Alert
        message={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <Card title="Профиль" style={{ width: 500 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Text strong>Имя пользователя:</Typography.Text>
        <Typography.Text>{profile.username}</Typography.Text>

        <Typography.Text strong>Email:</Typography.Text>
        <Typography.Text>{profile.email}</Typography.Text>

        <Typography.Text strong>Телефон:</Typography.Text>
        <Typography.Text>{profile.phoneNumber || 'Не указан'}</Typography.Text>

        <Button type="primary" onClick={handleLogout} style={{ marginTop: 16 }}>
          Выйти
        </Button>
      </Space>
    </Card>
  );
}
