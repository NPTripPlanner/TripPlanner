import React from 'react';

import TPLoginForm from './TPLoginForm';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

export default {
    title:'TPLoginForm'
}

export const Default = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPLoginForm />
        </ThemeProvider>
    )
}