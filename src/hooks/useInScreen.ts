import { useState, useEffect, RefObject } from "react";

function useInScreen(ref: RefObject<HTMLElement>) {
  const [inScreen, setInScreen] = useState(false);
  const element = ref.current;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInScreen(entry.isIntersecting);
      },
      { threshold: 0.5, root: null, rootMargin: "0px" }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, ref]);
  return inScreen;
}

export default useInScreen;
