/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import SearchModal from "../modal/searchModal";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { darkMode, logOut } from "../../redux/features/auth/authSlice";
import { ILoginUser } from "@/interfaces/user/userInteface";
import { AiOutlineMessage } from "react-icons/ai";
import title1 from "../../assets/images/title1.jpeg";
import title3 from "../../assets/images/title3.jpeg";

const Navbar = () => {
  const [openSearchModal, setOpenSearchModal] = useState<ILoginUser | null>(
    null
  );
  const { loginUser, isLogin, isDark } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chatNavigate = () => {
    navigate("/chat");
  };

  return (
    <>
      <div
        className={`navbar ${
          isDark ? "bg-[#253C42]" : "bg-base-100"
        } drop-shadow-lg sticky top-0 z-10`}
      >
        <div className="flex-1 sm:space-x-6 space-x-4">
          <Link
            to="/"
            className={` normal-case ${
              isDark ? "text-white" : "text-black"
            } text-sm sm:text-xl font-bold`}
          >
            <img
              className="h-16 w-full"
              src={isDark ? title1 : title3}
              alt="NextGen"
            />
          </Link>
          <label
            htmlFor="search-modal"
            className=" hover:cursor-pointer"
            onClick={() => setOpenSearchModal(loginUser)}
          >
            <div
              className={`flex items-center space-x-2  ${
                isDark ? "bg-black text-white" : "bg-base-200"
              } p-2 shadow-sm rounded-lg`}
            >
              <span>
                <BsSearch />
              </span>
              <p
                className={`${
                  isDark ? "text-white bg-black" : "text-black"
                } focus:outline-0 bg-base-200`}
              >
                search
              </p>
            </div>
          </label>
        </div>

        <div className="flex-none gap-2 space-x-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={() => dispatch(darkMode())} />
            {/* sun icon */}

            <svg
              className={`swap-off ${
                isDark ? "text-white" : ""
              } fill-current w-10 h-10`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>

            <svg
              className={`swap-on ${
                isDark ? "text-white" : ""
              } fill-current w-10 h-10`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
          </label>

          <div className="flex ">
            <div className="form-control w-auto sm:w-52">
              <label className=" label">
                <div className="hover:cursor-pointer" onClick={chatNavigate}>
                  <AiOutlineMessage
                    className={`${
                      isDark ? "text-white" : ""
                    } text-xl sm:text-4xl`}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 sm:w-10 rounded-full">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  to={`/profile/${loginUser?.userId}`}
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                {isLogin ? (
                  <Link to="/login" onClick={() => dispatch(logOut())}>
                    Logout
                  </Link>
                ) : (
                  <Link to="/login">login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {setOpenSearchModal && (
        <SearchModal
          openSearchModal={openSearchModal}
          setOpenSearchModal={setOpenSearchModal}
        />
      )}
    </>
  );
};

export default Navbar;
