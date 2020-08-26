import React from "react";
import {Switch, useRouteMatch, useLocation } from 'react-router-dom';
import PrivateRoute from "../../router/PrivateRoute";
import TripArchive from './TripArchives';
import TripCollection from './TripCollection';

const TripManager = () => {
  const match = useRouteMatch('/TripManager');
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <Switch>
        <PrivateRoute exact path={match.path} fallbackPath='/' component={<TripArchive />}/>
        <PrivateRoute
        exact 
        path={`${match.path}/:ArchiveId`} 
        fallbackPath='/' 
        component={<TripCollection />}
        />
        <PrivateRoute path='*' fallbackPath='/' component={<TripArchive />}/>
    </Switch>
  );
};

export default TripManager;
