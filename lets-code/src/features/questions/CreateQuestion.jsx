import CodingQuestionForm from "./CodingQCreationForm";
import MCQForm from "./McQCreationForm.jsx";
import { useState } from "react";
import { Box } from "@mui/material";
function CreateQuestion() {
  const [questionType, setQuestionType] = useState("mcq");

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        mt: 12,
        ml: "auto",
        mr: "auto",
        p: 6,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      autoComplete="off"
      width="90%"
      height="auto"
    >
      <div>
        <h2>Create Question</h2>
        <div>
          <label>Select Question Type:</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="coding">Coding</option>
          </select>
        </div>
        <br />
        {questionType === "mcq" ? <MCQForm /> : <CodingQuestionForm />}
      </div>
    </Box>
  );
}

export default CreateQuestion;
