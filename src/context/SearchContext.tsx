/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  MutableRefObject,
} from "react";
import { useSearchParams } from "react-router-dom";

type ISearchContext = {
  query: string;
};

const searchContext = createContext<ISearchContext>({ query: "" });
const searchContextAction = createContext<(newQuery: string) => void>(() => {});

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [query, setQuery] = useState<string>(initialQuery || "");

  useEffect(() => {
    const newQuery = searchParams.get("q");
    setQuery(newQuery || "");
  }, [searchParams]);

  const valueQuery = useMemo(() => ({ query }), [query]);
  const setValueQuery = useCallback(
    (newQuery: string) => setQuery(newQuery),
    []
  );

  return (
    <searchContext.Provider value={valueQuery}>
      <searchContextAction.Provider value={setValueQuery}>
        {children}
      </searchContextAction.Provider>
    </searchContext.Provider>
  );
}

export const useSearchContext = (ref?: MutableRefObject<HTMLInputElement>) => {
  const context = useContext(searchContext);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const newQuery = searchParams.get("q");
    if (newQuery && ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current.value = newQuery;
    }
  }, [searchParams]);

  return {
    context,
  };
};
export const useSearchContextAction = () => useContext(searchContextAction);
