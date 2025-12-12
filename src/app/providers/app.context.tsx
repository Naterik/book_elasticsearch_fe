import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchAPI } from "@/lib/api";

interface IAppContext {
  isAuthenticated: boolean | null;
  user: IUser | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  logout: () => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetchAPI();
        if (response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <CurrentAppContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        isLoading,
        setIsLoading,
        logout,
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
