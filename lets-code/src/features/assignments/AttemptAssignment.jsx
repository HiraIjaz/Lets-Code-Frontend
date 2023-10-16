import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignmentById } from "./assignmentSlice";
import { CalculateScore } from "../../utils";
import { Box, Button } from "@mui/material";
import {
  getUserEnrollments,
  markEnrollment,
} from "../enrollments/enrollmentsSlice";
import { routes } from "../../routes";
import { useState } from "react";
import AttemptMCQquestions from "../questions/AttemptMCQquestion";
import AttemptCodingAssignmnet from "../questions/AttemptCodingQuestion";
import {
  getCodingScore,
  submitCodingQuestion,
} from "../questions/questionSlice";

function AttemptAssignment() {
  let { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const score = useSelector(getCodingScore);

  const assignment = useSelector((state) =>
    getAssignmentById(state, parseInt(id, 0))
  );

  const mcqQuestionsList = assignment.questions.filter((q) => q.type === "mcq");
  const codingQuestionsList = assignment.questions.filter(
    (q) => q.type === "coding"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mcqInitialValues = {
    answers: mcqQuestionsList.map((question) => ({
      questionId: question.id,
      answer: "",
    })),
  };
  const codingInitialValues = {
    answers: codingQuestionsList.map((question) => ({
      questionId: question.id,
      code: `def ${question.data.function_name}(${question.data.parameters}):`,
    })),
  };
  const [mcqAnswers, setMcqAnswers] = useState(mcqInitialValues);
  const [codingAnswers, setCodingAnswers] = useState(codingInitialValues);

  function submitAssignment() {
    setIsSubmitting(true);

    dispatch(submitCodingQuestion(codingAnswers)).then(() => {
      navigate(routes.scorePage, {
        state: {
          answers: mcqAnswers.answers,
          mcqquestionList: mcqQuestionsList,
          codingQuestionsCount: codingQuestionsList.length,
          id: parseInt(id),
        },
      });
    });
  }

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        pt: 12,
        mb: 10,
        pb: 10,
      }}
      display="flex"
      backgroundColor="#ced9ec"
      flexDirection="column"
      alignItems="center"
      gap={2}
      autoComplete="off"
    >
      <h2>{assignment.title}</h2>
      <p>{assignment.description}</p>
      <div style={{ color: "red" }}>
        <p>
          <i>Kindly save your answers before submitting your answers</i>
        </p>
      </div>
      <Button
        variant="contained"
        color="success"
        onClick={() => submitAssignment()}
        disabled={isSubmitting}
      >
        Submit Assignmnet
      </Button>
      {codingQuestionsList.length > 0 && (
        <AttemptCodingAssignmnet
          questionsList={codingQuestionsList}
          setCodingAnswers={setCodingAnswers}
          initialValues={codingInitialValues}
        />
      )}

      {mcqQuestionsList.length > 0 && (
        <AttemptMCQquestions
          questionsList={mcqQuestionsList}
          setMcqAnswers={setMcqAnswers}
          initialValues={mcqInitialValues}
        />
      )}
    </Box>
  );
}

export default AttemptAssignment;
