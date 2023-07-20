/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/MessageList.tsx
import React from "react";
import { useGetMessagesQuery } from "../../redux/features/message/messageApiSlice";

const MessageList: React.FC<{
  senderId: string | null;
  receiverId: string;
}> = ({ senderId, receiverId }) => {
  const { data: messages, isLoading } = useGetMessagesQuery(
    {
      senderId,
      receiverId,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 2000,
    }
  );

  console.log({ messageData: messages?.data });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="border rounded-lg border-gray-300 p-4 h-96 overflow-y-auto">
      {messages &&
        messages?.data.map((message: any) => (
          <div
            key={message._id}
            className={`mb-2 overflow-x-hidden space-y-4 ${
              message?.sender?._id === senderId ? "text-right   flex justify-end " : "text-left flex justify-start"
            }`}
          >
            <p className="text-sm">
              {message?.sender?._id === senderId
                ? "You:"
                : `${message?.sender?.name?.firstName}:`}
            </p>
            <p
              className={`p-2 rounded-lg  ${
                message?.sender?._id === senderId
                  ? "bg-blue-500 text-white max-w-md "
                  : "bg-gray-200 text-black max-w-md"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
