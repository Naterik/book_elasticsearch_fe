import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { AppProvider } from "@/app/providers/app.context";
import { Toaster } from "sonner";
import { AppRouter } from "./app/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      richColors
      closeButton
      expand
      duration={1000}
      theme="system"
    />
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </StrictMode>
);
