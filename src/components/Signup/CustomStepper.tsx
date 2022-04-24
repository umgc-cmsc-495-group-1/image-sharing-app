import React from "react";
import {
  Box, Button,
  Step, StepContent,
  StepLabel, Typography
} from "@mui/material";

interface CustomStepperProps {
  index: number;
  step: {
    label: string;
    description: string;
    userInput: JSX.Element;
  };
  size: number;
  handleNext: () => void;
  handleBack: () => void;
  handleRedirect: () => void;
}

const CustomStepper: React.FC<CustomStepperProps> = ({
  step,
  handleNext, handleBack, index, size
}) => {
  return (
    <>
      <Step key={step.label}>
        <StepLabel
          optional={
            index === 2 ? (
              <Typography variant="caption">Last step</Typography>
            ) : null
          }
        >
          {step.label}
        </StepLabel>
        <StepContent>
          <Typography>{step.description}</Typography>
          <Box>
            {step.userInput}
          </Box>
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                {index === size - 1 ? 'Finish' : 'Continue'}
              </Button>
              <Button
                disabled={index === 0}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </StepContent>
      </Step>
    </>
  )
}

export {
  CustomStepper
}
