import { useSelector } from "react-redux";
import { getUserEnrollments } from "../enrollments/enrollmentsSlice";
import { Box } from "@mui/material";
import { getAssignmentById } from "./assignmentSlice";
import AssignmentsList from "./AssignmentsList";

function getEnrolledAssignments(userEnrollment, getAssignmentById) {
  const enrolledAssignments = [];
  userEnrollment.forEach((enrollment) => {
    const assignmentId = enrollment.assignment;
    const assignment = useSelector((state) =>
      getAssignmentById(state, assignmentId)
    );
    console.log(assignment);
    if (assignment) {
      enrolledAssignments.push(assignment);
    }
  });

  return enrolledAssignments;
}

function UserAssignments() {
  const userEnrollments = useSelector(getUserEnrollments);
  const enrolledAssignments = getEnrolledAssignments(
    userEnrollments,
    getAssignmentById
  );

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
      <AssignmentsList
        assignmentsList={enrolledAssignments}
        userChoice="attempt"
      />
    </Box>
  );
}
export default UserAssignments;
