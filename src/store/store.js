import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import matchesReducer from './matchesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/loginUser/fulfilled', 'auth/demoLogin/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

