/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ILoginUser } from "@/interfaces/user/userInteface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



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
    logOut: (state) => {
      state.accessToken = null;
      state.isLogin = false;
      state.loginUser = null;
    },
  },
});

export const { isLoggedIn, logOut } = authSlice.actions;
export default authSlice.reducer;
