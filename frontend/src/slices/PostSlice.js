import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postApi from '../api/PostApi'


export const fetchAllPosts = createAsyncThunk('post/fetchAllPosts', async (_,{ dispatch, rejectWithValue })=> {
  try {
    const data = await postApi.getAllPosts()
    dispatch(setPosts(data))
  } catch (err) {
    rejectWithValue(err.msg)
  }
})


export const addPost = createAsyncThunk('post/addPost', async (_,{ dispatch, rejectWithValue })=> {
  try {
    const data = await postApi.addPost()
    console.log(data);
    dispatch(addPost(data))
  } catch (err) {
    rejectWithValue(err.msg)
  }
})







const postAdapter = createEntityAdapter({
  selectId: (Post) => Post._id,
});

export const postSlice = createSlice({
  name: "Posts",
  initialState: postAdapter.getInitialState({
    loading: true,
    error: null
  }),
  reducers: {
    setPosts: (state, { payload }) => {
      postAdapter.setAll(state, payload);
    },
    addPosts: (state, { payload }) => {
      postAdapter.addOne(state, payload)
    },
  },
  extraReducers: {
    [fetchAllPosts.pending] : (state) => {
      state.loading = true
    },
    [fetchAllPosts.rejected]: (state, { payload }) => {
      state.error = payload
      state.loading = false
    },
    [fetchAllPosts.fulfilled]: (state, { payload }) => {
      state.loading = false
    },
    [addPost.pending] : (state) => {
      state.loading = true
    },
    [addPost.rejected]: (state, { payload }) => {
      state.error = payload
      state.loading = false
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.loading = false
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
