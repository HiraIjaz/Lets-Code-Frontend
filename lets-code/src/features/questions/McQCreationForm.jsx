import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createQuestion } from "./questionSlice";
import { Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const MCQForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .max(100, "Title must be at most 100 characters"),
    data: Yup.object().shape({
      choices: Yup.array()
        .of(Yup.string().required("Choice is required"))
        .min(4, "At least 4 choices are required")
        .max(4, "At most 4 choices are allowed"),
      question_text: Yup.string().required("Question text is required"),
      correct_answer: Yup.string().required("Correct answer is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      data: {
        choices: ["", "", "", ""],
        question_text: "",
        correct_answer: "",
      },
      type: "mcq",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createQuestion(values));
      navigate(routes.questionBank);
    },
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
      <form onSubmit={formik.handleSubmit}>
        <div className="question-deets">
          <label>
            <h4>Title:</h4>
          </label>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error-message">{formik.errors.title}</div>
          )}

          <label>
            <h4>Question Text:</h4>
          </label>
          <textarea
            name="data.question_text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.data.question_text}
          />
          {formik.touched.data?.question_text &&
            formik.errors.data?.question_text && (
              <div className="error-message">
                {formik.errors.data.question_text}
              </div>
            )}
        </div>
        <br />
        <hr />
        <div>
          <h3>Choices:</h3>
          {formik.values.data.choices.map((choice, index) => (
            <div key={index} style={{ margin: "13px" }}>
              <input
                type="text"
                name={`data.choices[${index}]`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={choice}
              />

              {formik.touched.data?.choices?.[index] &&
                formik.errors.data?.choices?.[index] && (
                  <div className="error-message">
                    {formik.errors.data.choices[index]}
                  </div>
                )}
              <input
                style={{ marginLeft: "5px" }}
                type="radio"
                name="data.correct_answer"
                value={choice}
                checked={formik.values.data.correct_answer === choice}
                onChange={formik.handleChange}
              />
              <br />
            </div>
          ))}
          {formik.touched.data?.correct_answer &&
            formik.errors.data?.correct_answer && (
              <div className="error-message">
                {formik.errors.data.correct_answer}
              </div>
            )}
        </div>
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MCQForm;
