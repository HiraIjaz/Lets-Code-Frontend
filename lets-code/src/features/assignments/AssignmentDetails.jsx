import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Link, Alert, AlertTitle } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SliderBtns from "../../components/SliderBtns";
// eslint-disable-next-line react/prop-types
function AssignmentDetails({ data, next, prev }) {
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
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        next(values);
      }}
    >
      {({ values }) => (
        <Form className="assignment-form">
          <SliderBtns
            date={data}
            prev={prev}
            showPrev={false}
            showNext={true}
          />
          <div className="form-group">
            <label htmlFor="title">Title</label>
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
            <label htmlFor="description">Description (Optional)</label>
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
        </Form>
      )}
    </Formik>
  );
}
export default AssignmentDetails;
