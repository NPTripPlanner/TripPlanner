import { createSelector } from "reselect";

const selectTripManager = (state) => state.tripManager;

export const selectFetchingTripArchives = createSelector(
  [selectTripManager],
  
  (tripManager)=>tripManager.fetchingTripArchives
)

export const selectFetchingTripArchiveError = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.fetchingTripArchivesError?tripManager.fetchingTripArchivesError.message:null
)

export const selectTripArchives = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.tripArchives
)

export const selectMoreTripArchives = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.moreTripArchives
)

export const selectCreatingTripArchive = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.creatingTripArchive
)

export const selectCreatingTripArchiveError = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.createTripArchiveError?tripManager.createTripArchiveError.message:null
)

export const selectCreateTripArchiveSuccessful = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.createTripArchiveSuccessful
)