import {take, put} from 'redux-saga/effects';

import DialogActionTypes from './dialog.actionTypes';

export function* loginDialog(){
    try{
        const action = yield take(DialogActionTypes.Login);
        yield put(action);
    }
    catch(err){
        console.error(err);
    }
}