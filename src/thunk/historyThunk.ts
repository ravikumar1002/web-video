import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../App";

export const historyThunk = createAsyncThunk(
    "/user/history", async (userID: string | undefined, { rejectWithValue }) => {
        try {
            const response = await getDocs(
                // @ts-ignore
                collection(db, "User", `${userID}`, "history")
            );
            let dataAarrange;
            if (response?.docs[0]) {
                dataAarrange = Object.values(response?.docs[0].data())
            }
            return dataAarrange ? dataAarrange : [];
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
