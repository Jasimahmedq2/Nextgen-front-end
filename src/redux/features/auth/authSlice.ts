/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ILoginUser {
  userId: string | null;
  email: string | null;
  name?: {
    firstName?: string;
    lastName?: string;
  };
}

interface IUserState {
  accessToken: string | null;
  loginUser: ILoginUser | null;
  isLogin: boolean;
}

const initialState: IUserState = {
  accessToken: null,
  loginUser: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: ILoginUser }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.loginUser = action.payload.user;
      state.isLogin = true;
    },
  },
});

export const { setUser, isLoggedIn } = authSlice.actions;
export default authSlice.reducer;
