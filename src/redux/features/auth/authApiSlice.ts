/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { json } from "stream/consumers";
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
    forgetRequest: builder.mutation({
      query: (email) => ({
        url: `/auth/reset-password-request`,
        method: "POST",
        body: { email: email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAllUserQuery,
  useForgetRequestMutation,
  useResetPasswordMutation,
} = authApi;
