/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { login, logout, me } from "./thunkActions";
import { User, EmptyUser } from "../../../models/user";
import type { RootState } from "../../app/store";

interface State {
  user: User["user"];
  loading: boolean;
  error: {
    message: string;
    type: string;
  };
}

const INITIAL_AUTH: State = {
  user: EmptyUser,
  loading: false,
  error: {
    message: "",
    type: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_AUTH,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    removeUser: (state) => {
      state.user = INITIAL_AUTH.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = { ...action.payload.user };
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = INITIAL_AUTH.user;
    });

    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = { ...action.payload };
      }
    });
    builder.addCase(me.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.user = { ...action.payload.user };
      state.loading = false;
    });
    builder.addCase(me.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectUser = createSelector(
  (state: RootState) => state.auth.user,
  (user) => user
);

export const selectLoading = (state: RootState) => state.auth.loading;

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
