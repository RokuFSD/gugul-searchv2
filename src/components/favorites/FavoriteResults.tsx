/* eslint-disable no-underscore-dangle */
import React, { cloneElement } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/store";
import { getSelector, selectors } from "../../redux/features/auth/authSlice";
import NoResults from "../placeholders/NoResults";
import componentSelector, { FavoriteComponents } from "../../utils/components";

function FavoriteResults() {
  const { type } = useParams();
  const selector = getSelector(type || "results", selectors);
  const results = useAppSelector(selector);
  const component = componentSelector(type || "results", FavoriteComponents);

  if (results.length < 1) {
    return <NoResults from="favorites" />;
  }
  return (
    <>
      {results.map((result) =>
        cloneElement(component, { item: result.data, key: result._id })
      )}
    </>
  );
}

export default FavoriteResults;
