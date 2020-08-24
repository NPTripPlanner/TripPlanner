import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

interface Section {
  title:string;
  links:Array<React.ReactNode>;
}
type IProps = {
  sections: Array<Section>;
}

const style = (theme) => createStyles({
  main: {
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    left: 0,
    right: 0,
    bottom: 0,
  },
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    padding: "0.8% 1%",
  },
  copyright: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.primary,
    padding: "0% 1% 0.8% 1%",
  },
});

const Footer = (props:IProps) => {
  const {
    sections
  } = props;

  const classes = makeStyles(style)();

  return (
    <div className={classes.main}>
      <div>
        {sections.map((section) => {
          return (
            <div key={section.title} className={classes.section}>
              {section.links.map((link, i) => {
                return (
                  <div key={i} className={classes.link}>
                    {link}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={classes.copyright}>
        <Typography variant="subtitle1">{`@copyright`}</Typography>
      </div>
    </div>
  );
};

export default Footer;
