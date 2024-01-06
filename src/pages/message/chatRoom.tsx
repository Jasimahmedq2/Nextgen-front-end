/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/ChatRoom.tsx
import { useGetAllUserQuery } from "@/redux/features/auth/userApi";
import React from "react";
import MessageList from "./messageList";
import SendMessageForm from "@/components/message/sendMessageForm";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const ChatRoom: React.FC<{ senderId: string | null; receiverId: string }> = ({
  senderId,
  receiverId,
}) => {
  const navigate = useNavigate();
  const { data: users, isLoading } = useGetAllUserQuery(undefined);

  const { isDark } = useAppSelector((state) => state.user);

  if (!users || isLoading) return <div>Loading...</div>;

  const receiver = users?.data.find(
    (user: { _id: string }) => user._id === receiverId
  );
  if (!receiver) return <div>Receiver not found</div>;

  return (
    <div className={`${isDark ? "text-white" : ""} w-11/12 px-4`}>
      <div
        className="sm:flex border-b-4 border-gray-300 sm:items-center sm:space-x-4 py-2 px-1 sm:px-4 rounded-lg"
        onClick={() => navigate(`/profile/${receiver?._id}`)}
      >
        <label className="btn btn-circle avatar">
          <div className="w-10  rounded-full">
            <img
              src={
                receiver?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="suggested img"
            />
          </div>
        </label>
        <h4 className="text-sm sm:text-lg font-bold">
          {receiver?.name?.firstName + " " + receiver?.name?.lastName}
        </h4>
      </div>
      <div>
        <MessageList senderId={senderId} receiverId={receiverId} />
      </div>
      <div className="">
        <SendMessageForm senderId={senderId} receiverId={receiverId} />
      </div>
    </div>
  );
};

export default ChatRoom;
