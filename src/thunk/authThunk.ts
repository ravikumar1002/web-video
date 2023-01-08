import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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
      return response.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error, errorCode, errorMessage);
      return rejectWithValue(error);
    }
  }
);
