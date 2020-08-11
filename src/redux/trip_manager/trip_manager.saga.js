import actionType from "./trip_manager.actionType";

import {
  FetchTripItemsSuccessful,
  FetchTripItemsFail,
  SearchTripItemsSuccessful,
} from "./trip_manager.actions";

import { FetchTripItemCollection } from "../../utils/firebase.utils";
import { SearchObjectsInCollection } from "../../utils/utils";

import { call, put, all, takeLeading, takeLatest } from "redux-saga/effects";

function* doFetchTripItems() {
  try {
    const tripItems = yield call(FetchTripItemCollection);
    yield put(FetchTripItemsSuccessful(tripItems));
  } catch (error) {
    yield put(FetchTripItemsFail(error));
  }
}

function* fetchTripItems() {
  yield takeLeading(actionType.FETCH_TRIP_ITEMS_START, doFetchTripItems);
}

function* doSearchTripItems({ payload: { collection, keys, keyword } }) {
  console.log(collection, keys, keyword);
  const result = yield call(
    SearchObjectsInCollection,
    collection,
    keys,
    keyword
  );
  yield put(SearchTripItemsSuccessful(result));
}

function* searchTripItems() {
  yield takeLatest(actionType.SEARCH_TRIP_ITEMS_START, doSearchTripItems);
}

export default function* TripManagerSaga() {
  yield all([call(fetchTripItems), call(searchTripItems)]);
}
