/* eslint-disable no-param-reassign,no-underscore-dangle */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { Favorite } from "../../../types/api";
import { login, logout, me } from "./thunkActions";
import type { RootState } from "../../app/store";

type UserState = Omit<User["user"], "favorites">;

interface State {
  user: UserState & { favorites: EntityState<Favorite> };
  loading: boolean;
  error: {
    message: string;
    type: string;
  };
}

const favoritesAdapter = createEntityAdapter<Favorite>({
  selectId: (favorite) => favorite._id,
});

export const EmptyUser = {
  _id: "",
  name: "",
  password: "",
  email: "",
  picture: "",
  favorites: favoritesAdapter.getInitialState(),
};

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
      const { favorites } = action.payload.user;
      favoritesAdapter.setAll(state.user.favorites, favorites);
      state.user = { ...action.payload.user, favorites: state.user.favorites };
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
      const { favorites } = action.payload.user;
      favoritesAdapter.setAll(state.user.favorites, favorites);
      state.user = { ...action.payload.user, favorites: state.user.favorites };
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
