import axios, { AxiosError } from "axios";
import { User } from "../models/user";

export default class UserService {
  // If the endpoint fails we have to return the data like a thunk error from redux
  static async create(data: User) {
    try {
      const result = await axios.post("", data);
      return result;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
}
