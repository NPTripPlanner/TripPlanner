import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import { StartChangeHeaderTitle} from '../../redux/header/header.actions';
import { selectHeaderTitle } from '../../redux/header/header.selector';
import MemberHeader from './MemberHeader';
import NonMemberHeader from './NonMemberHeader';
import { useSnackbar } from 'notistack';
import { 
    selectNotificationMessage,
    selectNotificationVariant 
} from '../../redux/notification/notification.selector';

const HeaderManager = () => {

    const user = useSelector(selectUserInfo);
    const title = useSelector(selectHeaderTitle);
    const notifyMessage = useSelector(selectNotificationMessage);
    const notifyVariant = useSelector(selectNotificationVariant);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = React.useCallback(useDispatch(),[]);


    React.useEffect(()=>{
        dispatch(StartChangeHeaderTitle(''));
    }, [dispatch]);

    React.useEffect(()=>{
        if(notifyMessage){
            enqueueSnackbar(notifyMessage, {
                variant: notifyVariant,
            });
        }
    },[notifyMessage, notifyVariant, enqueueSnackbar, closeSnackbar]);
    
    return user?<MemberHeader title={title} />:<NonMemberHeader title={title} />;
};

export default HeaderManager;