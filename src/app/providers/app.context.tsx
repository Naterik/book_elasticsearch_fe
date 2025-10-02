import React, { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};
export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <CurrentAppContext
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </CurrentAppContext>
  );
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error(
      "useCurrentUser has to be used within <currentAppContext.Provider>"
    );
  }

  return currentAppContext;
};
