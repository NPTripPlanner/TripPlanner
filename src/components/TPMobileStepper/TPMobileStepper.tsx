import React from "react";

import { MobileStepper, Paper, Typography } from "@material-ui/core";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {Steps} from '../TPStepper/TPStepper';

type IProps = {
  steps?: Array<Steps>;
}

const style = createStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const TPMobileStepper = React.forwardRef<any, IProps>((props, ref) => {
  const { 
    steps = Array<Steps>(), 
  } = props;
  const classes = makeStyles(style)();
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(1);

  const handleStepChange = (step) => setActiveStep(step);

  return (
    <div ref={ref} className={classes.main}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {steps.map((step) => {
          return (
            <div key={step.label} className={classes.icon}>
              {step.icon}
            </div>
          );
        })}
      </AutoPlaySwipeableViews>
      <Paper square elevation={0}>
        <div className={classes.title}>
          <Typography variant="h6">{steps[activeStep].label}</Typography>
        </div>
      </Paper>
      <MobileStepper
        steps={steps.length}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={<div></div>}
        backButton={<div></div>}
      />
    </div>
  );
});

export default TPMobileStepper;
