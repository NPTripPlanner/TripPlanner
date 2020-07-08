import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const style = {
  pre: {
    margin: "0 0 ",
    whiteSpace: "pre-wrap",
  },
};

const FTypography = React.forwardRef(({ text, ...rest }, ref) => {
  const classes = makeStyles(style)();
  return (
    <pre ref={ref} className={classes.pre}>
      <Typography {...rest}>{text}</Typography>
    </pre>
  );
});

export default FTypography;
