import React from "react";
import ResultCard from "../components/cards/ResultCard";
import NewsCard from "../components/cards/NewsCard";
import VideoCard from "../components/cards/VideoCard";

const WidgetComponents = {
  "all": <ResultCard />,
  "news": <NewsCard />,
  "videos": <VideoCard />
};

export default function componentSelector(type: string) {
  return WidgetComponents[type as keyof typeof WidgetComponents];
}
