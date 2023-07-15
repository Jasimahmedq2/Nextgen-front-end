/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../../interfaces/post/postInterfaces";

interface postState {
  data: IPost | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: postState = {
  data: null,
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    likeDislikePost(state, action: PayloadAction<string>) {
      if (state.data) {
        const likedByUser = state.data.likes.includes(action.payload);

        if (likedByUser) {
          state.data.likes = state.data.likes.filter(
            (userId) => userId !== action.payload
          );
        } else {
          state.data.likes.push(action.payload);
        }
      }
    },
    commentPost(state, action: PayloadAction<IPost | null>) {
      state.data = action.payload;
    },
  },
});

export const { likeDislikePost, commentPost } = postSlice.actions;
export default postSlice.reducer;
