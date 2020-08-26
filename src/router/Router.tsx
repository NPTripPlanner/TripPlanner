import React from "react";
import { Switch, Route } from "react-router-dom";
import HeaderManager from './HeaderManager/HeaderManager';
import FooterManager from './FooterManager/FooterManager';
import Landing from "../pages/Landing/Landing";
import TripManager from "../pages/TripManager/TripManager";
import PrivateRoute from "./PrivateRoute";

import {
  Toolbar,
} from "@material-ui/core";

const Router = ()=>{

  return (
    <React.Fragment>
      <HeaderManager />
      <Toolbar />
      <Switch>
        <Route exact path="/" render={()=><Landing />} />
        <PrivateRoute path='/TripManager' fallbackPath='/' component={<TripManager />}/>
        <Route path="*" render={()=><Landing />} />
      </Switch>
      <FooterManager />
    </React.Fragment>
  );
};

export default Router;
