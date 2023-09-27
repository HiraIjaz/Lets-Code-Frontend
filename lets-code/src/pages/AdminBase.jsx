import { TextField, Button, Box, Link, Alert, AlertTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AssignemntsList from "../features/assignments/AssignemntsList";
import { routes } from "../routes";
import AutoCloseAlert from "../components/AutoCloseAlter";
import { useSelector } from "react-redux";
import { getSuccessMessage } from "../features/assignments/assignemntSlice";
import { useState } from "react";
function AdminBase() {
  const navigate = useNavigate();
  const success = useSelector(getSuccessMessage);

  console.log(success);
  function handleCreateNewAssignmentClick() {
    navigate(routes.createAssignment);
  }

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          mt: 12,
          ml: 4,
          mr: 4,
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        autoComplete="off"
      >
        <h2>Hi, Welcome Back</h2>
        <hr />
        <div>
          <Button variant="outlined" onClick={handleCreateNewAssignmentClick}>
            <AddIcon /> Create New Assignment
          </Button>

          {success === "Assignemnt created" && (
            <AutoCloseAlert
              message={success}
              alertType="success"
              time="2"
            ></AutoCloseAlert>
          )}
          {success === "Assignemnt updated" && (
            <AutoCloseAlert
              message={success}
              alertType="success"
              time="2"
            ></AutoCloseAlert>
          )}
          <section id="assignmentsList">
            <AssignemntsList />
          </section>
        </div>
      </Box>
    </>
  );
}

export default AdminBase;
