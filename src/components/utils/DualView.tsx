/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import selectView from "../../router/pages/services/selectView";

type DualViewProps = {
  first: JSX.Element;
  second: JSX.Element;
};

type Views = {
  first: {
    element: JSX.Element;
    next: () => Views["second"];
  };
  second: {
    element: JSX.Element;
    next: () => Views["first"];
  };
};

function makeViews({
  firstElement,
  secondElement,
}: {
  firstElement: JSX.Element;
  secondElement: JSX.Element;
}): Views {
  const resultViews: Views = {
    first: {
      element: firstElement,
      next() {
        return resultViews.second;
      },
    },
    second: {
      element: secondElement,
      next() {
        return resultViews.first;
      },
    },
  };
  return resultViews;
}

function DualView({ first, second }: DualViewProps) {
  const views = useMemo(
    () => makeViews({ firstElement: first, secondElement: second }),
    []
  );

  const [currentView, setCurrentView] = useState(views.first);
  const subscription = selectView.getSubject();

  subscription.subscribe((value) => {
    if (value) {
      setCurrentView((prev) => prev.next());
    }
  });

  return currentView.element;
}

export default DualView;
