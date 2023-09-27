import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAssignments } from "./assignemntSlice";
import { putSelectedQuestions } from "../questions/questionSlice";
import { getUser } from "../users/usersSlice";

function countMCQQuestions(assignment) {
  const mcqQuestions = assignment.questions.filter(
    (question) => question.type === "mcq"
  );
  return mcqQuestions.length;
}

function countCodingQuestions(assignment) {
  const codingQuestions = assignment.questions.filter(
    (question) => question.type === "coding"
  );
  return codingQuestions.length;
}
function AssignemntsList() {
  const assignmentsList = useSelector(getAssignments);
  const currentUser = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(assignmentsList);
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
              {countMCQQuestions(assignment)}
            </p>
            <p>
              <strong>Coding: </strong>
              {countCodingQuestions(assignment)}
            </p>

            <p>
              <strong>Points: </strong>{" "}
              {countMCQQuestions(assignment) * 5 +
                countCodingQuestions(assignment) * 10}
            </p>
          </div>
          <div className="assignment-details-btns">
            <Button
              hidden={currentUser.role !== "admin"}
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
              hidden={currentUser.role !== "admin"}
              onClick={() => {
                dispatch(putSelectedQuestions(assignment.questions));
                navigate(`/user/editAssignment/${assignment.id}`);
              }}
            >
              Edit
            </Button>
            <Button variant="outlined" hidden={currentUser.role === "admin"}>
              Enroll
            </Button>
          </div>
        </div>
      ))}
    </Box>
  );
}

export default AssignemntsList;
