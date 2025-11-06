import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProvider } from "@/app/providers/app.context";
import { Toaster } from "sonner";
import { AppRouter } from "./app/router";
import { NotificationProvider } from "@/app/providers/notification.context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="top-left"
      richColors
      closeButton
      expand
      duration={3000}
      theme="system"
    />
    <AppProvider>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </AppProvider>
  </StrictMode>
);
