import './App.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { initAppThunk } from './store/auth/thunks/initAppThunk';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppThunk());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
export default App;
