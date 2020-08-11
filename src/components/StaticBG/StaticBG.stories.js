import React from "react";

import StaticBG from "./StaticBG";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";
import imgUrl from "../../assets/images/TripManage/collection-bg.jpeg";

export default {
  title: "StaticBG",
};

export const Default = () => {
  return (
    <ThemeProvider theme={theme}>
      <StaticBG src={imgUrl} backgroundColor="rgba(255,255,255,0.7)">
        <h1>The background-attachment Property</h1>

        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>
          If you do not see any scrollbars, try to resize the browser window.
        </p>
      </StaticBG>
    </ThemeProvider>
  );
};

export const imageURL = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80";
  return (
    <ThemeProvider theme={theme}>
      <StaticBG src={imgUrl} backgroundColor="rgba(255,255,255,0.3)">
        <h1>The background-attachment Property</h1>

        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>The background-image is fixed. Try to scroll down the page.</p>
        <p>
          If you do not see any scrollbars, try to resize the browser window.
        </p>
      </StaticBG>
    </ThemeProvider>
  );
};
