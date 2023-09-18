import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../features/users/usersSlice";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = useSelector(getUser);

  const dispatch = useDispatch();

  return (
    <AppBar>
      <Toolbar>
        <Avatar />
        {currentUser ? (
          <>
            <Button sx={{ color: "white" }}>{currentUser.username}</Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => {
                navigate(`user/userBasePage`);
              }}
            >
              Home
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => {
                navigate(`user/profileInfo`);
              }}
            >
              MY Profile
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => {
                dispatch(logout());

                navigate(`/`);
              }}
              disable={currentUser}
            >
              LogOut
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ color: "white" }}
              variant="outlined"
              onClick={() => {
                navigate(`/user/login`);
              }}
            >
              Login
            </Button>
            <Button
              sx={{ color: "white" }}
              variant="outlined"
              onClick={() => {
                navigate(`/user/signup`);
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
