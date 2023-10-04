import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PropTypes } from "prop-types";
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
SliderBtns.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showNext: PropTypes.bool.isRequired,
  showPrev: PropTypes.bool.isRequired,
};
export default SliderBtns;
