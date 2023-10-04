import {
  TextField,
  Button,
  Box,
  Link,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { routes } from "../routes";
import AutoCloseAlert from "../components/AutoCloseAlter";
import { useDispatch, useSelector } from "react-redux";
import { getSuccessMessage } from "../features/questions/questionSlice";

import { selectQuestions } from "../features/questions/questionSlice";
import QuestionDetails from "../components/QuestionDetails";

import { deleteQuestion } from "../features/questions/questionSlice";

function QuestionBank() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = useSelector(getSuccessMessage);
  const error = useSelector((state) => state.assignments.error);

  const questionsList = useSelector(selectQuestions);

  function handleCreateNewQuestionClick() {
    navigate(routes.createQuestion);
  }
  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          mt: 12,
          ml: 20,
          mr: 20,
        }}
        width="50%"
        display="flex"
        flexDirection="column"
        gap={2}
        autoComplete="off"
      >
        <h2>Question Bank</h2>
        <hr />
        <div>
          <Button variant="outlined" onClick={handleCreateNewQuestionClick}>
            <AddIcon /> Create New Question
          </Button>
          <br />
          <br />
          {error !== null && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
              <strong> try again!</strong>
            </Alert>
          )}
          {success === "Question created" && (
            <AutoCloseAlert
              message={success}
              alertType="success"
              time="2"
            ></AutoCloseAlert>
          )}
          {success === "Question deleted" && (
            <AutoCloseAlert
              message={success}
              alertType="success"
              time="2"
            ></AutoCloseAlert>
          )}
          {success === "Question edited" && (
            <AutoCloseAlert
              message={success}
              alertType="success"
              time="2"
            ></AutoCloseAlert>
          )}
          <section id="assignmentsList">
            {questionsList.map((question) => {
              return (
                <div className="question-container" key={question.id}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mb: 2, ml: 2 }}
                    onClick={() => {
                      dispatch(deleteQuestion(question));
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mb: 2, ml: 2 }}
                    onClick={() => {
                      {
                        question.type === "coding"
                          ? navigate(
                              `${routes.editcodingQuestion}/${question.id}`
                            )
                          : navigate(`${routes.editmcQuestion}/${question.id}`);
                      }
                    }}
                  >
                    Edit
                  </Button>

                  <QuestionDetails question={question} />
                </div>
              );
            })}
          </section>
        </div>
      </Box>
    </>
  );
}
export default QuestionBank;
