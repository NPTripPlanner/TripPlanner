import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from '../Header/Header';
import Landing from "../../pages/Landing";

import {Avatar, IconButton} from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import Home from '@material-ui/icons/Home';
import PlaceRounded from '@material-ui/icons/PlaceRounded';
import {ReactComponent as Logo} from '../../assets/images/Logo.svg';


function Router() {
  const renderHeader = ()=>{
    return (
    <Header
    brand={<Avatar variant='rounded'><Logo /></Avatar>} 
    title='Trip Planner'
    rightButtons={[
        <IconButton><AlarmIcon /></IconButton>,
        <IconButton><PlaceRounded /></IconButton>,
        <IconButton><Home /></IconButton>,
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
