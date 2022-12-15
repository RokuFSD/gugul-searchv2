import React from "react";

type ResultCardProps = {
  // eslint-disable-next-line react/require-default-props
  item?: {
    title: string;
    displayed_link: string;
    link: string;
    thumbnail: string;
    snippet: string;
  }
}

function ResultCard({ item }: ResultCardProps) {
  return (
    <div className="flex flex w-full items-center gap-4">
      <div className="w-full">
        <span className="text-xs text-gray-400">{item?.displayed_link}</span>
        <h2 className="text-lg text-blue-300 hover:text-blue-400 transition-all">
          <a href={item?.link} target="_blank" rel="noreferrer">
            {item?.title}
          </a>
        </h2>
        <p className="text-md overflow-hidden overflow-ellipsis line-clamp-2 lg:line-clamp-5">{item?.snippet}</p>
      </div>
      {item?.thumbnail ? (
        <img src={item?.thumbnail} alt={item.title} className="w-20 h-20 rounded-lg md:w-24 md:h-24" />) : null}
    </div>
  );
}

export default ResultCard;
