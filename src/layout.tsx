import React, { useEffect } from "react";
import { Outlet } from "react-router";
import AppHeader from "./layout/app.header";
import { fetchAPI } from "./services/api";
import { useCurrentApp } from "./components/context/app.context";
import { DotLoader } from "react-spinners";
const Layout = () => {
  const { setUser, setIsLoading, setIsAuthenticated, isLoading } =
    useCurrentApp();
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAPI();

      if (res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    fetchAccount();
  }, []);
  return (
    <div>
      {!isLoading ? (
        <>
          <AppHeader />
          <Outlet />
        </>
      ) : (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DotLoader size={50} color="#078EF5" />
        </div>
      )}
    </div>
  );
};

export default Layout;
