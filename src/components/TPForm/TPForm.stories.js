import React from 'react';

import TPForm from './TPForm';

import InputField from '../InputField/InputField';

import {
    Button,
    Typography
} from '@material-ui/core';
import {
    Email, 
    Https,
    Person
} from '@material-ui/icons';

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

const loginFormData ={
    email:'',
    password:'',
}

const signupFormFields = ()=>([
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
        id:'displayName',
        inputField:(
            <InputField
            id='display_name' 
            labelText='Display Name'
            variant='outlined' 
            type='text'
            placeholder='John Smith'
            endAdornment={<Person />}
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
    {
        id:'cPassword',
        inputField:(
            <InputField 
            id='confirm_password'
            labelText='Confirm Password'
            variant='outlined' 
            type='password'
            placeholder='Re-enter password'
            endAdornment={<Https />}
            />
        ),
    },
])

const signupFormData ={
    email:'',
    displayName:'',
    password:'',
    cPassword:''
}

export const Login = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPForm
            formData={loginFormData} 
            formFields={loginFormFields()}
            submitButton={
                <Button variant='contained' color='secondary'>
                    <Typography variant='h6'>Login</Typography>
                </Button>
            }
            onSubmit={(data)=>action('data')(data)}
            onFormDataChanged={(oldData, nData)=>{
                action('changed data')(oldData, nData);
            }}
            />
        </ThemeProvider>
    )
}

export const Register = ()=>{
    return (
        <ThemeProvider theme={theme}>
            <TPForm
            formData={signupFormData} 
            formFields={signupFormFields()}
            submitButton={
                <Button variant='contained' color='secondary'>
                    <Typography variant='h6'>Sign up</Typography>
                </Button>
            }
            onSubmit={(data)=>action('data')(data)}
            />
        </ThemeProvider>
    )
}