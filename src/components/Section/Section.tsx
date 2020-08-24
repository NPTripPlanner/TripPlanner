import React from "react";

import { Typography } from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

type IProps = {
  title: string;
  content?: React.ReactNode;
  horizontalGutter?: boolean;
  verticalGutter?: boolean;
}

const style = (theme) => createStyles({
  outter: (props:IProps)=>({
    padding: `${props.verticalGutter ? "1%" : "0"} ${
      props.horizontalGutter ? "1%" : "0"
    }`,
  }),
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

const Section = React.forwardRef<any, IProps>((props, ref) => {
    const { 
      title,
      content,
      horizontalGutter= true,
      verticalGutter = true,
    } = props;

    const classes = makeStyles(style)({horizontalGutter, verticalGutter});

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
