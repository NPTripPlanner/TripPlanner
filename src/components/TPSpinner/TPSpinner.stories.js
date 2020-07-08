import React from 'react';

import TPSpinner from './TPSpinner';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

export default {
    title:'TPSpinner'
}

export const Spinning = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPSpinner spinTitle='loading' isLoading={true}>
                <div>I am content</div>
            </TPSpinner>
        </ThemeProvider>
    )
}

export const NotSpinning = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPSpinner spinTitle='loading' isLoading={false}>
                <div>I am content</div>
            </TPSpinner>
        </ThemeProvider>
    )
}