import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HeaderManager from './HeaderManager/HeaderManager';
import FooterManager from './FooterManager/FooterManager';
import Landing from "../pages/Landing/Landing";
import TripManager from "../pages/TripManager/TripManager";
import PrivateRoute from "./PrivateRoute";
import {AnimatePresence} from 'framer-motion';

import {
  Toolbar,
} from "@material-ui/core";

const Router = ()=>{
  const location = useLocation();

  return (
    <React.Fragment>
      <HeaderManager />
      <Toolbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" render={()=><Landing />} />
          <PrivateRoute path='/TripManager' fallbackPath='/' component={<TripManager />}/>
          <Route path="*" render={()=><Landing />} />
        </Switch>
      </AnimatePresence>
      <FooterManager />
    </React.Fragment>
  );
};

export default Router;
