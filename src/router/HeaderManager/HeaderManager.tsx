import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { useHistory } from "react-router-dom";
import {
    Avatar,
    IconButton,
} from "@material-ui/core";
import {Apps} from '@material-ui/icons';

import { ReactComponent as Logo } from "../../assets/images/Logo/logo.svg";
import { ReactComponent as Signin } from "../../assets/images/Landing/sign-in.svg";

import Header from "../../components/Header/Header";
import AvatarDropDown from './AvatarDropDown';
import { UserLogout } from '../../redux/user/user.actions';
import UserLoginFlowDialog from '../../dialogs/UserLoginFlowDialog';

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


const NoneMemberHeader = ()=>{
    const [loginFlow, setLoginFlow] = React.useState(null);

    const handleLogin = ()=>{
        setLoginFlow(
            <UserLoginFlowDialog 
            onClose={
            ()=>setLoginFlow(null)
            }
            onFlowEnd={()=>setLoginFlow(null)}
            />
        )
    }

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
            <IconButton onClick={handleLogin}>
                <Signin />
            </IconButton>,
            ]}
            />
            {loginFlow?loginFlow:null}
        </React.Fragment>
    );
}

const HeaderManager = () => {

    const user = useSelector(selectUserInfo);
    
    return user?<MemberHeader />:<NoneMemberHeader/>;
};

export default HeaderManager;