export type StoriesType = {
  "title": string,
  "link": string,
  "source": string,
  "date": string,
  "thumbnail": string,
}

export type Results = {
  "position": number,
  "title": string,
  "link": string,
  "displayed_link": string,
  "snippet": string,
  "thumbnail": string,
}

export type HeaderImage = {
  image: string,
  source: string,
}

export type ResponseType = {
  "data": {
    "organic_results": Results[],
    "top_stories": StoriesType[],
    "local_map": {
      "link": string,
      "image": string,
      "gps_coordinates": {
        "latitude": number,
        "longitude": number
        "altitude": number
      },
    }
    "serpapi_pagination": {
      "current": number,
      "next": string,
      "other_pages": {
        [key: string]: string
      }
    },
    "knowledge_graph": {
      title: string,
      type: string,
      description: string,
      header_images?: HeaderImage[],
      [key: string]: unknown
    }
  }
}
