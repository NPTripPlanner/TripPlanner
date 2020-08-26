import React from 'react';
import { useHistory } from "react-router-dom";
import UserLoginFlowDialog from '../../dialogs/UserLoginFlowDialog';
import Header from '../../components/Header/Header';
import { Avatar, IconButton } from '@material-ui/core';
import { ReactComponent as Logo } from "../../assets/images/Logo/logo.svg";
import { ReactComponent as Signin } from "../../assets/images/Landing/sign-in.svg";

type IProps = {
    title: string;
}

const NonMemberHeader = (props:IProps)=>{
    const {title} = props; 
    const [loginFlow, setLoginFlow] = React.useState(null);
    const history = useHistory();

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
    const handleBrandClick = ()=>{
        history.push("/");
    }

    return (
        <React.Fragment>
            <Header
            brand={
            <Avatar variant="rounded">
                <Logo />
            </Avatar>
            }
            title={title}
            rightButtons={[
            <IconButton onClick={handleLogin}>
                <Signin />
            </IconButton>,
            ]}
            onBrandClick={handleBrandClick}
            />
            {loginFlow?loginFlow:null}
        </React.Fragment>
    );
}

export default NonMemberHeader