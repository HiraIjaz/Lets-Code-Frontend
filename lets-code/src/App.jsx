import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import LoginForm from "./features/users/UserLoginForm";
import UserProfileForm from "./features/users/UserProfileForm";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserBasePage from "./pages/UserBase";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import UserCreationForm from "./features/users/UserCreationForm";
import AdminBase from "./pages/AdminBase";
import CreateAssignment from "./features/assignments/CreateAssignment";
import EditAssignment from "./features/assignments/EditAssignment";
import ViewAssignmnet from "./features/assignments/ViewAssignemnt";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="user">
          <Route path="UserBasePage" element={<UserBasePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<UserCreationForm />} />
          <Route path="profileInfo" element={<UserProfileForm />} />
          <Route
            path="adminBase"
            element={
              <PrivateRoute allowedRole={"admin"}>
                <AdminBase />
              </PrivateRoute>
            }
          />
          <Route
            path="createAssignment"
            element={
              <PrivateRoute allowedRole={"admin"}>
                <CreateAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path="editAssignment/:id"
            element={
              <PrivateRoute allowedRole={"admin"}>
                <EditAssignment />
              </PrivateRoute>
            }
          />
          <Route path="viewAssignment/:id" element={<ViewAssignmnet />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
