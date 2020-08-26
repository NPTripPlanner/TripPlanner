import userSaga from "./user/user.saga";
import tripArchiveSaga from "./tripArchive/tripArchive.saga";

import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(tripArchiveSaga),
  ]);
}
