import { Outlet } from "react-router";
import AppHeader from "../components/layout/client/AppHeader";
import AppFooter from "@/components/layout/client/AppFooter";
import { GlobalLoader } from "@/components/Loader";
import { useCurrentApp } from "@/app/providers/app.context";

const ClientLayout = () => {
  const { isLoading } = useCurrentApp();

  return (
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
      <GlobalLoader isVisible={isLoading} />
    </div>
  );
};

export default ClientLayout;
