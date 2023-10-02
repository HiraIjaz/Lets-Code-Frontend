import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putSelectedQuestions } from "../questions/questionSlice";
import { getUser } from "../users/usersSlice";
import PropTypes from "prop-types";
import Roles from "../../roles";
function countQuestions(assignment, type) {
  const Questions = assignment.questions.filter(
    (question) => question.type === type
  );
  return Questions.length;
}
function AssignmentsList({ assignmentsList, userChoice }) {
  const currentUser = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        ml: "auto",
        mr: "auto",
        p: 6,
      }}
      display="flex"
      flexDirection="column"
      gap={2}
      autoComplete="off"
      width="90%"
      height="auto"
    >
      {assignmentsList.map((assignment) => (
        <div className="assignment-container" key={assignment.id}>
          <h3>{assignment.title}</h3>
          <br />
          <p>{assignment.description}</p>
          <hr />
          <div className="assignment-details">
            <p>
              <strong>Mcqs: </strong>
              {countQuestions(assignment, "mcq")}
            </p>
            <p>
              <strong>Coding: </strong>
              {countQuestions(assignment, "coding")}
            </p>

            <p>
              <strong>Points: </strong>{" "}
              {countQuestions(assignment, "mcq") * 5 +
                countQuestions(assignment, "coding") * 10}
            </p>
          </div>
          <div className="assignment-details-btns">
            <Button
              hidden={currentUser.role === Roles.USER}
              variant="outlined"
              onClick={() => {
                dispatch(putSelectedQuestions(assignment.questions));
                navigate(`/user/viewAssignment/${assignment.id}`);
              }}
            >
              Preview
            </Button>
            <Button
              variant="outlined"
              hidden={currentUser.role === Roles.USER}
              onClick={() => {
                dispatch(putSelectedQuestions(assignment.questions));
                navigate(`/user/editAssignment/${assignment.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              hidden={currentUser.role === Roles.ADMIN}
            >
              {userChoice == "enroll" ? "Enroll" : "Attempt"}
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
};
export default AssignmentsList;
