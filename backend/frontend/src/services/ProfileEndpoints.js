import { Api } from "./api";

const ProfileEndPoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => ({
        url: "/auth/getuser",
        method: "GET",
      }),
      providesTags: ["loggedInUser"],
    }),
    getSelectedUser: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getSelectedUserPosts: builder.query({
      query: (id) => ({
        url: `/profile/${id}/posts`,
        method: "GET",
      }),
      providesTags: ["Posts", "user"],
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["user", "loggedInUser"],
    }),
    unFollowUser: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}/un-follow`,
        method: "POST",
      }),
      invalidatesTags: ["user" , "loggedInUser"],
    }),
    editLoggedInUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/profile/${id}/edit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loggedInUser", "user"],
    }),
  }),
});

export const {
  useGetLoggedInUserQuery,
  useGetSelectedUserQuery,
  useGetSelectedUserPostsQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useEditLoggedInUserMutation,
} = ProfileEndPoints;
