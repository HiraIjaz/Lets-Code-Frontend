import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function SliderBtns({ next, prev, data, showNext, showPrev }) {
  return (
    <div className="slider-btns">
      <Button
        type="reset"
        variant="outlined"
        onClick={() => prev(data)}
        disabled={!showPrev}
      >
        <ArrowBackIcon />
        Previous Step
      </Button>
      <Button
        type="submit"
        variant="outlined"
        onClick={() => next(data)}
        disabled={!showNext}
      >
        <ArrowForwardIcon />
        Next Step
      </Button>
    </div>
  );
}
export default SliderBtns;
