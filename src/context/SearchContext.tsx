/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  MutableRefObject
} from "react";
import { useSearchParams } from "react-router-dom";

type ISearchContext = {
  query: string;
  page: number;
};

type ISearchContextActions = {
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
};

const searchContext = createContext<ISearchContext>({ query: "", page: 1 });
const searchContextAction = createContext<ISearchContextActions>(
  {} as ISearchContextActions
);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q");
  const initialPage = searchParams.get("page");

  const [query, setQuery] = useState<string>(initialQuery || "");
  const [page, setPage] = useState<number>(parseInt(initialPage || "1", 10));

  useEffect(() => {
    const newQuery = searchParams.get("q");
    const newPage = searchParams.get("page");
    setPage(parseInt(newPage || "1", 10));
    setQuery(newQuery || "");
  }, [searchParams]);

  const valueQuery = useMemo(() => ({ query, page }), [query, page]);
  const setValueQuery = useCallback(
    (newQuery: string) => setQuery(newQuery),
    []
  );
  const setValuePage = useCallback((newPage: number) => setPage(newPage), []);
  const actions = useMemo(
    () => ({ setQuery: setValueQuery, setPage: setValuePage }),
    []
  );

  return (
    <searchContext.Provider value={valueQuery}>
      <searchContextAction.Provider value={actions}>
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
    context
  };
};
export const useSearchContextAction = () => useContext(searchContextAction);
