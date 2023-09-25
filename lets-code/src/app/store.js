import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/usersSlice.js'
import questionReducer from '../features/questions/questionSlice.js'
import assignmentReducer from '../features/assignments/assignemntSlice.jsx'
export const store = configureStore(
  {
    reducer: {
        users: userReducer,
        questions:questionReducer,
       assignments: assignmentReducer,
    }
  }
)