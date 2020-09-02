import actionType from "./notification.actionType";
import { Reducer } from "redux";

export interface INotification{
    message: string;
    variant: 'success'|'error'|'warning'|'info';
}

export interface INotificationState {
    notifcation: INotification|null
}

const initState : INotificationState ={
    notifcation: null,
}

const notificationReducer: Reducer<INotificationState> = (state=initState, action)=>{
    switch(action.type){
        case actionType.POST_NEW_NOTIFICATION_SUCCESSFUL:{
            const {message, variant} = action.payload;
            return {
                ...state,
                notifcation:{message, variant},
            }
        }
        default:
            return state;
    }
}

export default notificationReducer;