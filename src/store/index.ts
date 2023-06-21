import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "../pages/auth/authSlice";
import { VideosReducer } from "../pages/home/videosSlice";
import { userReducer } from "../pages/auth/userSlice"

export const store = configureStore({
  reducer: {
    user: authReducer,
    videos: VideosReducer,
    userData: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;