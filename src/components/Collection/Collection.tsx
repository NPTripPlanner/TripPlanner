import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import {Button, Typography} from '@material-ui/core';

type IProps = {
    direction?: string;
    moreItems?: boolean;
    onLoadMore?: ()=>void;
    children: React.ReactNode;
};
type Ref = HTMLDivElement;

const style = createStyles({
  scrollable: (props:IProps)=>({
    width: '100%',
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: props.direction==='horizontal'?'row':'column',
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "auto",
  }),
  moreBtn:{
    width: '100%',
    textAlign: 'center',
  }
});

const Collection = React.forwardRef<Ref, IProps>((props, ref) => {
  const {
      direction = 'horizontal',
      moreItems = false,
      onLoadMore = null,
      children,
  } = props;
  const classes = makeStyles(style)({direction});

  const handleLoadMore = ()=>{
    if(onLoadMore) onLoadMore();
  }

  return (
    <div ref={ref} className={classes.scrollable}>
    {children}
    {moreItems?
    <div className={classes.moreBtn}>
      <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={handleLoadMore}
      >
        <Typography variant="h6">Load More</Typography>
      </Button>
    </div>
    :
    null
    }
    </div>
  );
});

export default Collection;
