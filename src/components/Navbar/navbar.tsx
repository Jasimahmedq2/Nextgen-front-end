/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import SearchModal from "../modal/searchModal";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { ILoginUser } from "@/interfaces/user/userInteface";
import { AiOutlineMessage } from "react-icons/ai";

const Navbar = () => {
  const [openSearchModal, setOpenSearchModal] = useState<ILoginUser | null>(
    null
  );
  const { loginUser, isLogin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chatNavigate = () => {
    navigate('/chat')
  }

  return (
    <>
      <div className="navbar bg-base-100 drop-shadow-lg sticky top-0 z-10">
        <div className="flex-1 sm:space-x-6 space-x-4">
          <Link to="/" className=" normal-case text-sm sm:text-xl">
            NextGen
          </Link>
          <label
            htmlFor="search-modal"
            className=" hover:cursor-pointer"
            onClick={() => setOpenSearchModal(loginUser)}
          >
            <div className="flex items-center space-x-2 bg-base-200 p-2 shadow-sm rounded-lg">
              <span>
                <BsSearch />
              </span>
              <p className="focus:outline-0 bg-base-200">search</p>
            </div>
          </label>
        </div>

        <div className="flex-none gap-2">
          <div className="flex ">
            <div className="form-control w-auto sm:w-52">
              <label className=" label">
                <div
                  className="hover:cursor-pointer"
                  onClick={chatNavigate}
                >
                  <AiOutlineMessage className="text-xl sm:text-4xl" />
                </div>
              </label>
            </div>
          </div>
          {/* <div className="flex-none gap-2">
          <div className="flex hidden sm:block ">
            <div className="form-control w-auto sm:w-52">
              <label className="cursor-pointer label">
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
          </div> */}

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
              {/* <li>
                <div className="flex block sm:hidden ">
                  <div className="form-control w-auto sm:w-52">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                      />
                    </label>
                  </div>
                </div>
              </li> */}

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
