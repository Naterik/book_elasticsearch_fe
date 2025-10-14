import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { AppProvider } from "@/app/providers/app.context";
import { Toaster } from "sonner";
import { AppRouter } from "./app/router";

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
      <AppRouter />
    </AppProvider>
  </StrictMode>
);
