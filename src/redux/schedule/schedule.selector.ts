import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';
import { SrotArray } from "../../utils/utils";
import { sortDate } from "../../utils/datetime.utils";
import { Schedule } from "../../schema/firestore.schema";

const selectCollection = (state:IRootReducerState) => state.collection;

export const selectScheduleCol = createSelector(
    [selectCollection],

    (collection)=>collection.schedule
)

//Select schedule state
const selectSchedule = (state:IRootReducerState) => state.schedule;


export const selectUnderItinerary = createSelector(
    [selectSchedule],
    
    (schedule)=>schedule.underItinerary
)

export const selectSortedSchedules = createSelector(
    [selectScheduleCol],

    (scheduleCol)=>{
        const sortDateFN = (a:Schedule, b:Schedule)=>{
            return sortDate(a.date, b.date);
        }
        const sorted = SrotArray(scheduleCol.dataArray, sortDateFN);

        return sorted;
    }
)

