import React from "react";
import { HeaderImage } from "../../types/api";

type HeaderImagesCardProps = {
  data: HeaderImage[];
}

function HeaderImagesCard({ data }: HeaderImagesCardProps) {
  return (
    <div className="flex flex-wrap rounded overflow-hidden border border-gray-400 max-w-xs xl:max-w-sm">
      {data.map((image, index) => (
        <div key={image.source} className={`${index % 2 !== 0 ? "w-5/12" : "w-7/12"}`}>
          <img src={image.image} alt="example" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export default HeaderImagesCard;
