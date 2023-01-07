import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../App";

interface IValuesType {
  persistUser?: true | undefined;
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "/auth/login", async (values: IValuesType, { rejectWithValue }) => {
    const auth = getAuth();
    const { email, password } = values
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error, errorCode, errorMessage);
      return rejectWithValue(error);
    }
  }
);


export const signupThunk = createAsyncThunk(
  "/auth/signup", async (values: IValuesType, { rejectWithValue }) => {
    const auth = getAuth();
    const { email, password } = values
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // if (response?.user) {
      //   console.log(response.user, db, "auth thunk")
      //   const history = doc(db, "User", `${response.user.email, "history"}`);
      //   const playlists = await setDoc(doc(db, "User", `${response.user.email}`), { playlist: "playlist" });
      //   const liked = doc(collection(db, "User", `${response.user.email, "liked"}`));
      //   const watchLater = await setDoc(doc(db, "User", `${response.user.email}`), { watchlater: "watchlater" });
      //   // console.log(history, "history")
      // }
      return response.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error, errorCode, errorMessage);
      return rejectWithValue(error);
    }
  }
);
