import React from "react";
import {Switch, useRouteMatch, useLocation, Route } from 'react-router-dom';
import TripArchive from './TripArchives';
import TripCollection from './TripCollection';

const TripManager = () => {
  const match = useRouteMatch('/TripManager');
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch >
        <Route exact path={match.path} render={()=><TripArchive />}/>
        <Route
        exact 
        path={`${match.path}/:ArchiveId`} 
        render={()=><TripCollection />}
        />
        <Route path={`${match.path}/*`}  render={()=><TripArchive />}/>
    </Switch>
  );
};

export default TripManager;
