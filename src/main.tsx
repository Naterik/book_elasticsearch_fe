import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Layout from "./layout.tsx";
import AboutPage from "./pages/client/About.tsx";
import HomePage from "./pages/client/Home.tsx";
import BookPage from "./pages/client/Filter.tsx";
import LoginPage from "./pages/client/auth/Login.tsx";
import RegisterPage from "./pages/client/auth/Register.tsx";

import { AppProvider } from "./components/context/app.context.tsx";
import { Toaster } from "sonner";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "book", Component: BookPage },
    ],
  },
  { path: "login", Component: LoginPage },
  { path: "register", Component: RegisterPage },
]);
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
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
