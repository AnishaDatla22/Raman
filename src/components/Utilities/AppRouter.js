import React from 'react';
import {FormSec,DashboardSec,Datasec,LoginSec} from './../../components/def';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";

const AppRouter = () => {
    return(
            <Router>
                   <Switch>
          <Route path="/form1">
            <FormSec />
          </Route>
          <Route exact path="/">
            <LoginSec />
          </Route>
          <Route  path="/dashboard">
            <DashboardSec />
            </Route>
          <Route  path="/data">
            <Datasec />
          </Route>
         
        </Switch>
            </Router>
    )
}


export default AppRouter;