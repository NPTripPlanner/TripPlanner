import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserLogout } from '../../redux/user/user.actions';
import Header from '../../components/Header/Header';
import { Avatar, IconButton } from '@material-ui/core';
import { Apps, Home } from '@material-ui/icons';
import AvatarDropDown from './AvatarDropDown';
import { ReactComponent as Logo } from "../../assets/images/Logo/logo.svg";

type IProps = {
    title: string;
}

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
            <IconButton onClick={() => history.push("/")}>
              <Home />
            </IconButton>,
            <AvatarDropDown items={items} />,
        ]}
        onBrandClick={handleBrandClick}
        />
    );
}

export default MemberHeader;