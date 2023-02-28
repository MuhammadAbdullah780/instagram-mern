import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import postApi from '../api/PostApi'

// * ASYNC THUNK FUNCTIONS
export const fetchAllPosts = createAsyncThunk('post/fetchAllPosts', async (_,{ dispatch, rejectWithValue })=> {
  try {
    const data = await postApi.getAllPosts()
    dispatch(setPosts(data))
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})

export const addPost = createAsyncThunk('post/addPost', async ( { data } ,{ dispatch, rejectWithValue })=> {
  try {
    const response = await postApi.addPost(data)
    console.log(response);
    dispatch(createPost(response.Post))
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})

export const updatePost = createAsyncThunk('post/updatePost', async ( payload  ,{ dispatch, rejectWithValue })=> {
  try {
    const response = await postApi.updatePost(payload)
    console.log(response);
    dispatch(updateThePost(response.doc))
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})
export const deletePost = createAsyncThunk('post/deletePost', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const response = await postApi.deletePost(payload)
    console.log(response);
    dispatch(deleteThePost(payload))
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})

export const likePost = createAsyncThunk('post/likePost', async (payload, { dispatch, rejectWithValue }) => {
  try {
    postApi.likePost(payload).then(async ()=> {
      const updatedPost = await postApi.getSinglePost(payload)
      dispatch(updateThePost(updatedPost))
    })
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})
export const unLikePost = createAsyncThunk('post/unLikePost', async (payload, { dispatch, rejectWithValue }) => {
  try {
    postApi.unlikePost(payload).then(async ()=> {
      const updatedPost = await postApi.getSinglePost(payload)
      dispatch(updateThePost(updatedPost))
    })
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})
export const addComment = createAsyncThunk('post/addComment', async ({ data }, { dispatch, rejectWithValue }) => {
  try {
    console.log(data);
    postApi.addComment(data).then(async ()=> {
      const updatedPost = await postApi.getSinglePost(data.id)
      dispatch(updateThePost(updatedPost))
    })
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})
export const deleteComment = createAsyncThunk('post/addComment', async ({ commentId, postId }, { dispatch, rejectWithValue }) => {
  try {
    postApi.removeComment(postId, commentId).then(async ()=> {
      const updatedPost = await postApi.getSinglePost(postId)
      dispatch(updateThePost(updatedPost))
    })
  } catch (err) {
    toast.error(err)
    rejectWithValue(null)
  }
})


// * ENTITY ADAPTER 
const postAdapter = createEntityAdapter({
  selectId: (Post) => Post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

// * POST SLICE
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
    createPost: (state, { payload }) => {
      postAdapter.addOne(state, payload)
    },
    updateThePost: (state, { payload }) => {
      postAdapter.upsertOne(state, payload)
    },
    deleteThePost: (state, { payload }) => {
      postAdapter.removeOne(state, payload)
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
    }
  },
});

export const { setPosts, createPost, updateThePost, deleteThePost } = postSlice.actions;


export const PostSelectors = postAdapter.getSelectors(state => state.Post)

export default postSlice.reducer;
