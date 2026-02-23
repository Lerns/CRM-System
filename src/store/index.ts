import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slices/authSlice';
import listenerMiddleware from './middleware/authListeners';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
