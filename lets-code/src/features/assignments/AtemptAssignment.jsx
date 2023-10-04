import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignmentById } from "./assignmentSlice";
import QuestionDetails from "../../components/QuestionDetails";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CalculateScore } from "../../utils";
import {
  getUserEnrollments,
  markEnrollment,
} from "../enrollments/enrollmentsSlice";
import { routes } from "../../routes";

function AttemptAssignment() {
  let { id } = useParams();

  const assignment = useSelector((state) =>
    getAssignmentById(state, parseInt(id, 0))
  );
  const enrollments = useSelector(getUserEnrollments);
  const currentEnrollment = enrollments.find(
    (e) => e.assignment === parseInt(id)
  );
  const questionsList = assignment.questions.filter((q) => q.type === "mcq");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (questionsList.length === 0) {
    return null;
  }

  const initialValues = {
    answers: questionsList.map((question) => ({
      questionId: question.id,
      answer: "",
    })),
  };

  const validationSchema = Yup.object().shape({
    answers: Yup.array().of(
      Yup.object().shape({
        questionId: Yup.number().required("Question ID is required"),
        answer: Yup.string().required("Answer is required"),
      })
    ),
  });

  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        mt: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        autoComplete: "off",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updatedData = {
            ...currentEnrollment,
            status: "attempted",
            score: CalculateScore(values.answers, questionsList),
          };
          dispatch(markEnrollment(updatedData));
          navigate(routes.scorePage, {
            state: {
              answers: values.answers,
              questionList: questionsList,
            },
          });
        }}
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            {values.answers.map((answer, index) => {
              const question = questionsList.find(
                (q) => q.id === answer.questionId
              );
              return (
                <div className="question-container" key={answer.questionId}>
                  <QuestionDetails question={question} />
                  <Field as="select" name={`answers[${index}].answer`}>
                    <option value="">Select an answer</option>
                    {question.data.choices.map((choice, choiceIndex) => (
                      <option key={choiceIndex} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    className="error-message"
                    name={`answers[${index}].answer`}
                    component="div"
                  />
                </div>
              );
            })}
            <Button color="success" variant="contained" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AttemptAssignment;
