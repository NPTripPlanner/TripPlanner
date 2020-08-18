import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectCheckingUserSession } from "../redux/user/user.selector";
import { CheckUserSessionStart } from "../redux/user/user.actions";

import {CircularProgress, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const style = {
    center:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
    },
    padding:{
        padding:'2%',
    }
}

const CheckSession = ({
    component
  })=>{
    const classes = makeStyles(style)();
    const [sessionStates, setSessionStates] = React.useState([]);
    const dispatch = React.useCallback(useDispatch(),[]);
    const session = useSelector(selectCheckingUserSession);
  
    React.useEffect(()=>{
        dispatch(CheckUserSessionStart());
    },[dispatch])
  
    React.useEffect(()=>{
      setSessionStates(state=>([...state, session]));
    },[session]);
  
    //a full session check will return 3 states false, true, false
    //we only care last two to see if state turn from true checking to fale finish
    if(sessionStates.length===3 &&
       sessionStates[1]===true &&
       sessionStates[2]===false){
      return component
    }
    return (
        <div className={classes.center}>
            <Typography className={classes.padding} variant='h6'>Checking your session ....</Typography>
            <CircularProgress color='secondary' />
        </div>
    )
}

export default CheckSession;