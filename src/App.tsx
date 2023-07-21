import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./redux/hooks";
import Login from "./pages/Login/login";

function App() {
  const { isLogin, isDark } = useAppSelector((state) => state.user);
  return (
    <div className={`${isDark ? "bg-[#15292B]" : "main-style"}  `}>
      {isLogin ? <MainLayout /> : <Login />}

      <ToastContainer />
    </div>
  );
}

export default App;
