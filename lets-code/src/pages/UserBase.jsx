import { useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import AssignemntsList from "../features/assignments/AssignemntsList";
export default function UserBasePage() {
  const currentUser = useSelector(getUser);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (currentUser.role === "admin") {
      navigate(`/user/adminBase`, { replace: true });
    }
  });
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        mt: 12,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      autoComplete="off"
    >
      <h4>Available Assignemnts</h4>
      <AssignemntsList />
    </Box>
  );
}
