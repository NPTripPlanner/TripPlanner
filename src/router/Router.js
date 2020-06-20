import React from "react";

import {useDispatch} from 'react-redux';

import {Login} from '../redux/dialog/dialog.actions';

import { Switch, Route } from "react-router-dom";

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Landing from "../pages/Landing/Landing";

import {
  Avatar, 
  IconButton, 
  Toolbar,
  Link,
} from '@material-ui/core';
import {ReactComponent as Logo} from '../assets/images/Logo/logo.svg';
import {ReactComponent as Signin} from '../assets/images/Landing/sign-in.svg';
import {ReactComponent as Facebook} from '../assets/images/Landing/facebook-brands.svg';
import {ReactComponent as Twitter} from '../assets/images/Landing/twitter-brands.svg';
import {ReactComponent as Youtube} from '../assets/images/Landing/youtube-brands.svg';

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

const renderFooter = ()=>{
  return <Footer sections={footerContent()} />
}

function Router() {
  const dispatch = useDispatch();

  const renderHeader = ()=>{
    return (
    <Header
    brand={<Avatar variant='rounded'><Logo /></Avatar>} 
    title='Trip Planner'
    rightButtons={[
        <IconButton onClick={()=>dispatch(Login())}><Signin /></IconButton>,
    ]} 
    />
    )
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
    </React.Fragment>
  );
}

export default Router;
