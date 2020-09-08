import React from "react";

import TripArchiveItem from "./TripArchiveItem";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

// import { action } from "@storybook/addon-actions";

// import imageUrl from "../../assets/images/TripManage/collection-item.jpeg";

export default {
  title: "TripArchive",
};

export const Default = () => {
  return (
    <ThemeProvider theme={theme}>
      <TripArchiveItem title='My title'/>
    </ThemeProvider>
  );
};
