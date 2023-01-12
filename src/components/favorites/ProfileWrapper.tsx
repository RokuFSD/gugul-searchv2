/* eslint-disable */
import React, { cloneElement, ReactElement, ReactNode } from "react";
import { useAppDispatch } from "../../redux/hooks/store";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/auth/authSlice";
import UserService from "../../services/User";
import { GifSearch } from "../../services/Gifs";
import { motion } from "framer-motion";

type ProfileWrapperProps = {
  item?: GifSearch;
  children: ReactNode;
};

const variants = {
  show: {
    x: 0,
  },
  hidden: {
    x: -100,
  },
};

function ProfileWrapper({ item, children }: ProfileWrapperProps) {
  const dispatch = useAppDispatch();

  async function handleClick() {
    const id = item?.id || item?.title;
    const itemWithData = {
      _id: id,
      card_type: "gif" as const,
      data: { ...item },
    };
    try {
      dispatch(removeFavorite(itemWithData._id!));
      await UserService.removeFavorite(itemWithData._id!);
    } catch (e) {
      dispatch(addFavorite(itemWithData));
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileHover="show"
      className="flex group gap-4 items-start group relative z-0 md:w-max"
    >
      {cloneElement(children as ReactElement, { item })}
      <motion.button
        type="button"
        onClick={handleClick}
        className="justify-end flex absolute left-full rounded-r-full bg-zinc-800 mt-4 bg-opacity-80 w-10 z-10"
        title="Remove from favorites"
        variants={variants}
        whileFocus={{
          x: 0,
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
            stroke: "#d71818",
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

export default ProfileWrapper;
