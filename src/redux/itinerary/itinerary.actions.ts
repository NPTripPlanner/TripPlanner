import actionType from "./itinerary.actionType";
import {action} from 'typesafe-actions';
import { TripArchive } from "../../schema/firestore.schema";

export const SetTripArchive = (tripArchive:TripArchive)=>action(
    actionType.SET_TRIP_ARCHIVE,
    {tripArchive}
);

export const SetTripArchiveSuccessful = (tripArchive:TripArchive)=>action(
    actionType.SET_TRIP_ARCHIVE_SUCCESSFUL,
    {tripArchive}
);

export const ClearAllItineraryState = ()=>action(
    actionType.CLEAR_ALL_ITINERARY_STATE,
);

export const ClearAllItineraryStateSuccessful = ()=>action(
    actionType.CLEAR_ALL_ITINERARY_STATE_SUCCESSFUL,
);

export const StartFetchItineraries = (amount=10, fromStart=true, keyword='') =>action(
    actionType.FETCH_ITINERARIES_START,
    {amount, fromStart, keyword},
);

export const StartFetchMore = (amount=10) =>action(
    actionType.FETCH_MORE_ITINERARIES_START,
    {amount, fromStart:false, keyword:null},
);

export const StartCreateItinerary = (itineraryName, startDate:Date, endDate:Date) =>action(
    actionType.CREATE_ITINERARY_START,
    {itineraryName, startDate, endDate},
);

export const CreateItineraryStateReset = () =>action(
    actionType.CREATE_ITINERARY_STATE_RESET,
);