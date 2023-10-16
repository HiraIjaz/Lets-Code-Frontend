import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingEnrollments,
  approveEnrollmentRequest,
} from "./enrollmentsSlice";
import { getSuccessMessage } from "../enrollments/enrollmentsSlice";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import AutoCloseAlert from "../../components/AutoCloseAlter";

function EnrollmentRequests() {
  const enrollmentRequests = useSelector(getPendingEnrollments);
  const success = useSelector(getSuccessMessage);
  const dispatch = useDispatch();

  const headerRowStyle = {
    backgroundColor: "#96b1e5",
  };

  const centeredCellStyle = {
    textAlign: "center",
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
          Enrollment Requests
        </Typography>
        <hr />
        {success === "Enrollment request approved" && (
          <AutoCloseAlert message={success} alertType="success" time="2" />
        )}
        <TableContainer component={Paper} sx={{ backgroundColor: "#becce6" }}>
          <Table aria-label="Enrollment Requests">
            <TableHead>
              <TableRow style={headerRowStyle}>
                <TableCell style={centeredCellStyle}>
                  <strong>Assignment</strong>
                </TableCell>
                <TableCell style={centeredCellStyle}>
                  <strong>Candidate</strong>
                </TableCell>
                <TableCell style={centeredCellStyle}>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollmentRequests.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell style={centeredCellStyle}>
                    {enrollment.assignment}
                  </TableCell>
                  <TableCell style={centeredCellStyle}>
                    {enrollment.user}
                  </TableCell>
                  <TableCell style={centeredCellStyle}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        const updatedData = {
                          ...enrollment,
                          status: "approved",
                        };
                        dispatch(approveEnrollmentRequest(updatedData));
                      }}
                    >
                      Approve
                    </Button>
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

export default EnrollmentRequests;
