import apiSlice from "./apiSlice";
import { UserType } from "../../utils/customTypes";
import { USERS_URL } from "../../utils/constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<UserType, UserType>({
      query: (userData: UserType) => ({
        url: USERS_URL,
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<UserType, UserType>({
      query: (userData) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    openProfile: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
    }),
    updateProfile: builder.mutation<UserType, UserType>({
      query: (userData) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: userData,
      }),
    }),

    //Admin Queries
    getUsers: builder.mutation<UserType[], void>({
      query: () => ({
        url: USERS_URL,
      }),
    }),
    getUserById: builder.mutation<UserType, string>({
      query: (id) => ({
        url: `${USERS_URL}/:${id}`,
      }),
    }),
    deleteUser: builder.mutation<UserType, string>({
      query: (id) => ({
        url: `${USERS_URL}/:${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (userData: UserType) => ({
        url: `${USERS_URL}/:${userData._id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useOpenProfileMutation,
  useUpdateProfileMutation,
  useGetUsersMutation,
  useGetUserByIdMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
