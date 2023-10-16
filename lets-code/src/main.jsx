import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAssignments } from "./features/assignments/assignmentSlice.js";
import { fetchQuestions } from "./features/questions/questionSlice.js";
import {
  fetchPendingEnrollments,
  fetchAllEnrollments,
} from "./features/enrollments/enrollmentsSlice.js";
import { PersistGate } from "redux-persist/integration/react";

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: "#599fe9", // Change the primary color
    },
    secondary: {
      main: "#3b4f7b", // Change the secondary color
    },
  },
  // Other theme options...
});

store.dispatch(fetchAssignments());
store.dispatch(fetchQuestions());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
