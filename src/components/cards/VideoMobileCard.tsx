import React from "react";
import { VideoResult } from "../../types/api";

type VideoCardProps = {
  // eslint-disable-next-line react/require-default-props
  item: VideoResult;
};

function VideoMobileCard({ item }: VideoCardProps) {
  const { extensions } = item.rich_snippet.top;
  return (
    <div className="flex relative gap-4">
      {item?.thumbnail ? (
        <a href={item?.link} target="_blank" rel="noreferrer">
          <div className="relative">
            <img
              src={item?.thumbnail}
              alt={item.title}
              className="w-64 h-24 rounded-lg"
            />
            <p className="text-xs text-white bg-neutral-800 bg-opacity-70 absolute bottom-0 rounded-full m-1 w-8 text-center">
              {item?.duration}
            </p>
          </div>
        </a>
      ) : null}
      <div className="flex flex-col justify-between w-full">
        <h2 className="text-md max-w-sm text-blue-300 hover:text-blue-400 transition-all">
          <a href={item?.link} target="_blank" rel="noreferrer">
            {item?.title}
          </a>
        </h2>
        <div className="flex flex-wrap">
          {extensions.map((extension, index) => (
            <p
              key={extension}
              className={`${
                index === extensions.length - 1 ? "basis-full" : ""
              } text-sm text-gray-300`}
            >{`${extension} `}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoMobileCard;
