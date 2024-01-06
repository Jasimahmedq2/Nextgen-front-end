/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/MainComponent.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import UserList from "./userList";
import ChatRoom from "./chatRoom";
import { useGetChatUserQuery } from "@/redux/features/auth/userApi";
import { setSelectUser } from "@/redux/features/auth/authSlice";

const MainComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loginUser, selectUser } = useAppSelector((state) => state.user);

  const { data: users, isLoading } = useGetChatUserQuery(undefined);

  if (isLoading) {
    return <p>loading...</p>;
  }

  console.log({ userData: users?.data });

  const handleStartChat = (receiverId: string) => {
    dispatch(setSelectUser(receiverId));
  };

  return (
    <div>
      <div className="w-full sm:flex space-x-60">
        {users?.data && (
          <UserList users={users?.data} onStartChat={handleStartChat} />
        )}
        {selectUser && (
          <ChatRoom
            senderId={loginUser?.userId as string}
            receiverId={selectUser}
          />
        )}
        {!selectUser && users?.data?.length > 0 && (
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
