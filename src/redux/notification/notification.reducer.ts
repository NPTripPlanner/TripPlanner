import actionType from "./notification.actionType";
import { Reducer } from "redux";

export interface INotificationState {
    message: string;
    variant: 'success'|'error'|'warning'|'info';
}

const initState : INotificationState ={
    message: '',
    variant: 'info',
}

const notificationReducer: Reducer<INotificationState> = (state=initState, action)=>{
    switch(action.type){
        case actionType.POST_NEW_NOTIFICATION_SUCCESSFUL:{
            const {message, variant} = action.payload;
            return {
                ...state,
                message,
                variant,
            }
        }
        default:
            return state;
    }
}

export default notificationReducer;