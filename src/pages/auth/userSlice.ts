import { createSlice } from "@reduxjs/toolkit";
import { historyThunk } from "../../thunk/historyThunk";
import { likedThunk } from "../../thunk/likedThunk";
import { playlistsThunk } from "../../thunk/playliststhunk";
import { watchlaterThunk } from "../../thunk/watchlaterThunk";

interface IPlaylistValue {
    name: string,
    videos: string[],
}

interface IUsersState {
    playlists: IPlaylistValue[],
    likedVideos: string[],
    history: string[],
    watchlater: string[],
    userDataStatus: string,
    historyStatus: string,
    userDataError: string | null,
}

const initialState: IUsersState = {
    playlists: [],
    watchlater: [],
    likedVideos: [],
    history: [],
    userDataStatus: "idle",
    historyStatus: "idle",
    userDataError: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUserData: (state, action) => {
            state.playlists = [],
            state.watchlater = [],
            state.likedVideos = [],
            state.history = []
        }
    },
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
                state.historyStatus = "pending";
            })
            .addCase(historyThunk.fulfilled, (state, action) => {
                state.historyStatus = "fulfilled";
                state.history = action.payload
            })
            .addCase(historyThunk.rejected, (state, action) => {
                state.historyStatus = "rejected";
            })
            .addCase(watchlaterThunk.pending, (state, action) => {
                state.userDataStatus = "pending";
            })
            .addCase(watchlaterThunk.fulfilled, (state, action) => {
                state.userDataStatus = "fulfilled";
                state.watchlater = action.payload
            })
            .addCase(watchlaterThunk.rejected, (state, action) => {
                state.userDataStatus = "rejected";
            })
            .addCase(likedThunk.pending, (state, action) => {
                state.userDataStatus = "pending";
            })
            .addCase(likedThunk.fulfilled, (state, action) => {
                state.userDataStatus = "fulfilled";
                state.likedVideos = action.payload
            })
            .addCase(likedThunk.rejected, (state, action) => {
                state.userDataStatus = "rejected";
            })
    }
})

export const { removeUserData } = userSlice.actions


export const userReducer = userSlice.reducer;
