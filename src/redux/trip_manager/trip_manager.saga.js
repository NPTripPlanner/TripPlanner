import actionType from './trip_manager.actionType';

import {
    FetchTripItemsSuccessful,
    FetchTripItemsFail,
} from './trip_manager.actions';

import {FetchTripItemCollection} from '../../utils/firebase.utils';

import { call, put, all, takeLeading, takeEvery } from "redux-saga/effects";

function* doFetchTripItems(){
    try{
        const tripItems = yield call(FetchTripItemCollection);
        yield put(FetchTripItemsSuccessful(tripItems));
    }
    catch(error){
        yield put(FetchTripItemsFail(error));
    }
}

function* fetchTripItems(){
    yield takeLeading(actionType.FETCH_TRIP_ITEMS_START, doFetchTripItems);
}

export default function* TripManagerSaga(){
    yield all([
        call(fetchTripItems),
    ]);
}