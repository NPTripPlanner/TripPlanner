import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SignupStart} from '../redux/user/user.actions';
import {
    selectSignupFail
} from '../redux/user/user.selector';

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
    const signupError = useSelector(selectSignupFail);
    const dispatch = useDispatch();

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
        dispatch(SignupStart(data.email, data.password, data.displayName));
    }

    return (
        <TPForm
        error={passNotMatch || signupError}
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