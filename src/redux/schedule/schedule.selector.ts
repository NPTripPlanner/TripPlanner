import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

//Select schedule state
const selectSchedule = (state:IRootReducerState) => state.schedule;

export const selectUnderItinerary = createSelector(
    [selectSchedule],
    
    (schedule)=>schedule.underItinerary
)