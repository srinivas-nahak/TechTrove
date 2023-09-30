import { createSlice } from "@reduxjs/toolkit";

const cartScreenSlice = createSlice({
  name: "cartScreen",
  initialState: { showCartScreen: false },
  reducers: {
    toggleCartScreen(state, action) {
      state.showCartScreen = action.payload;
    },
  },
});

export const cartScreenAction = cartScreenSlice.actions;

export default cartScreenSlice.reducer;
