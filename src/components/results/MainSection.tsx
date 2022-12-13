import React from "react";
import { ResponseType } from "../../types/api";

type MainSectionProps = {
  data: ResponseType["data"]["organic_results"];
}

function MainSection({ data }: MainSectionProps) {
  return (
    <div className="flex flex-col gap-10 w-full lg:max-w-xl">
      {data?.map((item, index) => (
        <div key={item.link} className="flex flex w-full items-center gap-4">
          <div className="w-full">
            <span className="text-xs text-gray-400">{item.displayed_link}</span>
            <h2 className="text-lg text-blue-300 hover:text-blue-400 transition-all">
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </h2>
            <p className="text-md overflow-hidden overflow-ellipsis line-clamp-2 lg:line-clamp-5">{item.snippet}</p>
          </div>
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 rounded-lg md:w-24 md:h-24" />) : null}
        </div>
      ))}
    </div>
  );
}

export default MainSection;
