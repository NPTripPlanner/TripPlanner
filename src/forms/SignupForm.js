import React from 'react';

import TPForm from '../components/TPForm/TPForm';

import {
    signupFormData,
    signupFormFields
} from './FormData';

import {
    Button,
    Typography
} from '@material-ui/core';

const SignupForm = ()=>{
    const [data, setData] = React.useState(signupFormData);
    const [passNotMatch, setPassNotMatch] = React.useState(null);

    const handleDataChanged = (_, nData)=>{
        setData(nData);
        if(nData.password !== nData.cPassword && nData.cPassword){
            setPassNotMatch('Password not match');
        }
        else{
            setPassNotMatch(null);
        }
    }

    const handleFormSubmit = (data)=>{
        console.log(data);
    }

    return (
        <TPForm
        error={passNotMatch}
        formData={data} 
        formFields={signupFormFields}
        errorFields={passNotMatch?['password', 'cPassword']:null}
        submitButton={
            <Button variant='contained' color='secondary'>
                <Typography variant='h6'>Sign up</Typography>
            </Button>
        }
        onSubmit={handleFormSubmit}
        onFormDataChanged={handleDataChanged}
        />
    )
}

export default SignupForm;