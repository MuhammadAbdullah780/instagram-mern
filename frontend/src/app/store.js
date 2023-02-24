import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Api } from '../services/api'
import User from '../slices/UserSlice'
import Post from '../slices/PostSlice'

export const store = configureStore({
  reducer: {
    [Api.reducerPath]:Api.reducer,
    User,
    Post,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Api.middleware),
})

setupListeners(store.dispatch)