import React from "react";
import GifCard from "../components/cards/Gif/GifCard";
import NewsCard from "../components/cards/NewsCard";
import VideoCard from "../components/cards/VideoCard";
import ResultCard from "../components/cards/ResultCard";
import FavoriteWrapper from "../components/favorites/FavoriteWrapper";
import ProfileWrapper from "../components/favorites/ProfileWrapper";

export const WidgetComponents = {
  all: (
    <FavoriteWrapper type="results">
      <ResultCard />
    </FavoriteWrapper>
  ),
  news: (
    <FavoriteWrapper type="new">
      <NewsCard />
    </FavoriteWrapper>
  ),
  videos: (
    <FavoriteWrapper type="video">
      <VideoCard />
    </FavoriteWrapper>
  ),
};

export const FavoriteComponents = {
  gifs: (
    <ProfileWrapper>
      <GifCard />
    </ProfileWrapper>
  ),
  news: (
    <ProfileWrapper>
      <NewsCard />
    </ProfileWrapper>
  ),
  videos: (
    <ProfileWrapper>
      <VideoCard />
    </ProfileWrapper>
  ),
  results: (
    <ProfileWrapper>
      <ResultCard />
    </ProfileWrapper>
  ),
};

type Source = typeof WidgetComponents | typeof FavoriteComponents;

export default function componentSelector(type: string, source: Source) {
  return source[type as keyof typeof source];
}
