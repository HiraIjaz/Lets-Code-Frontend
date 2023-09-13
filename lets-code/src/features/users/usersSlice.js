import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const LOGIN_API_URL = 'http://127.0.0.1:8000/api/login/'
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
}
export const login = createAsyncThunk('user/login', async (credentials) => {
  try{
    const response = await axios.post(LOGIN_API_URL, credentials)
    console.log(response.data)
    return response.data
  }
  catch(error){
    console.log(error.message)
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) =>{
      state.user = null,
      state.accessToken = null,
      state.refreshToken = null
    },
  },
  extraReducers : (builder) => {
    builder
      .addCase(login.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action)=>{
        state.loading = false
        state.user = action.payload
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('access_token',state.accessToken)
        console.log(state.user.role)
      })
      .addCase(login.rejected, (state, action)=>{
        state.loading = false
        state.user = null
        if (action.error.message === 'Request failed with status code 400')
        {
          state.error = 'Invalid Credentials'
        } 
        else {
          state.error = action.error.message
        }
        console.log(state.error)
      })
 
  }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer

 