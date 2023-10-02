import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuestionById } from "./questionSlice";
import { useParams } from "react-router-dom";
import { editQuestion } from "./questionSlice";
import { routes } from "../../routes";

function EditMcQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(editQuestion(values)).then((res) => {
      if (!res.error) {
        navigate(routes.questionBank);
      }
    });
  };

  let { id } = useParams();
  const question = useSelector((state) => getQuestionById(state, parseInt(id)));

  const initialValues = {
    id: parseInt(id),
    title: question.title,
    data: {
      choices: question.data.choices,
      question_text: question.data.question_text,
      correct_answer: question.data.correct_answer,
    },
  };

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

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        ml: "auto",
        mr: "auto",
        mt: 8,
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
          <Form>
            <div className="question-deets">
              <label htmlFor="title">
                <h4>Title</h4>
              </label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />

              <label htmlFor="data.question_text">
                <br />
                <h4>Question Text</h4>
              </label>
              <Field
                as="textarea"
                id="data.question_text"
                name="data.question_text"
              />
              <ErrorMessage
                name="data.question_text"
                component="div"
                className="error-message"
              />
            </div>
            <br />
            <hr />
            <div>
              <h3>Choices:</h3>
              {values.data.choices.map((choice, index) => (
                <div key={index} style={{ margin: "13px" }}>
                  <Field type="text" name={`data.choices[${index}]`} />
                  <ErrorMessage
                    name={`data.choices[${index}]`}
                    component="div"
                    className="error-message"
                  />

                  <Field
                    type="radio"
                    name="data.correct_answer"
                    value={choice}
                    checked={values.data.correct_answer === choice}
                  />
                  <br />
                </div>
              ))}
              <ErrorMessage
                name="data.correct_answer"
                component="div"
                className="error-message"
              />
            </div>
            <br />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default EditMcQuestion;
