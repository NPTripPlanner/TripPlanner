import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

const selectNotification = (state:IRootReducerState) => state.notification;

export const selectNotificationInfo = createSelector(
    [selectNotification],

    (notify)=>notify.notifcation
);