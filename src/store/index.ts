import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "../pages/auth/authSlice";

// interface ISliceType {
//     name: string,
//     initialState: any,
//     reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>
//     extraReducers?:
//     | Object<string, ReducerFunction>
//     | ((builder: ActionReducerMapBuilder<State>) => void)
// }

export const store = configureStore({
  reducer: {
    user: authReducer
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