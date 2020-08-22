import React from "react";

import Collection from './Collection';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

export default {
  title: "Collection"
};

export const Default = () => {
    const items=[
        'time',
        'time',
        'time',
        'time',
        'time',
        'time',
    ];

    return (
    <ThemeProvider theme={theme}>
        <Collection>
        {
            items.map((item, i)=><div key={i}>{item}</div>)
        }
        </Collection>
    </ThemeProvider>
    );
};
