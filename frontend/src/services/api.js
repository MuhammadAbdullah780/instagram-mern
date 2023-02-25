import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl:'localhost:5700/api',
    prepareHeaders: (headers) => {

      headers.set("Content-Type", "application/json")
      const token = JSON.parse(localStorage.getItem("token"))
  
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Posts", "loggedInUser", "user"],

  endpoints: (builder) => ({}),
});




