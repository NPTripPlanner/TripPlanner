import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import { selectUserInfo } from "../redux/user/user.selector";
import {useSelector } from "react-redux";
import { motion } from 'framer-motion';

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
    const location = useLocation();

    if(!user){
        return(
        <motion.div exit="undefined">
            <Redirect 
            to={{
                pathname: fallbackPath,
                from: location.pathname,
            }}
            />
        </motion.div>    
        )
    }
        

    return (
        <Route
        {...rest}
        render={()=>component}
        />
    );
};

export default PrivateRoute;

