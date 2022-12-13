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

export type ResponseType = {
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
    },
    "local_map": {
      "link": string,
      "image": string,
      "gps_coordinates": {
        "latitude": number,
        "longitude": number
        "altitude": number
      },
    }
  }
}
