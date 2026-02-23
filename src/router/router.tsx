import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import TodoListPage from '../pages/TodoListPage/TodoListPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import ProtectedRouter from './ProtectedRouter';
import AuthLayout from '../components/AuthLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  {
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registration', element: <RegistrationPage /> },
    ],
  },

  {
    element: <ProtectedRouter />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: 'todo', element: <TodoListPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
