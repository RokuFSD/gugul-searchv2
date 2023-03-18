import { Favorite } from "../types/api";

export interface User {
  user: {
    _id: string;
    name: string;
    password: string;
    email: string;
    image: string;
    favorites: Favorite[];
  };
}
