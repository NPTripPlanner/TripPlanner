import { createSelector } from "reselect";

const selectTripManager = (state) => state.tripManager;

export const selectTripCollection = createSelector(
    [selectTripManager],

    (tripManager)=>tripManager.tripCollection
);

export const selectFilterCollection = createSelector(
    [selectTripManager],
    
    (tripManager)=>tripManager.filterCollection
);

export const selectSearchingTripCollection = createSelector(
    [selectTripManager],

    (tripManager)=>tripManager.searchingTripItems
);

export const selectFetchingTripCollection = createSelector(
    [selectTripManager],

    (tripManager)=>tripManager.fetchingTripItems
);