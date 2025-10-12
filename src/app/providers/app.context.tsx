import React, { createContext, useContext, useState, useCallback } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser) => void;
  loadingCount: number;
  showLoader: () => void;
  hideLoader: () => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const showLoader = useCallback(() => {
    setLoadingCount((prevCount) => prevCount + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  }, []);

  return (
    <CurrentAppContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        loadingCount,
        showLoader,
        hideLoader,
      }}
    >
      {props.children}
    </CurrentAppContext.Provider>
  );
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);
  if (!currentAppContext) {
    throw new Error("useCurrentApp has to be used within a AppProvider");
  }
  return currentAppContext;
};
