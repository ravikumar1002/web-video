import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk } from "../../thunk/authThunk";


interface IAuthUser {
    providerId: string,
    uid: string,
    displayName: null,
    email: string,
    phoneNumber: null,
    photoURL: null,
}

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
    reducers: {
        addUserData: (state, action) => {
            state.authUser = <IAuthUser>action.payload
        },
        logoutUserProfile: (state, action) => {
            state.authUser = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.authStatus = "pending";
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.authStatus = "fulfilled";
                state.authUser = <IAuthUser>action.payload?.providerData[0];
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
                console.log(action.payload)
                state.authUser = <IAuthUser>action.payload?.providerData[0];
                localStorage.setItem("authUser", JSON.stringify(state?.authUser));
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.authStatus = "rejected";
            })

    },
});

export const { addUserData, logoutUserProfile } = authSlice.actions

export const authReducer = authSlice.reducer;