import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ASSIGNMENTS_API = "http://localhost:8000/api/assignments/";

const initialState = {
  assignments: [
    {
      id: 0,
      title: "Dummy Assignment",
      description:
        "This is a dummy assignemnts, made just to show some date on screen",
      questions: [
        {
          id: 0,
          category: "web programming",
          data: {
            choices: [
              "To define the structure of a webpage",
              "To add interactivity to a webpage",
              "To style the appearance of a webpage",
              "To manage server-side logic",
            ],
            correct_answer: "To style the appearance of a webpage",
            question_text: "What is the purpose of CSS in web development?",
          },
          title: "Purpose of CSS",
          type: "mcq",
        },
      ],
    },
    // {
    //   id: 1,
    //   title: "Second Dummy Assignment",
    //   description:
    //     "This is second dummy assignemnts, made just to show some more date on screen",
    //   questions: [1, 5, 9],
    // },
  ],
  loading: "idle",
  error: null,
};

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async () => {
    const response = await axios.get(ASSIGNMENTS_API);
    return response.data;
  }
);

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default assignmentSlice.reducer;

export const getAssignments = (state) => state.assignments.assignments;
export const getAssignmentById = (state, assignmentId) => {
  return state.assignments.assignments.find(
    (assignment) => assignment.id === assignmentId
  );
};
