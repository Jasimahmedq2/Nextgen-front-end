/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// src/components/UserList.tsx
import React, { useState, useEffect, SetStateAction } from "react";
import UserItem from "./userItem";
import { IUser } from "@/interfaces/user/userInteface";
import { BsSearch } from "react-icons/bs";
import { useAppSelector } from "@/redux/hooks";

interface UserListProps {
  users: {
    _id: string;
    name: { firstName: string; lastName: string };
    profilePic: string;
    email: string;
  }[];
  onStartChat: (receiverId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);

  const { isDark } = useAppSelector((state) => state.user);

  useEffect(() => {
    const filteredResults = users?.filter((user) =>
      `${user?.name?.firstName} ${user?.name?.lastName} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [users, searchTerm]);

  const handleSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };
  console.log({ searchResults });

  return (
    <div
      className={`${
        isDark ? "bg-[#253C42] text-white" : "bg-base-100"
      }  py-2 sm:w-80 h-screen sticky top-0 bottom-0 left-0 overflow-auto`}
    >
      <div
        className={`flex items-center space-x-2 ${
          isDark ? "bg-[#15292B]" : "bg-base-200"
        }  p-2 shadow-sm rounded-lg`}
      >
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          className={`focus:outline-0 ${
            isDark ? "bg-[#15292B]" : "bg-base-200"
          } `}
          onChange={handleSearch}
        />
      </div>
      <ul className="space-y-4 grid sm:grid-cols-1 gap-2">
        {searchResults?.map((user: any) => (
          <UserItem key={user._id} user={user} onStartChat={onStartChat} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
