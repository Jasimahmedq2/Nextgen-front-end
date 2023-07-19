/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSclice";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/post/get-posts",
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["posts"],
    }),
    userPost: builder.query({
      query: (userId) => ({
        url: `/post/get-user-profile-post/${userId}`,
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["posts"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/post/like-dislike/${postId}`,
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["posts"],
    }),
    commentPost: builder.mutation({
      query: (data) => ({
        url: `/post/create-comment/${data?.postId}`,
        method: "POST",
        body: { text: data?.text },
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["posts"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/post/create-post`,
        method: "POST",
        body: data,
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["posts"],
    }),
    editPost: builder.mutation({
      query: ({ updatedData, postId }) => ({
        url: `/post/update-post/${postId}`,
        method: "PATCH",
        body: updatedData,
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/delete-post/${postId}`,
        method: "DELETE",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["posts"],
    }),
    getOnePost: builder.query({
      query: (postId) => ({
        url: `/post/get-post/${postId}`,
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLikePostMutation,
  useCommentPostMutation,
  useCreatePostMutation,
  useGetOnePostQuery,
  useUserPostQuery,
  useEditPostMutation,
  useDeletePostMutation,
} = postApi;
