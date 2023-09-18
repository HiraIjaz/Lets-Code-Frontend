import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Alert, AlertTitle } from "@mui/material";
import { getUserError, getUser, getSuccessMessage } from "./usersSlice";
import { useState } from "react";
import { updateProfile } from "./usersSlice";

function UserProfileForm() {
  const error = useSelector(getUserError);
  const currentUser = useSelector(getUser);
  const success = useSelector(getSuccessMessage);
  const [alertVisibility, setAlertVisibility] = useState(true);
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState(false);
  const formData = {
    username: currentUser.username,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updateProfile(values))
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        setEditForm(false);
      })
      .catch((error) => {
        console.error(error.response.data);
        setSubmitting(false);
      });
  };
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      display="flex"
      flexDirection="column"
      gap={2}
      autoComplete="off"
    >
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
          <strong> try again!</strong>
        </Alert>
      )}
      {success === "user information updated" && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Information updated — <strong>successfully!</strong>
        </Alert>
      )}
      <h2>Profile Information</h2>

      <Formik
        initialValues={formData}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
              <Button
                sx={{ mb: 2 }}
                variant="contained"
                onClick={() => setEditForm(true)}
              >
                Edit Info
              </Button>
            </div>
            <div>
              <Field
                as={TextField}
                required
                disabled={!editForm}
                name="username"
                label="Username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <Field
                as={TextField}
                required
                disabled={!editForm}
                name="first_name"
                label="First Name"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Field
                as={TextField}
                required
                disabled={!editForm}
                name="last_name"
                label="Last Name"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="error"
              />
            </div>
            <div>
              <Field
                as={TextField}
                required
                disabled={!editForm}
                type="email"
                name="email"
                label="Email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <Button
              hidden={!editForm}
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
              onClick={() => setEditForm(!editForm)}
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default UserProfileForm;
