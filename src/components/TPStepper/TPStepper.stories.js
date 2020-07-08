import React from "react";

import TPStepper from "./TPStepper";
import Connector from "./Connector/Connector";
import SVGStepIcon from "./SVGStepIcon/SVGStepIcon";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

export default {
  title: "TPStepper",
};

const steps = ["Create", "Plan", "Travel"];

export const Default = () => {
  return (
    <ThemeProvider theme={theme}>
      <TPStepper steps={steps} alternativeLabel />
    </ThemeProvider>
  );
};

export const CustomConnector = () => {
  return (
    <ThemeProvider theme={theme}>
      <TPStepper
        steps={steps}
        connector={<Connector />}
        stepIcon={SVGStepIcon}
      />
    </ThemeProvider>
  );
};
