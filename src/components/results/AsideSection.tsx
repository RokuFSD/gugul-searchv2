import React from "react";
import { ResponseType } from "../../types/api";
import HeaderImagesCard from "../cards/HeaderImagesCard";

type AsideSectionProps = {
  data: ResponseType["data"]["knowledge_graph"];
}

function AsideSection({ data }: AsideSectionProps) {
  return (
    <aside className="md:flex lg:block order-1 lg:order-2 shadow-xl lg:shadow-none rounded-lg p-2 md:w-full lg:w-auto md:justify-around">
      {data?.header_images && <HeaderImagesCard data={data.header_images} />}
      <div className="md:w-96 lg:w-auto lg:max-w-lg">
        <h1 className="text-2xl font-semibold xl:text-3xl">{data?.title}</h1>
        <p className="text-sm md:text-base xl:text-lg">{data?.description}</p>
      </div>
    </aside>
  );
}

export default AsideSection;
