import { TextField, Button, Box, Link, Alert, AlertTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../features/questions/questionSlice";
import AssignemntsList from "../features/assignments/AssignemntsList";
function AdminBase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    dispatch(fetchQuestions()).then((res) => {
      if (!res.error) {
        console.log("questions fetched succesfully");
      }
    });
    navigate(`/user/createAssignment`);
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
        <div>
          <Button variant="outlined" onClick={handleClick}>
            <AddIcon /> Create New Assignment
          </Button>
          <section id="assignmentsList">
            <AssignemntsList />
          </section>
        </div>
      </Box>
    </>
  );
}

export default AdminBase;
