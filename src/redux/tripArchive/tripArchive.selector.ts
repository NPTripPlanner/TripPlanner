import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

const selectTripArchive = (state:IRootReducerState) => state.tripArchive;

export const selectFetchingTripArchives = createSelector(
  [selectTripArchive],
  
  (tripArchive)=>tripArchive.fetchingTripArchives
)

export const selectFetchingTripArchiveError = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.fetchingTripArchivesError?tripArchive.fetchingTripArchivesError.message:null
)

export const selectTripArchives = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.tripArchives
)

export const selectMoreTripArchives = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.moreTripArchives
)

export const selectCreatingTripArchive = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.creatingTripArchive
)

export const selectCreatingTripArchiveError = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.createTripArchiveError?tripArchive.createTripArchiveError.message:null
)

export const selectCreateTripArchiveSuccessful = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.createTripArchiveSuccessful
)