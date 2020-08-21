import { createSelector } from "reselect";

const selectTripManager = (state) => state.tripManager;

export const selectFetchingTripArchives = createSelector(
  [selectTripManager],
  
  (tripManager)=>tripManager.fetchingTripArchives
)

export const selectFetchingTripArchiveError = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.fetchingTripArchivesError
)

export const selectTripArchives = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.tripArchives
)

export const selectMoreTripArchives = createSelector(
  [selectTripManager],

  (tripManager)=>tripManager.moreTripArchives
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
