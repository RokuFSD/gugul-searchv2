import React from "react";
import { GifSearch } from "../../services/Gifs";

type GifCardProps = {
  gif: GifSearch;
};

function GifCard({ gif }: GifCardProps) {
  return (
    <div className="v">
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        loading="lazy"
        width={gif.images.fixed_height.width}
        height={gif.images.fixed_height.height}
        title={gif.title}
      />
    </div>
  );
}

export default GifCard;
