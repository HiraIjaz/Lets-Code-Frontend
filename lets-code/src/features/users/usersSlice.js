import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_API_URL,REGSITER_API_URL,UPDATE_API_URL } from "../../urls";
import { HEADERS } from "../../utils";
function userFromLocalStorage(){
  const user = localStorage.getItem("user");
  if (user){
    return JSON.parse(user)
  }
  return null
}
const initialState = {
  user: userFromLocalStorage(),
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  success: null
}
export const login = createAsyncThunk('user/login', async (credentials) => {
  try{
    const response = await axios.post(LOGIN_API_URL, credentials)
    localStorage.setItem('access_token',response.data.access_token)
    localStorage.setItem('user',JSON.stringify(response.data))
    return response.data
  }
  catch(error){
    return Promise.reject(error.message);
  }
});

export const register = createAsyncThunk('user/regsiter', async (credentials) => {
  try{
    const response = await axios.post(REGSITER_API_URL, credentials)
    return response.data
  }
  catch(error){
    return Promise.reject(error.message);
  }
});

export const updateProfile = createAsyncThunk('user/update', async (userData) => {

  try{
    const response = await axios.put(UPDATE_API_URL, userData,{ headers: HEADERS })
    localStorage.setItem('user',JSON.stringify(response.data))
    return response.data
  }
  catch(error){
    return Promise.reject(error.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      return {
        ...state,
      user : null,
      error: null,
      loading: false,
      accessToken : null,
      refreshToken :null,
      success: 'User logged out'  
      }
    },
  },
  extraReducers : (builder) => {
    builder
      .addCase(login.pending, (state) =>{
        return {
        ...state,
        loading: true,
        error: null,
        success:null
      }; 
      })
      .addCase(login.fulfilled, (state, action)=>{
         return {
        ...state,
        loading: false,
        error: null,
        success: 'User loggedin',
        user: action.payload,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      };
        
      })
      .addCase(login.rejected, (state, action)=>{
        return {
        ...state,
        loading: false,
        user: null,
        success: null,
        error:
          action.error.message === 'Request failed with status code 400'
            ? 'Invalid Credentials Entered'
            : (state.error = action.error.message),
      };
      })
      .addCase(updateProfile.fulfilled , (state,action) => {
        return {
        ...state,
        loading: false,
        error: null,
        success: 'user information updated',
        user: action.payload,
      };
      })
       .addCase(updateProfile.rejected , (state,action) => {
        return {
        ...state,
        loading: false,
        success: null,
        error: action.error.message,  
      };
      })
      .addCase(register.fulfilled , (state,action) => {
        return {
        ...state,
        loading: false,
        error: null,
        user: null,
        success: 'You have been registered',
      };
    })
    .addCase(register.rejected , (state,action) => {
        return {
        ...state,
        loading: false,
        user: null,
        success: null,
        error: action.error.message,  
      }
    })
 
  }
})
export const getUserLoading = (state) => state.users.loading;
export const getUser = (state) => state.users.user;
export const getUserError = (state) => state.users.error;
export const getSuccessMessage = (state) => state.users.success;
export const {logout} = userSlice.actions;
export default userSlice.reducer

 