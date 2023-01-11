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
    playlitsStatus: string,
    historyStatus: string,
    likedStatus: string,
    watchlaterStatus: string,
    userDataError: string | null,
}

const initialState: IUsersState = {
    playlists: [],
    watchlater: [],
    likedVideos: [],
    history: [],
    playlitsStatus: "idle",
    historyStatus: "idle",
    likedStatus: "idle",
    watchlaterStatus: "idle",
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
                state.playlitsStatus = "pending";
            })
            .addCase(playlistsThunk.fulfilled, (state, action) => {
                state.playlitsStatus = "fulfilled";
                state.playlists = action.payload
            })
            .addCase(playlistsThunk.rejected, (state, action) => {
                state.playlitsStatus = "rejected";
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
                state.watchlaterStatus = "pending";
            })
            .addCase(watchlaterThunk.fulfilled, (state, action) => {
                state.watchlaterStatus = "fulfilled";
                state.watchlater = action.payload
            })
            .addCase(watchlaterThunk.rejected, (state, action) => {
                state.watchlaterStatus = "rejected";
            })
            .addCase(likedThunk.pending, (state, action) => {
                state.likedStatus = "pending";
            })
            .addCase(likedThunk.fulfilled, (state, action) => {
                state.likedStatus = "fulfilled";
                state.likedVideos = action.payload
            })
            .addCase(likedThunk.rejected, (state, action) => {
                state.likedStatus = "rejected";
            })
    }
})

export const { removeUserData } = userSlice.actions


export const userReducer = userSlice.reducer;
