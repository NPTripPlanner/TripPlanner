import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';
import { TripArchive } from "../../schema/firestore.schema";

const selectItinerary = (state:IRootReducerState) => state.itinerary;

export const selectUnderTripArchive = createSelector(
  [selectItinerary],
  
  (itinerary):TripArchive=>itinerary.underTripArchive
)