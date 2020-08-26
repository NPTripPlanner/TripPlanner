import actionType from './header.actionType';
import {
    ChangeHeaderTitleSuccessful,
    ChangeHeaderTitleFail,
} from './header.actions';
import { call, all, put, takeEvery } from 'redux-saga/effects';

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
    yield takeEvery(actionType.CHANGE_HEADER_TITLE, doChangeHeaderTitle);
}

function* headerSaga(){
    yield all([
        call(changeHeaderTitle),
    ]);
}

export default headerSaga;