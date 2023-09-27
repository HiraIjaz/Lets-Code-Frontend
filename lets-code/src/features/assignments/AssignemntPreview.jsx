import AllQuestions from "../questions/AllQuestions";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import SliderBtns from "../../components/SliderBtns";
import { useNavigate } from "react-router-dom";
import { createAssignment } from "./assignemntSlice";
import { routes } from "../../routes";

export function AssignemntPreview({ data, next, prev, questionsList }) {
  const dispath = useDispatch();
  const navigate = useNavigate();

  function handleSaveAssignment(data) {
    console.log("Button clicked!");
    const assignmentData = {
      title: data.title,
      description: data.description,
      questions: questionsList,
    };
    console.log(assignmentData);
    dispath(createAssignment(assignmentData)).then((res) => {
      if (!res.error) {
        navigate(routes.adminBasePage);
      }
    });
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
export default AssignemntPreview;
