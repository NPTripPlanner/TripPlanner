import React from "react";

import { Switch, Route } from "react-router-dom";

import Landing from "../../pages/Landing";

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path='*' component={Landing} >
    </Switch>
  );
}

export default Router;
