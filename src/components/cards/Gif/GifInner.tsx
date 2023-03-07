import React, { MouseEvent, Dispatch, memo, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import GifButton from "./GifButton";
import { GifSearch } from "../../../services/Gifs";
import DownloadSvg from "../../svgs/DownloadSvg";
import LinkSvg from "../../svgs/LinkSvg";

type GifInnerProps = {
  show: boolean;
  setCurrent: Dispatch<SetStateAction<boolean>>;
  original: GifSearch["images"]["original"]
};

function GifInner({ show, setCurrent, original }: GifInnerProps) {
  async function downloadOriginal() {
    const image = await axios.get(original.url, {
      responseType: "blob"
    });
    const url = URL.createObjectURL(new Blob([image.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Gif.gif");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function handleDownload(e: MouseEvent) {
    e.stopPropagation();
    downloadOriginal();
  }

  function handleLink(e: MouseEvent) {
    e.stopPropagation();
  }


  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className="cursor-default absolute w-full h-full bg-gradient-to-t from-neutral-900  flex items-center justify-center"
        >
          <div className="flex gap-8">
            <GifButton onFocus={() => setCurrent(true)} onClick={(e) => handleDownload(e)}>
              <DownloadSvg />
            </GifButton>
            <GifButton onFocus={() => setCurrent(true)} onClick={(e) => handleLink(e)}>
              <a href={original.url} target="__blank">
                <LinkSvg />
              </a>
            </GifButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(GifInner);
