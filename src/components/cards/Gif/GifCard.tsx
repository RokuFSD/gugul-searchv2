import React, { memo, useRef, useState } from "react";
import { GifSearch } from "../../../services/Gifs";
import GifInner from "./GifInner";

type GifCardProps = {
  gif: GifSearch;
};

function GifCard({ gif }: GifCardProps) {
  const [current, setCurrent] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  function handleKeyPress(e: KeyboardEvent | React.KeyboardEvent) {
    if (e.key === "Enter") setCurrent(!current);
    if (e.key === "Escape") setCurrent(false);

    if (e.key !== "Tab" || !cardRef.current) return;

    const focusable = cardRef.current.querySelectorAll("a, button, input");
    // Get the first focusable child
    const firstFocusable = focusable[0] as HTMLElement;
    // Get the last focusable child
    const lastFocusable = focusable[focusable.length - 1] as HTMLElement;

    // Shift tab
    if (e.shiftKey) {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
        return;
      }

      if (document.activeElement === firstFocusable) {
        setCurrent(false);
        return;
      }

      if (document.activeElement === cardRef.current && current) {
        lastFocusable.focus();
        e.preventDefault();
        return;
      }
    }

    if (document.activeElement === lastFocusable) {
      setCurrent(false);
    }
  }

  return (
    <div
      className={`${
        current && "outline-none"
      } w-72 h-72 md:w-64 md:h-64 rounded-md overflow-hidden cursor-pointer`}
      role="tablist"
      ref={cardRef}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onClick={() => setCurrent((prev) => !prev)}
    >
      <div className="grid w-full h-full relative">
        <img
          className="w-full object-fill h-full"
          src={gif.images.fixed_height.url}
          alt={gif.title}
          loading="lazy"
          width={gif.images.fixed_height.width}
          height={gif.images.fixed_height.height}
          title={gif.title}
          data-testid="gif-card"
        />
        <GifInner show={current} setCurrent={setCurrent} />
      </div>
    </div>
  );
}

export default memo(GifCard);
