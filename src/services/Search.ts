import axios from "axios";
import { ResponseType } from "../types/api";

const BASE_URL = "https://gugul-srv.onrender.com";


enum SearchType {
  news = "nws",
  videos = "vid",
  all = "",
}

export default class Search {
  static async search(
    query: string,
    type: string,
    page: number
  ): Promise<ResponseType> {
    const { data } = await axios.get(
      `${BASE_URL}/?q=${query}&page=${
        page === 1 ? "0" : (page - 1) * 10
      }&type=${SearchType[type as keyof typeof SearchType]}`
    );
    return { data };
  }
}
