import React from "react";

import Hero from "./Hero";
import heroImageUrl from "../../assets/images/Landing/hero-img.png";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

export default {
  title: "Hero",
};

export const Default = () => {
  return <Hero imageUrl={heroImageUrl} />;
};

export const Text = () => {
  return (
    <ThemeProvider theme={theme}>
      <Hero imageUrl={heroImageUrl} title="Plan your journey" />
    </ThemeProvider>
  );
};
