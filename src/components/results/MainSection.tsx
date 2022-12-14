import React from "react";
import { ResponseType } from "../../types/api";
import ResultCard from "../cards/ResultCard";

type MainSectionProps = {
  data: ResponseType["data"]["organic_results"];
}

function MainSection({ data }: MainSectionProps) {
  return (
    <div className="order-2 flex flex-col gap-10 w-full max-w-xl">
      {data?.map((item, index) => (
        <ResultCard item={item} key={item.link} />
      ))}
    </div>
  );
}

export default MainSection;
