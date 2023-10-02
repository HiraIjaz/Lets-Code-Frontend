import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";
import AccountMenu from "./AccountMenue";
import { routes } from "../routes";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = useSelector(getUser);

  return (
    <AppBar>
      <Toolbar>
        {currentUser ? (
          <AccountMenu />
        ) : (
          <>
            <Button
              sx={{ color: "white" }}
              variant="outlined"
              onClick={() => {
                navigate(routes.loginPage);
              }}
            >
              Login
            </Button>
            <Button
              sx={{ color: "white" }}
              variant="outlined"
              onClick={() => {
                navigate(routes.signupPage);
              }}
            >
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
