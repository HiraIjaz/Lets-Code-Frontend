import AssignmentDetails from "../features/assignments/AssignmentDetails";
import AddQuestions from "../features/assignments/AddQuestions";
import AssignmentPreview from "../features/assignments/AssignmentPreview";
import { Box, Step, StepLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { getSelectedQuestions } from "../features/questions/questionSlice";
import { PropTypes } from "prop-types";
import MuiStepper from "@mui/material/Stepper";
function Stepper({ activeStep, data, next, prev }) {
  const selectedQuestionsList = useSelector(getSelectedQuestions);
  const steps = [
    {
      label: "Details",
      component: <AssignmentDetails data={data} next={next} prev={prev} />,
    },
    {
      label: "Question List",
      component: <AddQuestions data={data} next={next} prev={prev} />,
    },
    {
      label: "Review",
      component: (
        <AssignmentPreview
          data={data}
          next={next}
          prev={prev}
          questionsList={selectedQuestionsList}
        />
      ),
    },
  ];
  return (
    <div>
      <MuiStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          mt: 12,
          ml: 4,
          mr: 4,
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        autoComplete="off"
      >
        {steps[activeStep].component}
      </Box>
    </div>
  );
}
Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};

export default Stepper;
