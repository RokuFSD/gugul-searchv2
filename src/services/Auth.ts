import axios from "axios";
import { User } from "../models/user";

export const BASE_URL = "http://localhost:5005";
const AUTH_URL = `${BASE_URL}/auth`;
export const GOOGLE_URL = `${AUTH_URL}/google`;

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

  static loginGoogle() {
    window.open(GOOGLE_URL, "_self");
  }

  static loginGithub() {
    // Todo
  }

  static logout() {
    return axios.post(`${AUTH_URL}/logout`, "", {
      withCredentials: true
    });
  }
}
