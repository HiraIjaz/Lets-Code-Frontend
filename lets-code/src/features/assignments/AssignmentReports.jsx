import { useSelector } from "react-redux";
import { getAllEnrollments } from "../enrollments/enrollmentsSlice";
import { getAssignments } from "./assignmentSlice";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

function AssignmentReports() {
  const enrollmentsList = useSelector(getAllEnrollments);
  const assignmentsList = useSelector(getAssignments);

  // Create a function to calculate statistics for each assignment
  const calculateAssignmentStatistics = (assignmentId) => {
    const assignmentEnrollments = enrollmentsList.filter(
      (enrollment) => enrollment.assignment === assignmentId
    );

    if (assignmentEnrollments.length === 0) {
      return {
        avgScore: 0,
        maxScore: 0,
        minScore: 0,
        enrollmentCount: 0,
      };
    }

    const scores = assignmentEnrollments.map((enrollment) => enrollment.score);
    const avgScore =
      scores.reduce((a, b) => a + b, 0) / assignmentEnrollments.length;
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);

    return {
      avgScore,
      maxScore,
      minScore,
      enrollmentCount: assignmentEnrollments.length,
    };
  };
  const headerRowStyle = {
    backgroundColor: "#96b1e5",
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        mt: 12,
        ml: 3,
        mr: 3,
      }}
    >
      <div>
        <Typography variant="h4" gutterBottom>
          Assignment Reports
        </Typography>
        <hr />
        <TableContainer component={Paper} sx={{ backgroundColor: "#becce6" }}>
          <Table aria-label="Assignment Statistics">
            <TableHead>
              <TableRow style={headerRowStyle}>
                <TableCell style={{ textAlign: "center" }}>
                  <strong>Assignment ID</strong>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <strong>Enrollment Count</strong>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <strong> Average Score</strong>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <strong>Max Score</strong>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <strong>Min Score</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignmentsList.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell style={{ textAlign: "center" }}>
                    {assignment.id}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {
                      calculateAssignmentStatistics(assignment.id)
                        .enrollmentCount
                    }
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {calculateAssignmentStatistics(assignment.id).avgScore}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {calculateAssignmentStatistics(assignment.id).maxScore}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {calculateAssignmentStatistics(assignment.id).minScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
}

export default AssignmentReports;
