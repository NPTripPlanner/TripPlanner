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

  (tripManager)=>tripManager.creatingTripArchiveError?tripManager.creatingTripArchiveError.message:null
)

  ///////////////////To be removed////////////////////////
export const selectTripCollection = createSelector(
  [selectTripManager],

  (tripManager) => tripManager.tripCollection
);

export const selectFilterCollection = createSelector(
  [selectTripManager],

  (tripManager) => tripManager.filterCollection
);

export const selectSearchingTripCollection = createSelector(
  [selectTripManager],

  (tripManager) => tripManager.searchingTripItems
);

export const selectFetchingTripCollection = createSelector(
  [selectTripManager],

  (tripManager) => tripManager.fetchingTripItems
);
