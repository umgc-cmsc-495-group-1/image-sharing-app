import React, {useState} from "react";
import {
  Box, Stepper,
  Button, Paper,
  Typography, Container
} from '@mui/material'
import { steps } from "./steps";
import {CustomStepper} from "./CustomStepper";
// import {useNavigate} from "react-router-dom";

const Signup = () => {
  // const navigate = useNavigate();
  // const [displayName, setDisplayName] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [verifyPassword, setVerifyPassword] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  // handlers
  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleRedirect = () => "";

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          maxWidth: 400
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index: number) => (
            <CustomStepper
              key={`${step.label}-${index}`}
              index={index}
              step={step}
              size={steps.length}
              handleNext={handleNext}
              handleBack={handleBack}
              handleRedirect={handleRedirect}
            />
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleRedirect} sx={{ mt: 1, mr: 1 }}>
              Go to Profile
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export {
  Signup
};
