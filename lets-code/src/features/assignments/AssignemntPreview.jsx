import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AllQuestions from "../questions/AllQuestions";
import { useSelector } from "react-redux";
import { getSelectedQuestions } from "../questions/questionSlice";
import { Button } from "@mui/material";
import SliderBtns from "../../components/SliderBtns";
export function AssignemntPreview({ data, next, prev, questionsList }) {
  console.log(questionsList);
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
        <p>{data.details}</p>
        <hr />
        <AllQuestions questionsList={questionsList} />
      </div>
      <div>
        <Button variant="contained">Save Assigenment</Button>
      </div>
    </>
  );
}
export default AssignemntPreview;
