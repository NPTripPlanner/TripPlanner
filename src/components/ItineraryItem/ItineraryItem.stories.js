import React from "react";

import ItineraryItem from "./ItineraryItem";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

// import { action } from "@storybook/addon-actions";

// import imageUrl from "../../assets/images/TripManage/collection-item.jpeg";

export default {
  title: "ItineraryItem",
};

export const Default = () => {
  return (
    <ThemeProvider theme={theme}>
      <ItineraryItem 
      width={200}
      title='My title'
      startDate='09/08/2020'
      endDate='12/12/2020'
      />
    </ThemeProvider>
  );
};
