import actionType from "./tripArchive.actionType";

import {
  FetchTripArchivesSuccessful,
  FetchTripArchivesFail,
  CreateTripArchiveSuccessful,
  CreateTripArchiveFail,
  CreateTripArchiveResetSuccessful,
  DeleteTripArchiveSuccessful,
  DeleteTripArchiveFail,
  UpdateTripArchiveNameSuccessful,
  UpdateTripArchiveNameFail,
  UpdateTripArchiveNameStateResetSuccessful,
} from "./tripArchive.actions";

import {
  GetCurrentUser,
  // FetchTripArchiveAfter,
  SearchTripArchive,
  CreateTripArchive,
  DeleteTripArchive,
  UpdateTripArchiveName,
} from '../../utils/firebase.utils'; 

import { call, put, all, takeLeading, take, actionChannel, debounce } from "redux-saga/effects";
import { PostNotification } from "../notification/notification.actions";

function* getCurrentUser(){
  const user = yield call(GetCurrentUser);
  if(!user) throw new Error('User not logged in');
  return user;
}

let lastFetchCursor = null;
function* doFetchTripArchives(action){
  try{
    const {amount, fromStart, keyword} = action.payload;
    const user = yield call(getCurrentUser);
    lastFetchCursor = fromStart?null:lastFetchCursor;
    const result = yield call(SearchTripArchive, user.uid, keyword, amount, lastFetchCursor);
    lastFetchCursor = result.lastDocSnapshotCursor;
    yield put(FetchTripArchivesSuccessful(result.results, fromStart));
  }
  catch(error){
    yield put(FetchTripArchivesFail(error));
    yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
  }
}

export function* fetchTripArchives() {
  yield debounce(1500, actionType.FETCH_TRIP_ARCHIVES_START, doFetchTripArchives);
}

export function* doCreateTripArchive(action){
  try{
    const {tripArchiveName} = action.payload;
    const user = yield call(getCurrentUser);
    const tripArchive = yield call(CreateTripArchive, user.uid, tripArchiveName);
    yield put(CreateTripArchiveSuccessful(tripArchive));
    yield put(PostNotification(`${tripArchiveName} has been created`, 'success'));
  }
  catch(error){
    yield put(CreateTripArchiveFail(error));
    yield put(PostNotification(
      `Unable to create collection (${error.message})`,
      'error'));
  }
}

export function* createTripArchive(){
  yield takeLeading(actionType.CREATE_TRIP_ARCHIVE_START, doCreateTripArchive);
}

export function* createTripArchiveReset(){
  while(true){
    yield take(actionType.CREATE_TRIP_ARCHIVE_STATE_RESET);
    yield put(CreateTripArchiveResetSuccessful());
  }
}

export function* doDeleteTripArchive(action){
  try{
    const {tripArchiveId, tripArchiveName} = action.payload;
    const user = yield call(getCurrentUser);
    yield call(DeleteTripArchive, user.uid, tripArchiveId);
    yield put(DeleteTripArchiveSuccessful(tripArchiveId));
    yield put(PostNotification(`${tripArchiveName} has been deleted`, 'success'));
  }
  catch(err){
    yield put(DeleteTripArchiveFail(err));
    yield put(PostNotification(`Unable to delete collection (${err.message})`, 'error'));
  }
}

export function* deleteTripArchive(){
  yield takeLeading(actionType.DELETE_TRIP_ARCHIVE_START, doDeleteTripArchive);
}

export function* doUpdateTripArchiveName(action){
  try{
    const {tripArchiveId, newName, oldName} = action.payload;
    const user = yield call(getCurrentUser);
    if(newName !== oldName){
      const tripArchive = yield call(UpdateTripArchiveName, user.uid, tripArchiveId, newName);
      yield put(UpdateTripArchiveNameSuccessful(tripArchive));
    }
    yield put(PostNotification(`${oldName} changed to ${newName}`, 'success'));
  }
  catch(err){
    yield put(UpdateTripArchiveNameFail(err));
    yield put(PostNotification(`Unable to update collection name`, 'error'));
  }
}

export function* updateTripArchiveName(){
  const updateChan = yield actionChannel(actionType.UPDATE_TRIP_ARCHIVE_NAME_START);

  while(true){
    const action = yield take(updateChan);
    yield call(doUpdateTripArchiveName, action);
  }
}

export function* updateTripArchiveNameReset(){
  while(true){
    yield take(actionType.UPDATE_TRIP_ARCHIVE_NAME_STATE_RESET);
    yield put(UpdateTripArchiveNameStateResetSuccessful());
  }
}

export default function* TripArchiveSaga() {
  yield all([
    call(fetchTripArchives),
    call(createTripArchive),
    call(createTripArchiveReset),
    call(deleteTripArchive),
    call(updateTripArchiveName),
    call(updateTripArchiveNameReset),
  ]);
}
