import actionType from './schedule.actionType';
import { all, call, take, put } from "redux-saga/effects";
import { SetItinerarySuccessful, ClearAllScheduleStateSuccessful } from './schedule.actions';


function * setItinerary(){
    while(true){
        const action = yield take(actionType.SET_ITINERARY);
        const {itinerary} = action.payload;
        yield put(SetItinerarySuccessful(itinerary));
    }
}

function* clearAllScheduleState(){
    while(true){
        yield take(actionType.CLEAR_ALL_SCHEDULE_STATE);
        yield put(ClearAllScheduleStateSuccessful());
    }
}

export default function* scheduleSaga(){
    yield all([
        call(setItinerary),
        call(clearAllScheduleState),
    ]);
}