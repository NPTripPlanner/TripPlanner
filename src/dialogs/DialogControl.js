import React from 'react';
import {selectUserInfo} from '../redux/user/user.selector';
import {useSelector, useDispatch} from 'react-redux';
import {
    Login,
    Signup,
    ForgotPassword,
    Close
} from '../redux/dialog/dialog.actions';
import DialogTypes from '../redux/dialog/dialog.actionTypes';

import {

    Link
} from '@material-ui/core';

import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';
import ForgotPassForm from '../forms/ForgotPassForm';

import TPDialog from '../components/TPDialog/TPDialog';

const DialogControl = () => {

    const dialogName = useSelector(state=>state.dialog.dialogName);
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();

    const handleDialog = (id, title, content, links)=>(presentId)=>(
        <TPDialog title={title} 
        open={id===presentId} 
        fullWidth={true} 
        maxWidth='lg' 
        footers={links}
        onClose={()=>dispatch(Close())}
        >
        {content}
        </TPDialog>
    )

    if(!user){
        return (
            <React.Fragment>
            {
            handleDialog(DialogTypes.Login, 'Login', <LoginForm />, [
                <Link key='1' onClick={()=>dispatch(Signup())}>I dont have an account</Link>,
                <Link key='2' onClick={()=>dispatch(ForgotPassword())}>Forgot password?</Link>,
            ])(dialogName)
            }
            {
            handleDialog(DialogTypes.Singup, 'Signup', <SignupForm />, [
                <Link key='1' onClick={()=>dispatch(Login())}>I have an account</Link>,
            ])(dialogName)
            }
            {
            handleDialog(DialogTypes.ForgotPass, 'Forgot Password', <ForgotPassForm />, [
                <Link key='1' onClick={()=>dispatch(Signup())}>I have an account</Link>,
                <Link key='2' onClick={()=>dispatch(Signup())}>I dont have an account</Link>,
            ])(dialogName)
            }
            </React.Fragment>
        );
    }
    if(user && dialogName) dispatch(Close());
    return null;
    
};

export default DialogControl;