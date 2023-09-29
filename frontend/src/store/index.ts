import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlices/apiSlice";
import cartReducer from "./cartSlice";

const allReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cartReducer,
});

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});

export type RootState = ReturnType<typeof allReducers>;

export default store;
