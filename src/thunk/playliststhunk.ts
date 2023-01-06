import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../App";

export const playlistsThunk = createAsyncThunk(
    "/user/playlists", async (userID: string| undefined, { rejectWithValue }) => {
        console.log(userID, "before try block")
        try {
            const response = await getDocs(
                collection(db, "User", `${userID}`, "playlists")
            );
            const dataAarrange = response.docs.map(i => {
                return {
                    name: i.id,
                    videos: Object.values(i.data()),
                }
            })
            return dataAarrange;
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
