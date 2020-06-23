import {setMessageSaga} from './test/test.saga';
import {
    loginDialog
} from './dialog/dialog.saga';

import userSaga from './user/user.saga';

import {all, call} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([
        call(setMessageSaga),
        call(loginDialog),
        call(userSaga),
    ]);
}