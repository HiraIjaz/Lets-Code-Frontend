import { useSelector } from "react-redux";
import { getUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import AssignmentsList from "../features/assignments/AssignmentsList";
import { routes } from "../routes";
import {
  getAssignmentById,
  getAssignments,
} from "../features/assignments/assignmentSlice";
import { getUserEnrollments } from "../features/enrollments/enrollmentsSlice";

function getUnenrolledAssignments(allAssignments, userEnrollment) {
  const enrolledAssignmentIds = new Set(
    userEnrollment.map((enrollment) => enrollment.assignment)
  );

  const unenrolledAssignments = allAssignments.filter((assignment) => {
    return !enrolledAssignmentIds.has(assignment.id);
  });
  return unenrolledAssignments;
}

export default function UserBasePage() {
  const currentUser = useSelector(getUser);
  const navigate = useNavigate();
  const allAssignments = useSelector(getAssignments);
  const userEnrollments = useSelector(getUserEnrollments);
  const assignmentsList = getUnenrolledAssignments(
    allAssignments,
    userEnrollments
  );
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
