import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registrationThunk } from '../../store/auth/thunks/registrationThunk';
import { UserRegistration } from '../../types/typesAuth';

import { clearError } from '../../store/auth/slices/authSlice';
import Error from '../../components/Error';
import { getErrorMessage } from '../../helpers/errorMessage';

import illustration from '../../../public/illustration.svg';

import {
  emailRules,
  loginRules,
  passwordRules,
  phoneRules,
  usernameRules,
} from '../../helpers/validation';

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

interface RegistrationValues extends UserRegistration {
  passwordConfirm: string;
}

export default function RegistrationPage() {
  const dispatch = useAppDispatch();
  const { registrationStatus, error } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<RegistrationValues>();

  const { Title, Text } = Typography;

  const isLoading = registrationStatus === 'loading';
  const isSuccess = registrationStatus === 'succeeded';

  const handleRegistration = async (value: RegistrationValues) => {
    const { passwordConfirm, ...data } = value;

    try {
      await dispatch(registrationThunk(data)).unwrap();
      form.resetFields();
    } catch (err: unknown) {
      getErrorMessage(err);
    }
  };

  return (
    <Flex style={{ minHeight: '100dvh', width: '100%' }}>
      <img
        src={illustration}
        alt="Registration Illustration"
        style={{ objectFit: 'cover', flex: '1', width: '60%' }}
      />

      <Flex
        vertical
        style={{
          width: '100%',
          padding: '32px 32px',
          maxWidth: 700,
        }}
      >
        <Card style={{ textAlign: 'center', width: '100%' }}>
          <Title level={2}>Регистрация</Title>
          <Text
            type="secondary"
            style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}
          >
            Создайте учетную запись
          </Text>

          {error && (
            <Error message={error} onClose={() => dispatch(clearError())} />
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
                  loading={isLoading}
                  block
                >
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>

        <Link to="/login" style={{ marginTop: 10, textAlign: 'center' }}>
          Вернуться к авторизации
        </Link>
      </Flex>
    </Flex>
  );
}
