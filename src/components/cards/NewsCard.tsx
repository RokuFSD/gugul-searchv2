import React from "react";
import { NewResult } from "../../types/api";

type NewsCardProps = {
  // eslint-disable-next-line react/require-default-props
  item?: NewResult;
};

function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="flex flex w-full items-center gap-4 z-20 bg-gray-700 max-w-2xl">
      <div className="w-full">
        <span className="text-xs text-gray-400">{item?.source}</span>
        <h2 className="text-lg text-blue-300 hover:text-blue-400 transition-all">
          <a href={item?.link} target="_blank" rel="noreferrer">
            {item?.title}
          </a>
        </h2>
        <p className="text-md overflow-hidden overflow-ellipsis line-clamp-2 lg:line-clamp-5">
          {item?.snippet}
        </p>
        <p className="text-xs text-gray-400">{item?.date}</p>
      </div>
      {item?.thumbnail ? (
        <img
          src={item?.thumbnail}
          alt={item.title}
          className="w-20 h-20 rounded-lg md:w-24 md:h-24"
        />
      ) : null}
    </div>
  );
}

export default NewsCard;
