import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SendForgotPassMailStart} from '../redux/user/user.actions';
import {
    selectSendForgotPassMailSuccess, 
    selectSendForgotPassMailFail
} from '../redux/user/user.selector';

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
    const [sent, setSent] = React.useState(false);
    const sentMailSuccess = useSelector(selectSendForgotPassMailSuccess);
    const sentMailError = useSelector(selectSendForgotPassMailFail);
    const dispatch = useDispatch();

    const handleFormSubmit = (data)=>{
        setSent(true);
        dispatch(SendForgotPassMailStart(data.email));
    }

    if(sentMailSuccess && sent){
        return (
            <div>
                <Typography variant='h6'>
                A password reset mail has been sent to your mail box
                </Typography>
            </div>
        );
    }

    return (
        <TPForm
        error={sentMailError}
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