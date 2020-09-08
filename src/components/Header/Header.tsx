import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";

type IProps = {
  brand: any;
  title?: string;
  rightButtons?: Array<React.ReactNode>;
  onBrandClick?: ()=>void;
}

const style = createStyles({
  group: {
    width: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  buttonGroup: {
    flex: '1',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    textAlign:'center',
    padding: "0 1%",
    flex: "1",
  },
  brand: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  brandIcon:{
    cursor:'pointer'
  }
});

const renderRightButtons = (buttons) => {
      
  return buttons.map((btn, i) => (
    <div key={i}>{btn}</div>
  ));
};

const Header = React.forwardRef<any, IProps>((props, ref) => {

  const { 
    brand, 
    title = '', 
    rightButtons = Array<React.ReactNode>(),
    onBrandClick = null,
   } = props;

  const classes = makeStyles(style)();

  const handleBrandClick = ()=>{
    if(onBrandClick) onBrandClick();
  }

  return (
    <AppBar ref={ref} color="primary">
      <Toolbar>
        <div className={classes.group}>
          <div className={classes.brand}>
            {!brand ? null : 
              <div onClick={handleBrandClick}>
                <div className={classes.brandIcon}>{brand}</div>
              </div>
            }
          </div>
          <div className={classes.title}>
          {!title ? null : (
            <Typography variant="h4">
              {title}
            </Typography>
          )}
          </div>
          <div className={classes.buttonGroup}>
          {!rightButtons ? null : renderRightButtons(rightButtons)}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
