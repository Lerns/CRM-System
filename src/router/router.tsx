import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/RootLayout';
import TodoListPage from '../pages/TodoListPage/TodoListPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import ProtectedRouter from './ProtectedRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <LoginPage /> },
      {
        path: '/todo',
        element: (
          <ProtectedRouter>
            <TodoListPage />
          </ProtectedRouter>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRouter>
            <ProfilePage />
          </ProtectedRouter>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);
