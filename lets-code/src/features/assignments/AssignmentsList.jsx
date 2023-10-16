import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../users/usersSlice";
import PropTypes from "prop-types";
import Roles from "../../roles";
import {
  getPendingEnrollments,
  makeEnrollmentRequest,
} from "../enrollments/enrollmentsSlice";
import { Alert, AlertTitle } from "@mui/material";
import AutoCloseAlert from "../../components/AutoCloseAlter";
import { routes } from "../../routes";
import { putSelectedQuestions } from "../questions/questionSlice";

function countQuestions(assignment, type) {
  const Questions = assignment.questions.filter(
    (question) => question.type === type
  );
  return Questions.length;
}

function AssignmentsList({ assignmentsList, userChoice, assignmentScores }) {
  const currentUser = useSelector(getUser);
  const error = useSelector((state) => state.enrollments.error);
  const success = useSelector((state) => state.enrollments.success);
  const RequestedEnrollments = useSelector(getPendingEnrollments);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enrollmentRequestButtonStyle = {
    background: "#007acc", // Blue color for the enrollment request button
    color: "#fff", // White text color
  };
  function HandleEnrollmentRequest(assignment) {
    const data = {
      user: currentUser.id,
      assignment: assignment,
      status: "pending",
    };
    dispatch(makeEnrollmentRequest(data));
  }
  function CheckRequested(assignmentId) {
    return RequestedEnrollments.some(
      (enrollment) => enrollment.assignment === assignmentId
    );
  }

  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif", // Apply Roboto font
        ml: "auto",
        mr: "auto",
        p: 6,
        maxWidth: "800px", // Adjust the maximum width of the box
      }}
      display="flex"
      flexDirection="column"
      gap={2}
      autoComplete="off"
      width="90%"
      height="auto"
    >
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
          <strong> try again!</strong>
        </Alert>
      )}
      {success === "Enrollment request made" && (
        <AutoCloseAlert
          message={success}
          alertType="success"
          time="5"
        ></AutoCloseAlert>
      )}
      {assignmentsList.map((assignment) => (
        <div className="assignment-container" key={assignment.id}>
          <Typography variant="h4" gutterBottom>
            {assignment.title}
          </Typography>
          <Typography variant="body1">
            <i>{assignment.description}</i>
          </Typography>
          <hr />
          <div className="assignment-details">
            <Typography>
              <strong>MCQs: </strong>
              {countQuestions(assignment, "mcq")}
            </Typography>
            <Typography>
              <strong>Coding: </strong>
              {countQuestions(assignment, "coding")}
            </Typography>

            <Typography>
              <strong>Points: </strong>{" "}
              {countQuestions(assignment, "mcq") * 5 +
                countQuestions(assignment, "coding") * 10}
            </Typography>
            {userChoice === "attempt" && (
              <Typography>
                <strong>Score: </strong> {assignmentScores[assignment.id]}
              </Typography>
            )}
          </div>
          <br />
          <div className="assignment-details-btns">
            <Button
              hidden={currentUser.role === Roles.USER}
              variant="outlined"
              onClick={() => {
                navigate(`${routes.viewAssignment}/${assignment.id}`);
              }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              hidden={currentUser.role === Roles.USER}
              onClick={() => {
                dispatch(putSelectedQuestions(assignment.questions));
                navigate(`${routes.editAssignment}/${assignment.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => HandleEnrollmentRequest(assignment.id)}
              variant="outlined"
              hidden={
                currentUser.role === Roles.ADMIN || userChoice === "attempt"
              }
              disabled={CheckRequested(assignment.id)}
              sx={enrollmentRequestButtonStyle}
            >
              Enroll
            </Button>
            <Button
              variant="outlined"
              hidden={
                currentUser.role === Roles.ADMIN || userChoice === "enroll"
              }
              onClick={() =>
                navigate(`${routes.attemptAssignment}/${assignment.id}`)
              }
            >
              Attempt
            </Button>
          </div>
        </div>
      ))}
    </Box>
  );
}

AssignmentsList.propTypes = {
  assignmentsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(PropTypes.object.isRequired),
    })
  ).isRequired,
  userChoice: PropTypes.oneOf(["enroll", "attempt"]).isRequired,
  assignmentScores: PropTypes.object,
};

export default AssignmentsList;
