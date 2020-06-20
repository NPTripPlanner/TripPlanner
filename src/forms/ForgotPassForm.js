import React from 'react';

import TPForm from '../components/TPForm/TPForm';

import {
    forgotPassFormData,
    forgotPassFormFields
} from './FormData';

import {
    Button,
    Typography
} from '@material-ui/core';

const ForgotPasswordForm = ()=>{

    const handleFormSubmit = (data)=>{
        console.log(data);
    }

    return (
        <TPForm
        formData={forgotPassFormData} 
        formFields={forgotPassFormFields}
        submitButton={
            <Button variant='contained' color='secondary'>
                <Typography variant='h6'>Submit</Typography>
            </Button>
        }
        onSubmit={handleFormSubmit}
        />
    )
}

export default ForgotPasswordForm;