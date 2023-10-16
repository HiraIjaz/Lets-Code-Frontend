import { useSelector } from "react-redux";
import { getUserEnrollments } from "../enrollments/enrollmentsSlice";
import { Box } from "@mui/material";
import { getAssignments } from "./assignmentSlice";
import AssignmentsList from "./AssignmentsList";

function UserAssignments() {
  const userEnrollments = useSelector(getUserEnrollments);
  const allAssignments = useSelector(getAssignments);
  const enrolledAssignments = [];
  userEnrollments.forEach((enrollment) => {
    const assignmentId = enrollment.assignment;
    enrolledAssignments.push(
      allAssignments.find((assignment) => assignment.id === assignmentId)
    );
  });
  const assignmentScores = {};
  userEnrollments.forEach((enrollment) => {
    const { assignment, score } = enrollment;
    assignmentScores[assignment] = score;
  });
  console.log("hereee");
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
        assignmentScores={assignmentScores}
      />
    </Box>
  );
}
export default UserAssignments;
