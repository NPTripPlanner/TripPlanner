import React from "react";
import {Switch, useRouteMatch, useLocation, Route } from 'react-router-dom';
import ArchiveManager from './ArchiveManager';
import ItineraryManager from './ItineraryManager';
import ScheduleManager from './ScheduleManager/ScheduleManager';

const TripManager = () => {
  const match = useRouteMatch('/TripManager');
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch >
        <Route exact path={match.path} render={()=><ArchiveManager />}/>
        <Route
        exact 
        path={`${match.path}/:ArchiveId`} 
        render={()=><ItineraryManager />}
        />
        <Route 
        exact
        path={`${match.path}/:ArchiveId/:ItineraryId`}
        render={()=><ScheduleManager />}
        />
        <Route path={`${match.path}/*`}  render={()=><ArchiveManager />}/>
    </Switch>
  );
};

export default TripManager;
