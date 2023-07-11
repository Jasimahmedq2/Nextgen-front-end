import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const handleSearch = (e: string) => {
    console.log(e);
  };

  return (
    <div className="navbar bg-base-100 drop-shadow-lg sticky top-0 z-10">
      <div className="flex-1 sm:space-x-6 space-x-4">
        <p className=" normal-case text-sm sm:text-xl">NextGen</p>
        <div className="flex items-center space-x-2 bg-base-200 p-2 shadow-sm rounded-lg">
          <span>
            <BsSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-0 bg-base-200"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="flex hidden sm:block ">
          <div className="form-control w-auto sm:w-52">
            <label className="cursor-pointer label">
              <input type="checkbox" className="toggle toggle-primary" />
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
              <div className="flex block sm:hidden ">
                <div className="form-control w-auto sm:w-52">
                  <label className="cursor-pointer label">
                    <input type="checkbox" className="toggle toggle-primary" />
                  </label>
                </div>
              </div>
            </li>
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
