import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/usersSlice.js'

export const store = configureStore(
  {
    reducer: {
        users: userReducer,
    }
  }
)