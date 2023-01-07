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
  gifs: <GifCard />,
  news: <NewsCard />,
  videos: <VideoCard />,
  results: <ResultCard />,
};

type Source = typeof WidgetComponents | typeof FavoriteComponents;

export default function componentSelector(type: string, source: Source) {
  return source[type as keyof typeof source];
}
