import { createBrowserRouter } from 'react-router-dom';
import TodoListPage from '../src/pages/TodoListPage/TodoListPage';
import ProfilePage from '../src/pages/ProfilePage/ProfilePage';
import RootLayout from './components/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <TodoListPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);
