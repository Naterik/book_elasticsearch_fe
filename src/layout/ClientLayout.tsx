import { Outlet } from "react-router";
import AppHeader from "../components/layout/client/AppHeader";
import AppFooter from "@/components/layout/client/AppFooter";
import { GlobalLoader } from "@/components/Loader";
const ClientLayout = () => {
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
