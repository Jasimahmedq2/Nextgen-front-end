/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BsSearch } from "react-icons/bs";
import { useGetAllUserQuery } from "../../redux/features/auth/userApi";
import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ILoginUser, IUser } from "../../interfaces/user/userInteface";

interface SearchModalProps {
  openSearchModal: any;
  setOpenSearchModal: React.Dispatch<React.SetStateAction<any>>;
}

const SearchModal = ({
  openSearchModal,
  setOpenSearchModal,
}: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data, isLoading, isSuccess } = useGetAllUserQuery(undefined);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const filteredResults = data?.data?.filter((user: IUser) =>
      `${user?.name?.firstName} ${user?.name?.lastName} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [isSuccess, data, searchTerm]);

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative">
      <input type="checkbox" id="search-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-1/3 bg-[#eceef4] sm:w-1/2 max-w-5xl">
          <label
            htmlFor="search-modal"
            className="btn btn-sm btn-circle sticky right-2 top-2"
          >
            ✕
          </label>

          <div className="card flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-100">
            <div className="flex items-center space-x-2 bg-base-200 p-2 shadow-sm rounded-lg">
              <span>
                <BsSearch />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-0 bg-base-200"
                onChange={handleSearch}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-2 font-bold space-y-4">
              <h2 className="text-xl sm:text-2xl ">searched user</h2>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 ">
                {searchResults?.map((suggest: IUser) => {
                  return (
                    <Link
                      to={`/profile/${suggest?._id}`}
                      onClick={() => setOpenSearchModal(null)}
                    >
                      <div className="sm:flex border sm:border-none sm:items-center sm:space-x-4 py-2 px-1 sm:px-4 rounded-lg">
                        <label
                          htmlFor="search-modal"
                          className="btn btn-circle avatar"
                        >
                          <div className="w-10  rounded-full">
                            <img
                              src={
                                suggest?.profilePic ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                              alt="suggested img"
                            />
                          </div>
                        </label>
                        <h4 className="text-sm sm:text-lg font-bold">
                          {suggest?.name?.firstName +
                            " " +
                            suggest?.name?.lastName}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
