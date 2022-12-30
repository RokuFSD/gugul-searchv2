import React, { ReactNode, useMemo, useState } from "react";

type DualViewProps = {
  first: ReactNode;
  second: ReactNode;
};

type Views = {
  first: {
    element: ReactNode;
    next: () => Views["second"];
  };
  second: {
    element: ReactNode;
    next: () => Views["first"];
  };
};

function makeViews({
  firstElement,
  secondElement,
}: {
  firstElement: ReactNode;
  secondElement: ReactNode;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [currentView, setCurrentView] = useState(views.first);
  return (
    <>
      {currentView.element}
      <button
        type="button"
        onClick={() => setCurrentView((prev) => prev.next())}
      >
        Toggle View
      </button>
    </>
  );
}

export default DualView;
