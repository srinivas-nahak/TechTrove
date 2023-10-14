import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlices/apiSlice";
import cartReducer from "./cartSlice";
import cartScreenReducer from "./cartScreenSlice";
import authReducer from "./authSlice";
import buttonLoaderReducer from "./buttonLoaderSlice";

const allReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cartReducer,
  cartScreenReducer,
  authReducer,
  buttonLoaderReducer,
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
