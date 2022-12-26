import axios from "axios";

export default class Auth {
  static async me() {
    return axios.get("http://localhost:5005/auth/me");
  }
}
