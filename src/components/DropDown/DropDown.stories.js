import React from 'react';

import DropDown from './DropDown';

import {
    Avatar,
    Typography
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

const style = theme=>({
    avatar:{
      backgroundColor:theme.palette.secondary.main,
      '&:hover':{
        cursor:'pointer',
      }
    }
});

export default{
    title:'DropDown'
}

export const Default = ()=>{
    const classes = makeStyles(style)();
    return (
        <ThemeProvider theme={theme}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            <DropDown
            icon={
                <Avatar className={classes.avatar}>
                    <Typography variant='h6'>A</Typography>
                </Avatar>
            }
            />
            </div>
        </ThemeProvider>
    )
}