import React from "react";

import Header from "./Header";
import { Avatar, IconButton } from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/Alarm";
import Home from "@material-ui/icons/Home";
import PlaceRounded from "@material-ui/icons/PlaceRounded";
import { ThemeProvider } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../../assets/images/Logo/logo.svg";

import theme from "../../themes/defaultTheme";

export default {
  title: "Header",
};

export const Default = () => {
  return <Header title="This is title" />;
};

export const Brand = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header
        brand={
          <Avatar variant="rounded">
            <Logo />
          </Avatar>
        }
        title="This is title"
      />
    </ThemeProvider>
  );
};

export const Buttons = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header
        brand={
          <Avatar variant="rounded">
            <Logo />
          </Avatar>
        }
        title="Trip Planner"
        rightButtons={[
          <IconButton>
            <AlarmIcon />
          </IconButton>,
          <IconButton>
            <PlaceRounded />
          </IconButton>,
          <IconButton>
            <Home />
          </IconButton>,
        ]}
      />
    </ThemeProvider>
  );
};
