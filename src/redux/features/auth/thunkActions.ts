import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Auth from "../../../services/Auth";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Auth.login({ username, password });
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

export const me = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Auth.me();
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
