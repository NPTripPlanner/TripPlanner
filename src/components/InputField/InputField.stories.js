import React from "react";

import InputField from "./InputField";

import { IconButton, CircularProgress } from "@material-ui/core";
import { AcUnit, Accessibility, Search } from "@material-ui/icons";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

import { action } from "@storybook/addon-actions";

export default {
  title: "InputField",
};

export const Default = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputField
        labelText="Name"
        onChange={(event) => action(event.target.value)()}
      />
    </ThemeProvider>
  );
};

export const outlined = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputField
        labelText="Name"
        variant="outlined"
        onChange={(event) => action(event.target.value)()}
      />
    </ThemeProvider>
  );
};

export const filled = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputField
        labelText="Name"
        variant="filled"
        onChange={(event) => action(event.target.value)()}
      />
    </ThemeProvider>
  );
};

export const adornment = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputField
        labelText="Name"
        variant="outlined"
        required
        onChange={(event) => action(event.target.value)()}
        startAdornment={
          <IconButton>
            <AcUnit />
          </IconButton>
        }
        endAdornment={<Accessibility />}
      />
    </ThemeProvider>
  );
};

export const searchField = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputField
        labelText="Search"
        variant="outlined"
        onChange={(event) => action(event.target.value)()}
        startAdornment={<Search />}
        endAdornment={<CircularProgress />}
      />
    </ThemeProvider>
  );
};
