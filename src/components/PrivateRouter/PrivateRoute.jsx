import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from "js-cookie";

//import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => localStorage.getItem('currentUser')? 
    <Component {...props} />:(
    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        
        

     
)
    }
    />
);
