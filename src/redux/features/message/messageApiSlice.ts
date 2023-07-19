/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/redux/api/apiSclice";

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ senderId, receiverId }) => ({
        url: `/message/get-message?senderId=${senderId}&receiverId=${receiverId}`,
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["message"],
    }),
    createMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/message/create-message",
        method: "POST",
        body: newMessage,
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
export default messageApi;
