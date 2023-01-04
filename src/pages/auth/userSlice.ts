import { createSlice } from "@reduxjs/toolkit";
import { playlistsThunk } from "../../thunk/playliststhunk";

interface IUsersState {
    playlists: [],
    likedVideos: {},
    history: {},
    userDataStatus: string,
    userDataError: string | null,
}

const initialState: IUsersState = {
    playlists: [],
    likedVideos: {},
    history: {},
    userDataStatus: "idle",
    userDataError: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(playlistsThunk.pending, (state, action) => {
            state.userDataStatus = "pending";
        })
            .addCase(playlistsThunk.fulfilled, (state, action) => {
                state.userDataStatus = "fulfilled";
                console.log(action.payload, "action usersLice")
                state.playlists = action.payload
            })
            .addCase(playlistsThunk.rejected, (state, action) => {
                state.userDataStatus = "rejected";
            })
    }
})


export const userReducer = userSlice.reducer;
