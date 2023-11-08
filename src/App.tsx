import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./redux/hooks";
import Login from "./pages/Login/login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { isLogin, loginUser, isDark } = useAppSelector((state) => state.user);
  return (
    <div className={`${isDark ? "bg-[#15292B]" : "main-style"}  `}>
      {isLogin && loginUser ? <MainLayout /> : <Login />}

      <ToastContainer />
    </div>
  );
}

export default App;
