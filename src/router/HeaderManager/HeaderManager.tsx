import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { useHistory } from "react-router-dom";
import {
    Avatar,
    IconButton,
    Link,
} from "@material-ui/core";
import {Apps} from '@material-ui/icons';

import { ReactComponent as Logo } from "../../assets/images/Logo/logo.svg";
import { ReactComponent as Signin } from "../../assets/images/Landing/sign-in.svg";

import Header from "../../components/Header/Header";
import AvatarDropDown from './AvatarDropDown';
import LoginForm from '../../forms/LoginForm';
import SignupForm from '../../forms/SignupForm';
import ForgotPassForm from '../../forms/ForgotPassForm';
import { UserLogout } from '../../redux/user/user.actions';
import { CreateDialog } from '../../dialogs/CreateDialog';

const MemberHeader = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const items = [
        {
          title: "Setting",
          onClick: () => {
            console.log("go to setting page");
          },
        },
        {
          title: "Logout",
          onClick: () => {
            dispatch(UserLogout());
          },
        },
    ];

    return (
        <Header
        brand={
            <Avatar variant="rounded">
            <Logo />
            </Avatar>
        }
        title="Trip Planner"
        rightButtons={[
            <IconButton onClick={() => history.push("/TripManager")}>
                <Apps />
            </IconButton>,
            <AvatarDropDown items={items} />,
        ]}
        />
    );
}

//change to component
const NoneMemberHeader = ()=>{
    const [dialog, setDialog] = React.useState(null);

    const signupDialog = ()=>(
        CreateDialog('Sign up', <SignupForm />, 'lg', [
            <Link key="1" onClick={() => setDialog(loginDialog())}>
              I dont have an account
            </Link>,
            ],
            ()=>setDialog(null)
        )
    );

    const forgotPassDialog = ()=>(
        CreateDialog('Forgot passowrd', <ForgotPassForm />, 'lg', [
            <Link key="1" onClick={() => setDialog(loginDialog())}>
              I dont have an account
            </Link>,
            <Link key="2" onClick={() => setDialog(signupDialog())}>
              Forgot password?
            </Link>,
            ],
            ()=>setDialog(null)
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
            ()=>setDialog(null)
        )
    );




    return (
        <React.Fragment>
            <Header
            brand={
            <Avatar variant="rounded">
                <Logo />
            </Avatar>
            }
            title="Trip Planner"
            rightButtons={[
            <IconButton onClick={() => setDialog(loginDialog())}>
                <Signin />
            </IconButton>,
            ]}
            />
            {dialog?dialog:null}
        </React.Fragment>
    );
}

const HeaderManager = () => {

    const user = useSelector(selectUserInfo);
    
    return user?<MemberHeader />:<NoneMemberHeader/>;
};

export default HeaderManager;