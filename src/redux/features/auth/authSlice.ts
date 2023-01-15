/* eslint-disable no-param-reassign,no-underscore-dangle */
import {
  EntityState,
  createSlice,
  createSelector,
  createEntityAdapter,
  PayloadAction,
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
    addFavorite: (state, action) => {
      favoritesAdapter.addOne(state.user.favorites, action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      favoritesAdapter.removeOne(state.user.favorites, action.payload);
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

export const { selectAll, selectById } = favoritesAdapter.getSelectors(
  (state: RootState) => state.auth.user.favorites
);

const selectFavoriteGifs = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.card_type === "gif")
);

const selectFavoriteStandard = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.card_type === "results")
);

const selectFavoriteVideos = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.card_type === "video")
);

const selectFavoriteNews = createSelector(selectAll, (favorites) =>
  favorites.filter((favorite) => favorite.card_type === "new")
);

export const isAnyUser = createSelector(selectUser, (user) => !!user._id);

export const selectors = {
  news: selectFavoriteNews,
  gifs: selectFavoriteGifs,
  videos: selectFavoriteVideos,
  results: selectFavoriteStandard,
};

export const getSelector = (type: string, source: typeof selectors) =>
  source[type as keyof typeof selectors];

export const { addFavorite, removeFavorite } = authSlice.actions;

export default authSlice.reducer;
