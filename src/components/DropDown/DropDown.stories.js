import React from "react";

import DropDown from "./DropDown";

import { Avatar, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

import { action } from "@storybook/addon-actions";

const style = (theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default {
  title: "DropDown",
};

const items = [
  {
    title: "Setting",
    onClick: action("Setting click"),
  },
  {
    title: "Logout",
    onClick: action("Logout click"),
  },
];

export const Default = () => {
  const classes = makeStyles(style)();

  const handleItemClick = (index) => {
    console.log(index);
    items[index].onClick();
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <DropDown
          icon={
            <Avatar className={classes.avatar}>
              <Typography variant="h6">A</Typography>
            </Avatar>
          }
          dropdownItems={items}
          onItemClicked={handleItemClick}
        />
      </div>
    </ThemeProvider>
  );
};
