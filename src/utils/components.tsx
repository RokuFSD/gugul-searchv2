import React from "react";
import ResultCard from "../components/cards/ResultCard";
import NewsCard from "../components/cards/NewsCard";
import VideoCard from "../components/cards/VideoCard";
import GifCard from "../components/cards/Gif/GifCard";

export const WidgetComponents = {
  all: <ResultCard />,
  news: <NewsCard />,
  videos: <VideoCard />,
};

export const FavoriteComponents = {
  results: <ResultCard />,
  news: <NewsCard />,
  videos: <VideoCard />,
  gifs: <GifCard />,
};

export default function componentSelector(
  type: string,
  source: typeof WidgetComponents | typeof FavoriteComponents
) {
  return source[type as keyof typeof source];
}
