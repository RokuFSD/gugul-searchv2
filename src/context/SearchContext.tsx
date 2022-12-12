import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useCallback,
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

export const useSearchContext = () => useContext(searchContext);
export const useSearchContextAction = () => useContext(searchContextAction);
