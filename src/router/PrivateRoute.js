import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { selectUserInfo } from "../redux/user/user.selector";
import {useSelector } from "react-redux";

const PrivateRoute = ({
     component, 
     fallbackPath='/', 
     ...rest
}) => {
    const user = useSelector(selectUserInfo);
    return (
        <Route
        {...rest}
        render={
            ({location})=>{
                return (
                user?
                component
                :
                <Redirect 
                to={{
                    pathname: fallbackPath,
                    state: { from: location }
                }}
                />
                )
            }
        }
        />
    );
};

export default PrivateRoute;

