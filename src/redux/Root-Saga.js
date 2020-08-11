import { setMessageSaga } from "./test/test.saga";

import { loginDialog } from "./dialog/dialog.saga";
import userSaga from "./user/user.saga";
import tripManagerSaga from "./trip_manager/trip_manager.saga";

import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(setMessageSaga),
    call(loginDialog),
    call(userSaga),
    call(tripManagerSaga),
  ]);
}
