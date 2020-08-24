import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

type IProps = {
  [key:string]:{}|string;
  text: string;
}
const style = createStyles({
  pre: {
    margin: "0 0 ",
    whiteSpace: "pre-wrap",
  },
});

const FTypography = React.forwardRef<any, IProps>((props, ref) => {
  const { text, ...rest } = props
  const classes = makeStyles(style)();
  return (
    <pre ref={ref} className={classes.pre}>
      <Typography {...rest}>{text}</Typography>
    </pre>
  );
});

export default FTypography;
