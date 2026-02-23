import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const { Content} = Layout;

export const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Content>
      
    </Layout>
  );
};

export default AuthLayout;
