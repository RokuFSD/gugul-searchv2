import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AuthContext = {
  isLoggedIn: boolean;
};

type AuthContextAction = {
  setIsLoggedIn: (newLoggedValue: boolean) => void;
};

const authContext = createContext<AuthContext>({ isLoggedIn: false });

const authContextAction = createContext<AuthContextAction>(
  {} as AuthContextAction
);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(false);

  const loggedValue = useMemo(() => ({ isLoggedIn: isLogged }), [isLogged]);
  const setLogged = useCallback(
    (newLoggedValue: boolean) => setIsLogged(newLoggedValue),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const action = useMemo(() => ({ setIsLoggedIn: setLogged }), []);

  return (
    <authContext.Provider value={loggedValue}>
      <authContextAction.Provider value={action}>
        {children}
      </authContextAction.Provider>
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
export const useSetAuth = () => useContext(authContextAction);
