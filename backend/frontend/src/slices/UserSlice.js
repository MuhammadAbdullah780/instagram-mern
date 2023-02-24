import { createSlice } from '@reduxjs/toolkit'

const initialState = null;

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUser: (state, { payload })=> {
      return  payload.user;
    },
    logoutUser: (state)=> {
      return (
        state = null
      )
    },
  },
})

export const { getUser, logoutUser } = userSlice.actions

export default userSlice.reducer