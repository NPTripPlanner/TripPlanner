import React from 'react';
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { StartChangeHeaderTitle} from '../../redux/header/header.actions';
import { selectHeaderTitle } from '../../redux/header/header.selector';
import MemberHeader from './MemberHeader';
import NonMemberHeader from './NonMemberHeader';

const HeaderManager = () => {

    const user = useSelector(selectUserInfo);
    const title = useSelector(selectHeaderTitle);
    const location = useLocation();
    const dispatch = React.useCallback(useDispatch(),[]);

    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle('Trip planner'));
    }, [dispatch, location]);
    
    return user?<MemberHeader title={title} />:<NonMemberHeader title={title} />;
};

export default HeaderManager;