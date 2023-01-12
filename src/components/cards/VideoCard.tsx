import React from "react";
import { VideoResult } from "../../types/api";
import useMediaQuery from "../../hooks/useMediaQuery";
import VideoMobileCard from "./VideoMobileCard";
import ThumbnailCard from "./ThumbnailCard";

type VideoCardProps = {
  // eslint-disable-next-line react/require-default-props
  item?: VideoResult;
};

function VideoCard({ item }: VideoCardProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (!item) return null;
  if (isMobile) {
    return <VideoMobileCard item={item} />;
  }

  const { extensions } = item.rich_snippet.top;
  const isYoutube = extensions[0].toLowerCase().includes("youtube");
  return (
    <div className="flex flex w-full items-center gap-4 z-20 bg-gray-700">
      <div className="w-full">
        <span className="text-xs text-gray-400">{item?.displayed_link}</span>
        <h2 className="text-lg text-blue-300 hover:text-blue-400 transition-all">
          <a href={item?.link} target="_blank" rel="noreferrer">
            {item?.title}
          </a>
        </h2>
        <div className="flex relative gap-4 mt-2">
          {item?.thumbnail ? (
            <ThumbnailCard isYoutube={isYoutube} item={item} />
          ) : null}
          <div className="max-w-sm h-full flex flex-col gap-3">
            <p className="text-sm line-clamp-2">{item?.snippet}</p>
            <p className="text-sm text-gray-300">
              {extensions.map((extension) => `${extension} `)}
            </p>
          </div>
          <p className="text-xs text-white bg-neutral-800 bg-opacity-70 absolute bottom-0 rounded-full m-1 w-8 text-center">
            {item?.duration}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
