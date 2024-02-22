import { useContext } from "react";
import { SocketContext } from "./socketInstance";

export const useSocket = () => {
  return useContext(SocketContext);
};
