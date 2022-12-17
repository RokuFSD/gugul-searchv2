import axios from "axios";

import { AutoCompleteResult, ResponseType } from "../types/api";

enum SearchType {
  news = "nws",
  images = "isch",
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
      `http://localhost:5005/?q=${query}&page=${
        page === 1 ? "0" : (page - 1) * 10
      }&type=${SearchType[type as keyof typeof SearchType]}`
    );
    return { data };
  }

  static async autocomplete(query: string): Promise<AutoCompleteResult> {
    const { data } = await axios.get(
      `http://localhost:5005/autocomplete?q=${query}`
    );
    return { data };
  }
}
