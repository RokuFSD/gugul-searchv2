import { GifSearch } from "../services/Gifs";

export type StoriesType = {
  title: string;
  link: string;
  source: string;
  date: string;
  thumbnail: string;
};

export type Results = {
  position: number;
  title: string;
  link: string;
  displayed_link: string;
  snippet: string;
  thumbnail?: string;
};

export type VideoResult = Results & {
  duration: string;
  rich_snippet: {
    top: {
      extensions: string[];
    };
  };
};

export type NewResult = Results & {
  source: string;
  date: string;
};

export type HeaderImage = {
  image: string;
  source: string;
};

export type ResponseType = {
  data: {
    organic_results?: Results[];
    news_results?: NewResult[];
    image_results?: Results[];
    video_results?: VideoResult[];
    top_stories: StoriesType[];
    local_map: {
      link: string;
      image: string;
      gps_coordinates: {
        latitude: number;
        longitude: number;
        altitude: number;
      };
    };
    serpapi_pagination: {
      current: number;
      next: string;
      other_pages: {
        [key: string]: string;
      };
    };
    knowledge_graph: {
      title: string;
      type: string;
      description: string;
      source: {
        link: string;
        name: string;
      };
      header_images?: HeaderImage[];
      list: { title: string; description: string | string[] }[];
      [key: string]: unknown;
    };
  };
};

export type Favorite = {
  _id: string;
  type: "video" | "new" | "gif" | "normal";
  data: Results | VideoResult | NewResult | GifSearch;
};
