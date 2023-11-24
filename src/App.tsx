import MainLayout from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Login from "./pages/Login/login";
import { jwtDecode } from "jwt-decode";
import { logOut } from "./redux/features/auth/authSlice";

function App() {
  const { isLogin, loginUser, isDark, accessToken } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  const token = accessToken;
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp! < Date.now() / 1000) {
      dispatch(logOut());
    }
  }

  return (
    <div className={`${isDark ? "bg-[#15292B]" : "main-style"}  `}>
      {isLogin && loginUser ? <MainLayout /> : <Login />}

      <ToastContainer />
    </div>
  );
}

export default App;
