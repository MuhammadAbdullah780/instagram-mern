import { Api } from "./api";


const PostEndPoints = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/post/all",
        method: "GET",
      }),
      providesTags: ({ Post }, error, arg) =>
        Post
          ? [...Post.map(({ _id }) => ({ type: "Posts", _id })), "Posts"]
          : ["Posts"]
    }),
    getSpecificPost: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: ({ data }) => ({
        url: "/post/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts", "loggedInUser"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', _id: arg.id }, "loggedInUser"],
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/post/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', _id: arg.id }],
    }),
    addLike: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/like`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', _id: arg.id }],
    }),
    removeLike: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/unlike`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', _id: arg.id }],
    }),
    addComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/post/${id}/comment/add`,
        method: "POST",
        body:{text:data},
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', _id: arg.id }],
    }),
    removeComment: builder.mutation({
      query: ({ id, commentId }) => ({
        url: `/post/${id}/comment/delete`,
        method: "DELETE",
        body:{ id:commentId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', _id: arg.id }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSpecificPostQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
  useAddCommentMutation,
  useRemoveCommentMutation,
} = PostEndPoints;

