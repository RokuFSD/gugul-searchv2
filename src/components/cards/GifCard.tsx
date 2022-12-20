import React, { memo } from "react";
import { GifSearch } from "../../services/Gifs";

type GifCardProps = {
  gif: GifSearch;
};

function GifCard({ gif }: GifCardProps) {
  return (
    <div>
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        loading="lazy"
        width={gif.images.fixed_height.width}
        height={gif.images.fixed_height.height}
        title={gif.title}
        data-testid="gif-card"
      />
    </div>
  );
}

export default memo(GifCard);
