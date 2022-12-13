import axios from "axios";

type StoriesType = {
  "title": string,
  "link": string,
  "source": string,
  "date": string,
  "thumbnail": string,
}

type Results = {
  "position": number,
  "title": string,
  "link": string,
  "displayed_link": string,
  "snippet": string,
  "thumbnail": string,
}

type ResponseType = {
  "data": {
    "organic_results": Results[],
    "top_stories": StoriesType[],
    "serapi_pagination": {
      "current": number,
      "next_link": string,
      "next": string,
      "other_pages": {
        [key: string]: string
      }
    }
  }
}

export default class Search {
  static async search(query: string): Promise<ResponseType> {
    const { data } = await axios.get(`http://localhost:7120/?q=${query}`);
    return data;
  }
}
