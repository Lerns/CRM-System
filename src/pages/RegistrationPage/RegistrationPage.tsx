import {
  Button,
  Form,
  Input,
  Typography,
  Flex,
  Space,
  Alert,
  Card,
} from 'antd';
import { Link } from 'react-router-dom';
import illustration from '../../../public/illustration.svg';
import { errorMessage } from '../../helpers/errorMessage';
import { useState } from 'react';
import { UserRegistration } from '../../types/typesAuth';
import { registrationUser } from '../../api/auth';
import {
  emailRules,
  loginRules,
  passwordRules,
  phoneRules,
  usernameRules,
} from '../../helpers/validation';

const { Title, Text } = Typography;

export default function RegistrationPage() {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  interface RegistrationValues extends UserRegistration {
    passwordConfirm: string;
  }

  const handleRegistration = async (value: RegistrationValues) => {
    const { passwordConfirm, ...data } = value;

    if (!data.phoneNumber?.trim()) {
      delete data.phoneNumber;
    }

    setLoading(true);
    setError('');

    try {
      await registrationUser(data);
      setIsSuccess(true);
      form.resetFields();
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex style={{ minHeight: '100dvh' }}>
      <img src={illustration} alt="Registration Illustration" />

      <Flex
        vertical
        style={{
          width: '100%',
          maxWidth: 500,
          padding: '32px 16px',
        }}
      >
        <Card>
          <Title level={2} style={{ textAlign: 'center' }}>
            Регистрация
          </Title>
          <Text
            type="secondary"
            style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}
          >
            Создайте учетную запись
          </Text>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {isSuccess ? (
            <Alert
              message="Регистрация прошла успешно!"
              description={
                <Space direction="vertical">
                  <span>Теперь вы можете войти в систему.</span>
                  <Link to="/" style={{ fontWeight: 500 }}>
                    Перейти на страницу авторизации
                  </Link>
                </Space>
              }
              type="success"
              showIcon
            />
          ) : (
            <Form layout="vertical" form={form} onFinish={handleRegistration}>
              <Form.Item
                name="username"
                label="Имя пользователя"
                rules={usernameRules}
              >
                <Input placeholder="Кабан Кабаныч" />
              </Form.Item>

              <Form.Item name="login" label="Логин" rules={loginRules}>
                <Input placeholder="Kaban007" />
              </Form.Item>

              <Form.Item name="password" label="Пароль" rules={passwordRules}>
                <Input.Password placeholder="123456" />
              </Form.Item>

              <Form.Item
                name="passwordConfirm"
                label="Повторить пароль"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Подтвердите пароль' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Пароли не совпадают');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="123456" />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={emailRules}>
                <Input placeholder="kaban@mail.ru" />
              </Form.Item>

              <Form.Item name="phoneNumber" label="Телефон" rules={phoneRules}>
                <Input placeholder="+78003222232" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Flex>
    </Flex>
  );
}
