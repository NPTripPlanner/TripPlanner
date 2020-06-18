import React from 'react';

import InputField from '../InputField/InputField';

import {Email, Https} from '@material-ui/icons';

import {makeStyles} from '@material-ui/core/styles';

const style={
    form:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        '& .MuiFormControl-root:not(:last-child)':{
            marginBottom:'1%'
        },
        padding:'1%'
    }
}

const TPLoginForm = () => {
    const classes = makeStyles(style)();

    return (
        <form className={classes.form}>
            <InputField 
            labelText='E-mail'
            variant='outlined' 
            type='email'
            placeholder='awesome@gmail.com'
            endAdornment={<Email />}
            />
            <InputField 
            labelText='Password'
            variant='outlined' 
            type='password'
            placeholder='123456'
            endAdornment={<Https />}
            />
        </form>
    );
};

export default TPLoginForm;