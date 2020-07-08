import { put, call, take } from "redux-saga/effects";

function* setMessage(action) {
  yield put(action);
}
export function* setMessageSaga() {
  const action = yield take("SET_MESSAGE");
  yield call(setMessage, action);
}
