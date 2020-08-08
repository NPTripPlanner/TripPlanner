import { createSelector } from "reselect";

const selectTripManager = (state) => state.tripManager;

export const selectTripCollection = (keyword='', exact=false) => createSelector(
    [selectTripManager],
  
    //DOTO: asynchronous selection
    (tripManager) => {
        if(keyword === '') return tripManager.tripCollection;
        const newkeyword = exact?keyword:keyword.toLowerCase();

        return tripManager.tripCollection.filter((tripItem)=>{

            const tripName = exact?tripItem.tripName:tripItem.tripName.toLowerCase();
            return tripName.includes(newkeyword);
        });
    }
);

export const selectFetchingTripCollection = createSelector(
    [selectTripManager],

    (tripManager)=>tripManager.fetchingTripItems
)