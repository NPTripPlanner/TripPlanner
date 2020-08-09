import { createSelector } from "reselect";

const selectTripManager = (state) => state.tripManager;

export const selectTripCollection = createSelector(
    [selectTripManager],
  
    //DOTO: asynchronous selection
    // (tripManager) => {
    //     if(keyword === '') return tripManager.tripCollection;
    //     const newkeyword = exact?keyword:keyword.toLowerCase();

    //     return tripManager.tripCollection.filter((tripItem)=>{

    //         const tripName = exact?tripItem.tripName:tripItem.tripName.toLowerCase();
    //         return tripName.includes(newkeyword);
    //     });
    // }
    (tripManager)=>tripManager.tripCollection
);

export const selectFilterCollection = createSelector(
    [selectTripManager],
    
    (tripManager)=>tripManager.filterCollection
);

export const selectFetchingTripCollection = createSelector(
    [selectTripManager],

    (tripManager)=>tripManager.fetchingTripItems
);