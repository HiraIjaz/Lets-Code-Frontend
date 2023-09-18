import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import LoginForm from "./features/users/UserLoginForm";
import UserProfileForm from "./features/users/UserProfileForm";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserBasePage from "./pages/UserBase";
import UserCreationForm from "./features/users/UserCreationForm";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="user">
          <Route path="UserBasePage" element={<UserBasePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<UserCreationForm />} />
          <Route path="profileInfo" element={<UserProfileForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
