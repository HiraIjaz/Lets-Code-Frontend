import { accordionActionsClasses } from '@mui/material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
const QUESTIONS_API='http://127.0.0.1:8000/api/questions/'

 
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get(QUESTIONS_API);
  return response.data;
});
export const createQuestion = createAsyncThunk(
  "questions/create",
  async (data) => {
    try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.post(QUESTIONS_API, data, {
        headers: HEADERS,
      });

      return response.data;
    } catch (error) {
      console.log(error.detail);
      return Promise.reject(error.message);
    }
  }
);
export const editQuestion = createAsyncThunk(
  "questions/edit",
  async (data) => {
    
    try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.put(`${QUESTIONS_API}${encodeURIComponent(data.id)}/`, data, {
        headers: HEADERS,
      });
      console.log(response.data)

      return response.data;
    } catch (error) {
      console.log(error.detail);
      return Promise.reject(error.message);
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (data) => {
    try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.delete(`${QUESTIONS_API}${encodeURIComponent(data.id)}/`, data, {
        headers: HEADERS,
      });

      return response.data;
    } catch (error) {
      console.log(error.detail);
      return Promise.reject(error.message);
    }
  }
);
const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    selectedQuestions:[],
    loading: 'idle',
    error: null,
    success:null
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
        state.success= null
        state.error=null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success= 'Questions fetched'
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
       .addCase(createQuestion.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success='Question created'
        console.log(action.payload)
        state.questions.push(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = 'loading';
        state.success = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success='Question deleted'
        const deletedQuestion = action.payload;
        state.questions = state.questions.map((question) =>
          question.id === deletedQuestion.id
            ? deleteQuestion
            : question
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(editQuestion.pending, (state) => {
        state.loading = 'loading';
        state.success = null;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success='Question edited'
        const editedQuestion = action.payload;
        state.questions = state.questions.map((question) =>
          question.id === editedQuestion.id
            ? editedQuestion
            : question
        );
      })
      .addCase(editQuestion.rejected, (state, action) => {
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
export const getQuestionById = (state, questionId) => {
  return state.questions.questions.find(
    (question) => question.id === questionId
  );
};
export const getSuccessMessage=(state) => state.questions.success

//actions
export const {questionAdded,questionRemoved,putSelectedQuestions} = questionsSlice.actions;