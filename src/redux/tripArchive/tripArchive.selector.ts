import { createSelector } from "reselect";
import {IRootReducerState} from '../Root-Reducer';

//select tripArchive state under collection state
export const selectTripArchiveCol = (state:IRootReducerState) => state.collection.tripArchive;

export const selectTripArchives = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.dataArray
)

export const selectFetchingTripArchives = createSelector(
  [selectTripArchiveCol],
  
  (collection)=>collection.fetchingData
)

export const selectFetchingTripArchiveError = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.fetchDataError?collection.fetchDataError.message:null
)

export const selectMoreTripArchives = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.moreData
)

export const selectCreatingTripArchive = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.creatingData
)

export const selectCreatingTripArchiveError = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.createDataError?collection.createDataError.message:null
)

export const selectCreateTripArchiveSuccessful = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.createDataSuccessful
)

export const selectDeletingTripArchive = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.deletingData
)

export const selectDeleteTripArchiveError = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.deleteDataError?collection.deleteDataError.message:null
)

export const selectDeleteTripArchiveSuccessful = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.deleteDataSuccessful
)

export const selectUpdateTripArchiveSuccessful = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.updateDataSuccessful
)

export const selectUpdateTripArchiveError = createSelector(
  [selectTripArchiveCol],

  (collection)=>collection.updateDataError?collection.updateDataError.message:null
)