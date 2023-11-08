/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { api } from "@/redux/api/apiSclice";

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
          url: "/auth/create-user",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyEmail: builder.mutation({
      query(token) {
        return {
          url: `/auth/verify/${token}`,
          method: "POST",
        };
      },
    }),
    getAllUser: builder.query({
      query: () => ({
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
  useVerifyEmailMutation,
} = authApi;
