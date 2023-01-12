import React, { Dispatch, memo, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GifInnerProps = {
  show: boolean;
  setCurrent: Dispatch<SetStateAction<boolean>>;
};

function GifInner({ show, setCurrent }: GifInnerProps) {
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
            <motion.button
              type="button"
              animate={{ backgroundColor: "rgb(134 239 172)" }}
              whileFocus={{
                backgroundColor: ["#50da50", "#91d08a"],
                transition: {
                  duration: 1,
                  repeatType: "reverse",
                  repeat: Infinity,
                },
              }}
              className="overflow-hidden bg-green-300 rounded-full w-12 h-12 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onFocus={() => setCurrent(true)}
            >
              Share
            </motion.button>
            <motion.button
              animate={{ backgroundColor: "rgb(134 239 172)" }}
              whileFocus={{
                backgroundColor: ["#50da50", "#91d08a"],
                transition: {
                  duration: 1,
                  repeatType: "reverse",
                  repeat: Infinity,
                },
              }}
              type="button"
              className="overflow-hidden bg-green-300 rounded-full w-12 h-12 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onFocus={() => setCurrent(true)}
            >
              Go To
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(GifInner);
