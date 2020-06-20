import {setMessageSaga} from './test/test.saga';
import {all, call} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([
        call(setMessageSaga),
    ]);
}