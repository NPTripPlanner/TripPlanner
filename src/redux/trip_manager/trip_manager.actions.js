import actionType from "./trip_manager.actionType";
import { action } from "@storybook/addon-actions";

/**
 * Start to fetch trip archives
 * @param {*} amount how many to fetch
 * @param {*} fromStart true start all over false to fetch next amout default true
 */
export const StartFetchTripArchives = (amount=10, fromStart=true) =>({
  type: actionType.FETCH_TRIP_ARCHIVES_START,
  payload: {amount, fromStart},
});

export const FetchTripArchivesSuccessful = (tripArchiveData, fromStart) =>({
  type: actionType.FETCH_TRIP_ARCHIVES_SUCCESSFUL,
  payload: {tripArchiveData, fromStart},
});

export const FetchTripArchivesFail = (error)=>({
  type: actionType.FETCH_TRIP_ARCHIVES_FAIL,
  payload: error,
});

/////////////////////////////To be removed//////////////////////////////////
export const StartFetchTripItems = () => ({
  type: actionType.FETCH_TRIP_ITEMS_START,
});

export const FetchTripItemsSuccessful = (tripItems) => ({
  type: actionType.FETCH_TRIP_ITEMS_SUCCESSFUL,
  payload: tripItems,
});

export const FetchTripItemsFail = (error) => ({
  type: actionType.FETCH_TRIP_ITEMS_FAIL,
  payload: error,
});

export const SearchTripItems = (collection, keys, keyword) => ({
  type: actionType.SEARCH_TRIP_ITEMS_START,
  payload: {
    collection,
    keys,
    keyword,
  },
});

export const SearchTripItemsSuccessful = (filterCollection) => ({
  type: actionType.SEARCH_TRIP_ITEMS_SUCCESSFUL,
  payload: filterCollection,
});
