import actionType from "./schedule.actionType";
import {Itinerary} from '../../schema/firestore.schema';
import { Reducer } from "redux";

export interface IScheduleState{
    underItinerary : Itinerary | null;
}

const initState: IScheduleState ={
    underItinerary: null,
} 

const ScheduleReducer : Reducer<IScheduleState> = (state=initState, action=null)=>{
    switch(action.type){
        case actionType.SET_ITINERARY_SUCCESSFUL:{
            const {itinerary} = action.payload;
            return {
                ...state,
                underItinerary: itinerary,
            }
        }
        case actionType.CLEAR_ALL_SCHEDULE_STATE_SUCCESSFUL:{
            return {
                ...state,
                underItinerary: null,
            }
        }
        default:{
            return state;
        }
    }
}

export default ScheduleReducer;