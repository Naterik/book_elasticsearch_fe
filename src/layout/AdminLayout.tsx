import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import AppHeader from "@/components/layout/admin/AppHeader";
import AppFooter from "@/components/layout/admin/AppFooter";
import AppSidebar from "@/components/layout/admin/AppSidebar";
import { fetchAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";
import { GlobalLoader } from "@/components/Loader";

const AdminLayout: React.FC = () => {
  const { setUser, setIsAuthenticated, hideLoader } = useCurrentApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content Wrapper */}
      <div className="flex flex-col min-h-screen lg:ml-64">
        <AppHeader onMenuClick={handleSidebarToggle} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
        <AppFooter />
      </div>

      <GlobalLoader />
    </div>
  );
};

export default AdminLayout;
