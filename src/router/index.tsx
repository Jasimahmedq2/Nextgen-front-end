import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "../pages/Home";
import App from "../App";
import Login from "../pages/Login/login";
import Register from "../pages/Login/singup";
import Profile from "../pages/profile/profile";
import NotFoundPage from "../pages/notFound";
import MainComponent from "@/pages/message/mainComponent";
import SetPassword from "@/components/resetPassword/setPassword";
import Recovered from "@/components/resetPassword/recoverd";
import ForgetEmail from "@/components/resetPassword/forgetEmail";
import VerifyEmail from "@/pages/verifyEmail";

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
  { path: "/set-password/:token", element: <SetPassword /> },
  { path: "/recovered", element: <Recovered /> },
  { path: "/forget-email", element: <ForgetEmail /> },
  { path: "/verify/:token", element: <VerifyEmail /> },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
