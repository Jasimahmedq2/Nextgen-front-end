/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/components/MessageList.tsx
import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useGetMessagesQuery } from "../../redux/features/message/messageApiSlice";

const MessageList: React.FC<{
  senderId: string | null;
  receiverId: string;
}> = ({ senderId, receiverId }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: messages, isLoading } = useGetMessagesQuery({
    senderId,
    receiverId,
  });

  console.log({ messageData: messages?.data });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      ref={chatContainerRef}
      className="p-4 sm:w-full lg:max-h-[400px] xl:max-h-[500px]  2xl:max-h-[700px] overflow-y-auto overflow-hidden "
    >
      {messages &&
        messages?.data.map((message: any) => (
          <div
            className={` chat ${
              message?.sender?._id === senderId ? "chat-end " : "chat-start "
            }`}
          >
            <div className="chat-header">
              {message?.sender?._id === senderId
                ? "You:"
                : `${message?.sender?.name?.firstName}:`}
              <time className="ml-1 text-xs opacity-50">
                {moment(message?.createdAt).fromNow()}
              </time>
            </div>
            <div
              className={`chat-bubble ${
                message?.sender?._id === senderId ? " chat-bubble-primary" : ""
              }`}
            >
              {message.content}
            </div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>

          // <div
          //   key={message._id}
          //   className={`mb-2 overflow-x-hidden space-y-4 ${
          //     message?.sender?._id === senderId
          //       ? "text-right   flex justify-end "
          //       : "text-left flex justify-start"
          //   }`}
          // >
          //   <p className="text-sm">
          //     {message?.sender?._id === senderId
          //       ? "You:"
          //       : `${message?.sender?.name?.firstName}:`}
          //   </p>
          //   <p
          //     className={`p-2 rounded-lg  ${
          //       message?.sender?._id === senderId
          //         ? "bg-blue-500 text-white max-w-md "
          //         : "bg-gray-200 text-black max-w-md"
          //     }`}
          //   >
          //     {message.content}
          //   </p>
          // </div>
        ))}
    </div>
  );
};

export default MessageList;
