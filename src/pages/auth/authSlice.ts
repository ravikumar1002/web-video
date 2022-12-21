import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk } from "../../thunk/authThunk";

interface IUsersState {
    authUser: {},
    authStatus: string,
    authError: string | null,
}

const initialState: IUsersState = {
    authUser: {},
    authStatus: "idle",
    authError: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.authStatus = "pending";
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.authStatus = "fulfilled";
                state.authUser = action.payload?.providerData[0];
                localStorage.setItem("authUser", JSON.stringify(state?.authUser));
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.authStatus = "rejected";
            })
            .addCase(signupThunk.pending, (state, action) => {
                state.authStatus = "pending";
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                state.authStatus = "fulfilled";
                state.authUser = action.payload?.providerData[0];
                localStorage.setItem("authUser", JSON.stringify(state?.authUser));
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.authStatus = "rejected";
            })

    },
});

export const authReducer = authSlice.reducer;