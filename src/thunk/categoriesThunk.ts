import { GetYoutubeDataAsJSON } from "../services/GetAsJSON";
import { IVideosDto } from "../dto/videos";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategoriesDto } from "../dto/categories";


export const categoriesThunk = createAsyncThunk(
    "/videos/categories", async (_, { rejectWithValue }) => {
        try {
            const response = await GetYoutubeDataAsJSON<ICategoriesDto>("/videoCategories", {
                params: {
                    part: "snippet",
                    regionCode:"IN",
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