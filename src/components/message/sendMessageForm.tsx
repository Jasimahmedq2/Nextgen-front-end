/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
// src/components/SendMessageForm.tsx
import React, { useState } from "react";
import { useCreateMessageMutation } from "../../redux/features/message/messageApiSlice";
import { useAppSelector } from "@/redux/hooks";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";

const SendMessageForm: React.FC<{
  senderId: string | null;
  receiverId: string;
}> = ({ senderId, receiverId }) => {
  const [content, setContent] = useState("");
  const { isDark } = useAppSelector((state) => state.user);

  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");

  const handleSelectEmoji = (e: { unified: any; native: any }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el: string) => codeArray.push(parseInt(el, 16)));
    let emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  };

  const [sendMessage, { isLoading }] = useCreateMessageMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({
        sender: senderId,
        receiver: receiverId,
        content: text,
      });
      setText("");
      setShowPicker(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  return (
    <div
      className={` fixed bottom-0 w-full ${
        isDark ? "bg-[#253C42]" : "bg-white"
      } p-6 shadow-lg`}
    >
      <form onSubmit={handleSubmit} className="">
        <div className={`flex items-center ${isDark ? " text-black" : ""} `}>
          {/* emojis */}
          <div className="flex justify-end items-center mr-4">
            <details className="dropdown dropdown-top">
              <summary
                onClick={() => setShowPicker(!showPicker)}
                className="m-1 btn"
              >
                <span className="hover:cursor-pointer flex justify-center items-center sm:text-2xl text-orange-400 hover:text-slate-300">
                  <BsEmojiSmile />
                </span>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box">
                <li>
                  {showPicker && (
                    <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                  )}
                </li>
              </ul>
            </details>
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="py-4 w-1/2 px-3 rounded-l-lg border-2 border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Message..."
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-r-lg focus:outline-none"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessageForm;
