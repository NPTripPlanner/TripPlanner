import React from 'react';

import {
    Email, 
    Https,
    Person
} from '@material-ui/icons';

import InputField from '../components/InputField/InputField';

export const loginFormFields = [
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
            required
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
            required
            />
        ),
    },
]

export const loginFormData ={
    email:'',
    password:'',
}

export const signupFormFields = [
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
            required
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
            required
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
            required
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
            required
            />
        ),
    },
]

export const signupFormData ={
    email:'',
    displayName:'',
    password:'',
    cPassword:''
}

export const forgotPassFormFields =[
    {
        id:'email',
        inputField:(
            <InputField 
            id='email'
            labelText='E-mail'
            variant='outlined' 
            type='email'
            placeholder='iForgot@gmail.com'
            endAdornment={<Email />}
            required
            />
        ),
    },
]

export const forgotPassFormData ={
    email:'',
}