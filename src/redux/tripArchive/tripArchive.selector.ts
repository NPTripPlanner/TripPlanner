import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';
import {SortArray} from '../../utils/utils';

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

/**
 * Return sorted Trip Archive items
 * @param objectPath Have to match object property path e.g date.createAt
 */
export const selectSortedTripArchives = (objectPath:string)=> createSelector(
  [selectTripArchive],

  (tripArchive)=>SortArray(tripArchive.tripArchives, objectPath)
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

export const selectDeletingTripArchive = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.deletingTripArchive
)

export const selectDeleteTripArchiveError = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.deleteTripArchiveError?tripArchive.deleteTripArchiveError.message:null
)

export const selectDeleteTripArchiveSuccessful = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.deleteTripArchiveSuccessful
)

export const selectUpdateTripArchiveSuccessful = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.updatingTripArchive
)

export const selectUpdateTripArchiveError = createSelector(
  [selectTripArchive],

  (tripArchive)=>tripArchive.updateTripArchiveError?tripArchive.updateTripArchiveError.message:null
)