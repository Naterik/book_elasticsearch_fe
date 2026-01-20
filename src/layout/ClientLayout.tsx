import { useCurrentApp } from "@/app/providers/app.context";
import AppFooter from "@/components/layout/client/AppFooter";
import { GlobalLoader } from "@/components/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router";
import AppHeader from "../components/layout/client/AppHeader";

const ClientLayout = () => {
  const { isLoading } = useCurrentApp();

  return (
    <div>
      <AppHeader />
      <main>
        <Suspense fallback={<GlobalLoader isVisible={true} />}>
          <Outlet />
        </Suspense>
      </main>
      <AppFooter />
      <GlobalLoader isVisible={isLoading} />
    </div>
  );
};

export default ClientLayout;
