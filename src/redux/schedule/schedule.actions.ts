import actionType from './schedule.actionType';
import {action} from 'typesafe-actions';
import { Itinerary } from '../../schema/firestore.schema';

export const SetItinerary = (itinerary:Itinerary)=>action(
    actionType.SET_ITINERARY,
    {itinerary}
);

export const SetItinerarySuccessful = (itinerary:Itinerary)=>action(
    actionType.SET_ITINERARY_SUCCESSFUL,
    {itinerary}
);

export const ClearAllScheduleState = ()=>action(
    actionType.CLEAR_ALL_SCHEDULE_STATE,
);

export const ClearAllScheduleStateSuccessful = ()=>action(
    actionType.CLEAR_ALL_SCHEDULE_STATE_SUCCESSFUL,
);