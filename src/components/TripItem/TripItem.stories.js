import React from "react";

import TripItem from './TripItem';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themes/defaultTheme";

import {action} from '@storybook/addon-actions';

import imageUrl from '../../assets/images/TripManage/collection-item.jpeg';

export default {
  title: "TripItem",
};

export const Default = ()=>{

    return (
        <ThemeProvider theme={theme}>
            <TripItem 
            maxWidth={345}
            image={imageUrl}
            tripName='My lovely trip'
            startDate='07/Sep/2020'
            createDate='01/Sep/2020'
            customData={{
                id:'aaaidke13432',
                name:'hhgf'
            }}
            onEdit={(data)=>action('Edit')(data)}
            onDelete={(data)=>action('Delete')(data)}
            />
        </ThemeProvider>
    )
}