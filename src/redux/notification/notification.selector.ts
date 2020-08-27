import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

const selectNotification = (state:IRootReducerState) => state.notification;

export const selectNotificationMessage = createSelector(
    [selectNotification],

    (notify)=>notify.message
);

export const selectNotificationVariant = createSelector(
    [selectNotification],

    (notify)=>notify.variant
);