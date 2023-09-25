import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AssignmentDetails from "../features/assignments/AssignmentDetails";
import AddQuestions from "../features/assignments/AddQuestions";
import AssignemntPreview from "../features/assignments/AssignemntPreview";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getSelectedQuestions } from "../features/questions/questionSlice";

// eslint-disable-next-line react/prop-types
function MyStepper({ activeStep, data, next, prev }) {
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
        <AssignemntPreview
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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
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

export default MyStepper;
