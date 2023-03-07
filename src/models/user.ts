import { Favorite } from "../types/api";

export interface User {
  user: {
    _id: string;
    name: string;
    password: string;
    email: string;
    picture: string;
    favorites: Favorite[];
  };
}
