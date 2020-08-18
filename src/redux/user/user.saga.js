import actionTypes from "./user.actionTypes";
import {
  LoginSuccessful,
  LoginFail,
  SignupFail,
  SendForgotPassMailSuccessful,
  SendForgotPassMailFail,
  SendForgotPassMailReset,
  CheckUserSessionEnd,
  UserLogout,
} from "./user.actions";

import { call, put, all, takeLeading, takeEvery, delay } from "redux-saga/effects";

import {
  SignUpWithEmailAndPassword,
  LoginWithEmailAndPassword,
  SendForgotPasswordMail,
  GetCurrentUser,
  Logout,
} from "../../utils/firebase.utils";

function* userLogin({ payload: { email, password } }) {
  try {
    const user = yield call(LoginWithEmailAndPassword, email, password);
    yield call(loginSuccessful, user);
  } catch (err) {
    yield put(LoginFail(err));
  }
}

function* loginSuccessful(user) {
  yield put(LoginSuccessful(user));
}

function* loginStart() {
  yield takeLeading(actionTypes.LOGIN_START, userLogin);
}

function* userSignup({ payload: { email, password, displayName } }) {
  try {
    const userCredential = yield call(
      SignUpWithEmailAndPassword,
      email,
      password,
      displayName
    );
    yield call(loginSuccessful, userCredential.user);
  } catch (err) {
    yield put(SignupFail(err));
  }
}

function* signupStart() {
  yield takeLeading(actionTypes.SIGNUP_START, userSignup);
}

function* sendForgotPassMail({ payload: { email } }) {
  try {
    yield call(SendForgotPasswordMail, email);
    yield put(SendForgotPassMailSuccessful());
  } catch (err) {
    yield put(SendForgotPassMailFail(err));
  }
}

function* sendForgotPassMailStart() {
  yield takeLeading(actionTypes.SEND_FORGOTPASS_MAIL_START, sendForgotPassMail);
}

function* doSendForgotPassMailReset() {
  yield put(SendForgotPassMailReset());
}

function* sendForgotPassMailResetStart() {
  yield takeEvery(
    actionTypes.SEND_FORGOTPASS_MAIL_RESET,
    doSendForgotPassMailReset
  );
}

function* doCheckUserSession() {
  yield delay(1000);
  const user = yield GetCurrentUser();
  if (user) {
    yield call(loginSuccessful, user);
  }
  yield put(CheckUserSessionEnd());
}

function* checkUserSessionStart() {
  yield takeLeading(actionTypes.CHECK_USER_SESSION_START, doCheckUserSession);
}

function* doLogout() {
  yield call(Logout);
  yield put(UserLogout());
}

function* logout() {
  yield takeLeading(actionTypes.LOG_OUT, doLogout);
}

export default function* UserSaga() {
  yield all([
    call(loginStart),
    call(signupStart),
    call(sendForgotPassMailStart),
    call(sendForgotPassMailResetStart),
    call(checkUserSessionStart),
    call(logout),
  ]);
}
