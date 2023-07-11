import Navbar from "./components/Navbar/navbar";
import Index from "./pages/Home";
import Feed from "./pages/Home/feed";
import Login from "./pages/Login/login";
import Register from "./pages/Login/singup";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <div className="main-style">
      <Navbar />
      {/* <Profile /> */}
      {/* <Login /> */}
      <Register />
      {/* <Index /> */}
    </div>
  );
}

export default App;
