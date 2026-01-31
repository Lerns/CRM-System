import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { logoutUser, profileUser } from '../../api/auth';
import { errorMessage } from '../../helpers/errorMessage';
import { logout } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../store/hook';

import { Alert, Button, Flex, Form, Input, Typography } from 'antd';
import authTokenStore from '../../auth/authTokenStore';

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogouyt = () => {
    try {
      logoutUser();
      authTokenStore.clearAccessToken();
      localStorage.removeItem('refreshToken');
      dispatch(logout());
      navigate('/login');
    } catch (err: unknown) {
      setError(errorMessage(err));
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await profileUser();
        console.log('profile', data);
        form.setFieldsValue({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } catch (err: unknown) {
        setError(errorMessage(err));
      }
    }
    fetchProfile();
  }, [form]);
  return (
    <Flex style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="Имя пользователя">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Телефон">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleLogouyt}>
            Выйти
          </Button>
        </Form.Item>
      </Form>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
    </Flex>
  );
}
