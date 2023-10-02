import AllQuestions from "../questions/AllQuestions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import SliderBtns from "../../components/SliderBtns";
import { useNavigate } from "react-router-dom";
import { createAssignment } from "./assignmentSlice";
import { routes } from "../../routes";
import PropTypes from "prop-types";
export function AssignmentPreview({ data, next, prev, questionsList }) {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.assignmnets.error);

  function handleSaveAssignment(data) {
    const assignmentData = {
      title: data.title,
      description: data.description,
      questions: questionsList,
    };

    dispath(createAssignment(assignmentData));
    if (!error) {
      navigate(routes.adminBasePage);
    }
  }
  return (
    <>
      <SliderBtns
        date={data}
        prev={prev}
        next={next}
        showPrev={true}
        showNext={false}
      />
      <div className="assignemnt-preview">
        <h1>{data.title}</h1>
        <br />
        <p>{data.description}</p>
        <hr />
        <AllQuestions questionsList={questionsList} />
      </div>
      <div>
        <Button variant="contained" onClick={() => handleSaveAssignment(data)}>
          Save Assigenment
        </Button>
      </div>
    </>
  );
}
AssignmentPreview.propTypes = {
  data: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  questionsList: PropTypes.array.isRequired,
};
export default AssignmentPreview;
