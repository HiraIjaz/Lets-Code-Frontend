import ReportIcon from "@mui/icons-material/Report";
import { Navigate, useNavigate } from "react-router-dom";

import { Link } from "@mui/material";
import { routes } from "../routes";
import { useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const currentuser = useSelector(getUser);

  return (
    <div className="unauthorized-page">
      <h1>You are not authorized to access this page</h1>
      <ReportIcon sx={{ fontSize: 200 }} color="error" />
      <Link
        onClick={() => {
          currentuser ? navigate(routes.userBasePage) : navigate(routes.home);
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
