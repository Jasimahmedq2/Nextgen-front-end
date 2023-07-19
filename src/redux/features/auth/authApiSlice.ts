/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSclice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),
    registerUser: builder.mutation({
      query(data) {
        return {
          url: "/users/create-user",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllUser: builder.query({
      query: (data) => ({
        url: `/users/get-users`,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAllUserQuery,
} = authApi;
