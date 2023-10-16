import React from "react";
import { Box, Button } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import QuestionDetails from "../../components/QuestionDetails";
import { useState } from "react";
import AutoCloseAlert from "../../components/AutoCloseAlter";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python"; // Import the desired mode (e.g., Python)
import "ace-builds/src-noconflict/theme-monokai"; // Import the desired theme (e.g., Monokai)

function AttemptCodingQuestions({
  questionsList,
  setCodingAnswers,
  initialValues,
}) {
  const [showAlert, setShowAlert] = useState(false);
  const validationSchema = Yup.object().shape({
    answers: Yup.array().of(
      Yup.object().shape({
        questionId: Yup.number().required("Question ID is required"),
        code: Yup.string().required("Code is required"),
      })
    ),
  });
  console.log(questionsList);
  const handleSubmit = (values) => {
    setCodingAnswers(values);
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
        "& .MuiTextField-root": { m: 1, width: "100%" },
        mt: 2,
        display: "flex",
        flexDirection: "column",
        width: "80%",
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
                <div
                  className="question-answer-container"
                  key={answer.questionId}
                >
                  <QuestionDetails question={question} />
                  <AceEditor
                    mode="python" // Set the code mode (e.g., Python)
                    theme="monokai" // Set the code editor theme (e.g., Monokai)
                    name={`answers[${index}].code`}
                    placeholder="Write your code here"
                    value={answer.code}
                    onChange={(code) => {
                      // Handle code changes and update form values
                      values.answers[index].code = code;
                    }}
                    rows={30}
                    columns={50}
                    width="100%"
                    editorProps={{ $blockScrolling: true }}
                  />
                  <ErrorMessage
                    className="error-message"
                    name={`answers[${index}].code`}
                    component="div"
                  />
                  <br />
                </div>
              );
            })}
            <br />
            <Button color="success" variant="contained" type="submit">
              Save answer
            </Button>
          </Form>
        )}
      </Formik>

      {showAlert && (
        <AutoCloseAlert
          message="Your code has been submitted"
          alertType="success"
          time="5"
        />
      )}
    </Box>
  );
}

export default AttemptCodingQuestions;
