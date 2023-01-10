/* eslint-disable no-underscore-dangle */
import axios, { AxiosError } from "axios";
import { User } from "../models/user";
import { Favorite, Results } from "../types/api";

const BASE_URL = "http://localhost:5005";
const USER_URL = `${BASE_URL}/users`;
const FAVORITES_URL = `${BASE_URL}/favorites`;

export default class UserService {
  // If the endpoint fails we have to return the data like a thunk error from redux
  static async create(data: User) {
    try {
      return await axios.post(`${USER_URL}/register`, data);
    } catch (error) {
      const err = error as AxiosError;
      return { payload: err.response?.data };
    }
  }

  static async update(data: Partial<User>) {
    try {
      return await axios.put(`${USER_URL}/update`, data, {
        withCredentials: true,
      });
    } catch (error) {
      const err = error as AxiosError;
      return {
        payload: err.response?.data,
      };
    }
  }

  static async addFavorite(data: Favorite) {
    try {
      return await axios.post(FAVORITES_URL, data, {
        withCredentials: true,
      });
    } catch (err) {
      throw err as AxiosError;
    }
  }

  static async removeFavorite(idFavorite: string) {
    try {
      return await axios.delete(`${FAVORITES_URL}/${idFavorite}`, {
        withCredentials: true,
      });
    } catch (err) {
      throw err as AxiosError;
    }
  }
}
