import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import LoginForm from "./features/users/UserLoginForm";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="user">
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
