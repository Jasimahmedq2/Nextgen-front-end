/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/ChatRoom.tsx
import { useGetAllUserQuery } from "@/redux/features/auth/userApi";
import React from "react";
import MessageList from "./messageList";
import SendMessageForm from "@/components/message/sendMessageForm";

const ChatRoom: React.FC<{ senderId: string | null; receiverId: string }> = ({
  senderId,
  receiverId,
}) => {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);

  if (!users || isLoading) return <div>Loading...</div>;

  const receiver = users?.data.find(
    (user: { _id: string }) => user._id === receiverId
  );
  if (!receiver) return <div>Receiver not found</div>;

  return (
    <div className="container mx-auto py-4 px-4">
      <h3 className="text-2xl font-bold mb-4">
        Chat with {receiver.name.firstName}
      </h3>
      <MessageList senderId={senderId} receiverId={receiverId} />
      <SendMessageForm senderId={senderId} receiverId={receiverId} />
    </div>
  );
};

export default ChatRoom;
