import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  loading:true,
};

export const userSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    getUser: (state, { payload })=> {
      return payload
    },
    logoutUser: (state)=> {
        state = null
    },
  },
})

export const { getUser, logoutUser } = userSlice.actions

export default userSlice.reducer