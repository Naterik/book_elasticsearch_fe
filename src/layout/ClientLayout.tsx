import React, { useEffect } from "react";
import { Outlet } from "react-router";
import AppHeader from "../components/layout/client/AppHeader";
import { fetchAPI } from "../services/api";
import { useCurrentApp } from "../app/providers/app.context";
import AppFooter from "@/components/layout/client/AppFooter";
import { GlobalLoader } from "@/components/Loader";
const ClientLayout = () => {
  const { setUser, setIsAuthenticated, hideLoader } = useCurrentApp();
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAPI();
      if (res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
      hideLoader();
    };

    fetchAccount();
  }, []);
  return (
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
      <GlobalLoader />
    </div>
  );
};

export default ClientLayout;
