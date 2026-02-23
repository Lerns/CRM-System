import { createListenerMiddleware } from '@reduxjs/toolkit';
import authTokenStore from '../../api/authTokenStore';
import { loginThunk } from '../auth/thunks/loginThunk';
import { logoutThunk } from '../auth/thunks/logoutThunk';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: loginThunk.fulfilled,
  effect: (action) => {
    const { accessToken, refreshToken } = action.payload;
    authTokenStore.setAccessToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
});
listenerMiddleware.startListening({
  actionCreator: logoutThunk.fulfilled,
  effect: () => {
    authTokenStore.clearAccessToken();
    localStorage.removeItem('refreshToken');
  },
});

export default listenerMiddleware;
