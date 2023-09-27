import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ASSIGNMENTS_API = "http://localhost:8000/api/assignments/";
const CREATE_ASSIGNMENT_API = "http://localhost:8000/api/create-assignment/";
const EDIT_ASSIGNMENT_API = "http://localhost:8000/api/edit-assignment/";

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
  success: null,
};

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async () => {
    const response = await axios.get(ASSIGNMENTS_API);
    return response.data;
  }
);

export const createAssignment = createAsyncThunk(
  "assignments/create",
  async (data) => {
    try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.post(CREATE_ASSIGNMENT_API, data, {
        headers: HEADERS,
      });

      return response.data;
    } catch (error) {
      console.log(error.detail);
      return Promise.reject(error.message);
    }
  }
);
export const updateAssignment = createAsyncThunk(
  "assignments/update",
  async (data) => {
    try {
      const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      };
      const response = await axios.put(
        `${EDIT_ASSIGNMENT_API}${encodeURIComponent(data.id)}/`,
        data,
        { headers: HEADERS }
      );
      return response.data;
    } catch (error) {
      console.log(error.detail);
      return Promise.reject(error.message);
    }
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
        state.success = "null";
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.success = "null";
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = "failed";
        state.success = "null";
        state.error = action.error.message;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
        state.loading = "succeeded";
        state.success = "Assignemnt created";
        state.error = null;
      })
      .addCase(createAssignment.pending, (state) => {
        state.loading = "succeeded";
        state.success = "null";
        state.error = null;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = "failed";
        state.success = "null";
        state.error = action.error.message;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const updatedAssignment = action.payload;
        state.assignments = state.assignments.map((assignment) =>
          assignment.id === updatedAssignment.id
            ? updatedAssignment
            : assignment
        );
        state.loading = "succeeded";
        state.success = "Assignemnt updated";
        state.error = null;
      })
      .addCase(updateAssignment.pending, (state) => {
        state.loading = "succeeded";
        state.success = "null";
        state.error = null;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.loading = "failed";
        state.success = "null";
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
export const getSuccessMessage = (state) => state.assignments.success;
