import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchAPI } from "@/services/api";

interface IAppContext {
  isAuthenticated: boolean | null;
  user: IUser | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  loadingCount: number;
  showLoader: () => void;
  hideLoader: () => void;
  logout: () => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = useCallback(() => {
    setLoadingCount((prevCount) => prevCount + 1);
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  }, []);

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
          // Token is invalid or expired
          logout();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      }
    };

    checkAuth();
  }, [logout]);

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
