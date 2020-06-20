import React from 'react';

import TPForm from '../components/TPForm/TPForm';

import {
    loginFormData,
    loginFormFields
} from './FormData';

import {
    Button,
    Typography
} from '@material-ui/core';


const LoginForm = ()=>{

    const handleFormSubmit = (data)=>{
        console.log(data);
    }

    return (
        <TPForm
        formData={loginFormData} 
        formFields={loginFormFields}
        submitButton={
            <Button variant='contained' color='secondary'>
                <Typography variant='h6'>Login</Typography>
            </Button>
        }
        onSubmit={handleFormSubmit}
        />
    )
}

export default LoginForm