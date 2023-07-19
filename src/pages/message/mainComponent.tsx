/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/MainComponent.tsx
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllUserQuery } from "@/redux/features/auth/userApi";
import UserList from "./userList";
import ChatRoom from "./chatRoom";

const MainComponent: React.FC = () => {
  const { loginUser } = useAppSelector((state) => state.user);

  const { data: users, isLoading } = useGetAllUserQuery(undefined);

  useEffect(() => {
    if (!isLoading) {
      return <p>loading...</p>;
    }
  }, [users, isLoading]);

  const [selectedUser, setSelectedUser] = useState<string | null>(
    users?.data?.length > 0 ? users.data[0]._id : null
  );

  const handleStartChat = (receiverId: string) => {
    setSelectedUser(receiverId);
  };

  return (
    <div className="px-4">
      <h2>Hello, {loginUser?.name?.firstName}</h2>
      <div style={{ display: "flex" }}>
        {users && (
          <UserList users={users?.data} onStartChat={handleStartChat} />
        )}
        {selectedUser && (
          <ChatRoom
            senderId={loginUser?.userId as string}
            receiverId={selectedUser}
          />
        )}
        {!selectedUser && users?.data.length > 0 && (
          <ChatRoom
            senderId={loginUser?.userId as string}
            receiverId={users?.data[0]?._id}
          />
        )}
      </div>
    </div>
  );
};

export default MainComponent;
