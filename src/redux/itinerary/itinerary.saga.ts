import actionType from "./itinerary.actionType";

import {call, all, put, take, select, debounce, takeLeading} from 'redux-saga/effects';
import { 
    SetTripArchiveSuccessful,
} from "./itinerary.actions";
import { selectUnderTripArchive, selectItineraryCol } from "./itinerary.selector";
import { TripArchive, Itinerary } from "../../schema/firestore.schema";
import { ConvertRepo, ConvertSearchKeywordToArray, GetDataByQuery, CreateItineraryForTripArchive, GetCurrentUser, DeleteItinerary, UpdateItinerary, IItineraryUpdateData } from "../../utils/firebase.utils";
import ImprovedRepository from "../../schema/ImprovedRepository";
import { PostNotification } from "../notification/notification.actions";
import { IGenericState } from "../collection/collection.reducer";
import { SetCollectionData } from "../collection/collection.actions";
import StateKeys from "../collection/collection.stateKeys";

function* getCurrentUser(){
    const user = yield call(GetCurrentUser);
    if(!user) throw new Error('User not logged in');
    return user;
}

function* getItineraryCollectionState(){
    return yield select(selectItineraryCol);
}

function * updateCollectionData(state:IGenericState<Itinerary>){
    yield put(SetCollectionData(StateKeys.ITINERARY, state));
}

function * setTripArchive(){
    while(true){
        const action = yield take(actionType.SET_TRIP_ARCHIVE);
        const {tripArchive} = action.payload;
        yield put(SetTripArchiveSuccessful(tripArchive));
    }
}

function* clearAllItineraryState(){
    while(true){
        yield take(actionType.CLEAR_ALL_ITINERARY_STATE);

        let state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state = state.getInitSate();
        yield call(updateCollectionData, state);
    }
}

let lastFetchCursor = null;
let lastSearchKeyword = '';
function* fetchItinerariesWorker(amount, fromStart, keyword){

    lastFetchCursor = fromStart?null:lastFetchCursor;
    if(keyword!==null && keyword!==undefined){
        if(lastSearchKeyword !== keyword){ 
        lastSearchKeyword = keyword;
        }
    }

    const tripArchive:TripArchive = yield select(selectUnderTripArchive);
    const itRepo : ImprovedRepository<Itinerary> = yield call(ConvertRepo, tripArchive.itineraries);
    
    let query = itRepo.getCollectionReference().orderBy('createAt', 'desc');
    const splitedKeywords = ConvertSearchKeywordToArray(keyword);
    if(splitedKeywords){
        query = query.where('tags', 'array-contains-any', splitedKeywords);
    }

    const result = yield call(GetDataByQuery, itRepo, query, amount, lastFetchCursor);
    lastFetchCursor = result.lastDocSnapshotCursor;
    
    return result.results;
}
function* doFetchItineraries(action){
    try{
        const {amount, fromStart, keyword} = action.payload;

        //prepare fetching
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.fetchingData = true;
        state.fetchDataError = null;
        yield call(updateCollectionData, state);
        
        //call worker
        const results = yield call(fetchItinerariesWorker, amount, fromStart, keyword);

        //fetch successful
        state.fetchingData = false;
        state.fetchDataError = null;
        state.dataArray = fromStart?results:state.dataArray.concat(results);
        state.moreData = results.length?true:false;
        yield call(updateCollectionData, state);

    }
    catch(error){
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.fetchingData = false;
        state.fetchDataError = error;
        yield call(updateCollectionData, state);

        yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
    }
}

function* fetchItineraries(){
    yield debounce(1500, actionType.FETCH_ITINERARIES_START, doFetchItineraries);
}

function* fetchMoreItineraries(){
    yield takeLeading(actionType.FETCH_MORE_ITINERARIES_START, doFetchItineraries);
}


function* createItineraryWorker(userId, itineraryName, startDate, endDate){
    const tripArchive:TripArchive = yield select(selectUnderTripArchive);

    const itinerary = yield call(CreateItineraryForTripArchive,
        userId, tripArchive.id, itineraryName,
        startDate, endDate
    );

    return itinerary;
}
function* doCreateItinerary(action){
    try{
        const {itineraryName, startDate, endDate} = action.payload;

        //prepare create
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.creatingData = itineraryName;
        state.createDataError = null;
        state.createDataSuccessful = false;
        yield call(updateCollectionData, state);

        const user = yield call(getCurrentUser);
        //call worker
        const itinerary = yield call(createItineraryWorker, user.uid,
            itineraryName, startDate, endDate
        );
        
        //crate successful
        state.creatingData = null;
        state.createDataError = null;
        state.createDataSuccessful = true;
        state.dataArray = [itinerary, ...state.dataArray];
        yield call(updateCollectionData, state);

        yield put(PostNotification(`${itineraryName} has been created`, 'success'));

    }
    catch(error){
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.creatingData = null;
        state.createDataError = error;
        state.createDataSuccessful = false;
        yield call(updateCollectionData, state);

        yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
    }
}

