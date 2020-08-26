import actionType from "./tripArchive.actionType";

import {
  FetchTripArchivesSuccessful,
  FetchTripArchivesFail,
  CreateTripArchiveSuccessful,
  CreateTripArchiveFail,
  CreateTripArchiveReset,
} from "./tripArchive.actions";

import {
  GetCurrentUser,
  FetchTripArchiveAfter,
  CreateTripArchive,
} from '../../utils/firebase.utils'; 

import { call, put, all, takeLeading, takeLatest, take } from "redux-saga/effects";

let lastFetchCursor = null;
function* doFetchTripArchives(action){
  try{
    const {amount, fromStart} = action.payload;
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

export function* doCreateTripArchive(action){
  try{
    const {tripArchiveName} = action.payload;
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

export function* createTripArchiveReset(){
  while(true){
    yield take(actionType.CREATE_TRIP_ARCHIVE_RESET);
    yield put(CreateTripArchiveReset());
  }
}

export default function* TripArchiveSaga() {
  yield all([
    call(fetchTripArchives),
    call(createTripArchive),
    call(createTripArchiveReset),
  ]);
}
