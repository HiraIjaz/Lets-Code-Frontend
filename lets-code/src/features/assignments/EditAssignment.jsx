import { Box, Button } from "@mui/material";
import AllQuestions from "../questions/AllQuestions";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getSelectedQuestions } from "../questions/questionSlice";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "./assignmentSlice";
import { updateAssignment } from "./assignmentSlice";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";

function EditAssignment() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignment = useSelector((state) =>
    getAssignmentById(state, parseInt(id, 0))
  );

  const questionsList = useSelector(getSelectedQuestions);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .test(
        "len",
        "Title cannot containt more then 100 characters",
        (val) => val.length <= 100
      ),
  });
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        mt: 12,
        ml: "4",
        mr: "4",
        p: 6,
      }}
      display="flex"
      flexDirection="column"
      gap={2}
      autoComplete="off"
      width="90%"
      height="auto"
    >
      <h1>Edit Assignemnt</h1>
      <Formik
        initialValues={{
          title: assignment.title,
          description: assignment.description,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const data = {
            id: assignment.id,
            title: values.title,
            description: values.description,
            questions: questionsList,
          };
          dispatch(updateAssignment(data)).then((res) => {
            if (!res.error) {
              navigate(routes.adminBasePage);
            }
          });
        }}
      >
        {({ values }) => (
          <Form className="assignment-form">
            <div className="form-group">
              <label htmlFor="title">
                <strong>Title</strong>
              </label>
              <br />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
              <Field className="form-control" name="title" type="text" />
            </div>{" "}
            <br />
            <div className="form-group">
              <label htmlFor="description">
                <strong>Descriptions</strong>
              </label>
              <br />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
              <Field
                className="form-control"
                as="textarea"
                name="description"
                type="text"
              />
            </div>
            <br />
            <h4>Questions</h4>
            <AllQuestions questionsList={questionsList} />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default EditAssignment;
