// src/components/UserItem.tsx
import React from "react";

interface UserItemProps {
  user: { _id: string; name: { firstName: string; lastName: string } };
  onStartChat: (receiverId: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onStartChat }) => {
  return (
    <li>
      {user.name.firstName} {user.name.lastName}{" "}
      <button onClick={() => onStartChat(user._id)}>Start Chat</button>
    </li>
  );
};

export default UserItem;
