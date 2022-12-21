import appConfigs from "../config/appConfigs";
import { GetYoutubeDataAsJSON } from "../services/GetAsJSON";
import { IVideosDto } from "../dto/videos";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const videosThunk = createAsyncThunk(
    "/videos/getVideos", async (_, { rejectWithValue }) => {
        try {
            const response = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
                params: {
                    part: "snippet",
                    contentDetails: "statistics",
                    chart: "mostPopular",
                    maxResults: 20,
                },
            });
            return response;
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
