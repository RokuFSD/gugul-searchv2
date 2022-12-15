import React, { cloneElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewResult, Results, VideoResult } from "../../types/api";

type MainSectionProps = {
  data: Results[] | NewResult[] | VideoResult[];
  element: JSX.Element
}

function MainSection({ data, element }: MainSectionProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .4 }}
        className="order-2 flex flex-col gap-6 w-full max-w-2xl">
        {data?.map((item) => (
          cloneElement(element, { item, key: item.link })
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default MainSection;
