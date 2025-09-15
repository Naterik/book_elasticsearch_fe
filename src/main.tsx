import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import About from "./pages/client/About.tsx";
import Home from "./pages/client/Home.tsx";
import Layout from "./layout.tsx";
import AboutPage from "./pages/client/About.tsx";
import HomePage from "./pages/client/Home.tsx";
import BookPage from "./pages/client/Book.tsx";
import LoginPage from "./pages/client/auth/Login.tsx";
import RegisterPage from "./pages/client/auth/Register.tsx";
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
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
