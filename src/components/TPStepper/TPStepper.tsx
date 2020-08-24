import React from "react";

import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

export interface Steps {
  label: string;
  icon: React.ReactNode;
}
type IProps = {
  [key:string]:{}|string;
  steps: Array<Steps>;
  initStep: number;
  stepIcon: React.ElementType<any>;
}

const style = createStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    textAlign: "center",
  },
});

const TPStepper = React.forwardRef<any, IProps>((props, ref) => {
    const { 
      steps = Array<Steps>(),
      initStep = 1,
      stepIcon,
      ...rest
    } = props;

    const classes = makeStyles(style)();

    const [activeStep, setActiveStep] = React.useState(initStep);

    const handleNextStep = () => setActiveStep((preStep) => preStep + 1);

    return (
      <div className={classes.main}>
        <Stepper ref={ref} activeStep={activeStep} {...rest}>
          {steps.map((step) => {
            return (
              <Step key={step.label}>
                <StepLabel StepIconComponent={stepIcon} />
              </Step>
            );
          })}
        </Stepper>
        {activeStep < steps.length ? (
          <div className={classes.button}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleNextStep}
            >
              {activeStep === steps.length - 1 ? (
                <Typography variant="h6">Finish</Typography>
              ) : (
                <Typography variant="h6">Next</Typography>
              )}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
);

export default TPStepper;
