/* eslint-disable no-underscore-dangle */
import React, { cloneElement, ReactElement, ReactNode } from "react";
import { Favorite, Results } from "../../types/api";
import {
  addFavorite,
  removeFavorite,
  selectById,
} from "../../redux/features/auth/authSlice";
import UserService from "../../services/User";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/store";
import { RootState } from "../../redux/app/store";

type FavoriteWrapperProps = {
  // eslint-disable-next-line react/require-default-props
  item?: Results;
  children: ReactNode;
  type: Favorite["card_type"];
};

// TODO: Make the wrapper does not appear when there is no user logged-in

function FavoriteWrapper({ item, children, type }: FavoriteWrapperProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state: RootState) =>
    selectById(state, item?.title as string)
  );

  async function handleClick() {
    if (!item) return;
    const itemWithId = {
      _id: item?.title,
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
    <div className="flex group relative items-center">
      {cloneElement(children as ReactElement, { item })}
      <button
        type="button"
        onClick={handleClick}
        className={`absolute border w-20 h-20 left-full ${
          isFavorite && "border-pink-400"
        }`}
      >
        Heart
      </button>
    </div>
  );
}

export default FavoriteWrapper;
