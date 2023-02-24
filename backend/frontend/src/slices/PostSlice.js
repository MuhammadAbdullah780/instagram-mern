import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const postAdapter = createEntityAdapter({
  selectId: (Post) => Post._id,
});

export const postSlice = createSlice({
  name: "Posts",
  initialState: postAdapter.getInitialState(),
  reducers: {
    setPosts: (state, { payload }) => {
      postAdapter.setAll(state, payload);
    },
  },
});

export const { setPosts } = postSlice.actions;


export const PostSelectors = postAdapter.getSelectors(state => state.Post)

// export const {
//     selectAll,
//     selectById,
//     selectEntities,
//     selectIds,
//     selectTotal,
// } = PostSelectors

export default postSlice.reducer;
