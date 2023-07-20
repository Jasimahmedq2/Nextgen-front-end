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
  console.log({searchResults})

  return (
    <div className="sm:h-screen bg-base-100 py-2 overflow-auto">
  
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
      <ul className="space-y-4 grid grid-cols-3 sm:grid-cols-1 gap-2">
        {searchResults?.map((user: any) => (
          <UserItem key={user._id} user={user} onStartChat={onStartChat} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
