import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const style = (theme) => ({
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

const Footer = React.forwardRef(({ sections }, ref) => {
  const classes = makeStyles(style)();

  return (
    <div ref={ref} className={classes.main}>
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
});

export default Footer;
