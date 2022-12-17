import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import Spinner from "../svgs/Spinner";

// eslint-disable-next-line react/require-default-props
function VideoPlayer({ src, thumbnail, title }: { src: string, thumbnail?: string, title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const onClose = useCallback(() => setIsOpen(false), []);
  const srcEmbed = src.replace("watch?v=", "embed/");

  function handleLoad() {
    setIsLoading(false);
  }

  const overlay = {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000
  };

  const content = {
    backgroundColor: "transparent",
    border: "none"
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" data-testid="player-button">
        <img src={thumbnail} alt={title}
             className="w-48 h-28 rounded-lg object-fit" />
      </button>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={{ overlay, content }}>
        <div className="flex flex-col gap-8 h-full items-center justify-center">
          <button type="button" onClick={onClose} className="bg-white rounded-full p-2" data-testid="close-button">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
          {isLoading && (
            <div className="z-30 absolute">
              <Spinner />
            </div>
          )}
          <iframe className="z-40 w-[800px] h-[500px] rounded-lg"
                  src={srcEmbed}
                  title={src}
                  onLoad={handleLoad} />
        </div>

      </Modal>
    </>
  );
}

export default VideoPlayer;
