import { createSlice } from "@reduxjs/toolkit";

export type ButtonLoaderPropType = {
  loaderColor?: string;
  showLoader?: boolean;
  loaderSize?: string;
};

const initialState: ButtonLoaderPropType = {
  loaderColor: "green",
  showLoader: false,
  loaderSize: "1.5rem",
};

const buttonLoaderSlice = createSlice({
  name: "button-style",
  initialState,
  reducers: {
    addProperty(_, action: { payload: ButtonLoaderPropType }) {
      return { ...action.payload };
    },
  },
});

export const btnLoaderAction = buttonLoaderSlice.actions;

export default buttonLoaderSlice.reducer;
