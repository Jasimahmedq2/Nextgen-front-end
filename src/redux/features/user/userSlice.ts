import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/user/userInteface";

interface IUserInterface {
  users: IUser[];
}

const initialState: IUserInterface = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});
