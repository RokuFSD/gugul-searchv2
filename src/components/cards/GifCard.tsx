import React, { memo, useRef, useState } from "react";
import { GifSearch } from "../../services/Gifs";

type GifCardProps = {
  gif: GifSearch;
};

function GifCard({ gif }: GifCardProps) {
  const [current, setCurrent] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  function handleKeyPress(e: KeyboardEvent | React.KeyboardEvent) {
    // Get focusable childs
    if (e.key !== "Tab" || !cardRef.current) return;
    const focusable = cardRef.current.querySelectorAll("a, button, input");
    // Get the first focusable child
    const firstFocusable = focusable[0] as HTMLElement;
    // Get the last focusable child
    const lastFocusable = focusable[focusable.length - 1] as HTMLElement;
    // Check if the current element is the last focusable element
    if (!e.shiftKey && document.activeElement === lastFocusable) {
      setCurrent(false);
    }
    // Shift tab
    if (e.shiftKey) {
      // If the current element is the first focusable element
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
        return;
      }
      if (document.activeElement === firstFocusable) {
        setCurrent(false);
        e.preventDefault();
        return;
      }

      if (document.activeElement === cardRef.current && current) {
        lastFocusable.focus();
        e.preventDefault();
      }
    }
  }

  // TODO: Make the buttons appear on pointer hover and disappear on pointer out
  return (
    <div
      className={`${
        current && "shadow-blue-200 shadow-md outline-none"
      } w-full md:w-64 h-52 rounded-md overflow-hidden `}
      tabIndex={0}
      onFocus={() => setCurrent(true)}
      role="tablist"
      ref={cardRef}
      onKeyDown={handleKeyPress}
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
        <div
          className={`${
            !current && "hidden"
          } absolute w-full h-full bg-neutral-900 bg-opacity-70 flex items-center justify-center`}
        >
          <div className="flex gap-6">
            <button
              type="button"
              className="overflow-hidden bg-blue-300 bg-opacity-80 rounded-full w-12 h-12"
              onFocus={() => setCurrent(true)}
            >
              Share
            </button>
            <button
              type="button"
              className="overflow-hidden bg-red-300 bg-opacity-80 rounded-full w-12 h-12"
              onFocus={() => setCurrent(true)}
            >
              Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(GifCard);
