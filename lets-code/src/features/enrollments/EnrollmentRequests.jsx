import { useDispatch, useSelector } from "react-redux";
import { getPendingEnrollments } from "./enrollmentsSlice";
import { Button, Box } from "@mui/material";
import { approveEnrollmentRequest } from "./enrollmentsSlice";
import { getSuccessMessage } from "../enrollments/enrollmentsSlice";
import AutoCloseAlert from "../../components/AutoCloseAlter";

function EnrollmentRequests() {
  const enrollmentRequests = useSelector(getPendingEnrollments);
  const success = useSelector(getSuccessMessage);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        mt: 12,
        ml: "auto",
        mr: "auto",
        p: 6,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      autoComplete="off"
      width="auto"
      height="auto"
    >
      {success === "Enrollment request approved" && (
        <AutoCloseAlert
          message={success}
          alertType="success"
          time="2"
        ></AutoCloseAlert>
      )}
      {enrollmentRequests.map((enrollment) => (
        <div key={enrollment.id} className="enrollment-container">
          <strong>Assignment: </strong>
          {enrollment.assignment.title}
          <strong>Candidate: </strong>
          {enrollment.user.username}

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
        </div>
      ))}
    </Box>
  );
}

export default EnrollmentRequests;
