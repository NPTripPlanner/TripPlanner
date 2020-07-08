import React from "react";

import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const Section = React.forwardRef(
  ({ title, content, horizontalGutter = true, verticalGutter = true }, ref) => {
    const style = (theme) => ({
      outter: {
        padding: `${verticalGutter ? "1%" : "0"} ${
          horizontalGutter ? "1%" : "0"
        }`,
      },
      inner: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "stretch",
      },
      title: {
        textAlign: "center",
        padding: "1% 1%",
        backgroundColor: theme.palette.primary.main,
      },
      content: {
        paddingTop: "1%",
      },
    });
    const classes = makeStyles(style)();
    return (
      <div ref={ref} className={classes.outter}>
        <div className={classes.inner}>
          <div className={classes.title}>
            <Typography variant="h4">{title}</Typography>
          </div>
          <div className={classes.content}>{content}</div>
        </div>
      </div>
    );
  }
);

export default Section;
