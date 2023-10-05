import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../utils/customTypes";

const initialState: UserType = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") ?? "")
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(_, action: { payload: UserType }) {
      //Saving userInfo in the local storage to check if the user is logged in
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      return action.payload;
    },
    removeCredentials(_) {
      //Removing item from local storage
      localStorage.removeItem("userInfo");

      return {};
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
