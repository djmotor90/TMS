import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import organizationSlice from './slices/organizationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    organization: organizationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;