import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Form, Input, Typography, Button, Flex, Alert } from 'antd';

import { useAppDispatch } from '../../store/hook';
import { login } from '../../store/slices/authSlice';
import { loginUser } from '../../api/auth';
import { errorMessage } from '../../helpers/errorMessage';

import type { AuthData, Token } from '../../types/typesAuth';
import illustration from '../../../public/illustration.svg';
import authTokenStore from '../../auth/authTokenStore';

const { Title, Text } = Typography;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [form] = Form.useForm();

  const handleLogin = async (values: AuthData) => {
    setLoading(true);
    setError('');

    try {
      const { accessToken, refreshToken }: Token = await loginUser(values);
      authTokenStore.setAccessToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(login());
      form.resetFields();
      navigate('/todo');
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex style={{ height: '100dvh' }}>
      <img src={illustration} alt="Login Illustration" />

      <Flex vertical style={{ width: 420, margin: 'auto' }}>
        <Title level={1}>Login to your account</Title>
        <Text type="secondary">See what is going on with your business</Text>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginTop: 16 }}
          />
        )}

        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="login"
            label="Email"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input placeholder="mail@abc.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password placeholder="*********" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary">
          Еще не зарегистрировались?
          <Link to="/registration" style={{ marginLeft: 8 }}>
            Создать учетную запись
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
