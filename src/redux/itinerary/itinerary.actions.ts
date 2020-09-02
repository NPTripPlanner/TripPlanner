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

export const FetchItinerariesSuccessful = (itineraryData, fromStart) =>action(
    actionType.FETCH_ITINERARIES_SUCCESSFUL,
    {itineraryData, fromStart},
);
  
export const FetchItinerariesFail = (error)=>action(
    actionType.FETCH_ITINERARIES_FAIL,
    {error},
);