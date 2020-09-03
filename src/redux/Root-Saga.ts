import userSaga from "./user/user.saga";
import tripArchiveSaga from "./tripArchive/tripArchive.saga";
import headerSaga from './header/header.saga';
import notificationSaga from './notification/notification.saga';
import itinerarySaga from './itinerary/itinerary.saga';
import collectionSaga from './collection/collection.saga';

import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(tripArchiveSaga),
    call(headerSaga),
    call(notificationSaga),
    call(itinerarySaga),
    call(collectionSaga),
  ]);
}
