import { take, put, call, all } from "redux-saga/effects";

import DialogActionTypes from "./dialog.actionTypes";

function* loginDialog() {
  try {
    const action = yield take(DialogActionTypes.Login);
    yield put(action);
  } catch (err) {
    console.error(err);
  }
}

function* createTripArchive() {
  try {
    const action = yield take(DialogActionTypes.CreateTripArchive);
    yield put(action);
  } catch (err) {
    console.error(err);
  }
}

export default function* DialogSaga() {
  yield all([
    call(loginDialog),
    call(createTripArchive),
  ]);
}
