import { Box, Button } from "@mui/material";
import QuestionDetails from "../../components/QuestionDetails";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AutoCloseAlert from "../../components/AutoCloseAlter";
import { routes } from "../../routes";

function AttemptMCQquestions({ questionsList, setMcqAnswers, initialValues }) {
  const [showAlert, setShowAlert] = useState(false);
  const validationSchema = Yup.object().shape({
    answers: Yup.array().of(
      Yup.object().shape({
        questionId: Yup.number().required("Question ID is required"),
        answer: Yup.string().required("Answer is required"),
      })
    ),
  });
  const handleSubmit = (values) => {
    setMcqAnswers(values);
    console.log(values);

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // the alert after 5 seconds
  };
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
          handleSubmit(values);
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
              Save answers
            </Button>
          </Form>
        )}
      </Formik>
      {showAlert && (
        <AutoCloseAlert
          message="Your answers have been submitted"
          alertType="success"
          time="5"
        />
      )}
    </Box>
  );
}
export default AttemptMCQquestions;
