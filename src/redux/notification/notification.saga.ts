import actionType from './notification.actionType';
import {
    PostNotificationSuccessful
} from './notification.actions';
import { call, all, put, actionChannel, take } from 'redux-saga/effects';

function * doSendNewNotificaiton(action){
    const {message, variant} = action.payload;
    yield put(PostNotificationSuccessful(message, variant));
}

function* sendNewNotification(){
    const chan = yield actionChannel(actionType.POST_NEW_NOTIFICATION);

    while(true){
        const action = yield take(chan);
        yield call(doSendNewNotificaiton, action);
    }
}

function* postNotificationSaga(){
    yield all([
        call(sendNewNotification),
    ]);
}

export default postNotificationSaga;