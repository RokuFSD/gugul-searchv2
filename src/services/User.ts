import axios, { AxiosError } from "axios";
import { User } from "../models/user";

const BASE_URL = "http://localhost:5005";
const USER_URL = `${BASE_URL}/users`;

export default class UserService {
  // If the endpoint fails we have to return the data like a thunk error from redux
  static async create(data: User) {
    try {
      return await axios.post(`${USER_URL}/register`, data);
    } catch (error) {
      const err = error as AxiosError;
      return {
        payload: err.response?.data,
      };
    }
  }

  static async update(data: Partial<User>) {
    // TODO: Test this
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
}
