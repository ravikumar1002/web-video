import { createSlice } from "@reduxjs/toolkit";
import { historyThunk } from "../../thunk/historyThunk";
import { playlistsThunk } from "../../thunk/playliststhunk";

interface IPlaylistValue {
    name: string,
    videos: string[],
}

interface IUsersState {
    playlists: IPlaylistValue[],
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
        builder
            .addCase(playlistsThunk.pending, (state, action) => {
                state.userDataStatus = "pending";
            })
            .addCase(playlistsThunk.fulfilled, (state, action) => {
                state.userDataStatus = "fulfilled";
                state.playlists = action.payload
            })
            .addCase(playlistsThunk.rejected, (state, action) => {
                state.userDataStatus = "rejected";
            })
            .addCase(historyThunk.pending, (state, action) => {
                state.userDataStatus = "pending";
            })
            .addCase(historyThunk.fulfilled, (state, action) => {
                state.userDataStatus = "fulfilled";
                console.log(action.payload, "action usersLice history")
                console.log(state.playlists)
            })
            .addCase(historyThunk.rejected, (state, action) => {
                state.userDataStatus = "rejected";
            })
    }
})


export const userReducer = userSlice.reducer;
