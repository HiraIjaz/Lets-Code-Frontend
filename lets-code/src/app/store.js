import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/usersSlice.js'
import questionReducer from '../features/questions/questionSlice.js'
import assignmentReducer from '../features/assignments/assignmentSlice.js'
import enrollmentReducer from '../features/enrollments/enrollmentsSlice.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUser = persistReducer(persistConfig, userReducer)
const persistedQuestions = persistReducer(persistConfig, questionReducer)
const persistedAssignments = persistReducer(persistConfig, assignmentReducer)
const persistedEnrollments = persistReducer(persistConfig, enrollmentReducer)


export const store = configureStore(
  {
    reducer: {
      users: userReducer,
      questions: persistedQuestions,
      assignments: persistedAssignments,
      enrollments: persistedEnrollments
    }
  }
)
export const persistor = persistStore(store)
