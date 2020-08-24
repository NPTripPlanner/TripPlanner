import React, { RefObject } from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

type IProps = {
  brand: any;
  title?: string;
  rightButtons?: Array<React.ReactNode>;
}

type Ref = RefObject<HTMLDivElement>;

const style = createStyles({
  group: {
    width: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: "0 1%",
    flex: "1",
  },
  titleTypo: {
    // fontWeight:'900'
  },
});

const Header = React.forwardRef<Ref, IProps>((props, ref) => {

  const { 
    brand, 
    title = '', 
    rightButtons = Array<React.ReactNode>(),
   } = props;

  const classes = makeStyles(style)();

  const renderRightButtons = (buttons) => {
    return (
      <div className={classes.buttonGroup}>
        {buttons.map((btn, i) => (
          <div key={i}>{btn}</div>
        ))}
      </div>
    );
  };
  return (
    <AppBar ref={ref} color="primary">
      <Toolbar>
        <div className={classes.group}>
          {!brand ? null : <div>{brand}</div>}
          {!title ? null : (
            <div className={classes.title}>
              <Typography className={classes.titleTypo} variant="h4">
                {title}
              </Typography>
            </div>
          )}
          {!rightButtons ? null : renderRightButtons(rightButtons)}
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
