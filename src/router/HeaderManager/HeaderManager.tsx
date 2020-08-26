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
import { StartChangeHeaderTitle} from '../../redux/header/header.actions';
import UserLoginFlowDialog from '../../dialogs/UserLoginFlowDialog';
import { selectHeaderTitle } from '../../redux/header/header.selector';

type IProps = {
    title: string;
}
/**
 * Header componenet for memeber login
 */
const MemberHeader = (props:IProps)=>{
    const {title} = props; 
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

    const handleBrandClick = ()=>{
        history.push("/");
    }

    return (
        <Header
        brand={
            <Avatar variant="rounded">
            <Logo />
            </Avatar>
        }
        title={title}
        rightButtons={[
            <IconButton onClick={() => history.push("/TripManager")}>
                <Apps />
            </IconButton>,
            <AvatarDropDown items={items} />,
        ]}
        onBrandClick={handleBrandClick}
        />
    );
}

/**
 * Header component for not a memeber login
 */
const NoneMemberHeader = (props:IProps)=>{
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

const HeaderManager = () => {

    const user = useSelector(selectUserInfo);
    const title = useSelector(selectHeaderTitle);
    const dispatch = React.useCallback(useDispatch(),[]);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Trip Planner'));
    }, [dispatch]);
    
    return user?<MemberHeader title={title} />:<NoneMemberHeader title={title} />;
};

export default HeaderManager;