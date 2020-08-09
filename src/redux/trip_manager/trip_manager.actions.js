import actionType from './trip_manager.actionType';

export const StartFetchTripItems = ()=>({
    type: actionType.FETCH_TRIP_ITEMS_START,
});

export const FetchTripItemsSuccessful = (tripItems)=>({
    type: actionType.FETCH_TRIP_ITEMS_SUCCESSFUL,
    payload: tripItems
});

export const FetchTripItemsFail = (error)=>({
    type: actionType.FETCH_TRIP_ITEMS_FAIL,
    payload: error
});

export const SearchTripItems = (collection, keys, keyword)=>({
    type: actionType.SEARCH_TRIP_ITEMS_START,
    payload:{
        collection,
        keys,
        keyword
    }
});

export const SearchTripItemsSuccessful = (filterCollection)=>({
    type: actionType.SEARCH_TRIP_ITEMS_SUCCESSFUL,
    payload: filterCollection
});