import React from "react";
import { Formik, FieldArray, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Button, Box, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { createQuestion } from "./questionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const CodingQuestionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(createQuestion(values)).then((res) => {
      if (!res.error) {
        navigate(routes.questionBank);
      }
    });
    console.log(values);
  };

  const initialValues = {
    title: "",
    data: {
      question_text: "",
      public_test_cases: [{ input: "", output: "" }],
      private_test_cases: [{ input: "", output: "" }],
    },
    type: "coding",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    data: Yup.object().shape({
      question_text: Yup.string().required("Question text is required"),
      public_test_cases: Yup.array().of(
        Yup.object().shape({
          input: Yup.string().required("Input is required"),
          output: Yup.string().required("Output is required"),
        })
      ),
      private_test_cases: Yup.array().of(
        Yup.object().shape({
          input: Yup.string().required("Input is required"),
          output: Yup.string().required("Output is required"),
        })
      ),
    }),
  });
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
      width="100%"
      height="auto"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form className="assignment-form">
            <div className="question-deets">
              <label htmlFor="title">
                <h4>Title</h4>
              </label>
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
              <Field type="text" id="title" name="title" />

              <br />

              <label htmlFor="data.question_text">
                <h4>Question Text</h4>
              </label>
              <ErrorMessage
                name="data.question_text"
                component="div"
                className="error-message"
              />
              <Field
                as="textarea"
                id="data.question_text"
                name="data.question_text"
              />
            </div>
            <br />
            <div>
              <hr />
              <h4>Public Test Cases</h4>
              <FieldArray
                name="data.public_test_cases"
                render={(arrayHelpers) => (
                  <div>
                    {values.data.public_test_cases.map((test, index) => (
                      <div key={index} className="testcase-inputs">
                        <div>
                          <label
                            htmlFor={`data.public_test_cases[${index}].input`}
                          >
                            Input
                          </label>
                          <ErrorMessage
                            name={`data.public_test_cases[${index}].input`}
                            component="div"
                            className="error-message"
                          />
                          <Field
                            type="text"
                            id={`data.public_test_cases[${index}].input`}
                            name={`data.public_test_cases[${index}].input`}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`data.public_test_cases[${index}].output`}
                          >
                            Output
                          </label>
                          <ErrorMessage
                            name={`data.public_test_cases[${index}].output`}
                            component="div"
                            className="error-message"
                          />
                          <Field
                            type="text"
                            id={`data.public_test_cases[${index}].output`}
                            name={`data.public_test_cases[${index}].output`}
                          />
                        </div>
                        <IconButton
                          type="button"
                          color="error"
                          sx={{ mt: 2 }}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </div>
                    ))}
                    <IconButton
                      type="button"
                      color="success"
                      varient="outlined"
                      onClick={() =>
                        arrayHelpers.push({ input: "", output: "" })
                      }
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>
                )}
              />
            </div>
            <br />
            <div>
              <hr />
              <h4>Private Test Cases</h4>
              <FieldArray
                name="data.private_test_cases"
                render={(arrayHelpers) => (
                  <div>
                    {values.data.private_test_cases.map((test, index) => (
                      <div key={index} className="testcase-inputs">
                        <div>
                          <label
                            htmlFor={`data.private_test_cases[${index}].input`}
                          >
                            Input
                          </label>
                          <Field
                            type="text"
                            id={`data.private_test_cases[${index}].input`}
                            name={`data.private_test_cases[${index}].input`}
                          />
                          <ErrorMessage
                            name={`data.private_test_cases[${index}].input`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`data.private_test_cases[${index}].output`}
                          >
                            Output
                          </label>
                          <Field
                            type="text"
                            id={`data.private_test_cases[${index}].output`}
                            name={`data.private_test_cases[${index}].output`}
                          />
                          <ErrorMessage
                            name={`data.private_test_cases[${index}].output`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <IconButton
                          type="button"
                          color="error"
                          sx={{ mt: 2 }}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </div>
                    ))}
                    <IconButton
                      type="button"
                      color="success"
                      onClick={() =>
                        arrayHelpers.push({ input: "", output: "" })
                      }
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>
                )}
              />
            </div>
            <br />
            <div>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CodingQuestionForm;
