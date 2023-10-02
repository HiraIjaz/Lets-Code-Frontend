import { useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import AssignmentsList from "../features/assignments/AssignmentsList";
import { routes } from "../routes";
import { getAssignments } from "../features/assignments/assignmentSlice";
export default function UserBasePage() {
  const currentUser = useSelector(getUser);
  const navigate = useNavigate();
  const assignmentsList = useSelector(getAssignments);

  useLayoutEffect(() => {
    if (currentUser.role === "admin") {
      navigate(routes.adminBasePage, { replace: true });
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
      <AssignmentsList assignmentsList={assignmentsList} userChoice="enroll" />
    </Box>
  );
}
