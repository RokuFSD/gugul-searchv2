import axios from "axios";

// TODO: Remove the key from here
const BASE_URL = "https://api.giphy.com/v1/gifs/search?api_key=jImDJkvHoy8exC7OHLW0zzYy0fZpENTG";

type SearchGifsProps = {
  offset: number;
};

export type GifSearch = {
  type: string;
  id: string;
  url: string;
  slug: string;
  embed_url: string;
  title: string;
  source: string;
  images: {
    fixed_height: {
      height: string;
      width: string;
      url: string;
      size: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
    };
    original: {
      height: string;
      width: string;
      url: string;
      size: string;
      frames: string;
      mp4: string;
      mp4_size: string;
      webp: string;
      webp_size: string;
      hash: string;
    };
  };
  user: {
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    description: string;
  };
};

type SearchGifResult = {
  data: GifSearch[];
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
};

export default class Gifs {
  private static q: string;

  static set query(newQuery: string) {
    this.q = newQuery;
  }

  static get query(): string {
    return this.q;
  }

  static async search({ offset }: SearchGifsProps): Promise<SearchGifResult> {
    const data = await axios.get(
      `${BASE_URL}&q=${this.query}&limit=25&offset=${offset}`
    );
    return data?.data;
  }
}
