import actionType from "./itinerary.actionType";

import {call, all, put, take, select, debounce, takeLeading} from 'redux-saga/effects';
import { SetTripArchiveSuccessful, ClearAllItineraryStateSuccessful, FetchItinerariesSuccessful, FetchItinerariesFail, CreateItineraryResetSuccessful, CreateItineraryFail, CreateItinerarySuccessful } from "./itinerary.actions";
import { selectUnderTripArchive } from "./itinerary.selector";
import { TripArchive, Itinerary } from "../../schema/firestore.schema";
import { ConvertRepo, ConvertSearchKeywordToArray, GetDataByQuery, CreateItineraryForTripArchive, GetCurrentUser } from "../../utils/firebase.utils";
import ImprovedRepository from "../../schema/ImprovedRepository";
import { PostNotification } from "../notification/notification.actions";

function* getCurrentUser(){
    const user = yield call(GetCurrentUser);
    if(!user) throw new Error('User not logged in');
    return user;
}

function * setTripArchive(){
    while(true){
        const action = yield take(actionType.SET_TRIP_ARCHIVE);
        const {tripArchive} = action.payload;
        yield put(SetTripArchiveSuccessful(tripArchive));
    }
}

function* clearAllState(){
    while(true){
        yield take(actionType.CLEAR_ALL_ITINERARY_STATE);
        yield put(ClearAllItineraryStateSuccessful());
    }
}

let lastFetchCursor = null;
function* doFetchItineraries(action){
    try{
        const {amount, fromStart, keyword} = action.payload;

        lastFetchCursor = fromStart?null:lastFetchCursor;
        const tripArchive:TripArchive = yield select(selectUnderTripArchive);
        const itRepo : ImprovedRepository<Itinerary> = yield call(ConvertRepo, tripArchive.itineraries);
        
        let query = itRepo.getCollectionReference().orderBy('createAt', 'desc');
        const splitedKeywords = ConvertSearchKeywordToArray(keyword);
        if(splitedKeywords){
            query = query.where('tags', 'array-contains-any', splitedKeywords);
        }

        const result = yield call(GetDataByQuery, itRepo, query, amount, lastFetchCursor);
        lastFetchCursor = result.lastDocSnapshotCursor;

        yield put(FetchItinerariesSuccessful(result.results, fromStart));
    }
    catch(error){
        yield put(FetchItinerariesFail(error));
        yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
    }
}

function* fetchItineraries(){
    yield debounce(1500, actionType.FETCH_ITINERARIES_START, doFetchItineraries);
}

function* doCreateItinerary(action){

    try{
        const {itineraryName, startDate, endDate} = action.payload;

        const tripArchive:TripArchive = yield select(selectUnderTripArchive);

        const user = yield call(getCurrentUser);

        const itinerary = yield call(CreateItineraryForTripArchive,
            user.uid, tripArchive.id, itineraryName,
            startDate, endDate
        );

        yield put(CreateItinerarySuccessful(itinerary));

    }
    catch(error){
        yield put(CreateItineraryFail(error));
        yield put(PostNotification(`Something went wrong (${error.message})`, 'error'));
    }
}

export function* createItinerary(){
    yield takeLeading(actionType.CREATE_ITINERARY_START, doCreateItinerary);
}
  
export function* createItineraryStateReset(){
    while(true){
        yield take(actionType.CREATE_ITINERARY_STATE_RESET);
        yield put(CreateItineraryResetSuccessful());
    }
}

export default function* itinerarySaga(){
    yield all([
        call(setTripArchive),
        call(clearAllState),
        call(fetchItineraries),
        call(createItinerary),
        call(createItineraryStateReset),
    ]);
}