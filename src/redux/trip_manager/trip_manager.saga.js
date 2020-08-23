import actionType from "./trip_manager.actionType";

import {
  FetchTripArchivesSuccessful,
  FetchTripArchivesFail,
  CreateTripArchiveSuccessful,
  CreateTripArchiveFail,

//////////////////////////////////To be removed//////////////////////////
  FetchTripItemsSuccessful,
  FetchTripItemsFail,
  SearchTripItemsSuccessful,
} from "./trip_manager.actions";

// import { FetchTripItemCollection } from "../../utils/firebase.utils";
import { SearchObjectsInCollection } from "../../utils/utils";
import {
  GetCurrentUser,
  FetchTripArchiveAfter,
  CreateTripArchive,
} from '../../utils/firebase.utils'; 

import { call, put, all, takeLeading, takeLatest } from "redux-saga/effects";

let lastFetchCursor = null;
function* doFetchTripArchives({payload:{amount, fromStart}}){
  try{
    const user = yield call(GetCurrentUser);
    lastFetchCursor = fromStart?null:lastFetchCursor;
    const result = yield call(FetchTripArchiveAfter, user.uid, amount, lastFetchCursor);
    lastFetchCursor = result.lastDocSnap;
    yield put(FetchTripArchivesSuccessful(result.results, fromStart));
  }
  catch(error){
    yield put(FetchTripArchivesFail(error));
  }
}

export function* fetchTripArchives() {
  yield takeLatest(actionType.FETCH_TRIP_ARCHIVES_START, doFetchTripArchives);
}

export function* doCreateTripArchive({payload:{tripArchiveName}}){
  try{
    const user = yield call(GetCurrentUser);
    const tripArchive = yield call(CreateTripArchive, user.uid, tripArchiveName);
    yield put(CreateTripArchiveSuccessful(tripArchive));
  }
  catch(error){
    yield put(CreateTripArchiveFail(error));
  }
}

export function* createTripArchive(){
  yield takeLeading(actionType.CREATE_TRIP_ARCHIVE_START, doCreateTripArchive);
}

//////////////////////////////////To be removed//////////////////////////
function* doFetchTripItems() {
  try {
    // const tripItems = yield call(FetchTripItemCollection);
    yield put(FetchTripItemsSuccessful([]));
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
  yield all([
    call(fetchTripArchives),
    call(createTripArchive),

    //////////////////////////////////To be removed//////////////////////////
    call(fetchTripItems),
    call(searchTripItems)
  ]);
}
