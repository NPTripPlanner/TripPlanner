import actionType from "./itinerary.actionType";
import {TripArchive} from '../../schema/firestore.schema';
import { Reducer } from "redux";

export interface IItinerayState{
    underTripArchive : TripArchive | null;
}

const initState: IItinerayState ={
    underTripArchive: null,
} 

const ItineraryReducer : Reducer<IItinerayState> = (state=initState, action=null)=>{
    switch(action.type){
        case actionType.SET_TRIP_ARCHIVE_SUCCESSFUL:{
            const {tripArchive} = action.payload;
            return {
                ...state,
                underTripArchive: tripArchive,
            }
        }
        case actionType.CLEAR_ALL_ITINERARY_STATE_SUCCESSFUL:{
            return {
                ...state,
                underTripArchive: null,
            }
        }
        default:{
            return state;
        }
    }
}

export default ItineraryReducer;