import React from 'react';

import Section from './Section';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

export default{
    title:'Section'
}

export const Default = ()=>{
    return(
        <ThemeProvider theme={theme}>
            <Section title='Section title' content='content is here' />
        </ThemeProvider>
    )
}