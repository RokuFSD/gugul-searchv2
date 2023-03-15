import axios from "axios";
import { User } from "../models/user";

const BASE_URL = "http://localhost:5005";
const AUTH_URL = `${BASE_URL}/auth`;

export default class Auth {
  static me() {
    return axios.get<User>(`${AUTH_URL}/me`, {
      withCredentials: true
    });
  }

  static login(data: { [p: string]: FormDataEntryValue }) {
    return axios.post<User>(`${AUTH_URL}/login`, data, {
      withCredentials: true
    });
  }

  static logout() {
    return axios.post(`${AUTH_URL}/logout`, "", {
      withCredentials: true
    });
  }
}
