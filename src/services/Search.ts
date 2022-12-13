import axios from "axios";

import {ResponseType} from '../types/api';

export default class Search {
  static async search(query: string): Promise<ResponseType> {
    const { data } = await axios.get(`http://localhost:7120/?q=${query}`);
    return data;
  }
}
