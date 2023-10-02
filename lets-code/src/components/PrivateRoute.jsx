import { useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../routes";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, allowedRole }) => {
  let location = useLocation();
  const user = useSelector(getUser);

  if (!user) {
    return <Navigate to={routes.loginPage} state={{ from: location }} />;
  } else if (allowedRole === user.role) {
    return children;
  } else {
    return <Navigate to={routes.unauthorizedPage} state={{ from: location }} />;
  }
};

export default PrivateRoute;
