import { setMessageSaga } from "./test/test.saga";

import userSaga from "./user/user.saga";
import tripManagerSaga from "./tripArchive/tripArchive.saga";

import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(setMessageSaga),
    call(userSaga),
    call(tripManagerSaga),
  ]);
}
