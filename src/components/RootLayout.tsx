import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/todo',
    label: (
      <NavLink to="/todo" end>
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
  {
    key: '/login',
    label: (
      <NavLink to="/login" end>
        Вход
      </NavLink>
    ),
  },
];

export const RootLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const hideLayout = ['/login', '/registration', '/'].includes(
    location.pathname,
  );
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideLayout && (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
          />
        </Sider>
      )}

      <Layout>
        {!hideLayout && <Header style={{ padding: 0 }} />}

        <Content>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default RootLayout;
