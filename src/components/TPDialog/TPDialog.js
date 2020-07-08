import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";

import { ReactComponent as Close } from "../../assets/images/Dialog/close-button.svg";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const style = {
  header: {
    display: "flex",
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  contnet: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
};

const TPDialog = React.forwardRef(
  ({ title, footers, onClose, children, ...rest }, ref) => {
    const classes = makeStyles(style)();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClose = () => {
      if (onClose) onClose();
    };

    return (
      <Dialog ref={ref} {...rest} fullScreen={fullScreen}>
        <DialogTitle>
          <div className={classes.header}>
            <div className={classes.title}>
              <Typography variant="h5">{title}</Typography>
            </div>
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={classes.contnet}>{children}</div>
        </DialogContent>
        <DialogActions>
          {!footers
            ? null
            : footers.map((footer, i) => {
                return <div key={i}>{footer}</div>;
              })}
        </DialogActions>
      </Dialog>
    );
  }
);

export default TPDialog;
