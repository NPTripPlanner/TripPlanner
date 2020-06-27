import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LoginStart} from '../redux/user/user.actions';

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

    const loginError = useSelector(state=>{
        return state.user.loginFail?state.user.loginFail.message:null;
    });
    const dispatch = useDispatch();

    const handleFormSubmit = (data)=>{
        dispatch(LoginStart(data.email, data.password));
    }

    return (
        <TPForm
        error={loginError}
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