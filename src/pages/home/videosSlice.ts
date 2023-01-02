
import { createSlice } from "@reduxjs/toolkit";
import { IVideoDto } from "../../dto/videos";
import { videosThunk } from "../../thunk/VideosThunk";

interface IAppState {
    videos: IVideoDto[],
    videosStatus: string,
    nextPageToken: string | null,
}

const initialState: IAppState = {
    videos: [],
    videosStatus: "idle",
    nextPageToken: null,
}

const videosSlice = createSlice({
    name: "Videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(videosThunk.pending, (state, action) => {
                state.videosStatus = "pending";
            })
            .addCase(videosThunk.fulfilled, (state, action) => {
                state.videosStatus = "fulfilled";
                state.videos = action.payload?.items;
                state.nextPageToken = action.payload?.nextPageToken
            })
            .addCase(videosThunk.rejected, (state, action) => {
                state.videosStatus = "rejected  ";
            })

    },
});

export const VideosReducer = videosSlice.reducer;