import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../App";

export const historyThunk = createAsyncThunk(
    "/user/history", async (userID: string | undefined, { rejectWithValue }) => {
        console.log(userID, "before try block")
        try {
            const response = await getDocs(
                collection(db, "User", `${userID}`, "history")
            );
            const dataAarrange = response.docs
            console.log(dataAarrange)
            return dataAarrange;
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
