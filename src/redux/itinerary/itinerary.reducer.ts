import actionType from "./itinerary.actionType";
import {TripArchive, Itinerary} from '../../schema/firestore.schema';
import { Reducer } from "redux";

export interface IItinerayState{
    underTripArchive : TripArchive | null;
    fetchingItineraries: boolean;
    fetchingItinerariesError: Error | null;
    itieraries: Array<Itinerary> | null;
    creatingItinerary: string | null,
    createItineraryError: Error | null,
    createItinerarySuccessful: boolean,
}

const initState: IItinerayState ={
    underTripArchive: null,
    fetchingItineraries: false,
    fetchingItinerariesError: null,
    itieraries: null,
    creatingItinerary: null,
    createItineraryError: null,
    createItinerarySuccessful: false,

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
                itieraries: null,
            }
        }
        case actionType.FETCH_ITINERARIES_START:{
            const {fromStart} = action.payload;
            return {
                ...state,
                fetchingItineraries: true,
                fetchingItinerariesError: null,
                itieraries: fromStart?[]:state.itieraries,
            }
        }
        case actionType.FETCH_ITINERARIES_FAIL:{
            const {error} = action.payload;
            return {
                ...state,
                fetchingItineraries: false,
                fetchingItinerariesError: error,
            }
        }
        case actionType.FETCH_ITINERARIES_SUCCESSFUL:{
            const {itineraryData, fromStart} = action.payload;
            const newIts = fromStart?itineraryData:state.itieraries.concat(itineraryData);
            return {
                ...state,
                fetchingItineraries: false,
                fetchingItinerariesError: null,
                itieraries: newIts,
            }
        }
        case actionType.CREATE_ITINERARY_START:{
            const {itineraryName} = action.payload;
            return {
              ...state,
              creatingItinerary: itineraryName,
              createItineraryError: null,
              createItinerarySuccessful: false,
            }
          }
          case actionType.CREATE_ITINERARY_SUCCESSFUL:{
            const {itinerary} = action.payload;
            return {
              ...state,
              creatingItinerary: null,
              createItineraryError: null,
              createItinerarySuccessful: true,
              itieraries:[itinerary, ...state.itieraries],
            }
          }
          case actionType.CREATE_ITINERARY_FAIL:{
            const {error} = action.payload;
            return {
              ...state,
              creatingItinerary: null,
              createItineraryError: error,
              createItinerarySuccessful: false,
            }
          }
          case actionType.CREATE_ITINERARY_RESET_SUCCESSFUL:{
            return {
              ...state,
              creatingItinerary: null,
              createItineraryError: null,
              createItinerarySuccessful: false,
            }
          }
        default:{
            return state;
        }
    }
}

export default ItineraryReducer;