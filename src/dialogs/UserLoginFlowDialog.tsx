import React from 'react';
import { CreateDialog } from './CreateDialog';
import SignupForm from '../forms/SignupForm';
import ForgotPassForm from '../forms/ForgotPassForm';
import LoginForm from '../forms/LoginForm';
import { Link } from '@material-ui/core';

type IProps = {
    onClose?: ()=>void;
    onFlowEnd?: ()=>void;
}

const UserLoginFlowDialog = (props:IProps)=>{
    const { onClose, onFlowEnd } = props;

    React.useEffect(()=>{
        
        return ()=>{
            if(onFlowEnd) onFlowEnd();
        }
    },[onFlowEnd]);

    const signupDialog = ()=>(
        CreateDialog('Sign up', <SignupForm />, 'lg', [
            <Link key="1" onClick={() => setDialog(loginDialog())}>
              I have an account
            </Link>,
            ],
            ()=>{
                setDialog(null);
                if(onClose) onClose();
            }
        )
    );

    const forgotPassDialog = ()=>(
        CreateDialog('Forgot passowrd', <ForgotPassForm />, 'lg', [
            <Link key="1" onClick={() => setDialog(loginDialog())}>
              I have an account
            </Link>,
            <Link key="2" onClick={() => setDialog(signupDialog())}>
              I dont have an account
            </Link>,
            ],
            ()=>{
                setDialog(null);
                if(onClose) onClose();
            }
        )
    );

    const loginDialog = ()=>(
        CreateDialog('Login', <LoginForm />, 'lg', [
            <Link key="1" onClick={() => setDialog(signupDialog())}>
              I dont have an account
            </Link>,
            <Link key="2" onClick={() => setDialog(forgotPassDialog())}>
              Forgot password?
            </Link>,
            ],
            ()=>{
                setDialog(null);
                if(onClose) onClose();
            }
        )
    );

    const [dialog, setDialog] = React.useState(loginDialog());

    return (
        <React.Fragment>
            {dialog?dialog:null}
        </React.Fragment>
    )
}

export default UserLoginFlowDialog;