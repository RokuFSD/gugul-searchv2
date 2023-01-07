import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User } from "../../../models/user";
import Auth from "../../../services/Auth";

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: { message: string; type: string } }
>(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Auth.login({ email, password });
      return data;
    } catch (e) {
      const error = e as AxiosError<{ message: string; type: string }>;
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Auth.logout();
      return data;
    } catch (e) {
      const error = e as AxiosError;
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const me = createAsyncThunk<
  User,
  void,
  { rejectValue: { message: string; type: string } }
>("auth/me", async (_, { rejectWithValue }) => {
  try {
    const { data } = await Auth.me();
    return data;
  } catch (e) {
    const error = e as AxiosError<{ message: string; type: string }>;
    if (!error.response) {
      throw e;
    }
    return rejectWithValue(error?.response?.data);
  }
});
