import React, { cloneElement } from "react";
import { NewResult, Results, VideoResult } from "../../types/api";

type MainSectionProps = {
  data: Results[] | NewResult[] | VideoResult[];
  element: JSX.Element
}

function MainSection({ data, element }: MainSectionProps) {
  return (
    <div className="order-2 flex flex-col gap-6 w-full max-w-2xl">
      {data?.map((item) => (
        cloneElement(element, { item, key: item.link })
      ))}
    </div>
  );
}

export default MainSection;
