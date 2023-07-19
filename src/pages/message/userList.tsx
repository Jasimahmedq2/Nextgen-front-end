// src/components/UserList.tsx
import React from "react";
import UserItem from "./userItem";

interface UserListProps {
  users: { _id: string; name: { firstName: string; lastName: string } }[];
  onStartChat: (receiverId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onStartChat }) => {
  return (
    <div className="max-h-screen overflow-auto">
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <UserItem key={user._id} user={user} onStartChat={onStartChat} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
