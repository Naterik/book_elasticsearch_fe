import React from "react";
import { Outlet } from "react-router";
import AppHeader from "./layout/app.header";

const Layout = () => {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default Layout;
