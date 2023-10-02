import { useSelector } from "react-redux";
import { selectQuestions } from "../questions/questionSlice";
import { useState } from "react";
import AllQuestions from "./AllQuestions";
import { Button } from "@mui/material";
import AllCodingQuestions from "./AllCodingQuestions";
import AllMultipleChoiceQuestions from "./AllMultipleChoiceQuestions";

function QuestionsList() {
  const questionsList = useSelector(selectQuestions);
  const [showQuestions, setShowQuestions] = useState("all");

  return (
    <>
      <div className="question-display-select-btns">
        <Button
          variant="contained"
          onClick={() => {
            setShowQuestions("all");
          }}
        >
          All Questions
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowQuestions("coding");
          }}
        >
          Coding Questions
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowQuestions("mcq");
          }}
        >
          Mcqs
        </Button>
      </div>
      {showQuestions === "all" ? (
        <AllQuestions questionsList={questionsList} />
      ) : showQuestions === "coding" ? (
        <AllCodingQuestions questionsList={questionsList} />
      ) : (
        <AllMultipleChoiceQuestions questionsList={questionsList} />
      )}
    </>
  );
}
export default QuestionsList;
