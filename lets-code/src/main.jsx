import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAssignments } from "./features/assignments/assignmentSlice.js";
import { fetchQuestions } from "./features/questions/questionSlice.js";
import { PersistGate } from "redux-persist/integration/react";

store.dispatch(fetchAssignments());
store.dispatch(fetchQuestions());
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
