import { accordionActionsClasses } from '@mui/material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const QUESTIONS_API='http://127.0.0.1:8000/api/questions/'
 
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get(QUESTIONS_API);
  return response.data;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    selectedQuestions:[],
    loading: 'idle',
    error: null,
  },
  reducers: {
    questionAdded: (state, action) => {
      state.selectedQuestions.push(action.payload.question);
    },
    questionRemoved: (state, action) => {
       const questionIdToRemove = action.payload.question.id;
      state.selectedQuestions = state.selectedQuestions.filter(
         (question) => question.id !== questionIdToRemove)
    },
    putSelectedQuestions: (state,action)=>{
      console.log(action.payload)
       return {
    ...state,
    selectedQuestions: action.payload
  };
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export default questionsSlice.reducer;

// Selectors
export const selectQuestions = (state) => state.questions.questions;
export const selectQuestionsLoading = (state) => state.questions.loading;
export const selectQuestionsError = (state) => state.questions.error;
export const getSelectedQuestions = (state) =>state.questions.selectedQuestions;

//actions
export const {questionAdded,questionRemoved,putSelectedQuestions} = questionsSlice.actions;