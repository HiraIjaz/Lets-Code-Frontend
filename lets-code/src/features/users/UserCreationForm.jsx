import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Alert, AlertTitle } from "@mui/material";
import { getUserError } from "./usersSlice";
import { register } from "./usersSlice";
import { useNavigate } from "react-router-dom";

function UserCreationForm() {
  const error = useSelector(getUserError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values))
      .then((res) => {
        if (!res.error) {
          setSubmitting(false);
          navigate(`/user/login`);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <h2>Create Account</h2>
            {error !== "loggedin" && error !== null && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
                <strong> try again!</strong>
              </Alert>
            )}

            <ErrorMessage
              className="error-message"
              name="username"
              component="div"
            />
            <Field
              as={TextField}
              required
              fullWidth
              name="username"
              label="Username"
            />
            <ErrorMessage
              className="error-message"
              name="email"
              component="div"
            />
            <Field
              as={TextField}
              required
              fullWidth
              name="email"
              label="Email"
            />

            <ErrorMessage
              className="error-message"
              name="first_name"
              component="div"
            />
            <Field
              as={TextField}
              required
              fullWidth
              name="first_name"
              label="First Name"
            />

            <ErrorMessage
              className="error-message"
              name="last_name"
              component="div"
            />
            <Field
              as={TextField}
              required
              fullWidth
              name="last_name"
              label="Last Name"
            />

            <ErrorMessage
              className="error-message"
              name="password"
              component="div"
            />
            <Field
              as={TextField}
              type="password"
              required
              fullWidth
              name="password"
              label="Password"
            />

            <ErrorMessage
              className="error-message"
              name="confirm_password"
              component="div"
            />
            <Field
              as={TextField}
              type="password"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
            />
          </Box>
          <Button sx={{ mt: 2 }} type="submit" variant="contained">
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default UserCreationForm;
