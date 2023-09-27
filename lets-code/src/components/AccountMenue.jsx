import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Button, colors } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Person2Icon from "@mui/icons-material/Person2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../features/users/usersSlice";
import { routes } from "../routes";
import BallotIcon from "@mui/icons-material/Ballot";

export default function AccountMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUser.username[0].toUpperCase()}
            </Avatar>
            <span style={{ marginLeft: "10px", color: "white" }}>
              {currentUser.first_name}
            </span>
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <p>
            <strong>{currentUser.username}</strong>
          </p>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(routes.userProfilePage);
          }}
        >
          <Person2Icon /> Profile
        </MenuItem>
        {currentUser.role !== "admin" && (
          <MenuItem onClick={handleClose}>
            <AssignmentIcon /> My Assignments
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            {
              handleClose();
              currentUser.role === "admin"
                ? navigate(routes.adminBasePage)
                : navigate(routes.userBasePage);
            }
          }}
        >
          <HomeIcon /> Home
        </MenuItem>
        {currentUser.role === "admin" && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(routes.questionBank);
            }}
          >
            <BallotIcon /> Question Bank
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logout());

            navigate(routes.home);
          }}
        >
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
