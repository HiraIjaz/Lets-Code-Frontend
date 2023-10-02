import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SliderBtns from "../../components/SliderBtns";
import PropTypes from "prop-types";

function AssignmentDetails({ data, next, prev }) {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").max(100),
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
AssignmentDetails.propTypes = {
  data: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};
export default AssignmentDetails;
