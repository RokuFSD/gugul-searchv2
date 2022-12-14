import React, { useState } from "react";
import { ResponseType } from "../../types/api";
import HeaderImagesCard from "../cards/HeaderImagesCard";
import AsideDetails from "./AsideDetails";
import ArrowSvg from "../svgs/ArrowSvg";

type AsideSectionProps = {
  data: ResponseType["data"]["knowledge_graph"];
}

const stateMachine = {
  open: {
    next: "closed"
  },
  closed: {
    next: "open"
  }
} as const;

function AsideSection({ data }: AsideSectionProps) {
  const [dataState, setDataState] = useState<"closed" | "open">("closed");
  const { header_images: headerImages, title, description, type, source, ...rest } = data;
  const { link, name } = source as { link: string, name: string };
  return (
    <aside
      className="relative md:flex md:flex-wrap lg:block order-1 lg:order-2 shadow-xl lg:shadow-none rounded-lg p-2 md:w-full lg:w-auto">
      {headerImages && <HeaderImagesCard data={headerImages} />}
      <div
        data-state={dataState}
        className="md:w-96 lg:w-auto lg:max-w-lg relative md:basis-1/2 md:mx-5 lg:mx-0">
        <a href={link} target="_blank" rel="noreferrer">
          <h1 className="text-2xl font-semibold xl:text-3xl">{title}</h1>
          <p className="text-sm md:text-base xl:text-lg">{description}</p>
        </a>
        <p className="italic text-gray-300">Source: {name}</p>
      </div>
      <AsideDetails data={rest} />
      <button className="w-full flex flex-col items-center md:top-full lg:hidden md:basis-full" type="button"
              onClick={() => setDataState((prev) => stateMachine[prev].next)}>
        {dataState === "closed" ? "Show more" : "Show less"}
        <span className="animate-bounce block basis-full">
          <ArrowSvg rotate={dataState === "closed" ? 0 : 180} />
        </span>
      </button>
    </aside>
  );
}

export default AsideSection;
