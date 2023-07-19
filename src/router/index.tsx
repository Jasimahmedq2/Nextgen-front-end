import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Home";
import App from "../App";
import Login from "../pages/Login/login";
import Register from "../pages/Login/singup";
import Profile from "../pages/profile/profile";
import NotFoundPage from "../pages/notFound";
import MainComponent from "@/pages/message/mainComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "/profile/:userId", element: <Profile /> },
      { path: "/chat", element: <MainComponent /> },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
