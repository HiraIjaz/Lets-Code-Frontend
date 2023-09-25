import { Box, Button } from "@mui/material";
import AllQuestions from "../questions/AllQuestions";
import { useSelector } from "react-redux";
import { getSelectedQuestions } from "../questions/questionSlice";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "./assignemntSlice";
import QuestionDetails from "../../components/QuestionDetails";

function ViewAssignment() {
  let { id } = useParams();
  console.log(id);
  const assignment = useSelector((state) =>
    getAssignmentById(state, parseInt(id, 10))
  );
  const questionsList = useSelector(getSelectedQuestions);
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
      gap={2}
      autoComplete="off"
      width="90%"
      height="auto"
    >
      <h2>{assignment.title}</h2>
      <br />
      <p>{assignment.description}</p>
      <hr />

      {questionsList.map((question) => (
        <div className="question-container" key={question.id}>
          <QuestionDetails question={question} />
        </div>
      ))}
    </Box>
  );
}

export default ViewAssignment;