export function* createItinerary(){
    yield takeLeading(actionType.CREATE_ITINERARY_START, doCreateItinerary);
}
  
export function* createItineraryStateReset(){
    while(true){
        yield take(actionType.CREATE_ITINERARY_STATE_RESET);

        let state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state = state.resetCreateState(state);
        yield call(updateCollectionData, state);
    }
}

export function* deleteItineraryWorker(userId, tripArchiveId, itineraryId){
    yield call(DeleteItinerary, userId, tripArchiveId, itineraryId);
}

export function* doDeleteItinerary(action){
    try{
        const {tripArchiveId, itineraryId, itineraryName} = action.payload;

        //prepare create
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.deletingData = itineraryName;
        state.deleteDataError = null;
        state.deleteDataSuccessful = false;
        yield call(updateCollectionData, state);

        const user = yield call(getCurrentUser);
        //call worker
        yield call(deleteItineraryWorker, user.uid, tripArchiveId, itineraryId);

        //delete successful
        state.deletingData = null;
        state.deleteDataError = null;
        state.deleteDataSuccessful = true;
        state.dataArray = state.dataArray.filter(itinerary=>{
            return itineraryId !== itinerary.id;
        })
        yield call(updateCollectionData, state);

        yield put(PostNotification(`${itineraryName} has been deleted`, 'success'));
    }
    catch(error){
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.deletingData = null;
        state.deleteDataError = error;
        state.deleteDataSuccessful = false;
        yield call(updateCollectionData, state);

        yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
    }
}

export function* deleteItinerary(){
    yield takeLeading(actionType.DELETE_ITINERARY_START, doDeleteItinerary);
}

export function* deleteItineraryStateReset(){
    while(true){
        yield take(actionType.DELETE_ITINERARY_STATE_RESET);

        let state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state = state.resetDeleteState(state);
        yield call(updateCollectionData, state);
    }
}

export function* updateItineraryWorker(
    userId,
    tripArchiveId,
    itineraryId,
    itineraryName,
    startDate,
    endDate,
    ){
        const updateData:IItineraryUpdateData = {
            name: itineraryName,
            startDate: startDate,
            endDate: endDate,
        };

        const itinerary = yield call(UpdateItinerary, userId, tripArchiveId, itineraryId, updateData);
        return itinerary;
}
export function* doUpdateItinerary(action){
    try{
        const {
            itineraryId,
            itineraryName,
            startDate,
            endDate,
        } = action.payload;

        //prepare update
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.updatingData = itineraryName;
        state.updateDataError = null;
        state.updateDataSuccessful = false;
        yield call(updateCollectionData, state);

        const underTripArchive:TripArchive = yield select(selectUnderTripArchive);

        const user = yield call(getCurrentUser);
        //call worker
        const itinerary:Itinerary = yield call(updateItineraryWorker, 
            user.uid, underTripArchive.id, itineraryId, itineraryName, startDate, endDate
        );
        
        //delete successful
        state.updatingData = null;
        state.updateDataError = null;
        state.updateDataSuccessful = true;
        state.dataArray = state.dataArray.map(it=>{
            return itinerary.id===it.id?itinerary:it;
        })

        yield call(updateCollectionData, state);

        yield put(PostNotification(`${itineraryName} has been updated`, 'success'));

    }
    catch(error){
        const state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state.updatingData = null;
        state.updateDataError = error;
        state.updateDataSuccessful = false;
        yield call(updateCollectionData, state);

        yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
    }
}

export function* updateItinerary(){
    yield takeLeading(actionType.UPDATE_ITINERARY_START, doUpdateItinerary);
}

export function* updateItineraryStateReset(){
    while(true){
        yield take(actionType.UPDATE_ITINERARY_STATE_RESET);

        let state:IGenericState<Itinerary> = yield call(getItineraryCollectionState);
        state = state.resetUpdateState(state);
        yield call(updateCollectionData, state);
    }
}

export default function* itinerarySaga(){
    yield all([
        call(setTripArchive),
        call(clearAllItineraryState),
        call(fetchItineraries),
        call(fetchMoreItineraries),
        call(createItinerary),
        call(createItineraryStateReset),
        call(deleteItinerary),
        call(deleteItineraryStateReset),
        call(updateItinerary),
        call(updateItineraryStateReset),
    ]);
}