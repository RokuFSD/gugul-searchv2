import React, { cloneElement, memo, ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../redux/hooks/store";
import {
  addFavorite,
  removeFavorite
} from "../../redux/features/auth/authSlice";
import { GifSearch } from "../../services/Gifs";
import UserService from "../../services/User";
import useMediaQuery from "../../hooks/useMediaQuery";
import classSelector from "../../utils/classSelector";

type ProfileWrapperProps = {
  // eslint-disable-next-line react/require-default-props
  item?: GifSearch;
  children: ReactNode;
};

const baseClass = [
  "justify-end",
  "flex",
  "absolute",
  "bg-zinc-800",
  "bg-opacity-80"
];

const classVariants = {
  desktop: [
    "left-full",
    "rounded-r-full",
    "mt-4",
    "w-10",
    "z-10"
  ],
  mobile: [
    "right-0",
    "z-40",
    "rounded-full"
  ]
};

function ProfileWrapper({ item, children }: ProfileWrapperProps) {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const variants = !isMobile ? {
    show: {
      x: 0
    },
    hidden: {
      x: -100
    }
  } : undefined;

  const classes = classSelector(baseClass, classVariants);

  async function handleClick() {
    const id = item?.id || item?.title;
    if (!id) {
      throw new Error("There must be an id!");
    }
    const itemWithData = {
      id,
      card_type: "gif" as const,
      data: { ...item }
    };
    try {
      dispatch(removeFavorite(itemWithData.id));
      await UserService.removeFavorite(itemWithData.id);
    } catch (e) {
      dispatch(addFavorite(itemWithData));
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileHover="show"
      className="flex group gap-4 items-start relative z-0 md:w-max"
    >
      {cloneElement(children as ReactElement, { item })}
      <motion.button
        type="button"
        onClick={handleClick}
        className={classes(isMobile ? "mobile" : "desktop")}
        title="Remove from favorites"
        variants={variants}
        whileFocus={{
          x: 0
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#bbb"
          className="w-8 h-8"
          whileHover={{
            rotate: 360,
            stroke: "#d71818"
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
}

export default memo(ProfileWrapper);
