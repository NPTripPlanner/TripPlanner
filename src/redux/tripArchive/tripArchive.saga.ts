import actionType from "./tripArchive.actionType";

import {
  GetCurrentUser,
  CreateTripArchive,
  DeleteTripArchive,
  UpdateTripArchiveName,
  ConvertSearchKeywordToArray,
  GetDataByQuery,
  GetCollectionRef,
  GetRepository,
} from '../../utils/firebase.utils'; 

import { call, put, all, takeLeading, take, actionChannel, debounce } from "redux-saga/effects";
import { PostNotification } from "../notification/notification.actions";
import { TripArchive } from "../../schema/firestore.schema";
import { select } from "redux-saga-test-plan/matchers";
import { selectTripArchiveCol } from "./tripArchive.selector";
import { IGenericState } from "../collection/collection.reducer";
import { SetCollectionData } from "../collection/collection.actions";
import StateKeys from "../collection/collection.stateKeys";

/**
 * Get current user
 */
function* getCurrentUser(){
  const user = yield call(GetCurrentUser);
  if(!user) throw new Error('User not logged in');
  return user;
}

function* getTripArchiveCollectionState(){
  return yield select(selectTripArchiveCol);
}

export function * updateCollectionData(state:IGenericState<TripArchive>){
  yield put(SetCollectionData(StateKeys.TRIP_ARCHIVE, state));
}

let lastFetchCursor = null;
let lastSearchKeyword = '';
/**
 * worker for fetch trip archive data
 * @param amount 
 * @param fromStart 
 * @param keyword 
 */
function* fetchTripArchivesWorker(userId, amount, fromStart, keyword){

  lastFetchCursor = fromStart?null:lastFetchCursor;
  if(keyword!==null && keyword!==undefined){
    if(lastSearchKeyword !== keyword){ 
      lastSearchKeyword = keyword;
    }
  }
  
  const colRef = yield call(GetCollectionRef, TripArchive);
  let query = colRef.where('ownerId', '==', userId);
  const splitedKeywords = ConvertSearchKeywordToArray(lastSearchKeyword);
  if(splitedKeywords){
    query = query.where('tags', 'array-contains-any', splitedKeywords);
  }
  query = query.orderBy('createAt', 'desc');
  const repo = yield call(GetRepository, TripArchive);
  const result = yield call(GetDataByQuery, repo, query, amount, lastFetchCursor);
  lastFetchCursor = result.lastDocSnapshotCursor;

  return result.results;
}
export function* doFetchTripArchives(action){
  try{
    const {amount, fromStart, keyword} = action.payload;

    //prepare fetching
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.fetchingData = true;
    state.fetchDataError = null;
    yield call(updateCollectionData, state);

    const user = yield call(getCurrentUser);
    //call worker
    const results = yield call(fetchTripArchivesWorker, user.uid, amount, fromStart, keyword);

    //fetch successful
    state.fetchingData = false;
    state.fetchDataError = null;
    state.dataArray = fromStart?results:state.dataArray.concat(results);
    state.moreData = results.length?true:false;
    yield call(updateCollectionData, state);
  }
  catch(error){
    //fetch error
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.fetchingData = false;
    state.fetchDataError = error;
    yield call(updateCollectionData, state);

    yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
  }
}

export function* fetchTripArchives() {
  yield debounce(700, actionType.FETCH_TRIP_ARCHIVES_START, doFetchTripArchives);
}

export function* fetchMoreTripArchives() {
  yield takeLeading(actionType.FETCH_MORE_TRIP_ARCHIVES_START, doFetchTripArchives);
}

export function* createTripArchiveWorker(userId, tripArchiveName){
  
  const tripArchive = yield call(CreateTripArchive, userId, tripArchiveName);
  return tripArchive;
}
export function* doCreateTripArchive(action){
  try{
    const {tripArchiveName} = action.payload;

    //prepare create
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.creatingData = tripArchiveName;
    state.createDataError = null;
    state.createDataSuccessful = false;
    yield call(updateCollectionData, state);

    const user = yield call(getCurrentUser);
    //call worker
    const tripArchive = yield call(createTripArchiveWorker, user.uid, tripArchiveName);

    //create successful
    state.dataArray = [tripArchive, ...state.dataArray];
    state.creatingData = null;
    state.createDataSuccessful = true;
    yield call(updateCollectionData, state);

    yield put(PostNotification(`${tripArchiveName} has been created`, 'success'));
  }
  catch(error){
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.createDataError = error;
    state.creatingData = null;
    state.createDataSuccessful = false;
    yield call(updateCollectionData, state);

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

    let state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state = state.resetCreateState(state);
    yield call(updateCollectionData, state);

  }
}

