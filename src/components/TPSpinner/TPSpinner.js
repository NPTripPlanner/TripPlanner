import React from "react";

import { CircularProgress, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const style = {
  spinner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

const TPSpinner = React.forwardRef(
  ({ spinTitle, isLoading = false, children }, ref) => {
    const classes = makeStyles(style)();

    if (isLoading) {
      return (
        <div ref={ref} className={classes.spinner}>
          <CircularProgress color="primary" />
          <div>
            <Typography variant="h6">{spinTitle}</Typography>
          </div>
        </div>
      );
    }

    return children;
  }
);

export default TPSpinner;
