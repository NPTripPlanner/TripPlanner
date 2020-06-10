import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from '../components/Header/Header';
import Landing from "../pages/Landing";

import {Avatar, IconButton} from '@material-ui/core';
import {ReactComponent as Logo} from '../assets/images/Logo/logo.svg';
import {ReactComponent as Signin} from '../assets/images/Landing/sign-in.svg';


function Router() {
  const renderHeader = ()=>{
    return (
    <Header
    brand={<Avatar variant='rounded'><Logo /></Avatar>} 
    title='Trip Planner'
    rightButtons={[
        <IconButton><Signin /></IconButton>,
    ]} 
    />
    )
  }
  
  return (
    <React.Fragment>
      {renderHeader()}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path='*' component={Landing} />
      </Switch>
    </React.Fragment>
  );
}

export default Router;
