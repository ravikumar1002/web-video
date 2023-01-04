import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../App";

export const playlistsThunk = createAsyncThunk(
    "/user/playlists", async (userID: string, { rejectWithValue }) => {
        try {
            const response = await getDocs(
                collection(db, "User", `${userID}`, "playlists")
            );
            console.log(response.docs, "response")
            return response.docs;
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
