import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  getSelectedQuestions,
  addQuestion,
  removeQuestion,
} from "../features/questions/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import QuestionDetails from "./QuestionDetails";
import { isQuestionSelected } from "../utils";
import PropTypes from "prop-types";
function Question({ question }) {
  const dispatch = useDispatch();
  const selectedQuestions = useSelector(getSelectedQuestions);
  const [isSelected, setIsSelected] = useState(
    isQuestionSelected(selectedQuestions, question)
  );

  function handleAddQuestion() {
    if (!isSelected) {
      dispatch(addQuestion({ question }));
    }
  }
  function handleRemoveQuestion() {
    dispatch(removeQuestion({ question }));
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

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
export default Question;
