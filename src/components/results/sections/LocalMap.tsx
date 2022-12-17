import React from "react";
import { ResponseType } from "../../../types/api";

type LocalMapProps = {
  data: ResponseType["data"]["local_map"];
};

function LocalMap({ data }: LocalMapProps) {
  return (
    <div className="w-full lg:max-w-xl">
      <h2 className="text-xl font-semibold">Sites</h2>
      <a href={data.link}>
        <img
          src={data.image}
          alt="map"
          className="rounded-xl w-full object-cover"
        />
      </a>
    </div>
  );
}

export default LocalMap;

