import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {selectUserInfo} from '../redux/user/user.selector';
import {
  UserLogout,
  CheckUserSessionStart
} from '../redux/user/user.actions';

import {Login} from '../redux/dialog/dialog.actions';

import { Switch, Route } from "react-router-dom";

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Landing from "../pages/Landing/Landing";
import DialogControl from '../dialogs/DialogControl';
import DropDown from '../components/DropDown/DropDown';

import {
  Avatar, 
  IconButton, 
  Toolbar,
  Link,
  Typography
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import {ReactComponent as Logo} from '../assets/images/Logo/logo.svg';
import {ReactComponent as Signin} from '../assets/images/Landing/sign-in.svg';
import {ReactComponent as Facebook} from '../assets/images/Landing/facebook-brands.svg';
import {ReactComponent as Twitter} from '../assets/images/Landing/twitter-brands.svg';
import {ReactComponent as Youtube} from '../assets/images/Landing/youtube-brands.svg';

const style = theme=>({
  avatar:{
    backgroundColor:theme.palette.secondary.main,
    '&:hover':{
      cursor:'pointer',
    }
  }
});

const footerContent = ()=>{
  return [
      {
          title:'general',
          links:[
              <Link href='#'>About us</Link>,
              <Link href='#'>Contact us</Link>,
              <Link href='#'>Feedback</Link>,
              <Link href='#'>Credits</Link>,
              <Link href='#'>Roadmap</Link>,
          ]
      },
      {
          title:'social',
          links:[
              <IconButton><Youtube /></IconButton>,
              <IconButton><Twitter /></IconButton>,
              <IconButton><Facebook /></IconButton>,
          ]
      }
  ]
}



const avatarDropDown = (user, dispatch, classes)=>{

  const items = [
    {
        title:'Setting',
        onClick:()=>{console.log('go to setting page')}
    },
    {
        title:'Logout',
        onClick:()=>{dispatch(UserLogout())}
    }
  ]

  const handleItemClick= (index)=>{
    items[index].onClick();
  }

  return (
    <DropDown
    icon={
        <Avatar className={classes.avatar}>
            <Typography variant='h6'>
            {user.displayName?user.displayName.charAt(0).toUpperCase():' '}
            </Typography>
        </Avatar>
    }
    dropdownItems={items}
    onItemClicked={handleItemClick}
    />
  );
}

const renderFooter = ()=>{
  return <Footer sections={footerContent()} />
}

function Router() {
  const classes = makeStyles(style)();

  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  if(!user) dispatch(CheckUserSessionStart());

  const renderHeader = ()=>{
    if(!user){
      return (
        <Header
        brand={<Avatar variant='rounded'><Logo /></Avatar>} 
        title='Trip Planner'
        rightButtons={[
            <IconButton onClick={()=>dispatch(Login())}><Signin /></IconButton>,
        ]} 
        />
      );
    }
    
    return (
      <Header
      brand={<Avatar variant='rounded'><Logo /></Avatar>} 
      title='Trip Planner'
      rightButtons={[
        avatarDropDown(user, dispatch, classes),
      ]} 
      />
    );
  }

  return (
    <React.Fragment>
      {renderHeader()}
      <Toolbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path='*' component={Landing} />
      </Switch>
      {renderFooter()}
      <DialogControl />
    </React.Fragment>
  );
}

export default Router;
