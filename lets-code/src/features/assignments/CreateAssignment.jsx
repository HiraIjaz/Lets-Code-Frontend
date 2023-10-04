import { Step, StepLabel, Box, Button } from "@mui/material";
import { useState } from "react";
import Stepper from "../../components/Stepper";

function CreateAssignment() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [activeStep, setActiveStep] = useState(0);

  function nextStep(newData) {
    if (activeStep < 2) {
      setData((prev) => ({ ...prev, ...newData }));
      setActiveStep((currentStep) => currentStep + 1);
    }
  }

  function prevStep(newData) {
    if (activeStep > 0) {
      setData((prev) => ({ ...prev, ...newData }));
      setActiveStep((currentStep) => currentStep - 1);
    }
  }

  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          mt: 12,
          ml: "auto",
          mr: "auto",
          p: 6,
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        autoComplete="off"
        width="90%"
        height="auto"
        backgroundColor="rgba(111, 146, 205, 0.5)"
      >
        <h2>New Assignmnet </h2>
        <Stepper
          activeStep={activeStep}
          data={data}
          next={nextStep}
          prev={prevStep}
        />
      </Box>
    </>
  );
}

export default CreateAssignment;
