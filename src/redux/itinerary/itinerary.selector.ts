import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

//Select itinerary state
const selectItinerary = (state:IRootReducerState) => state.itinerary;

export const selectUnderTripArchive = createSelector(
    [selectItinerary],
    
    (itinerary)=>itinerary.underTripArchive
)



//Select itinerary state under collection state
export const selectItineraryCol = (state:IRootReducerState) => state.collection.itinerary;

export const selectFetchingItineraries = createSelector(
    [selectItineraryCol],

    (collection)=>collection.fetchingData
)

export const selectFetchItinerariesError = createSelector(
    [selectItineraryCol],

    (collection)=>collection.fetchDataError?collection.fetchDataError.message:null
)

export const selectMoreItineraries = createSelector(
    [selectItineraryCol],

    (collection)=>collection.moreData
)

export const selectItineraries = createSelector(
    [selectItineraryCol],

    (collection)=>collection.dataArray
)

export const selectCreatingItinerary = createSelector(
    [selectItineraryCol],

    (collection)=>collection.creatingData
)
  
export const selectCreateItineraryError = createSelector(
    [selectItineraryCol],

    (collection)=>collection.createDataError?collection.createDataError.message:null
)

export const selectCreateItinerarySuccessful = createSelector(
    [selectItineraryCol],

    (collection)=>collection.createDataSuccessful
)

export const selectDeletingItinerary = createSelector(
    [selectItineraryCol],

    (collection)=>collection.deletingData
)
  
export const selectDeleteItineraryError = createSelector(
    [selectItineraryCol],

    (collection)=>collection.deleteDataError?collection.deleteDataError.message:null
)

export const selectDeleteItinerarySuccessful = createSelector(
    [selectItineraryCol],

    (collection)=>collection.deleteDataSuccessful
)


