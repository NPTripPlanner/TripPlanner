import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../redux/user/user.selector";
import { UserLogout } from "../redux/user/user.actions";
import { useHistory } from "react-router-dom";

import { Login } from "../redux/dialog/dialog.actions";

import { Switch, Route } from "react-router-dom";

import HeaderManager from './HeaderManager/HeaderManager';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Landing from "../pages/Landing/Landing";
import TripManager from "../pages/TripManager/TripManager";
import DropDown from "../components/DropDown/DropDown";
import PrivateRoute from "./PrivateRoute";

import {
  Avatar,
  IconButton,
  Toolbar,
  Link,
  Typography,
} from "@material-ui/core";

import { Apps } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as Logo } from "../assets/images/Logo/logo.svg";
import { ReactComponent as Signin } from "../assets/images/Landing/sign-in.svg";
import { ReactComponent as Facebook } from "../assets/images/Landing/facebook-brands.svg";
import { ReactComponent as Twitter } from "../assets/images/Landing/twitter-brands.svg";
import { ReactComponent as Youtube } from "../assets/images/Landing/youtube-brands.svg";




const footerContent = () => {
  return [
    {
      title: "general",
      links: [
        <Link href="#">About us</Link>,
        <Link href="#">Contact us</Link>,
        <Link href="#">Feedback</Link>,
        <Link href="#">Credits</Link>,
        <Link href="#">Roadmap</Link>,
      ],
    },
    {
      title: "social",
      links: [
        <IconButton>
          <Youtube />
        </IconButton>,
        <IconButton>
          <Twitter />
        </IconButton>,
        <IconButton>
          <Facebook />
        </IconButton>,
      ],
    },
  ];
};



const renderFooter = () => {
  return <Footer sections={footerContent()} />;
};

const Router = React.forwardRef((_,ref)=>{

  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <React.Fragment>
      <HeaderManager />
      <Toolbar />
      <Switch>
        <Route exact path="/" render={()=><Landing />} />
        <PrivateRoute exact path='/TripManager' fallbackPath='/' component={<TripManager />}/>
        <Route path="*" render={()=><Landing />} />
      </Switch>
      {renderFooter()}
    </React.Fragment>
  );
});

export default Router;
