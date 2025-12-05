import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/',
    label: (
      <NavLink to="/" end>
        Список задач
      </NavLink>
    ),
  },
  {
    key: '/profile',
    label: (
      <NavLink to="/profile" end>
        Профиль
      </NavLink>
    ),
  },
];

export const RootLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default RootLayout;
