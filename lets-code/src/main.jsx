import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAssignments } from "./features/assignments/assignemntSlice.jsx";
import { fetchQuestions } from "./features/questions/questionSlice.js";

store.dispatch(fetchAssignments());
store.dispatch(fetchQuestions());
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
