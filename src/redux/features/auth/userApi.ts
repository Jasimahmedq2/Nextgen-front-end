/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IUser } from "../../../interfaces/user/userInteface";
import { api } from "../../api/apiSclice";
import { setUser } from "./authSlice";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "/users/get-user",
          credentials: "include",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["posts"],
    }),
    getAllUser: builder.query({
      query() {
        return {
          url: "/users/get-users",
          credentials: "include",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["posts"],
    }),
    profileUser: builder.query<IUser, null>({
      query(userId) {
        return {
          url: `/users/get-user/${userId}`,
          credentials: "include",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["posts"],
    }),
    getFriends: builder.query<IUser, null>({
      query() {
        return {
          url: "/users/get-friends",
          credentials: "include",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["posts"],
    }),
    suggestedFriends: builder.query({
      query() {
        return {
          url: "/users/get-suggestedFriends",
          credentials: "include",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["posts"],
    }),
    followingUser: builder.mutation({
      query(userId) {
        return {
          url: `/users/follow/${userId}`,
          credentials: "include",
          method: "POST",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: ["posts"],
    }),
    unFollowingUser: builder.mutation({
      query(userId) {
        return {
          url: `/users/unFollow/${userId}`,
          credentials: "include",
          method: "POST",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: ["posts"],
    }),
    updateUser: builder.mutation({
      query({ updatedData, userId }) {
        return {
          url: `/users/update-user/${userId}`,
          credentials: "include",
          method: "PATCH",
          body: updatedData,
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetFriendsQuery,
  useProfileUserQuery,
  useFollowingUserMutation,
  useUnFollowingUserMutation,
  useUpdateUserMutation,
  useSuggestedFriendsQuery,
  useGetAllUserQuery,
} = userApi;