export function* deleteTripArchiveWorker(userId, tripArchiveId){
  yield call(DeleteTripArchive, userId, tripArchiveId);
}
export function* doDeleteTripArchive(action){
  try{
    const {tripArchiveId, tripArchiveName} = action.payload;

    //prepare delete
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.deletingData = tripArchiveName;
    state.deleteDataError = null;
    state.deleteDataSuccessful = false;
    yield call(updateCollectionData, state);

    const user = yield call(getCurrentUser);
    //call worker
    yield call(deleteTripArchiveWorker, user.uid, tripArchiveId);

    //delete successful
    state.deletingData = null;
    state.deleteDataError = null;
    state.deleteDataSuccessful = true;
    //filter out the trip archive we deleted
    const filterArchives = state.dataArray.filter(archive=>{
          return archive.id!==tripArchiveId;
    });
    state.dataArray = filterArchives;
    yield call(updateCollectionData, state);

    yield put(PostNotification(`${tripArchiveName} has been deleted`, 'success'));
  }
  catch(error){
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.deletingData = null;
    state.deleteDataError = error;
    state.deleteDataSuccessful = false;
    yield call(updateCollectionData, state);

    yield put(PostNotification(`Unable to delete collection (${error.message})`, 'error'));
  }
}

export function* deleteTripArchive(){
  yield takeLeading(actionType.DELETE_TRIP_ARCHIVE_START, doDeleteTripArchive);
}

export function* deleteTripArchiveReset(){
  while(true){
    yield take(actionType.DELETE_TRIP_ARCHIVE_STATE_RESET);

    let state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state = state.resetDeleteState(state);
    yield call(updateCollectionData, state);

  }
}

export function* updateTripArchiveNameWorker(userId, tripArchiveId, newName, oldName){
  if(newName !== oldName){
    const tripArchive = yield call(UpdateTripArchiveName, userId, tripArchiveId, newName);
    return tripArchive;
  }
  return null
}
export function* doUpdateTripArchiveName(action){
  try{
    const {tripArchiveId, newName, oldName} = action.payload;

    //prepare update
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.updatingData = oldName;
    state.updateDataError = null;
    state.updateDataSuccessful = false;
    yield call(updateCollectionData, state);

    const user = yield call(getCurrentUser);
    const tripArchive = yield call(updateTripArchiveNameWorker, user.uid, tripArchiveId, newName, oldName);
    
    //update successful
    state.updatingData = null;
    state.updateDataError = null;
    state.updateDataSuccessful = true;
    //replace the old trip archive with new one
    if(tripArchive){
      state.dataArray = state.dataArray.map<TripArchive>(archive=>{
        return archive.id === tripArchive.id ? tripArchive : archive;
      });
    }
    yield call(updateCollectionData, state);

    yield put(PostNotification(`${oldName} changed to ${newName}`, 'success'));
  }
  catch(error){
    const state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state.updatingData = null;
    state.updateDataError = error;
    state.updateDataSuccessful = false;
    yield call(updateCollectionData, state);

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

    let state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state = state.resetUpdateState(state);
    yield call(updateCollectionData, state);
  }
}

export function* clearAllTripArchiveState(){
  while(true){
    yield take(actionType.CLEAR_ALL_TRIP_ARCHIVE_STATE);

    let state:IGenericState<TripArchive> = yield call(getTripArchiveCollectionState);
    state = state.getInitSate();
    yield call(updateCollectionData, state);
  }
}

export default function* TripArchiveSaga() {
  yield all([
    call(fetchTripArchives),
    call(fetchMoreTripArchives),
    call(createTripArchive),
    call(createTripArchiveReset),
    call(deleteTripArchive),
    call(deleteTripArchiveReset),
    call(updateTripArchiveName),
    call(updateTripArchiveNameReset),
    call(clearAllTripArchiveState),
  ]);
}
