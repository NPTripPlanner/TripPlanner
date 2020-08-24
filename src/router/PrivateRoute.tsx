import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { selectUserInfo } from "../redux/user/user.selector";
import {useSelector } from "react-redux";

type IProps = {
    [key:string]: {}|string;
    component: React.ReactNode;
    fallbackPath: string;
}

const PrivateRoute = (props:IProps) => {
    const {
        component, 
        fallbackPath = '/', 
        ...rest
    } = props;

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

