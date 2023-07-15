import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
