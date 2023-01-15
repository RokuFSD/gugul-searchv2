/* eslint-disable no-underscore-dangle */
import React, { cloneElement, memo, ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";
import { Favorite, Results } from "../../types/api";
import {
  addFavorite,
  removeFavorite,
  selectById,
  isAnyUser,
} from "../../redux/features/auth/authSlice";
import UserService from "../../services/User";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/store";
import { RootState } from "../../redux/app/store";
import { GifSearch } from "../../services/Gifs";

type FavoriteWrapperProps = {
  // eslint-disable-next-line react/require-default-props
  item?: Results | GifSearch;
  children: ReactNode;
  type: Favorite["card_type"];
};

function FavoriteWrapper({ item, children, type }: FavoriteWrapperProps) {
  const dispatch = useAppDispatch();
  const id = type === "gif" ? (item as GifSearch).id : (item?.title as string);
  const isFavorite = useAppSelector((state: RootState) =>
    selectById(state, id as string)
  );

  const user = useAppSelector(isAnyUser);

  async function handleClick() {
    if (!item) return;
    const itemWithId = {
      _id: id,
      card_type: type,
      data: { ...item },
    };
    try {
      if (!isFavorite) {
        dispatch(addFavorite(itemWithId));
        await UserService.addFavorite(itemWithId);
      } else {
        dispatch(removeFavorite(itemWithId._id));
        await UserService.removeFavorite(itemWithId._id as string);
      }
    } catch (e) {
      // Undo the change if the request fails
      if (isFavorite) {
        dispatch(removeFavorite(itemWithId._id));
      } else {
        dispatch(addFavorite(item));
      }
    }
  }

  return (
    <div
      className={`flex group items-center ${
        type === "gif" ? "gap-2" : "gap-8"
      }`}
    >
      {cloneElement(children as ReactElement, { item })}
      <button
        type="button"
        onClick={handleClick}
        className={`${!user && "hidden"} left-full`}
      >
        {/* Shake effect */}
        <motion.svg
          whileHover={
            isFavorite
              ? { scale: 1.2, fill: "#ec4796", stroke: "#ec4796" }
              : {
                  scale: 1.2,
                  fill: "#aaa",
                  stroke: "#aaa",
                }
          }
          whileTap={{
            rotate: [0, 10, -10, 10, -10, 10, -10, 10, -10, 0],
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill={`${isFavorite ? "#ec4796" : "#aaa"}`}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={`${isFavorite ? "#ec4796" : "#aaa"}`}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </motion.svg>
      </button>
    </div>
  );
}

export default memo(FavoriteWrapper);
