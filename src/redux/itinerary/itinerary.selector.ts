import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

const selectItinerary = (state:IRootReducerState) => state.itinerary;

export const selectUnderTripArchive = createSelector(
  [selectItinerary],
  
  (itinerary)=>itinerary.underTripArchive
)

export const selectFetchingItineraries = createSelector(
    [selectItinerary],

    (itinerary)=>itinerary.fetchingItineraries
)

export const selectFetchItinerariesError = createSelector(
    [selectItinerary],

    (itinerary)=>itinerary.fetchingItinerariesError?itinerary.fetchingItinerariesError.message:null
)

export const selectItineraries = createSelector(
    [selectItinerary],

    (itinerary)=>itinerary.itieraries
)

export const selectCreatingItinerary = createSelector(
    [selectItinerary],

    (itinerary)=>itinerary.creatingItinerary
)
  
export const selectCreateItineraryError = createSelector(
    [selectItinerary],

    (itinerary)=>itinerary.createItineraryError?itinerary.createItineraryError.message:null
)

export const selectCreateItinerarySuccessful = createSelector(
    [selectItinerary],

    (itinerary)=>itinerary.createItinerarySuccessful
)