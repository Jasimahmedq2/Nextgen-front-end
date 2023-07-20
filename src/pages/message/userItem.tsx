/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/UserItem.tsx
import React from "react";

interface UserItemProps {
  user: {
    profilePic: string;
    _id: string;
    name: { firstName: string; lastName: string };
  };
  onStartChat: (receiverId: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onStartChat }) => {
  return (
    <li className="hover:cursor-pointer" onClick={() => onStartChat(user?._id)}>
      <div className="sm:flex border sm:border-none sm:items-center sm:space-x-4 py-2 px-1 sm:px-4 rounded-lg">
        <label className="btn btn-circle avatar">
          <div className="w-10  rounded-full">
            <img
              src={
                user?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="suggested img"
            />
          </div>
        </label>
        <h4 className="text-sm sm:text-lg font-bold">
          {user?.name?.firstName + " " + user?.name?.lastName}
        </h4>
      </div>
    </li>
  );
};

export default UserItem;
