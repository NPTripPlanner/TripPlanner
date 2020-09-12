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

export const CreateSchedule = ()=>action(
    actionType.CREATE_SCHEDULE,
)

export const StartListenOnSchedules = ()=>action(
    actionType.LISTEN_ON_SCHEDULES_START,
)

export const StopListenOnSchedules = ()=>action(
    actionType.LISTEN_ON_SCHEDULES_STOP,
)