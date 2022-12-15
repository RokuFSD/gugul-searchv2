import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import Spinner from "../svgs/Spinner";

function VideoPlayer({ src, thumbnail, title }: { src: string, thumbnail: string, title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const onClose = useCallback(() => setIsOpen(false), []);
  const srcEmbed = src.replace("watch?v=", "embed/");

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        <img src={thumbnail} alt={title}
             className="w-48 h-28 rounded-lg object-fit" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {isLoading && (
          <div className="z-30 absolute">
            <Spinner />
          </div>
        )}
        <iframe className="z-40 w-[800px] h-[500px] rounded-lg"
                src={srcEmbed}
                title={src}
                onLoad={handleLoad} />

      </Modal>
    </>
  );
}

export default VideoPlayer;
