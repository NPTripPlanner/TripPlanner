import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

export const selctTripArchiveCol = (state:IRootReducerState) => state.collection.tripArchive;

export const selectTripArchives = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.dataArray
)

export const selectFetchingTripArchives = createSelector(
  [selctTripArchiveCol],
  
  (collection)=>collection.fetchingData
)

export const selectFetchingTripArchiveError = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.fetchDataError?collection.fetchDataError.message:null
)

export const selectMoreTripArchives = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.moreData
)

export const selectCreatingTripArchive = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.creatingData
)

export const selectCreatingTripArchiveError = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.createDataError?collection.createDataError.message:null
)

export const selectCreateTripArchiveSuccessful = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.createDataSuccessful
)

export const selectDeletingTripArchive = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.deletingData
)

export const selectDeleteTripArchiveError = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.deleteDataError?collection.deleteDataError.message:null
)

export const selectDeleteTripArchiveSuccessful = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.deleteDataSuccessful
)

export const selectUpdateTripArchiveSuccessful = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.updateDataSuccessful
)

export const selectUpdateTripArchiveError = createSelector(
  [selctTripArchiveCol],

  (collection)=>collection.updateDataError?collection.updateDataError.message:null
)