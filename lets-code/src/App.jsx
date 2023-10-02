import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import LoginForm from "./features/users/UserLoginForm";
import UserProfileForm from "./features/users/UserProfileForm";
import HomePage from "./pages/HomePage";
import UserBasePage from "./pages/UserBase";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import UserCreationForm from "./features/users/UserCreationForm";
import AdminBase from "./pages/AdminBase";
import CreateAssignment from "./features/assignments/CreateAssignment";
import EditAssignment from "./features/assignments/EditAssignment";
import ViewAssignmnet from "./features/assignments/ViewAssignemnt";
import CreateQuestion from "./features/questions/CreateQuestion";
import QuestionBank from "./pages/QuestionBank";
import EditCodingQuestion from "./features/questions/EditCodingQuestion";
import EditMcQuestion from "./features/questions/EditMcQuestion";
import EnrollmentRequests from "./features/enrollments/EnrollmentRequests";
import UserAssignments from "./features/assignments/userAssignments";
import Roles from "./roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="user">
          <Route path="user-base-page" element={<UserBasePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<UserCreationForm />} />
          <Route path="profile-info" element={<UserProfileForm />} />
          <Route path="my-assignments" element={<UserAssignments />} />
          <Route
            path="admin-base"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <AdminBase />
              </PrivateRoute>
            }
          />
          <Route
            path="create-assignment"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <CreateAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path="create-question"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <CreateQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-assignment/:id"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <EditAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-coding-question/:id"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <EditCodingQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-mcq-question/:id"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <EditMcQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="question-bank/"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <QuestionBank />
              </PrivateRoute>
            }
          />
          <Route
            path="enrollmet-requests/"
            element={
              <PrivateRoute allowedRole={Roles.ADMIN}>
                <EnrollmentRequests />
              </PrivateRoute>
            }
          />
          <Route path="view-assignment/:id" element={<ViewAssignmnet />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
