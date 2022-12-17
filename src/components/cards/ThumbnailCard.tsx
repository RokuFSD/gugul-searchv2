import React from "react";
import VideoPlayer from "../modal/VideoPlayer";
import { VideoResult } from "../../types/api";

function ThumbnailCard({
  isYoutube,
  item,
}: {
  isYoutube: boolean;
  item: VideoResult;
}) {
  if (isYoutube) {
    return (
      <VideoPlayer
        src={item.link}
        thumbnail={item.thumbnail}
        title={item.title}
      />
    );
  }
  return (
    <a href={item?.link} target="_blank" rel="noreferrer">
      <img
        src={item?.thumbnail}
        alt={item.title}
        className="w-48 h-28 rounded-lg object-fit"
      />
    </a>
  );
}

export default ThumbnailCard;
