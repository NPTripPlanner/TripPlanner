import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const defaultImgUrl =
  "https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80";

type IProps = {
  src?: string;
  backgroundColor?: string;
  flexDirection?: string;
  children?: React.ReactNode;
}
type Ref = HTMLDivElement;

const style = createStyles({
  main: (props:IProps) => ({
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: props.src ? `url(${props.src})` : "",
    height: "inherit",
  }),
  content: (props) => ({
    padding: "2%",
    height: "100%",
    display: "flex",
    flexDirection: props.flexDirection === "vertical" ? "column" : "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: `${props.backgroundColor}`,
  }),
});

const StaticBG = React.forwardRef<Ref, IProps>((props,ref) => {
  const {
    src = defaultImgUrl,
    backgroundColor = "rgba(255,255,255,0.5)",
    flexDirection = "vertical",
    children,
  } = props;
  const classes = makeStyles(style)({src, backgroundColor, flexDirection});

  return (
    <div ref={ref} className={classes.main}>
      <div className={classes.content}>{children}</div>
    </div>
  );
});

export default StaticBG;
