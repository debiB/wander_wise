import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from '@/store/auth/authApi';
import {travelAPI} from "@/store/TravelHistory/travelHistoryApi"
export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [travelAPI.reducerPath]: travelAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, travelAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;