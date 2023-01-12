
import { createSlice } from "@reduxjs/toolkit";
import { ICategorieDto } from "../../dto/categories";
import { IVideoDto } from "../../dto/videos";
import { categoriesThunk } from "../../thunk/categoriesThunk";
import { videosThunk } from "../../thunk/VideosThunk";

interface IAppState {
    videos: IVideoDto[],
    categories: ICategorieDto[],
    videosStatus: string,
    categoriedStatus: string,
    nextPageToken: string | null,
}

const initialState: IAppState = {
    videos: [],
    categories: [],
    categoriedStatus: "idle",
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
            .addCase(categoriesThunk.pending, (state, action) => {
                state.categoriedStatus = "pending";
            })
            .addCase(categoriesThunk.fulfilled, (state, action) => {
                state.categoriedStatus = "fulfilled";
                state.categories = action.payload?.items;
            })
            .addCase(categoriesThunk.rejected, (state, action) => {
                state.categoriedStatus = "rejected  ";
            })

    },
});

export const VideosReducer = videosSlice.reducer;