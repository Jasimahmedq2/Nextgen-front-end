/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// SocketContext.js
import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: any }) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log({ msg });
      setMessages((prevMessages: any) => [...prevMessages, msg]);
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
