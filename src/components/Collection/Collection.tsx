import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

type IProps = {
    direction?: string;
    children: React.ReactNode;
};
type Ref = HTMLDivElement;

const style = createStyles({
  scrollable: (props:IProps)=>({
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: props.direction==='horizontal'?'row':'column',
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "auto",
  }),
});

const Collection = React.forwardRef<Ref, IProps>((props, ref) => {
  const {
      direction = 'horizontal',
      children,
  } = props;
  const classes = makeStyles(style)({direction});

  return (
    <div ref={ref} className={classes.scrollable}>
    {children}
    </div>
  );
});

export default Collection;
