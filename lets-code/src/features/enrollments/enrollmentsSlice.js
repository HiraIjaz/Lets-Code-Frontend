import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ENROLLMENT_REQUEST_API,USER_APPROVED_ENROLLMENTS } from "../../urls";
import { HEADERS } from "../../utils";
const initialState = {
  enrollments: [], 
  pendingEnrollments: [], 
  error:null,
  success:null,
  loading:null
};

export const fetchPendingEnrollments = createAsyncThunk('enrollments/fetchPendingEnrollments', async () => {
  const response = await axios.get(ENROLLMENT_REQUEST_API,{
        headers: HEADERS,
      })
  return response.data;
});
export const fetchUserEnrollments = createAsyncThunk('enrollments/fetchUserEnrollments', async () => {

  const response = await axios.get(USER_APPROVED_ENROLLMENTS,{
        headers: HEADERS,
      });
  return response.data;
});
export const makeEnrollmentRequest  = createAsyncThunk('enrollment/makeEnrollment/Request', async(data)=>{
  try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.post(`${ENROLLMENT_REQUEST_API}${encodeURIComponent(data.id)}/`, data, {
        headers: HEADERS,
      });
      

      return response.data;
    } catch (error) {
      
      return Promise.reject(error.message);
    }
})
export const approveEnrollmentRequest = createAsyncThunk(
  "enrollments/approveEnrollmentRequest",
  async (data) => {
    
    try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.put(`${ENROLLMENT_REQUEST_API}${encodeURIComponent(data.id)}/`, data, {
        headers: HEADERS,
      });
      

      return response.data;
    } catch (error) {
      
      return Promise.reject(error.message);
    }
  }
);
const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEnrollments.pending, (state) => {
        state.loading = 'loading';
        state.success= null
        state.error=null
      })
      .addCase(fetchUserEnrollments.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success= 'User Enrollments fetched';
        state.enrollments = action.payload;
      })
      .addCase(fetchUserEnrollments.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPendingEnrollments.pending, (state) => {
        state.loading = 'loading';
        state.success= null
        state.error=null
      })
      .addCase(fetchPendingEnrollments.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success= 'Pending enrollments fetched'
        console.log(action.payload)
        state.pendingEnrollments = action.payload;
      })
      .addCase(fetchPendingEnrollments.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(approveEnrollmentRequest.pending, (state) => {
        state.loading = 'loading';
        state.success = null;
      })
      .addCase(approveEnrollmentRequest.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success='Enrollment request approved'
        const approvedRequest = action.payload;
        state.pendingEnrollments = state.pendingEnrollments.filter((enrollment) => {
          return enrollment.id !== approvedRequest.id;
        })
  })
      .addCase(approveEnrollmentRequest.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
    }
})

export const getPendingEnrollments = (state) => state.enrollments.pendingEnrollments
export const getSuccessMessage= (state) => state.enrollments.success
export const getUserEnrollments= (state) => state.enrollments.enrollments
export default enrollmentSlice.reducer

