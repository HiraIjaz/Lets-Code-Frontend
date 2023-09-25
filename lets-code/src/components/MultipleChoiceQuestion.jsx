import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QuestionDetails from "./QuestionDetails";
import {
  questionAdded,
  questionRemoved,
} from "../features/questions/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getSelectedQuestions } from "../features/questions/questionSlice";

function isQuestionSelected(questionList, q) {
  return questionList.some((question) => question.id === q.id);
}

// eslint-disable-next-line react/prop-types
function MultipleChoiceQuestion({ question }) {
  const dispatch = useDispatch();

  const selectedQuestions = useSelector(getSelectedQuestions);
  const [isSelected, setIsSelected] = useState(
    isQuestionSelected(selectedQuestions, question)
  );

  function handleAddQuestion() {
    dispatch(questionAdded({ question }));
  }
  function handleRemoveQuestion() {
    console.log("inside here");
    dispatch(questionRemoved({ question }));
  }
  return (
    <li>
      <div className="question-container">
        <div className="Add-Remove-Btns">
          <IconButton
            aria-label="add"
            color="success"
            onClick={() => {
              setIsSelected(true);
              handleAddQuestion();
            }}
            disabled={isSelected}
          >
            {isSelected ? <CheckCircleIcon /> : <AddCircleOutlineIcon />}
          </IconButton>
          <IconButton
            aria-label="remove"
            color="error"
            onClick={() => {
              setIsSelected(false);
              handleRemoveQuestion();
            }}
            disabled={!isSelected}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </div>
        <QuestionDetails question={question} />
      </div>
    </li>
  );
}

export default MultipleChoiceQuestion;
