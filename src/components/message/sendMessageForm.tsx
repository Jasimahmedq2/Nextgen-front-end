/* eslint-disable @typescript-eslint/no-misused-promises */
// src/components/SendMessageForm.tsx
import React, { useState } from "react";
import { useCreateMessageMutation } from "../../redux/features/message/messageApiSlice";

const SendMessageForm: React.FC<{
  senderId: string | null;
  receiverId: string;
}> = ({ senderId, receiverId }) => {
  const [content, setContent] = useState("");
  const [sendMessage, { isLoading }] = useCreateMessageMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({
        sender: senderId,
        receiver: receiverId,
        content: content,
      });
      setContent("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full py-2 px-3 rounded-l-lg border-2 border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg focus:outline-none"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default SendMessageForm;
