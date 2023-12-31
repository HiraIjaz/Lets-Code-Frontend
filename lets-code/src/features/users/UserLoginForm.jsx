import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Link, Alert, AlertTitle } from "@mui/material";
import { login } from "./usersSlice";
import AutoCloseAlert from "../../components/AutoCloseAlter";
import { routes } from "../../routes";
import {
  getUserError,
  getUserLoading,
  getUser,
  getSuccessMessage,
} from "./usersSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserEnrollments } from "../enrollments/enrollmentsSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const loading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const user = useSelector(getUser);
  const success = useSelector(getSuccessMessage);

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values)).then((res) => {
      if (!res.error) {
        setSubmitting(false);
        navigate(routes.userBasePage);
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          mt: 12,
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        autoComplete="off"
      >
        <h2>Login Form</h2>
        {error !== "loggedin" && error !== null && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
            <strong> try again!</strong>
          </Alert>
        )}
        {(success === "User loggedin" ||
          success === "You have been registered") && (
          <AutoCloseAlert
            message={success}
            alertType="success"
            time="0"
          ></AutoCloseAlert>
        )}

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
              <div>
                <Field
                  as={TextField}
                  required
                  fullWidth
                  name="username"
                  label="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="password"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <Button sx={{ mt: 2 }} type="submit" variant="contained">
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <p>
          Dont have an account?
          <Link
            onClick={() => {
              navigate(routes.signupPage);
            }}
          >
            register now
          </Link>
        </p>
      </Box>
    </>
  );
}

export default LoginForm;
