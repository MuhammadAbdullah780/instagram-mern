import { Api } from "./api";

const authEndpoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data
      }),
      invalidatesTags:["loggedInUser"]
    }),
    signUp: builder.mutation({
        query: (data) => ({
          url: "/auth/signup",
          method: "POST",
          body: data
        }),
      })
  }),
});

export const { useLogInMutation, useSignUpMutation } = authEndpoints;
