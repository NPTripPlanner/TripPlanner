import actionType from './schedule.actionType';
import { all, call, take, put, select, takeLeading, takeLatest, cancelled } from "redux-saga/effects";
import { SetItinerarySuccessful, ClearAllScheduleStateSuccessful } from './schedule.actions';
import { SetCollectionData } from '../collection/collection.actions';
import StateKeys from '../collection/collection.stateKeys';
import { IGenericState } from '../collection/collection.reducer';
import { Schedule, Itinerary } from '../../schema/firestore.schema';
import { selectScheduleCol, selectUnderItinerary, selectSortedSchedules } from './schedule.selector';
import { CreateScheduleForItinerary, ListenToRepository } from '../../utils/firebase.utils';
import {dateBefore, getDateBaseOn } from '../../utils/datetime.utils';
import { PostNotification } from '../notification/notification.actions';
import ImprovedRepository from '../../schema/ImprovedRepository';
import { eventChannel, EventChannel } from 'redux-saga';

function* getSchdeuleCollectionState(){
    return yield select(selectScheduleCol);
}

export function * updateCollectionData(state:IGenericState<Schedule>){
    yield put(SetCollectionData(StateKeys.SCHEDULE, state));
}

//#region Listen to scheduls 
let scheduleListener = null;
let evtChannel:EventChannel<Schedule[]> = null;

function clearScheduleListener(){
    scheduleListener();
    scheduleListener = null;
}

function scheduleEventChannel(schedules:ImprovedRepository<Schedule>){
    return eventChannel<Schedule[]>(emitter=>{
        scheduleListener = ListenToRepository<Schedule, ImprovedRepository<Schedule>>(schedules,
            (docs) => {
                emitter(docs);
            },
            (err) => {
                console.log('Listen to schedule error', err);
            }
        );
        return ()=>{
            clearScheduleListener();
            console.log('clear schedule listener')
        }
    })
}
function* doListenOnSchedules(){
    try{
        if(evtChannel){
            evtChannel.close();
        }
        
        const itinerary:Itinerary = yield select(selectUnderItinerary);
        const repo = itinerary.schedules as ImprovedRepository<Schedule>;
        evtChannel = scheduleEventChannel(repo);

        while(true){
            const docs = yield take(evtChannel);
            const state:IGenericState<Schedule> = yield call(getSchdeuleCollectionState);
            state.dataArray = docs;
            yield call(updateCollectionData, state);
        }
        
    }
    catch(err){
        console.log(err);
    }
    finally{
        if(yield cancelled()){
            evtChannel.close();
            console.log('listen schedule channel closed');
        }
    }
}

function* listenOnSchedules(){
    yield takeLatest(actionType.LISTEN_ON_SCHEDULES_START, doListenOnSchedules);
}

function * stopListenOnSchedules(){
    while(true){
        yield take(actionType.LISTEN_ON_SCHEDULES_STOP);
        if(evtChannel) evtChannel.close();
    }
}
//#endregion Listen to scheduls 


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
        let state:IGenericState<Schedule> = yield call(getSchdeuleCollectionState);
        state = state.getInitSate();
        yield call(updateCollectionData, state);
        yield put(ClearAllScheduleStateSuccessful());
    }
}

function* doCreateSchedule(){
    try{
        const itinerary:Itinerary = yield select(selectUnderItinerary);
        const sortedSchedules:Schedule[] = yield select(selectSortedSchedules);
        let newDate:Date = null;

        if(sortedSchedules.length === 0){
            newDate = itinerary.startDateUTC;
            console.log('create first', newDate);
        }
        else{
            const lastSchedule = sortedSchedules[sortedSchedules.length-1];
            if(dateBefore(lastSchedule.date, itinerary.endDateUTC)){
                newDate = getDateBaseOn(lastSchedule.date, 1);
                console.log('create from last', newDate);
            }
            else{
                newDate = null;
            }
        }

        if(newDate){
            yield call(CreateScheduleForItinerary, itinerary, newDate);
            yield put(PostNotification(`New schedule has been created`, 'success'));
        }
        else{
            yield put(PostNotification(
                `Schedule is full`,
                'error'));
        }
    }
    catch(err){
        console.log(err);
    }
}

function* createSchedule(){
    yield takeLeading(actionType.CREATE_SCHEDULE, doCreateSchedule);
}

export default function* scheduleSaga(){
    yield all([
        call(setItinerary),
        call(clearAllScheduleState),
        call(createSchedule),
        call(listenOnSchedules),
        call(stopListenOnSchedules),
    ]);
}