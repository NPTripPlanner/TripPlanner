import React from 'react';

import TPForm from './TPForm';

import InputField from '../InputField/InputField';

import {
    Button,
    Select,
    MenuItem,
    Typography
} from '@material-ui/core';
import {Email, Https} from '@material-ui/icons';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

import {action} from '@storybook/addon-actions';

export default {
    title:'TPForm'
}

const loginFormFields = ()=>([
    {
        id:'email',
        inputField:(
            <InputField
            id='email' 
            labelText='E-mail'
            variant='outlined' 
            type='email'
            placeholder='awesome@gmail.com'
            endAdornment={<Email />}
            />
        ),
    },
    {
        id:'password',
        inputField:(
            <InputField 
            id='password'
            labelText='Password'
            variant='outlined' 
            type='password'
            placeholder='123456'
            endAdornment={<Https />}
            />
        ),
    },
])

const formData ={
    email:'',
    password:'',
}

export const Login = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPForm 
            formData={formData} 
            formFields={loginFormFields()}
            submitButton={
                <Button variant='contained' color='secondary'>
                    <Typography variant='h6'>Login</Typography>
                </Button>
            }
            onSubmit={(data)=>action('data')(data)}
            />
        </ThemeProvider>
    )
}