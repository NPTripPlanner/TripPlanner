import actionType from './notification.actionType';
import {action} from 'typesafe-actions';

export const PostNotification = (
    message:string,
    variant:'success'|'error'|'warning'|'info'|'default'
    )=>action(
    actionType.POST_NEW_NOTIFICATION,
    {message, variant},
);

export const PostNotificationSuccessful = (
    message:string,
    variant:'success'|'error'|'warning'|'info'|'default'
    )=>action(
    actionType.POST_NEW_NOTIFICATION_SUCCESSFUL,
    {message, variant},
);