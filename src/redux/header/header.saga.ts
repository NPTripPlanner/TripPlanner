import actionType from './header.actionType';
import {
    ChangeHeaderTitleSuccessful,
    ChangeHeaderTitleFail,
} from './header.actions';
import { call, all, put, actionChannel, take } from 'redux-saga/effects';

function * doChangeHeaderTitle(action){
    try{
        const {title} = action.payload;
        if(title === null) throw new Error('Title can not be null');
        yield put(ChangeHeaderTitleSuccessful(title)); 
    }
    catch(err){
        yield put(ChangeHeaderTitleFail(err));
    }
}

function* changeHeaderTitle(){
    const headerTitleChan = yield actionChannel(actionType.CHANGE_HEADER_TITLE);

    while(true){
        const action = yield take(headerTitleChan);
        yield call(doChangeHeaderTitle, action);
    }
}

function* headerSaga(){
    yield all([
        call(changeHeaderTitle),
    ]);
}

export default headerSaga;