/* eslint-disable no-param-reassign,no-underscore-dangle */
import {
  createSlice,
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { User } from "../../../models/user";
import { Favorite } from "../../../types/api";
import type { RootState } from "../../app/store";
import { login, logout, me } from "./thunkActions";

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
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { favorites } = action.payload.user;
        favoritesAdapter.setAll(state.user.favorites, favorites);
        state.user = {
          ...action.payload.user,
          favorites: state.user.favorites,
        };
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = INITIAL_AUTH.user;
      })

      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = { ...action.payload };
        }
      })
      .addCase(me.pending, (state) => {
        state.loading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        const { favorites } = action.payload.user;
        favoritesAdapter.setAll(state.user.favorites, favorites);
        state.user = {
          ...action.payload.user,
          favorites: state.user.favorites,
        };
        state.loading = false;
      })
      .addCase(me.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;

const { selectAll } = favoritesAdapter.getSelectors(
  (state: RootState) => state.auth.user.favorites
);

const selectFavoriteGifs = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.type === "gif")
);

const selectFavoriteStandard = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.type === "normal")
);

const selectFavoriteVideos = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.type === "video")
);

const selectFavoriteNews = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.type === "new")
);

export const selectors = {
  standard: selectFavoriteStandard,
  news: selectFavoriteNews,
  videos: selectFavoriteVideos,
  gifs: selectFavoriteGifs,
};

export const getSelector = (type: string, source: typeof selectors) =>
  source[type as keyof typeof selectors];

// export const selectLoading = (state: RootState) => state.auth.loading;
//
// export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
